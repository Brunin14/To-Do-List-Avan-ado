import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function RotaProtegida({ children }) {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/login" />;
}

export default RotaProtegida;
