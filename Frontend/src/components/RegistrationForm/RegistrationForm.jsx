import { useState } from 'react';
import useRegistration from '../../hooks/useRegistration';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formFields = [
    {
      label: 'Korisničko ime',
      value: username,
      type: 'text',
      set: (e) => setUsername(e.target.value),
      id: '1',
    },
    {
      label: 'Ime ',
      value: name,
      type: 'text',
      set: (e) => setName(e.target.value),
      id: '2',
    },
    {
      label: 'Imejl',
      value: email,
      type: 'text',
      set: (e) => setEmail(e.target.value),
      id: '3',
    },
    {
      label: 'Šifra',
      value: password,
      type: 'text',
      set: (e) => setPassword(e.target.value),
      id: '4',
    },
  ];

  const registration = useRegistration();

  async function handleSubmit(e) {
    e.preventDefault();
    await registration(username, name, email, password);
  }

  return (
    <main className=" m-8  min-w-[50px] max-w-[550px] rounded-2xl bg-white shadow-2xl md:flex-row md:space-y-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center p-8 md:p-14"
      >
        <h1 className="mb-3 text-4xl font-bold">Registracija:</h1>
        <div>
          {formFields.map((field) => (
            <section className="py-2" key={field.id}>
              <p className="text-md mb-1">{field.label}</p>
              <input
                type={field.type}
                className="w-full rounded-md border border-zinc-400 p-2 placeholder:font-light placeholder:text-zinc-500"
                id={field.id}
                value={field.value}
                onChange={field.set}
              />
            </section>
          ))}
        </div>
        <button
          type="submit"
          className="my-5 w-full rounded-lg bg-teal-600 p-2 text-white
           transition-colors duration-300 hover:bg-teal-400 "
        >
          Registrujte se
        </button>
      </form>
    </main>
  );
}
