import { useState } from 'react';
import { Spinner } from '../components/Spinner';
import { useUserState } from '../hooks/useUserState';
import validator from 'validator';
import { IUser } from '../models/IUser';

export const ChangeUserDetails = () => {
    const userState = useUserState();

    const [formValues, setFormValues] = useState({
        email: userState.userDetails?.email || '',
        password: '',
        firstName: userState.userDetails?.firstName || '',
        oldPassword: ''
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string; firstName?: string }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        // Validation for specific fields
        if (name === 'email') {
            if (!validator.isEmail(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Invalid e-post',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '',
                }));
            }
        }

        if (name === 'password') {
            if (
                !validator.isStrongPassword(value, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                })
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: 'Your password must have at least 1 uppercase, 1 lowercase, 1 special symbol, and be at least 8 characters long.',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: '',
                }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check for validation errors
        if (errors.email || errors.password) {
            setErrorMessage('Please fix validation errors before submitting.');
            return;
        }

        try {
            setErrorMessage(null);
            setSuccessMessage(null);

            const response = await fetch(`/api/changeUserDetails/${userState.userDetails?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for authentication
                body: JSON.stringify({
                    email: formValues.email,
                    firstName: formValues.firstName,
                    oldPassword: formValues.oldPassword,
                    newPassword: formValues.password,
                }),
            });

            if (response.ok) {
                const data:IUser = await response.json();
                const newEmail=data.email;
                alert(newEmail);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error || 'Failed to update user details.');
            }
        } catch (error) {
            console.error('Error updating user details:', error);
            setErrorMessage('An unexpected error occurred. Please try again later.');
        }
    };

    if (!userState.userDetails) {
        return <Spinner />;
    }

    return (
        <form className='standard-form' onSubmit={handleSubmit}>
            <label className='input-group' htmlFor="firstName">
                <span>Skriv in ditt nya namn</span>
                <input
                    className='input-field'
                    type="text"
                    name="firstName"
                    placeholder="Förnamn"
                    value={formValues.firstName}
                    onChange={handleChange}
                />
            </label>

            <label className='input-group' htmlFor="email">
                <span>E-post</span>
                <input
                    className='input-field'
                    type="email"
                    name="email"
                    placeholder="Din e-postadress"
                    value={formValues.email}
                    onChange={handleChange}
                />
                {errors.email && <p className='failed'>{errors.email}</p>}
            </label>

            <label className='input-group' htmlFor="password">
                <span>Gammal lösenord</span>
                <input
                    className='input-field'
                    type="password"
                    name="oldPassword"
                    placeholder="Gammal lösenord"
                    value={formValues.oldPassword}
                    onChange={handleChange}
                />
            </label>

            <label className='input-group' htmlFor="password">
                <span>Nytt lösenord</span>
                <input
                    className='input-field'
                    type="password"
                    name="password"
                    placeholder="Nytt lösenord"
                    value={formValues.password}
                    onChange={handleChange}
                />
                {errors.password && <p className='error'>{errors.password}</p>}
            </label>

            <button className='btn primary-btn' type="submit">
                Uppdatera inställningar
            </button>
            {errorMessage && <p className='failed'>{errorMessage}</p>}
            {successMessage && <p className='success'>{successMessage}</p>}
        </form>
    );
};
