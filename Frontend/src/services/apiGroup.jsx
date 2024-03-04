import axios from 'axios';

export async function addGroup(userId, name, description, category, members) {
  return axios.post(
    'http://localhost:3000/api/user/group',
    { userId, name, description, category, members },
    {
      withCredentials: true,
    },
  );
}

export async function getGroupsPagination(
  id,
  limit,
  currentPage,
  sortBy,
  search,
  ascDsc,
) {
  const regexSearch = `.*${search}.*`;
  const filter = encodeURIComponent(
    JSON.stringify({
      $or: [
        { name: { $regex: regexSearch, $options: 'i' } },
        { category: { $regex: regexSearch, $options: 'i' } },
      ],
    }),
  );
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/group?userId=${id}&page=${currentPage}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&ascDsc=${ascDsc}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Greska prilikom pribavljanja grupe:', error.data);
    throw error;
  }
}

export async function getGroups(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/groupForm?userId=${id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Greska prilikom pribavljanja grupe', error.data);
    throw error;
  }
}

export async function leaveGroup(userId, groupId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/user/group/?userId=${userId}&groupId=${groupId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response);
    throw error;
  }
}
