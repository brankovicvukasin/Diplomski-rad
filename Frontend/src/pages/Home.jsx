import Logo from '../components/Reusable/Logo';
import LoginForm from '../components/LoginForm/LoginForm';

export default function Home() {
  return (
    <main className=" flex min-h-screen w-screen flex-wrap justify-evenly bg-customBlue">
      <div className="flex-none self-center p-14">
        <Logo style="w-[430px] h-[430px]" source="/logo5.png" link="/" />
      </div>
      <div className="my-16">
        <LoginForm />
      </div>
    </main>
  );
}
