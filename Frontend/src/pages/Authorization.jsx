import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import PropTypes from 'prop-types';

Authorization.propTypes = {
  children: PropTypes.node,
};

export default function Authorization({ children }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/');
    },
    [user, isAuthenticated, navigate],
  );

  return isAuthenticated ? children : null;
}
