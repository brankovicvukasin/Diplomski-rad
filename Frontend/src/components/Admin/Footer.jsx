import PropTypes from 'prop-types';

Footer.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalUsers: PropTypes.number,
  setPage: PropTypes.func,
};

function Footer({ currentPage, totalPages, totalUsers, setPage }) {
  const handleNazad = () => {
    setPage(1 === currentPage ? currentPage : currentPage - 1);
  };

  const handleNapred = () => {
    setPage(totalPages === currentPage ? currentPage : currentPage + 1);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50  p-5         ">
      <p className="xs:text-sm md:text-md text-xs text-zinc-900">
        Stranica {currentPage} od {totalPages} Ukupno {totalUsers} Korisnika
      </p>
      <div className="mt-4 flex">
        <button
          onClick={handleNazad}
          className="text-md mx-2 w-full rounded-lg border border-zinc-300 bg-white p-2 px-3
        transition-colors duration-300 hover:bg-blue-500 hover:text-white"
        >
          Nazad
        </button>
        <button
          onClick={handleNapred}
          className="text-md mx-2 w-full rounded-lg border border-zinc-300 bg-white p-2 transition-colors 
        duration-300 hover:bg-blue-500 hover:text-white "
        >
          Sledeca
        </button>
      </div>
    </div>
  );
}

export default Footer;
