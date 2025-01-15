import { IUserResponse } from '../models/IUserResponse';
import { IAuthResponse } from '../models/IAuthResponse';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signIn = async (email: string, password: string): Promise<IUserResponse> => {
  const response = await fetch(`${API_BASE_URL}/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const signOut = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/signOut`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  return response.json();
};

export const checkAuth = async (): Promise<IAuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/checkAuth`, {
    credentials: 'include',
  });

  if (!response.ok) {
    return { isAuthenticated: false };
  }

  return response.json();
};

export const getUserDetails = async (userId: string): Promise<IUserResponse> => {
  const response = await fetch(`${API_BASE_URL}/getUserDetails/${userId}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
};
