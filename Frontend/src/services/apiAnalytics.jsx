import axios from 'axios';

export async function getCategoryAnalytics(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/analyticsCategory?userId=${id}`,
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

export async function getNegativeDebtAnalytics(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/analyticsDebtNegative?userId=${id}`,
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

export async function getPositiveDebtAnalytics(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/analyticsDebtPositive?userId=${id}`,
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

export async function getGroupsAnalytics(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/groupsAnalytics?userId=${id}`,
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
