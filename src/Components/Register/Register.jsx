import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      email,
      first_name: firstName,
      last_name: lastName,
      username: userName,
      password
    };
    console.log('Request Data:', requestData);

    try {
      const response = await axios.post('https://localhost:3000/api/register', requestData);
      setSuccess('Registration successful!');
      setError('');
      console.log('Registration response:', response.data);
    } catch (error) {
      setError('Registration failed. Please try again.');
      setSuccess('');
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-form-wrapper'>
        <form className='register-form' onSubmit={handleSubmit}>
          <h2>Register to join the network</h2>
          <p>
            Already have an account? <a href='/login'>Sign in</a>
          </p>
          <div className='register-form-group'>
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
          <div className='register-form-group inline'>
            <div>
              <label htmlFor='firstName'></label>
              <input
                placeholder='First Name'
                type='text'
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor='lastName'></label>
              <input
                placeholder='Last Name'
                type='text'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='register-form-group'>
            <label htmlFor='userName'></label>
            <input
              placeholder='User Name'
              type='text'
              id='userName'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className='register-form-group'>
            <label htmlFor='password'></label>
            <input
              placeholder='Your Password'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className='error-message'>{error}</p>}
          {success && <p className='success-message'>{success}</p>}
          <button type='submit' className='register-button'>Agree and Join</button>
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

export default Register;
