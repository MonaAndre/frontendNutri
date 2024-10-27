import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../services/authService";
import { UserActionType } from "../redusers/UserReduser";
import { useUserState } from "../hooks/useUserState";
import { useUserDispatch } from "../hooks/useUserDispatch";

export const Navigation = () => {
    const userState = useUserState();
    const userDispatch = useUserDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await signOut(); 
            userDispatch({ type: UserActionType.LOGOUT });
            navigate('/login');
            alert('Logged out successfully!');
        } catch (error) {
            console.error('Error during logout:', error);
            alert('An error occurred during logout. Please try again.');
        }
    };

    return (
        <>
            {userState.isLoggedIn ? (
                <nav>
                    <ul className='nav-list'>
                        <li>
                            <button className="nav-list__item" onClick={handleLogOut}>Logga ut</button>
                        </li>
                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul className='nav-list'>
                        <li>
                            <Link className='nav-list__item' to="/register">Register</Link>
                        </li>
                        <li>
                            <Link className='nav-list__item' to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
};
