import React, { useState } from "react";
import "./Forget.css";

const Forget = ({ goToLogin }) => {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    // 🔹 Validation
    if (email.trim() === "") {
      alert("Please enter your email");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    alert(`If ${email} exists, instructions sent to your email.`);

    // 🔹 Safe call (prevents error if prop name mismatch)
    if (goToLogin) {
      goToLogin();
    }
  };

  return (
    <div className="forget-container">
      <h2>Forgot Password</h2>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      <span onClick={() => goToLogin && goToLogin()} className="login-link">
        Back to Login
      </span>
    </div>
  );
};

export default Forget;