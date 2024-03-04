import { useNavigate } from 'react';
function Test() {
  let navigate = useNavigate();
  navigate('/app', { replace: true });

  return <div></div>;
}

export default Test;
