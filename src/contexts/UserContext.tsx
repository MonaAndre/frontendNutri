import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { IUser } from '../models/IUser';

// Definiera action-typer
const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

interface IUserAction {
  type: typeof SET_USER | typeof LOGOUT;
  payload?: IUser;
}

interface IUserState {
  userDetails: IUser | null;
  isLoggedIn: boolean;
}

// Initialtillstånd för användarkontext
const initialState: IUserState = {
  userDetails: null,
  isLoggedIn: false,
};

// Reducer för att hantera autentiseringsstatus
const userReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case SET_USER:
      console.log("Reducer: SET_USER action.payload:", action.payload);
      return {
        ...state,
        userDetails: action.payload || null,
        isLoggedIn: !!action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};


// Skapa kontext
const UserStateContext = createContext<IUserState | undefined>(undefined);
const UserDispatchContext = createContext<React.Dispatch<IUserAction> | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Funktion för att kontrollera autentisering vid sidladdning och hämta användardetaljer
  const checkAuth = async () => {
    try {
      // Kontrollera om användaren är autentiserad
      const authResponse = await fetch('http://localhost:3000/api/checkAuth', {
        credentials: 'include',
      });
      const authResult = await authResponse.json();

      if (authResult.isAuthenticated && authResult.user?.id) {
        // Hämta användardetaljer med userId från authResult
        const userDetailsResponse = await fetch(`http://localhost:3000/api/getUserDetails/${authResult.user.id}`, {
          credentials: 'include',
        });
        const userDetails = await userDetailsResponse.json();

        if (userDetailsResponse.ok) {
          // Uppdatera kontexten med de hämtade användardetaljerna
          dispatch({ type: SET_USER, payload: userDetails });
        } else {
          console.error('Failed to fetch user details');
        }
      } else {
        // Om användaren inte är autentiserad, logga ut
        dispatch({ type: LOGOUT });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
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

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
};
