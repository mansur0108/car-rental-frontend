import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginMessage, setLoginMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/login',
        {
          email,
          password,
        }
      );
      console.log('Login successful', response.data);
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login failed', error.response.data);
        errorMessage = 'Login failed: ' + error.response.data.message;
      }
      setLoginMessage(errorMessage);
    }
  };

  return (
    <div className='login-container'>
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
          className='show-password-button'
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <button onClick={handleLogin} className='login-button'>
        Login
      </button>
      {loginMessage && <div className='login-message'>{loginMessage}</div>}
      <div className='register-prompt'>
        Don't have an account? <Link to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
