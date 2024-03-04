import PropTypes from 'prop-types';
import { deleteUser } from '../../services/apiAdmin';

User.propTypes = {
  data: PropTypes.object,
  handleBrisanje: PropTypes.func,
};

function User({ data, handleBrisanje }) {
  const obrisiKorisnika = (e) => {
    e.preventDefault();

    deleteUser(data._id)
      .then((response) => {
        handleBrisanje(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <tr>
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
        <p className="whitespace-no-wrap text-gray-900">
          {new Date(data.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.role}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <button
          onClick={obrisiKorisnika}
          className="text-md mx-2 rounded-lg bg-red-600 p-2 px-4
        text-white transition-colors duration-300 hover:bg-red-500"
        >
          Obriši
        </button>
      </td>
    </tr>
  );
}

export default User;
