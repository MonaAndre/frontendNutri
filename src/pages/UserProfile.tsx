import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useUserState } from '../hooks/useUserState';
import { useUserDispatch } from '../hooks/useUserDispatch';
import { getUserDetails } from '../services/authService';
import { UserActionType } from '../redusers/UserReduser';


export const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userState.userDetails?.id) {
          setLoading(true); 
          const userId = String(userState.userDetails.id);
          const userDetails = await getUserDetails(userId);
          userDispatch({ type: UserActionType.SET_USER, payload: userDetails.user });
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!userState.isLoggedIn) {
      navigate('/login');
    } else if (!userState.userDetails) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [userState.isLoggedIn, userState.userDetails, userDispatch, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (!userState.userDetails) {
    return null; 
  }

  return (
    <div>
      <h1 className='heading'>Hej {userState.userDetails.firstName}, och välkommen till NutriTrack!</h1>
      <p className='text-center'>Email: {userState.userDetails.email}</p>
    </div>
  );
};
