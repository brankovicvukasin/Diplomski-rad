import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function useRegistration() {
  const { dispatch } = useAuth();
  let navigate = useNavigate();

  async function registration(username, name, email, password) {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/registration',
        {
          username,
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (res.data.status === 'success') {
        console.log(res);
        dispatch({ type: 'registration', payload: res.data.user });
        navigate('/app', { replace: true });
      }
    } catch (err) {
      console.log('Greska prilikom registracije');
      dispatch({ type: 'failed/login' });
      console.log(err);
    }
  }
  return registration;
}
