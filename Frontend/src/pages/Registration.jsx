import Logo from '../components/Reusable/Logo';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
export default function Registration() {
  return (
    <main className=" flex min-h-screen w-screen flex-wrap justify-evenly bg-customBlue">
      <div className="flex-none self-center p-14">
        <Logo style="w-[430px] h-[430px]" source="/logo5.png" link="/" />
      </div>
      <div className="my-16 w-[614px]">
        <RegistrationForm />
      </div>
    </main>
  );
}
