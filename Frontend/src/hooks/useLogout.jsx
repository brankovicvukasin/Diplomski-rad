import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function useLogout() {
  const { dispatch } = useAuth();
  let navigate = useNavigate();

  async function Logout() {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/logout',
        {
          status: 'logout',
        },
        {
          withCredentials: true,
        },
      );
      if (res.data.status === 'success') {
        dispatch({ type: 'logout' });
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.log('Greska prilikom logout-a');
      console.log(err.response.data);
    }
  }
  return Logout;
}
