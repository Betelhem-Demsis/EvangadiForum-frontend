import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Hooks/AuthContext";
import "./AskQuestion.css";

function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:5000/api/users/check",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserId(response.data.userId);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setError("You must be logged in to ask a question.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:5000/api/questions",
        { userid: userId, title, description: description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Question posted successfully!");
      setError("");
      navigate(`/questions/${response.data.questionid}`);
    } catch (error) {
      setError("Failed to post the question. Please try again.");
      setSuccess("");
      console.error("Error posting question:", error);
    }
  };

  return (
    <div className="ask-question-container">
      <div className="instructions">
        <h2>Steps for writing a good question</h2>
        <ol>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ol>
      </div>
      <div className="question-form">
        <h2 className="ask-a-question">Ask a Public Question</h2>
        <h3>Go to Question Page</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a one-line summary of your problem"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your problem in more detail"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="submit-question-button">
            Post Your Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AskQuestion;
