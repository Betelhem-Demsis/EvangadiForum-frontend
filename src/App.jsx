import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import QuestionPage from "./Components/QuestionPage/QuestionPage";
import QuestionDetail from "./Components/QuestionDetail/QuestionDetail";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./Hooks/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <QuestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:questionid"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />{" "}
        {/* Route for AskQuestion */}
        <Route path="/" element={<Login />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
