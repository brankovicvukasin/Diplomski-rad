import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <main className="flex flex-wrap justify-center">
      <p className=" pr-1 text-base text-zinc-400"> Nemate nalog?</p>
      <NavLink
        className="font-bold text-black hover:text-blue-600 hover:underline"
        to="/registration"
      >
        Registrujte se besplatno
      </NavLink>
    </main>
  );
}
