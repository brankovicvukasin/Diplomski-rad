import { createContext, useReducer, useState } from 'react';
import PropTypes from 'prop-types';

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'validateJwt':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    case 'registration':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'failed/login':
      return { ...state, user: null, isAuthenticated: false };
    case 'photoChange':
      return { ...state, user: action.payload, isAuthenticated: true };
    default:
      throw new Error('Unknown action');
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const [open, setOpen] = useState(true);

  const onSidebar = () => {
    setOpen(!open);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, dispatch, open, onSidebar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
