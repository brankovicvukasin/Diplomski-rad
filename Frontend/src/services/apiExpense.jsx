import axios from 'axios';

export async function addExpense(
  group,
  paidby,
  members,
  category,
  expenseAmount,
  description,
  date,
  location,
  everyonesPart,
) {
  return axios.post(
    'http://localhost:3000/api/user/expense',
    {
      group,
      paidby,
      members,
      category,
      expenseAmount,
      description,
      date,
      location,
      everyonesPart,
    },
    {
      withCredentials: true,
    },
  );
}

export async function getExpensesLocations(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/expenseLocations?userId=${id}`,
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

export async function getExpensesPagination(
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
        { description: { $regex: regexSearch, $options: 'i' } },
        { category: { $regex: regexSearch, $options: 'i' } },
      ],
    }),
  );
  try {
    const response = await axios.get(
      `http://localhost:3000/api/user/expense?userId=${id}&page=${currentPage}&limit=${limit}&sortBy=${sortBy}&filter=${filter}&ascDsc=${ascDsc}`,
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

export async function obrisiTrosak(expenseId) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/user/expense/?&expenseId=${expenseId}`,
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
