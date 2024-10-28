import { initialState, IUserState } from '../contexts/UserContext';
import { IUser } from '../models/IUser';


// Enum för action-typer
export enum UserActionType {
  SET_USER = 'SET_USER',
  LOGOUT = 'LOGOUT',
}

// Action-typ för reducer
export interface IUserAction {
  type: UserActionType;
  payload?: IUser;
}

// Reducer-funktion för att hantera state-uppdateringar
export const userReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return {
        ...state,
        userDetails: action.payload || null,
        isLoggedIn: !!action.payload,
      };
    case UserActionType.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
