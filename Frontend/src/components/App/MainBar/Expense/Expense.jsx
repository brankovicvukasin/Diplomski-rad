import PropTypes from 'prop-types';
import { useState } from 'react';
import { obrisiTrosak } from '../../../../services/apiExpense';

Expense.propTypes = {
  data: PropTypes.object,
  setObrisiTrosak: PropTypes.func,
  everyonesPart: PropTypes.number,
};

function Expense({ data, setObrisiTrosak, everyonesPart }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const obrisiTrosakKlik = (e) => {
    e.preventDefault();
    console.log('radi', data);
    obrisiTrosak(data._id)
      .then((response) => {
        setObrisiTrosak(response);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        }
      });
  };

  return (
    <tr className="min-h-fit bg-white">
      <td className=" border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="rounded border bg-gray-200 px-4 py-2"
        >
          Potrošači
        </button>
        {dropdownOpen && (
          <ul className="absolute mt-2  rounded-lg bg-white shadow-lg">
            {data.members.map((user) => (
              <li key={user._id} className="flex px-4 py-2 hover:bg-gray-100">
                <img
                  className="mr-2 h-4 w-4 rounded-full"
                  src={user.photo}
                  alt=""
                />
                {user.username}
                <span className="pl-4 text-green-500">{`${everyonesPart.toFixed(
                  2,
                )} RSD`}</span>
              </li>
            ))}
          </ul>
        )}
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.category}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="ml-3 text-green-600">
          {data.expenseAmount.toFixed(2)} RSD
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">
          {new Date(data.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">
          {data.paidby.username}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">
          {data.group ? data.group.name : '-/-'}
        </p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.description}</p>
      </td>
      <td className="border-b border-gray-200 bg-white   text-sm">
        <button
          onClick={obrisiTrosakKlik}
          className="text-md mx-2 rounded-lg bg-red-600 p-2 px-4
          text-white transition-colors duration-300 hover:bg-red-500"
        >
          Obriši trošak
        </button>
      </td>
    </tr>
  );
}

export default Expense;
