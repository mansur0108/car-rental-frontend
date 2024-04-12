import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  // State hooks for managing form inputs and login message
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false); // To toggle password visibility
  const [loginMessage, setLoginMessage] = useState<string>(''); // To show login success or error messages
  const navigate = useNavigate(); // Hook for route navigation

  // Handles form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      // Attempt to login using the API
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/login',
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log('Login successful', response.data);
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      // Handle login error
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login failed', error.response.data);
        errorMessage = 'Login failed: ' + error.response.data.message;
      }
      setLoginMessage(errorMessage);
    }
  };

  // Render login form
  return (
    <div className='login-container'>
      <form onSubmit={handleFormSubmit}>
        <div className='input-container'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='login-input'
          />
        </div>
        <div className='input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='login-input'
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type='button'
            className='show-password-button'
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button onClick={handleLogin} className='login-button'>
          Login
        </button>
      </form>
      {loginMessage && <div className='login-message'>{loginMessage}</div>}
      <div className='register-prompt'>
        Don't have an account? <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
