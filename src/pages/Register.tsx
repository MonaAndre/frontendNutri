import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });

    // E-postvalidering
    if (name === 'email') {
      if (!validator.isEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid e-post'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: ''
        }));
      }
    }

    if (name === 'password') {
      if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Your password must have at least 1 uppercase, 1 lowercase, 1 special symbol, and be at least 8 characters long.'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: ''
        }));
      }
    }
  }



  //   const comparePasswords = () => { 
  //     if(passwordAgain.value === password.value) {
  //         passwordAgainError.style.display="none";
  //     }
  //     else if(password.value&&passwordAgain.value) {
  //         passwordAgainError.style.display="block";
  //     }
  // }
  // password.addEventListener("input",()=>{
  //     if(validator.isStrongPassword(password.value, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers:1, minSymbols: 1})){
  //         passwordError.style.display="none";
  //     }else{
  //         passwordError.style.display="block";
  //     }
  //     comparePasswords();
  // })

  // passwordAgain.addEventListener("input",()=>{
  //    comparePasswords();
  // })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/createUserAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/successReg');
      } else {
        setErrorMessage(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again')
    }
  };

  return (
    <div>
      <h2 className='heading'>Registrering</h2>
      <form className='standard-form' onSubmit={handleSubmit}>
        <input
          className='input-field'
          type="text"
          name="firstName"
          placeholder="First Name"
          value={userData.firstName}
          onChange={handleChange}
        />
        <input
          className='input-field'
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        {errors.email && <p className='failed'>{errors.email}</p>}
        <input
          className='input-field'
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        {errors.password && <p className='failed'>{errors.password}</p>}
        <button type="submit">Skapa konto</button>
        {errorMessage && <p className='failed'>{errorMessage}</p>}
      </form>
    </div>
  );
}