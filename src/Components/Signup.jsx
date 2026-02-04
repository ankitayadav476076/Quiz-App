import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";
import "./Signup.css";

const Signup = ({ goToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (userExists) {
      alert("User with this email already exists!");
      return;
    }

    users.push({ name, email: email.trim().toLowerCase(), password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    goToLogin();
  };

  return (
    <div className="signup-bg">
      <div className="signup-container">
        <h1 className="form-heading">Signup</h1>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="input-box">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              className={showPassword ? "password-visible" : ""}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="eye-icon"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Confirm Password */}
          <div className="input-box">
            <input
              type={showConfirm ? "text" : "password"}
              className={showConfirm ? "password-visible" : ""}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirm ? (
              <FaEyeSlash
                className="eye-icon"
                onClick={() => setShowConfirm(false)}
              />
            ) : (
              <FaEye
                className="eye-icon"
                onClick={() => setShowConfirm(true)}
              />
            )}
          </div>

          <button type="submit" className="signup-btn">
            <FaUserPlus className="btn-icon" />
            Create Account
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={goToLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
