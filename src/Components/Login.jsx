import React, { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import "./Login.css";

const Login = ({ onLogin, goToSignUp, goToForget }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!user) {
      alert("No user found. Please sign up first.");
      return;
    }

    localStorage.setItem(
      "quizUser",
      JSON.stringify({ name: user.name, email: user.email })
    );

    onLogin();
  };

  return (
    <div className="login-bg">
      <div className="welcome-text">
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
      </div>

      <div className="login-container">
        <form onSubmit={handleLogin}>
          <label className="input-label">Email Address:-</label>
          <div className="input-box">
            <FiMail className="left-react-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label className="input-label">Password:-</label>
          <div className="input-box password-box">
            <FiLock className="left-react-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {showPassword ? (
              <FiEyeOff
                className="eye-icon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                className="eye-icon"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <button type="submit">Sign In</button>
        </form>

        <div className="links">
          <span className="signup-forget" onClick={goToForget}>Forgot Password?</span>
          <span className="signup-link" onClick={goToSignUp}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
