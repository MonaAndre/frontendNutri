import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useUserState } from '../hooks/useUserState';

export const ProtectedRoute = () => {
  const userState = useUserState();

  if (userState.isLoggedIn && userState.userDetails === null) {
    return <Spinner />;
  }
  else if(userState.isLoggedIn && userState.userDetails ){
    return <><Outlet/> </>

  } else{
    return<>
    <Navigate to="/userStartPage/userProfile"/></>
  }
};
