import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth.jsx';
import { getFriends } from '../../../../services/apiFriend.jsx';
import { addGroup } from '../../../../services/apiGroup.jsx';

export default function AddGroupForm() {
  const [imeGrupe, setImeGrupe] = useState('');
  const [opisGrupe, setOpisGrupe] = useState('');
  const [kategorija, setKategorija] = useState('');
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState(null);

  const { user } = useAuth();

  const handleSelectionChange = (e) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    setSelectedFriends(selected);
  };

  //DODAVANJE GRUPE U BAZU
  const napraviGrupu = (e) => {
    e.preventDefault();
    addGroup(user._id, imeGrupe, opisGrupe, kategorija, selectedFriends)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      });
  };

  //ZA PRIBAVLJANJE SVIH PRIJATELJA KOJE KORISNIK BIRA
  useEffect(() => {
    setLoading(true);
    getFriends(user._id)
      .then((data) => {
        setFriends(data.friends);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  if (!friends) return;
  console.log(loading, selectedFriends);

  return (
    <div className="my-8 min-w-full overflow-x-auto sm:mx-auto sm:w-full sm:min-w-52 sm:max-w-md">
      <div className="rounded-lg bg-white px-9 py-8 shadow-xl ring-1 ring-black ring-opacity-5 ">
        <p className="text-md mb-4 pt-1">Ime</p>
        <input
          type="text"
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          value={imeGrupe}
          onChange={(e) => setImeGrupe(e.target.value)}
        />
        <p className="text-md mb-4 pt-1">Kategorija</p>
        <input
          type="text"
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          value={kategorija}
          onChange={(e) => setKategorija(e.target.value)}
        />
        <p className="text-md mb-4 pt-1">Opis</p>
        <textarea
          type="text"
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          value={opisGrupe}
          onChange={(e) => setOpisGrupe(e.target.value)}
        />
        <p className="text-md my-4">Članovi</p>
        <p className="my-4 text-xs">
          Koristite Ctrl+click za selekciju više članova
        </p>
        <select
          size="5"
          multiple
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          onChange={handleSelectionChange}
        >
          {friends.map((friend) => (
            <option
              key={friend.friend.id}
              value={friend.friend.id}
              className="m-1 flex"
            >
              <img
                className="mr-3 h-6 w-6 rounded-full"
                src={friend.friend.photo}
              />
              {friend.friend.username}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={napraviGrupu}
          className="my-5 w-full rounded-lg bg-slate-900 p-2 text-white transition-colors duration-300 hover:bg-slate-600"
        >
          Napravi grupu
        </button>
      </div>
    </div>
  );
}
