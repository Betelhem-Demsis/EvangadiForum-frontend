import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      email,
      firstname: firstName,
      lastname: lastName,
      username: userName,
      password,
    };
    console.log("Request Data:", requestData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/users/register",
        requestData
      );
      setSuccess("Registration successful!");
      setError("");
      console.log("Registration response:", response.data);
      navigate("/questions");
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess("");
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Join the network</h2>
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
          <div className="register-form-group">
            <label htmlFor="email"></label>
            <input
              placeholder="Your Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group inline">
            <div>
              <label htmlFor="firstName"></label>
              <input
                placeholder="First Name"
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName"></label>
              <input
                placeholder="Last Name"
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="register-form-group">
            <label htmlFor="userName"></label>
            <input
              placeholder="User Name"
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password"></label>
            <input
              placeholder="Your Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="register-button">
            Agree and Join
          </button>
          <p>
            i agree to the <a>privacy policy</a> and <a>terms of advice</a>
          </p>
          <p>
            <a href="/login">Already have an account?</a>
          </p>
        </form>
      </div>
      <div className="info-section">
        <a className="about" href="#">
          About
        </a>
        <h2>Evangadi Networks Q&A</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit.
        </p>
        <button className="how-it-works-button">HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default Register;
