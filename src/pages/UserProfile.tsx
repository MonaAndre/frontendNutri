import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState, useUserDispatch } from '../contexts/UserContext';
import { Spinner } from '../components/Spinner';

export const UserProfile = () => {
  const navigate = useNavigate();
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        if (!userState.userDetails?.id) {
          const response = await fetch(`http://localhost:3000/api/getUserDetails/${userState.userDetails?.id}`, {
            credentials: 'include',
          });
          const result = await response.json();
          if (response.ok) {
            userDispatch({ type: 'SET_USER', payload: result.user });
          } else {
            console.error("Error fetching user details:", result.error);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    if (!userState.isLoggedIn) {
      navigate('/login');
    } else if (!userState.userDetails) {
      fetchUserDetails();
    }

  }, [userState.isLoggedIn, userState.userDetails, userDispatch, navigate]);

  console.log("User Details:", userState.userDetails);

  if (!userState.userDetails) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className='heading'>Hej {userState.userDetails.firstName}, och vällkommen till NutriTrack!</h1>
      <p className='text-center'>Email: {userState.userDetails.email}</p>
    </div>
  );
};
