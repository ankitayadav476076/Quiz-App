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
      <div className="login-container">
        <h1 className="form-heading">Login</h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="input-box">
            <FiMail className="left-react-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-box password-box">
            <FiLock className="left-react-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          <span onClick={goToForget}>Forgot Password?</span>
          <span className="signup-link" onClick={goToSignUp}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;