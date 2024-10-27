import { useContext } from "react";
import { UserDispatchContext } from "../contexts/UserContext";

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
      throw new Error('useUserDispatch måste användas inom en UserProvider');
    }
    return context;
  };
  