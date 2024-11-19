import { useState } from 'react';
import { Spinner } from '../components/Spinner';
import { useUserState } from '../hooks/useUserState';
import validator from 'validator';
export const ChangeUserDetails = () => {

    const userState = useUserState();


    const [formValues, setFormValues] = useState({
        email: userState.userDetails?.email || '',
        password: '',
        firstName: userState.userDetails?.firstName || '',
        oldPassword:''
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string; firstName?: string }>({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Uppdatera formValues och validera inmatning
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        // Validering för specifika fält
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
            if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
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

      

        // try {
        //   const data = await signIn(email, password); // data är av typen IUserResponse
        //   if (data.user) {
        //     userDispatch({ type: UserActionType.SET_USER, payload: data.user });
        //     navigate(`/userStartPage/userProfile`);
        //   } else {
        //     alert('Login failed');
        //   }
        // } catch (error) {
        //   console.error("Error during login:", error);
        //   alert('An error occurred during login. Please try again.');
        // }
    };

  

    if (!userState.userDetails) {
        return <Spinner />;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Kontrollera om det finns några valideringsfel
        if (errors.email || errors.password) {
            setErrorMessage('Please fix validation errors before submitting.');
            return;
        }

        setErrorMessage(null);
        // Skicka uppdaterad information
        // Här skulle API-anrop eller annan uppdateringslogik kunna inkluderas
    };
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
                        {errors.password && <p className='error'>{errors.password}</p>}
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

                    <button className='btn primary-btn' type="submit">Uppdatera inställningar</button>
                    {errorMessage && <p className='failed'>{errorMessage}</p>}
                </form>
  )
}
