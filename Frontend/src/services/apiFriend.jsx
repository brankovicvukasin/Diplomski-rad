import axios from 'axios';

export async function addFriend(userId, friendEmail) {
  return axios.post(
    'http://localhost:3000/api/user/friends',
    { userId, friendEmail },
    {
      withCredentials: true,
    },
  );
}

export async function getFriendsPagination(
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
        { username: { $regex: regexSearch, $options: 'i' } },
      ],
    }),
  );
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/friends?userId=${id}&page=${currentPage}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&ascDsc=${ascDsc}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.data);
    throw error;
  }
}

export async function getFriends(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/friendsForm?userId=${id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.data);
    throw error;
  }
}

export async function obrisiPrijatelja(userId, friendId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/user/friends/?userId=${userId}&friendId=${friendId}`,
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
