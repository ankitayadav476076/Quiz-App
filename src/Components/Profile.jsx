import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Profile.css";
import { questions } from "../data";

const Profile = ({ goBack }) => {
  const user = JSON.parse(localStorage.getItem("quizUser")) || {
    name: "Guest",
    email: "Not available",
  };

  const allScores = JSON.parse(localStorage.getItem("userScores")) || {};

  const scores = allScores[user.name] || {
    html: 0,
    css: 0,
    js: 0,
    react: 0,
  };

  // ✅ OLD QUESTIONS COUNT
  const oldHTML = questions.html?.length || 0;
  const oldCSS = questions.css?.length || 0;
  const oldJS = questions.js?.length || 0;
  const oldReact = questions.react?.length || 0;

  // ✅ NEW QUESTIONS (ADMIN)
  const allNew = JSON.parse(localStorage.getItem("quizData")) || [];

  const newHTML = allNew.filter(q => q.subject === "html").length;
  const newCSS = allNew.filter(q => q.subject === "css").length;
  const newJS = allNew.filter(q => q.subject === "js").length;
  const newReact = allNew.filter(q => q.subject === "react").length;

  // ✅ TOTAL QUESTIONS PER SUBJECT
  const htmlTotal = oldHTML + newHTML;
  const cssTotal = oldCSS + newCSS;
  const jsTotal = oldJS + newJS;
  const reactTotal = oldReact + newReact;

  // ✅ TOTAL SCORE
  const totalScore =
    scores.html +
    scores.css +
    scores.js +
    scores.react;

  // ✅ TOTAL QUESTIONS
  const totalQuestions =
    htmlTotal + cssTotal + jsTotal + reactTotal;

  const logout = () => {
    localStorage.removeItem("quizUser");
    window.location.reload();
  };

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <FaUserCircle />
      </div>

      <h1>User Profile</h1>
      <h2>Welcome, {user.name} 👋</h2>
      <h3>Email: {user.email}</h3>

      <div className="score-box">
        <p>HTML: {scores.html} / {htmlTotal}</p>
        <p>CSS: {scores.css} / {cssTotal}</p>
        <p>JavaScript: {scores.js} / {jsTotal}</p>
        <p>React: {scores.react} / {reactTotal}</p>

        <h2>Total Score: {totalScore} / {totalQuestions}</h2>

        {totalScore === 0 && <p>No quiz attempted yet 😅</p>}
      </div>

      <button onClick={goBack} className="logout-btn">
        Back
      </button>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;