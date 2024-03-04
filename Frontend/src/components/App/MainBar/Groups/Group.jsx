import PropTypes from 'prop-types';
import { useState } from 'react';
import { leaveGroup } from '../../../../services/apiGroup';

Group.propTypes = {
  data: PropTypes.object,
  setNapustenaGrupa: PropTypes.func,
  userId: PropTypes.string,
};

function Group({ data, setNapustenaGrupa, userId }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const napustiGrupu = (e) => {
    e.preventDefault();
    leaveGroup(userId, data._id)
      .then((response) => {
        setNapustenaGrupa(response);
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
          Članovi
        </button>
        {dropdownOpen && (
          <ul className="absolute mt-2 rounded-lg bg-white shadow-lg">
            {data.members.map((member) => (
              <li
                key={member.member._id}
                className="flex px-4 py-2 hover:bg-gray-100"
              >
                <img
                  className="mr-2 h-6 w-6 rounded-full"
                  src={member.member.photo}
                />
                {member.member.username}
                <span className="pl-4 text-green-500">{`${member.amountPaid} RSD`}</span>
              </li>
            ))}
          </ul>
        )}
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.name}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.category}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-gray-900">{data.description}</p>
      </td>
      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
        <p className="whitespace-no-wrap text-center text-green-600">
          {data.totalSpending.toFixed(2)} RSD
        </p>
      </td>

      <td className="border-b border-gray-200 bg-white   text-sm">
        <button
          onClick={napustiGrupu}
          className="text-md mx-2 rounded-lg bg-red-600 p-2 px-4
          text-white transition-colors duration-300 hover:bg-red-500"
        >
          Napusti grupu
        </button>
      </td>
    </tr>
  );
}

export default Group;
