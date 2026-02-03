import React, { useEffect, useState } from "react";
import { questions } from "../data";
import "./Quiz.css";

const Quiz = ({ subject, goBack, goToFinal }) => {
  const quizQuestions = questions[subject.trim().toLowerCase()];
  const user = JSON.parse(localStorage.getItem("quizUser")) || { name: "Guest" };

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(15);
  const [showResult, setShowResult] = useState(false); // show result after any quiz

  // Timer for each question
  useEffect(() => {
    if (showResult) return; // stop timer when showing result
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [current, showResult]);

  if (!quizQuestions) return <h2>No questions found</h2>;

  const handleOptionClick = (index) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === quizQuestions[current].answer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setTime(15);
    if (current + 1 < quizQuestions.length) setCurrent((prev) => prev + 1);
    else finishQuiz();
  };

  const finishQuiz = () => {
    const allScores = JSON.parse(localStorage.getItem("userScores")) || {};
    allScores[user.name] = allScores[user.name] || { html: 0, css: 0, js: 0, react: 0 };
    allScores[user.name][subject.trim().toLowerCase()] = score;
    localStorage.setItem("userScores", JSON.stringify(allScores));

    // Show result after any subject
    setShowResult(true);
  };

  const allScores = JSON.parse(localStorage.getItem("userScores")) || {};
  const userScore = allScores[user.name];

  // Show score after quiz
  if (showResult && userScore) {
    return (
      <div className="container">
        <h1>🎉 {user.name}'s Result</h1>
        
        {/* Show only current subject */}
        <p>{subject.toUpperCase()}: {userScore[subject.trim().toLowerCase()]} / {quizQuestions.length}</p>

        {/* If React quiz, show all subjects and total */}
        {subject.trim().toLowerCase() === "react" && (
          <>
            <p>HTML: {userScore.html} / 5</p>
            <p>CSS: {userScore.css} / 5</p>
            <p>JS: {userScore.js} / 5</p>
            <p>React: {userScore.react} / 5</p>
            <h2>Total: {userScore.html + userScore.css + userScore.js + userScore.react} / 20</h2>
          </>
        )}

        <button onClick={subject.trim().toLowerCase() === "react" ? goToFinal : goBack}>
          {subject.trim().toLowerCase() === "react" ? "Next → Top Players" : "Back → Subjects"}
        </button>
      </div>
    );
  }

  // Quiz interface
  return (
    <div className="container">
      <h1>Hello {user.name}, {subject.toUpperCase()} Quiz</h1>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>⏱ Time Left: {time}s</p>
      <h2>{quizQuestions[current].question}</h2>

      <ul>
        {quizQuestions[current].options.map((opt, i) => {
          let className = "";
          if (selected !== null) {
            if (i === quizQuestions[current].answer) className = "correct";
            else if (i === selected) className = "wrong";
          }
          return (
            <li key={i} className={className} onClick={() => handleOptionClick(i)}>
              {opt}
            </li>
          );
        })}
      </ul>

      {selected !== null && (
        <button onClick={handleNext}>
          {current + 1 < quizQuestions.length ? "Next" : "Finish"}
        </button>
      )}

      <div className="index">Question {current + 1} of {quizQuestions.length}</div>
    </div>
  );
};

export default Quiz;
