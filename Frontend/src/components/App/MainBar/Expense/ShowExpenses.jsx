import Header from './Header';
import Expense from './Expense';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth.jsx';
import { getExpensesPagination } from '../../../../services/apiExpense';

export default function ShowExpenses() {
  const headers = [
    'Potrošači',
    'Kategorija',
    'Vrednost',
    'Datum',
    'Ko je platio',

    'Grupa',
    'Opis',
    'Opcija',
  ];
  const [expenses, setExpenses] = useState(null);
  const [sortBy, setSortBy] = useState('category');
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [ascDsc, setAscDsc] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [obrisiTrosak, setObrisiTrosak] = useState(false);

  const { user } = useAuth();
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    getExpensesPagination(user._id, limit, currentPage, sortBy, search, ascDsc)
      .then((data) => {
        console.log(data);
        setExpenses(data.expenses);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalExpenses(data.totalExpenses);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, limit, sortBy, search, user, ascDsc, obrisiTrosak]);

  if (!expenses) return;
  console.log(loading);

  return (
    <div className="m-10 w-full overflow-x-auto bg-gray-50">
      <Header
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
        ascDsc={ascDsc}
        setAscDsc={setAscDsc}
      />
      <div className="h-[520px] overflow-x-auto overflow-y-hidden">
        <table className="mt-8 min-w-full rounded-lg">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs 
                  font-semibold uppercase tracking-wider text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              return (
                <Expense
                  key={expense._id}
                  data={expense}
                  setObrisiTrosak={setObrisiTrosak}
                  everyonesPart={expense.everyonesPart}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        totalExpenses={totalExpenses}
        setPage={setCurrentPage}
      />
    </div>
  );
}
