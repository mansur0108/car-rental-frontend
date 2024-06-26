import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mantine/core';

const RegisterPage: React.FC = () => {
  // State hooks for managing form inputs and register message
  const [createVendor, setCreateVendor] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registerMessage, setRegisterMessage] = useState<string>('');
  const navigate = useNavigate();

  // handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  const handleRegister = async () => {
    try {
      const type = createVendor ? 1 : 0; // 1 == Vendor user type
      
      // Attempt to register using the API
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/register',
        {
          email,
          password,
          type,
        },
        {
          withCredentials: true,
        }
      );
      
      console.log('Registration successful', response.data);
      navigate('/'); // Navigate to login page upon successful registration

    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      if (axios.isAxiosError(error) && error.response) {
        console.error('Registration failed', error.response.data);
        errorMessage = 'Registration failed: ' + error.response.data.message;
      }
      setRegisterMessage(errorMessage);
    }
  };

  return (
    <div className='register-container'>
      <form onSubmit={handleFormSubmit}>
        <div className='input-container'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            className='register-input'
          />
        </div>
        <div className='input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='register-input'
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type='button'
            className='show-password-button'
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        
        <Checkbox label="Vendor Account"
          onChange={(ev) => setCreateVendor(ev.currentTarget.checked)}
          description="(Demo only) Vendor accounts have access
            to create vehicles, locations, and more"
        />

        <button onClick={handleRegister} className='register-button'>
          Register
        </button>
      </form>
      {registerMessage && (
        <div className='register-message'>{registerMessage}</div>
      )}

      <div className='register-prompt'>
        Have an account already? <Link to='/'>Login</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
