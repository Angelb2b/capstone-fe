import React, { useEffect } from "react";
import jwtDecode from 'jwt-decode';
import Login from "../Components/Pages/Login";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const getAuth = () => {
  return JSON.parse(localStorage.getItem("userLoggedIn"));
};

export const useSession = () => {
  const session = getAuth();
  const decodedSession = session ? jwtDecode(session) : null;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      if (location.pathname === '/login' || location.pathname === '/') {
        return; // Prevent further navigation attempts
      }
      
      navigate('/login', { replace: true });
    }
  }, [session, location.pathname, navigate]);

  return decodedSession;
};

const ProtectedRoutes = () => {
  const isAuthorized = getAuth();
  const session = useSession();

  return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
