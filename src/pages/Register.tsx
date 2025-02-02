import React, { useState } from 'react';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { IUserResponse } from '../models/IUserResponse';

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
      const response = await fetch('https://backendnutri.onrender.com/api/createUserAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result: IUserResponse = await response.json();
  
      if (response.ok && result.user?.email) {
        localStorage.setItem("CreatedUsersMail", result.user.email);
        navigate('/frontendNutri/successReg');
      } else if (response.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email already in use'
        }));
      } else if (response.status === 500) {
        setErrorMessage('Server error. Please try again later.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again');
      }
    } catch (error) {
      console.error("Error during account creation:", error);
      setErrorMessage('An unexpected error occurred. Please try again');
    }
  };
  
  return (
    <section>
      <h2 className='heading'>Registrering</h2>
      <form className='standard-form' onSubmit={handleSubmit}>
        <label className='input-group' htmlFor="firstName">
          <span>Name</span>
          <input
            className='input-field'
            type="text"
            name="firstName"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
          />
        </label>

        <label className='input-group' htmlFor="email">
          <span>Email</span>
          <input
            className='input-field'
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && <p className='failed text-sm'>{errors.email}</p>}
        </label>

        <label className='input-group' htmlFor="password">
          <span>Password</span>
          <input
            className='input-field'
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && <p className='failed'>{errors.password}</p>}
        </label>


        <button className='btn primary-btn' type="submit">Skapa konto</button>
        {errorMessage && <p className='failed'>{errorMessage}</p>}
      </form>
    </section>
  );
}