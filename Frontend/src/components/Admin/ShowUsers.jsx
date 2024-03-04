import Header from './Header';
import User from './User';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { getUsers } from '../../services/apiAdmin';

export default function ShowUsers() {
  const headers = [
    'Korisnik',
    'Korisničko ime',
    'Imejl',
    'Datum kreiranja',
    'Pozicija',
    'Opcija',
  ];

  const [users, setUsers] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [search, setSearch] = useState('');
  const [ascDsc, setAscDsc] = useState('asc');
  const [obrisano, setObrisano] = useState(false);

  const limit = 5;

  useEffect(() => {
    setLoading(true);
    getUsers(limit, currentPage, sortBy, search, ascDsc)
      .then((data) => {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalUsers(data.totalUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, limit, sortBy, search, ascDsc, obrisano]);

  if (!users) return;
  console.log(obrisano, loading);

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
            {users.map((user) => {
              return (
                <User key={user._id} data={user} handleBrisanje={setObrisano} />
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        totalUsers={totalUsers}
        setPage={setCurrentPage}
      />
    </div>
  );
}
