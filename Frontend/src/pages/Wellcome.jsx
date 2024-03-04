import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getGif, updatePhoto } from '../services/apiGiphy.jsx';

function Wellcome() {
  const [gif, setGif] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { user, dispatch } = useAuth();
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    navigate('admin');
  };

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      getGif(searchTerm)
        .then((data) => {
          setGif(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  const handleGifSelect = (url) => {
    updatePhoto(user._id, url)
      .then((response) => {
        console.log(url);
        user.photo = url;
        dispatch({ type: 'photoChange', payload: user });
        alert(response.data.message);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      });
    setGif([]);
  };

  console.log(loading);

  return (
    <div className="mt-8 items-center justify-center overflow-x-auto sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex-col items-center rounded-lg bg-white p-6 shadow-lg">
        <h1 className=" whitespace-nowrap text-3xl font-semibold text-gray-800">
          Dobrodošli na FairShare😄
        </h1>
        <img
          className="mx-auto my-6 h-20 w-20 rounded-full object-cover"
          src={user.photo}
        />
        <div className="mt-4">
          <p className="text-md text-gray-600">
            <strong>Korisničko ime:</strong> {user.username}
          </p>
          <p className="text-md text-gray-600">
            <strong>Ime:</strong> {user.name}
          </p>
          <p className="text-md text-gray-600">
            <strong>Imejl:</strong> {user.email}
          </p>
          <p className="text-md text-gray-600">
            <strong>Pozicija:</strong> {user.role}
          </p>
          <p className="text-md text-gray-600">
            <strong>Nalog kreiran:</strong>{' '}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {user.role === 'admin' ? (
            <button
              className="my-5 w-full rounded-lg bg-slate-600 p-2 text-white transition-colors duration-300 hover:bg-slate-700 "
              onClick={handleClick}
            >
              Administracija
            </button>
          ) : null}
        </div>
        <div className="pt-2 text-center">
          <p className="text-md text-gray-600">Promeni profilnu sliku</p>
          <input
            value={searchTerm}
            placeholder="Unesite pretragu..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {gif.map((gif) => (
            <div key={gif.id} className="aspect-square w-full overflow-hidden">
              <img
                src={gif.images.fixed_height.url}
                alt="GIF"
                className="h-full w-full object-cover"
                onClick={() => handleGifSelect(gif.images.fixed_height.url)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wellcome;
