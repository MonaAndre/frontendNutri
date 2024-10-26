import { Link, useNavigate } from "react-router-dom";
import { useUserState, useUserDispatch } from "../contexts/UserContext";

export const Navigering = () => {
    const userState = useUserState();
    const userDispatch = useUserDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/signOut', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();
            if (response.ok) {
                userDispatch({ type: 'LOGOUT' });
                navigate('/login');
                alert('Logged out successfully!');
            } else {
                alert(result.error || 'Logout failed');
            }
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
}
