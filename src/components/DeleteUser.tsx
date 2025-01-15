import { useState, useContext } from "react";
import { useUserState } from "../hooks/useUserState";
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../contexts/UserContext";
import { UserActionType } from "../reducers/UserReducer";
import { signOut } from "../services/authService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DeleteUser = () => {
    const navigate = useNavigate();
    const userState = useUserState();
    const dispatch = useContext(UserDispatchContext);
    const [isOpen, setIsOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const userId = userState.userDetails?.id;

    const afterDeletedUserHandle = async () => {
        try {
            await signOut();
            if (dispatch) {
                dispatch({ type: UserActionType.LOGOUT });
            }
            navigate('/successDeleteUser');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/deleteUser/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
                credentials: 'include'
            });

            if (response.ok) {
                afterDeletedUserHandle();
            } else if (response.status === 401) {
                setErrorMessage('Incorrect password. Please try again.');
            } else {
                setErrorMessage('Failed to delete account. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <section className='danger-zone'>
                <h3 className='heading-danger'>Dangerzone</h3>
                <div className="w-full flex flex-col md:flex-row gap-3">
                    <label htmlFor="">Om du vill ta bort ditt konto och all data som är kopplat till det kan du göra det här. Observera att kontot raderas permanent utan möjlighet att återställa det.</label>
                    <button
                        onClick={toggleModal}
                        className="btn danger-btn"
                    >
                        Ta bort konto
                    </button>
                </div>
            </section>

            {/* Modal */}
            {isOpen && (
                <div
                    id="hs-focus-management-modal"
                    className="fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto flex justify-center items-center bg-black bg-opacity-50"
                    role="dialog"
                    tabIndex={-1}
                    aria-labelledby="hs-focus-management-modal-label"
                >
                    <div className="transition-all ease-out sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                                <h3
                                    id="hs-focus-management-modal-label"
                                    className="font-bold text-gray-800 dark:text-white"
                                >
                                    OBS: Konto tas bort permanent utan möjlighet till återställning
                                </h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className=""
                                    aria-label="Close"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg
                                        className="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                                <label
                                    htmlFor="input-label"
                                    className="block text-sm font-medium mb-2 dark:text-white"
                                >
                                    Lösenord
                                </label>
                                <input
                                    id="input-label"
                                    className="input-field"
                                    autoFocus
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="btn primary-btn"
                                >
                                    Avbryt
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteUser()}
                                    className="btn danger-btn"
                                >
                                    Ta bort konto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
