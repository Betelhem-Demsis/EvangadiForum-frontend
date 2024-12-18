import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './QuestionDetail.css';

function QuestionDetail() {
  const { question_id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [error, setError] = useState('');

  // Function to fetch question details
  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`https://localhost:3000/api/question/${question_id}`);
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Failed to fetch question details:', error);
      setError('Failed to fetch question details. Please try again later.');
    }
  };

  // Function to fetch answers
  const fetchAnswers = async () => {
    try {
      const response = await axios.get(`https://localhost:3000/api/answer/${question_id}`);
      setAnswers(response.data.answers);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setAnswers([]); // No answers found
      } else {
        console.error('Failed to fetch answers:', error);
        setError('Failed to fetch answers. Please try again later.');
      }
    }
  };

  // useEffect to fetch question and answers on component mount
  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [question_id]);

  // Function to handle answer submission
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const requestData = { question_id, user_id: 1, body: newAnswer }; // Include user_id
      const response = await axios.post(
        'https://localhost:3000/api/answer',
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      setNewAnswer('');
      fetchAnswers(); // Refresh answers list after submitting a new answer
    } catch (error) {
      console.error('Failed to submit answer:', error);
      setError('Failed to submit answer. Please try again later.');
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-detail">
        <h1>Question</h1>
      <h2 className='title'>{question.title}</h2>
      <p>{question.body}</p>
      <h3 className='answers'>Answers From The Community</h3>
      {error && <p className="error-message">{error}</p>}
      {answers.length === 0 ? (
        <p>No answers yet. Be the first to answer!</p>
      ) : (
        <ul className="answers-list">
          {answers.map((answer) => (
            <li key={answer.answer_id} className="answer-item">
              <span>Posted by: {answer.username}</span>
              <p className='answer'>{answer.body}</p>
            </li>
          ))}
        </ul>
      )}
      <h3 className='question-answer'>Answer the Top Question</h3>
      <p className='go-to-question-page'>Go to Question page</p>
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
