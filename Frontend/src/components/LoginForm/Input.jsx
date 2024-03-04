import PropTypes from 'prop-types';

Input.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
};

export default function Input({ email, password, setEmail, setPassword }) {
  return (
    <main>
      <section className="py-2">
        <p className="text-md mb-1">Imejl adresa </p>
        <input
          type="text"
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>
      <section className="py-2">
        <p className="text-md mb-1">Šifra</p>
        <input
          type="password"
          className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
    </main>
  );
}
