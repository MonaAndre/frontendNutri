import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';
import { UserActionType } from '../redusers/UserReduser';
import { useUserDispatch } from '../hooks/useUserDispatch';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userDispatch = useUserDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signIn(email, password); // data är av typen IUserResponse
      if (data.user) {
        userDispatch({ type: UserActionType.SET_USER, payload: data.user });
        navigate(`/userStartPage`);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <h2 className='heading'>Logga in</h2>
      <form className="standard-form" onSubmit={handleSubmit}>
        <input 
          className='input-field'
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          className='input-field'
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button className="btn" type="submit">Logga in</button>
      </form>
    </>
  );
};
