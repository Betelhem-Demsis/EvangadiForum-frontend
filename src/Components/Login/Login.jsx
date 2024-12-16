import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:3000/api/login', { email, password });
      setSuccess('Login successful!');
      setError('');
      // Handle successful login (e.g., store the token, redirect, etc.)
      console.log('Login response:', response.data);
    } catch (error) {
      setError('Invalid email or password');
      setSuccess('');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='form-wrapper'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h2>Login to your account</h2>
          <p>
            Don't have an account? <a href='/register'>Create a new account</a>
          </p>
          
          <div className='form-group'>
            <label htmlFor='email'></label>
            <input
              placeholder='Your Email'
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'></label>
            <input
              placeholder='Your Password'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className='error-message'>{error}</p>}
            {success && <p className='success-message'>{success}</p>}
          </div>
          <button type='submit' className='submit-button'>Submit</button>
          <a className='bottom-anchor' href='/register'>Create an account?</a>
        </form>
      </div>
      <div className='info-section'>
        <a className='about' href="#">About</a>
        <h2>Evangadi Networks Q&A</h2>
        <p>No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.</p>
        <p>Whether you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.</p>
        <button className='how-it-works-button'>HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default Login;
