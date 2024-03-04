import Header from './Header';
import Group from './Group';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth.jsx';
import { getGroupsPagination } from '../../../../services/apiGroup';

export default function ShowGroups() {
  const headers = [
    'Članovi',
    'Naziv',
    'Kategorija',
    'Opis',
    'Ukupan trošak',
    'Opcija ',
  ];

  const [groups, setGroups] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalGroups, setTotalGroups] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ascDsc, setAscDsc] = useState('asc');
  const [napustenaGrupa, setNapustenaGrupa] = useState(null);

  const { user } = useAuth();
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    getGroupsPagination(user._id, limit, currentPage, sortBy, search, ascDsc)
      .then((data) => {
        console.log(data.groups);
        setGroups(data.groups);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalGroups(data.totalGroups);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, limit, sortBy, search, user, ascDsc, napustenaGrupa]);

  if (!groups) return;
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
      <div className="h-[520px] overflow-x-auto">
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
            {groups.map((group) => {
              return (
                <Group
                  key={group._id}
                  data={group}
                  setNapustenaGrupa={setNapustenaGrupa}
                  userId={user._id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        totalGroups={totalGroups}
        setPage={setCurrentPage}
      />
    </div>
  );
}
