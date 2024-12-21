import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/users/login",
        {
          email,
          password,
        }
      );
      setSuccess("Login successful!");
      setError("");
      localStorage.setItem("token", response.data.token);
      login();
      navigate("/questions");
    } catch (error) {
      setError("Invalid email or password");
      setSuccess("");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login to your account</h2>
          <p>
            Don't have an account? <a href="/register">Create a new account</a>
          </p>
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              placeholder="Your Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <a className="bottom-anchor" href="/register">
            Create an account?
          </a>
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

export default Login;
