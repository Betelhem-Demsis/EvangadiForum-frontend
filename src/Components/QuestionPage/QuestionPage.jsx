import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./QuestionPage.css";

function QuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

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
        setUser(response.data.username);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:5000/api/questions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestions(response.data.questions);
      } catch (error) {
        setError("Failed to fetch questions. Please try again later.");
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="question-page">
      <header className="question-header">
        <Link to="/ask">
          <button className="ask-question-button">Ask Question</button>
        </Link>
        <h2>Welcome, {user ? user : "Guest"}</h2>
      </header>
      <main>
        <h1 className="questions">Questions</h1>
        {error && <p className="error-message">{error}</p>}
        <ul className="question-list">
          {questions.map((question) => (
            <li key={question.questionid} className="question-item">
              <span className="question-user">
                Posted by: {question.username}
              </span>
              <Link
                to={`/questions/${question.questionid}`}
                className="question-text"
              >
                {question.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default QuestionPage;
