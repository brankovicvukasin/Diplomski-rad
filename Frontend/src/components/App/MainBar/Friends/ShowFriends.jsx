import Header from './Header';
import Friend from './Friend';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { getFriendsPagination } from '../../../../services/apiFriend';
import useAuth from '../../../../hooks/useAuth.jsx';

export default function ShowFriends() {
  const headers = [
    {
      key: 1,
      value: 'Korisnik',
    },
    {
      key: 2,
      value: 'Korisničko ime',
    },
    {
      key: 3,
      value: 'Imejl',
    },
    {
      key: 4,
      value: 'Dugovanje',
    },
    {
      key: 5,
      value: 'Opcija',
    },
  ];
  const [friends, setFriends] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFriends, setTotalFriends] = useState(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [ascDsc, setAscDsc] = useState('asc');
  const [obrisanPrijatelj, setObrisanPrijatelj] = useState(null);

  const { user } = useAuth();
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    getFriendsPagination(user._id, limit, currentPage, sortBy, search, ascDsc)
      .then((data) => {
        setFriends(data.friends);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setTotalFriends(data.totalUsers);
        setBalance(data.balance);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [currentPage, limit, sortBy, search, user, ascDsc, obrisanPrijatelj]);

  if (!friends) return;
  console.log(loading, balance);

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
                  key={header.key}
                  className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs 
                font-semibold uppercase tracking-wider text-gray-600"
                >
                  {header.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <Friend
                key={friend.friend._id}
                data={friend.friend}
                balance={friend.balance}
                userId={user._id}
                setObrisanPrijatelj={setObrisanPrijatelj}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        totalFriends={totalFriends}
        setPage={setCurrentPage}
      />
    </div>
  );
}
