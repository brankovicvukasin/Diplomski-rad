import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function useLogin() {
  const { dispatch } = useAuth();
  let navigate = useNavigate();

  async function login(email, password) {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        { withCredentials: true },
      );
      if (res.data.status === 'success') {
        dispatch({ type: 'login', payload: res.data.user });

        navigate('/app', { replace: true });
      }
    } catch (err) {
      console.log('Greska prilikom prijavljivanja');
      dispatch({ type: 'failed/login' });
      console.log(err.message);
    }
  }
  return login;
}
