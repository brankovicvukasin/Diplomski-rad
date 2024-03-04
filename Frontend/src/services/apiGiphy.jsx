import axios from 'axios';

export async function getGif(search) {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=Sex5rJY3rJLIaSHh0tUQFwvQR0hbP68z&q=${search}&limit=9`,
    );
    return response.data;
  } catch (error) {
    console.error('Greska prilikom pribavljanja grupe:', error);
    throw error;
  }
}

export async function updatePhoto(userId, photoUrl) {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/user/photoChange/?userId=${userId}&photoUrl=${photoUrl}`,
      {},
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    console.error('Greska prilikom pribavljanja grupe:', error);
    throw error;
  }
}
