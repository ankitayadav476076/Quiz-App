import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Profile.css";

const Profile = ({ goBack }) => {
  const user = JSON.parse(localStorage.getItem("quizUser"));
  const allScores = JSON.parse(localStorage.getItem("userScores")) || {};
  const scores = allScores[user.name] || { html: 0, css: 0, js: 0, react: 0 };

  const total = scores.html + scores.css + scores.js + scores.react;

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
      <h2>Name: {user?.name}</h2>
      <h3>Email: {user?.email}</h3>

      <div className="score-box">
        <p>HTML: {scores.html}</p>
        <p>CSS: {scores.css}</p>
        <p>JavaScript: {scores.js}</p>
        <p>React: {scores.react}</p>
        <h2>Total Score: {total} / 20</h2>
      </div>

      <button onClick={goBack} className="logout-btn">Back</button>
      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Profile;
