import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function useOAuth2() {
  const { dispatch } = useAuth();
  let navigate = useNavigate();

  async function validate() {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/validatejwt',
        {
          status: 'validate',
        },
        {
          withCredentials: true,
        },
      );
      console.log(res);
      if (res.data.status === 'success') {
        console.log(res);
        dispatch({ type: 'validateJwt', payload: res.data.user });
        navigate('/app', { replace: true });
      }
    } catch (err) {
      console.log('Greska prilikom validatice tokena');
      dispatch({ type: 'failed/login' });
      console.log(err.message);
    }
  }
  return validate;
}
