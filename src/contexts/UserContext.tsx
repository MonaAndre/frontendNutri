import { createContext } from 'react';
import { IUser } from '../models/IUser';
import { IUserAction } from '../reducers/UserReducer';


// Definierar state-typ för användaren
export interface IUserState {
  userDetails: IUser | null;
  isLoggedIn: boolean;
}

// Initialtillstånd för användarkontext
export const initialState: IUserState = {
  userDetails: null,
  isLoggedIn: false,
};

// Skapa context för state och dispatch
export const UserStateContext = createContext<IUserState | undefined>(undefined);
export const UserDispatchContext = createContext<React.Dispatch<IUserAction> | undefined>(undefined);
