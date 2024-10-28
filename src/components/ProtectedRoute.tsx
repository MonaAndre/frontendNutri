import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useUserState } from '../hooks/useUserState';


export const ProtectedRoute = () => {
  const { isLoggedIn, userDetails } = useUserState();

  if (userDetails === null) {
    return <Spinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
