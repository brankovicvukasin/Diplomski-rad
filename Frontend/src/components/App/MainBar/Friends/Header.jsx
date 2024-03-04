import PropTypes from 'prop-types';

Header.propTypes = {
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  ascDsc: PropTypes.string,
  setAscDsc: PropTypes.func,
};

export default function Header({
  sortBy,
  setSortBy,
  search,
  setSearch,
  ascDsc,
  setAscDsc,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-100 p-4">
      <h2 className="flex-shrink-0 font-semibold text-zinc-600">Prijatelji:</h2>
      <input
        className="w-full max-w-md flex-grow rounded-xl bg-white p-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 md:flex-grow-0"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pretraga..."
      />
      <h2 className="flex-shrink-0 font-semibold text-zinc-600">Sortiranje</h2>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-xl border border-zinc-300 bg-white p-2 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
      >
        <option value="name">Korisnik</option>
        <option value="username">Korisničko ime</option>
        <option value="email">Imejl</option>
      </select>
      <select
        value={ascDsc}
        onChange={(e) => setAscDsc(e.target.value)}
        className="rounded-xl border border-zinc-300 bg-white p-2 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
      >
        <option value="asc"> ↑ Rastuće </option>
        <option value="dsc"> ↓ Opadajuće </option>
      </select>
    </div>
  );
}
