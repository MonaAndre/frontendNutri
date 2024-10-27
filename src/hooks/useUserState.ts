import { useContext } from "react";
import {  UserStateContext } from "../contexts/UserContext";

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState måste användas inom en UserProvider');
  }
  return context;
};
