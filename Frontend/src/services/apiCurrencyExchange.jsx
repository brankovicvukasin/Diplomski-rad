import axios from 'axios';

export async function getExchangeRates() {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/ea8f0e362b9c05f40d3fc6d5/latest/RSD`,
    );
    return response.data;
  } catch (error) {
    console.error('Error while getting exchange rates:', error.response);
    throw error;
  }
}
