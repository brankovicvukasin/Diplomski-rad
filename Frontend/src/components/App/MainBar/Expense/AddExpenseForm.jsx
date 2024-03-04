import { useState, useEffect } from 'react';
import useAuth from '../../../../hooks/useAuth.jsx';
import { getGroups } from '../../../../services/apiGroup.jsx';
import { getFriends } from '../../../../services/apiFriend.jsx';
import { addExpense } from '../../../../services/apiExpense.jsx';
import { getExchangeRates } from '../../../../services/apiCurrencyExchange.jsx';
import Popup from './Popup.jsx';

function AddExpenseForm() {
  const [kategorija, setKategorija] = useState('');
  const [vrednost, setVrednost] = useState(0);
  const [datum, setDatum] = useState('');
  const [opis, setOpis] = useState('');
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState(null);
  const [friends, setFriends] = useState(null);
  const [conversionRates, setConversionRates] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('none');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('RSD');
  const [location, setLocation] = useState(null);

  const openPopup = () => setIsPopupOpen(!isPopupOpen);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const { user } = useAuth();
  const [selectedFriends, setSelectedFriends] = useState([
    {
      id: user.id,
      username: user.username,
    },
  ]);
  const [platio, setPlatio] = useState(user.id);

  const handleSelectionFriend = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      id: option.getAttribute('data-id'),
      username: option.value,
    }));

    const userObject = {
      id: user.id,
      username: user.username,
    };
    const selected = [...selectedOptions, userObject];

    setSelectedFriends(selected);
  };

  const handleSelectionGroup = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id = selectedOption.value;

    id === 'none'
      ? setSelectedGroup('none')
      : setSelectedGroup({
          id: id,
          members: JSON.parse(selectedOption.getAttribute('data')),
        });

    setSelectedFriends([
      {
        id: user.id,
        username: user.username,
      },
    ]);
  };

  const podeliTrosak = (e) => {
    e.preventDefault();
    const ucesnici =
      selectedGroup === 'none'
        ? selectedFriends.map((friend) => friend.id)
        : selectedGroup.members.map((member) => member.member.id);

    addExpense(
      selectedGroup.id,
      platio,
      ucesnici,
      kategorija,
      vrednost / conversionRates[selectedCurrency],
      opis,
      datum,
      location,
      vrednost / conversionRates[selectedCurrency] / ucesnici.length,
    )
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

  //ZA PRIBAVLJANJE SVIH GRUPA KOJE KORISNIK BIRA
  useEffect(() => {
    setLoading(true);
    getGroups(user._id)
      .then((data) => {
        setGroups(data.groups);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [user]);

  //ZA PRIBAVLJANJE VALUTA
  useEffect(() => {
    console.log('POZVALO SE');
    setLoading(true);
    getExchangeRates()
      .then((data) => {
        setConversionRates(data.conversion_rates);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

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

  if (!groups || !friends || !conversionRates) return;
  console.log(loading, selectedGroup);

  return (
    <div className="my-8 min-w-full sm:mx-auto sm:w-full sm:min-w-52 sm:max-w-md">
      <div
        className="rounded-lg bg-white px-9 py-8 shadow-xl ring-1
       ring-black ring-opacity-5 "
      >
        <form>
          {/* Kategorija */}
          <section className="py-2">
            <p className="text-md mb-1">Kategorija</p>
            <input
              type="text"
              className="w-full rounded-md border border-zinc-400 p-2 
              placeholder:font-light placeholder:text-zinc-500"
              value={kategorija}
              onChange={(e) => setKategorija(e.target.value)}
            />
          </section>
          {/* Valuta */}
          <section className="flex flex-col py-2">
            <p className="text-md mb-1">Valuta</p>
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className=" w-full rounded-md border border-zinc-400 p-2 text-center placeholder:font-light placeholder:text-zinc-500"
            >
              {Object.keys(conversionRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </section>
          {/* Vrednost */}
          <section className="py-2">
            <p className="text-md mb-1">Vrednost računa u izabranoj valuti</p>
            <input
              type="number"
              className="w-full rounded-md border border-zinc-400 p-2 
              text-center placeholder:font-light placeholder:text-zinc-500"
              value={vrednost}
              onChange={(e) => {
                const val = e.target.value;
                if (!isNaN(val) && val.trim() !== '') {
                  setVrednost(val);
                }
              }}
            />
          </section>
          {/* Konvertovana vrednost */}
          <section className="py-2">
            <p className="text-md mb-1">Vrednost računa konvertovana u RSD</p>
            <input
              type="text"
              value={(vrednost / conversionRates[selectedCurrency]).toFixed(2)}
              readOnly
              className="w-full rounded-md border border-zinc-400 p-2 text-center 
              placeholder:font-light placeholder:text-zinc-500"
            />
          </section>
          {/*Lokacija*/}
          <button
            type="button"
            onClick={openPopup}
            className="my-5 w-full rounded-lg bg-slate-900 p-2
         text-white transition-colors duration-300 hover:bg-slate-600"
          >
            Lokacija nastanka računa
          </button>
          {/*Popup*/}
          {isPopupOpen && (
            <Popup
              onClose={openPopup}
              setLocation={setLocation}
              location={location}
            />
          )}
          {/* Grupa */}
          <section className="py-2">
            <p className="text-md mb-1">Grupa</p>
            <select
              className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
              onChange={handleSelectionGroup}
            >
              <option key="none" value="none" className="m-1 flex">
                BEZ GRUPE
              </option>
              {groups.map((group) => (
                <option
                  key={group._id}
                  value={group._id}
                  data={JSON.stringify(group.members)}
                  className="m-1 flex"
                >
                  {group.name}
                </option>
              ))}
            </select>
          </section>
          {/* Datum */}
          <section className="py-2">
            <p className="text-md mb-1">Datum</p>
            <input
              type="date"
              className="w-full rounded-md border border-zinc-400 p-2 
              placeholder:font-light placeholder:text-zinc-500"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />
          </section>
          {/* Prijatelji */}
          {selectedGroup === 'none' ? (
            <div>
              <p className="my-4 text-xs">
                Koristite Ctrl+click za selekciju više prijatelja
              </p>{' '}
              <select
                size="5"
                multiple
                className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
                onChange={handleSelectionFriend}
              >
                {friends.map((friend) => (
                  <option
                    key={friend.friend.id}
                    value={friend.friend.username}
                    data-id={friend.friend.id}
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
            </div>
          ) : null}
          {/* Ko je platio? */}
          <section className="py-2">
            <p className="text-md mb-1">Ko je platio?</p>
            {selectedGroup === 'none' ? (
              <select
                className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
                onChange={(e) => setPlatio(e.target.value)}
              >
                {selectedFriends.map((friend) => (
                  <option
                    key={friend.id}
                    value={friend.id}
                    className="m-1 flex"
                  >
                    {friend.username}
                  </option>
                ))}
              </select>
            ) : (
              <select
                className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
                onChange={(e) => setPlatio(e.target.value)}
              >
                {selectedGroup.members.map((member) => (
                  <option
                    key={member.member._id}
                    value={member.member._id}
                    className="m-1 flex"
                  >
                    {member.member.username}
                  </option>
                ))}
              </select>
            )}
          </section>
          {/* Opis */}
          <section className="py-2">
            <p className="text-md mb-1">Opis</p>
            <textarea
              className="w-full rounded-md border border-zinc-400 p-2 
              placeholder:font-light placeholder:text-zinc-500"
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
              rows={2}
            />
          </section>
          {/*Svaciji deo */}
          <section className="py-2">
            <p className="text-md mb-1">Svačiji deo</p>
            <input
              type="text"
              value={`${
                selectedGroup === 'none'
                  ? (
                      vrednost /
                      conversionRates[selectedCurrency] /
                      selectedFriends.length
                    ).toFixed(2)
                  : (
                      vrednost /
                      conversionRates[selectedCurrency] /
                      selectedGroup.members.length
                    ).toFixed(2)
              } RSD`}
              readOnly
              className="w-full rounded-md border border-zinc-400 p-2 text-center 
              placeholder:font-light placeholder:text-zinc-500"
            />
          </section>
        </form>
        <button
          type="button"
          onClick={podeliTrosak}
          className="my-5 w-full rounded-lg bg-slate-900 p-2
         text-white transition-colors duration-300 hover:bg-slate-600"
        >
          Podeli trošak
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
