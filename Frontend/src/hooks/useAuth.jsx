import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export default function useAuth() {
  //Custom hook kako bi se lakse mogao consume context i manje pisao kod u komponentama koji ga koriste

  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('AuthContext je koriscen izvan AuthProvider-a');
  return context;
}
