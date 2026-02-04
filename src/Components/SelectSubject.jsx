import React, { useState } from "react";
import "./SelectSubject.css";

const SelectSubject = ({ startQuiz, goToProfile }) => {
  const subjects = ["HTML", "CSS", "JS", "React"];

  const [selected, setSelected] = useState(""); // track selected subject

  const handleSelect = (sub) => {
    setSelected(sub); // highlight selected box
    startQuiz(sub);   // start quiz
  };

  return (
    <div className="select-container">
      <h1>Select Your Subject</h1>

      <div className="subjects-grid">
        {subjects.map((sub, i) => (
          <div
            key={i}
            className={`subject-card ${selected === sub ? "selected" : ""}`}
            onClick={() => handleSelect(sub)}
          >
            {sub}
          </div>
        ))}
      </div>

      {/* ✅ Profile Button at the bottom */}
      <button 
        className="profile-btn" 
        onClick={goToProfile}
      >
        👤 View Profile
      </button>
    </div>
  );
};

export default SelectSubject;
