import PropTypes from 'prop-types';
import { obrisiPrijatelja } from '../../../../services/apiFriend';

Friend.propTypes = {
  data: PropTypes.object,
  balance: PropTypes.number,
  userId: PropTypes.string,
  setObrisanPrijatelj: PropTypes.func,
};

function Friend({ data, balance, setObrisanPrijatelj, userId }) {
  const obrisiPrijateljaHandle = (e) => {
    e.preventDefault();
    obrisiPrijatelja(userId, data.id)
      .then((response) => {
        setObrisanPrijatelj(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      });
  };

  console.log(data);

  return (
    <tr key={data._id} className="rounded-xl">
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <div className="flex">
          <div className="h-10 w-10 flex-shrink-0">
            <img className="h-full w-full rounded-full" src={data.photo} />
          </div>
          <p className="ml-3 text-zinc-600">{data.name}</p>
        </div>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.username}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.email}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        {balance === 0 && <p>Nemate dugovanja</p>}
        {balance > 0 && (
          <p className="whitespace-no-wrap text-green-600">
            Duguje ti {Math.abs(balance.toFixed(2))} RSD
          </p>
        )}
        {balance < 0 && (
          <p className="whitespace-no-wrap text-red-500">
            Duguješ {Math.abs(balance.toFixed(2))} RSD
          </p>
        )}
      </td>
      <td className="border-b border-gray-200 bg-white   text-sm">
        <button
          onClick={obrisiPrijateljaHandle}
          className="text-md mx-2 rounded-lg bg-red-600 p-2 px-4
          text-white transition-colors duration-300 hover:bg-red-500"
        >
          Obriši prijatelja
        </button>
      </td>
    </tr>
  );
}

export default Friend;
