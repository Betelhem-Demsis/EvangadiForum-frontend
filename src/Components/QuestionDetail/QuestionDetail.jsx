import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Hooks/AuthContext";
import "./QuestionDetail.css";

function QuestionDetail() {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!questionid) {
        setError("Invalid question ID.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized access. Please log in.");
          return;
        }

        const [questionRes, answersRes] = await Promise.all([
          axios.get(`http://127.0.0.1:5000/api/questions/${questionid}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://127.0.0.1:5000/api/answers/${questionid}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setQuestion(questionRes.data.question);
        setAnswers(answersRes.data.answers || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load question and answers.");
      }
    };

    fetchData();
  }, [questionid]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!isLoggedIn || !token) {
        setError("You must be logged in to submit an answer.");
        return;
      }

      if (!newAnswer.trim()) {
        setError("Please enter a valid answer.");
        return;
      }

      const requestData = {
        questionid: parseInt(questionid, 10),
        answer: newAnswer,
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/api/answers",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Answer posted successfully") {
        setNewAnswer("");
        setError("");
        setAnswers((prev) => [
          ...prev,
          { content: newAnswer, user_name: "You" },
        ]);
      }
    } catch (err) {
      console.error("Failed to submit answer:", err);
      setError("Failed to submit answer. Please try again later.");
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-detail">
      <h1>Question</h1>
      <h2 className="title">{question.title}</h2>
      <p>{question.description}</p>
      <p>
        <strong>Tag:</strong> {question.tag}
      </p>
      <p>
        <strong>Asked by:</strong> {question.username}
      </p>
      <p>
        <strong>Posted on:</strong>{" "}
        {new Date(question.created_at).toLocaleDateString()}
      </p>

      <h3 className="answers">Answers From The Community</h3>
      {error && <p className="error-message">{error}</p>}
      {answers.length === 0 ? (
        <p>No answers yet. Be the first to answer!</p>
      ) : (
        <ul className="answers-list">
          {answers.map((answer, index) => (
            <li key={index} className="answer-item">
              <span>Posted by: {answer.user_name}</span>
              <p className="answer">{answer.content}</p>
            </li>
          ))}
        </ul>
      )}

      <h3 className="question-answer">Answer the Top Question</h3>
      <form onSubmit={handleAnswerSubmit}>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Your answer..."
          required
        />
        <button type="submit">Post Your Answer</button>
      </form>
    </div>
  );
}

export default QuestionDetail;
