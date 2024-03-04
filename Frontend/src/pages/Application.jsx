import SideBar from '../components/App/SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

export default function Application() {
  const { open, onSidebar } = useAuth();

  return (
    <div className="flex bg-gray-50">
      <button
        onClick={onSidebar}
        style={{ position: 'fixed', zIndex: 1000 }}
        type="position"
        className="duration-600 fixed bottom-10 right-8 flex h-10 w-10 
      rounded-full bg-slate-900  drop-shadow-lg hover:bg-slate-600"
      />

      <SideBar open={open} onSidebar={onSidebar} />
      <Outlet />
    </div>
  );
}
