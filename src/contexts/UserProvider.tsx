import { useReducer, useEffect, ReactNode } from 'react';
import { UserStateContext, UserDispatchContext, initialState } from './UserContext';
import { UserActionType, userReducer } from '../redusers/UserReduser';


interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const checkAuth = async () => {
    try {
      const authResponse = await fetch('http://localhost:3000/api/checkAuth', {
        credentials: 'include',
      });
      const authResult = await authResponse.json();

      if (authResult.isAuthenticated && authResult.user?.id) {
        const userDetailsResponse = await fetch(
          `http://localhost:3000/api/getUserDetails/${authResult.user.id}`,
          { credentials: 'include' }
        );
        const userDetails = await userDetailsResponse.json();

        if (userDetailsResponse.ok) {
          dispatch({ type: UserActionType.SET_USER, payload: userDetails });
        } else {
          console.error('Failed to fetch user details');
        }
      } else {
        dispatch({ type: UserActionType.LOGOUT });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      dispatch({ type: UserActionType.LOGOUT });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
