import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';

Element.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  url: PropTypes.string,
};

export default function Element({ children, type, url }) {
  let navigate = useNavigate();
  const logout = useLogout();

  async function handleSubmit(e) {
    e.preventDefault();
    if (type === 'Logout') await logout();
    else navigate(url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="mt-3 flex min-w-full cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-cyan-600"
      >
        {children}
        <p to={url} className="ml-4 text-[15px] font-bold text-gray-200">
          {type}
        </p>
      </button>
    </form>
  );
}
