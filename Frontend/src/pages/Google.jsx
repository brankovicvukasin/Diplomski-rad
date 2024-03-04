import { useEffect } from 'react';
import useOAuth2 from '../hooks/useValidateJwt';

function Google() {
  const validate = useOAuth2();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await validate();
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };

    validateToken();
  }, [validate]);

  return <div>Loading...</div>;
}

export default Google;
