import axios from 'axios';

export async function getUsers(limit, currentPage, sortBy, search, ascDsc) {
  // Koristimo RegExp za partial match i case-insensitive pretragu
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
      `http://localhost:3000/api/admin/allUsers?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&ascDsc=${ascDsc}`,
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

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/deleteUser/?userId=${userId}`,
      {
        withCredentials: true,
      },
    );
    console.log('User deleted successfully', response.data);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error.response);
    throw error;
  }
}
