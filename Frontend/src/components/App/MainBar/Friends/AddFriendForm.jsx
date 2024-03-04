import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth.jsx';
import { addFriend } from '../../../../services/apiFriend.jsx';

export default function AddFriendForm() {
  const [email, setEmail] = useState('');
  const { user } = useAuth();

  const handleClick = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    addFriend(user._id, email)
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

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="rounded-lg bg-white px-9 py-8 shadow-xl ring-1 ring-black ring-opacity-5 ">
        <p className="text-md mb-4">Unesite email prijatelja:</p>
        <input
          type="text"
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleClick}
          type="button"
          className="my-5 w-full rounded-lg bg-slate-900 p-2 text-white transition-colors duration-300 hover:bg-slate-600"
        >
          Dodaj prijatelja
        </button>
      </div>
    </div>
  );
}
