import { useState } from 'react';
import useLogin from '../../hooks/useLogin.jsx';
import Header from './Header.jsx';
import Input from './Input.jsx';
import Footer from './Footer.jsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleClickGoogle = (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:3000/api/auth/auth/google';
  };

  return (
    <main
      className="m-8 min-w-[50px] max-w-[550px] rounded-2xl
     bg-white shadow-2xl md:flex-row md:space-y-0"
    >
      <form className="flex flex-col justify-center p-8 md:p-14">
        <Header />
        <Input
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <button
          type="button"
          onClick={handleClick}
          className="my-5 w-full rounded-lg bg-teal-600 p-2 text-white 
          transition-colors duration-300 hover:bg-teal-400 "
        >
          Prijavite se
        </button>
        <button
          type="button"
          onClick={handleClickGoogle}
          className="text-md mb-4 w-full rounded-lg border border-zinc-300 p-2 
          transition-colors duration-300 hover:bg-blue-500 hover:text-white "
        >
          <img src={'/google.png'} className="mr-2 inline h-6 w-6" />
          Prijavite se preko Google naloga
        </button>
        <Footer />
      </form>
    </main>
  );
}
