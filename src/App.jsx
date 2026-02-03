import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forget from "./Components/Forget";
import Quiz from "./Components/Quiz";
import SelectSubject from "./Components/SelectSubject";
import TopPlayers from "./Components/TopPlayers";

function App() {
  const [page, setPage] = useState("login");
  const [subject, setSubject] = useState("");

  // Login success → select subject
  const handleLoginSuccess = () => setPage("select");

  // Start quiz
  const startQuiz = (sub) => {
    setSubject(sub);
    setPage("quiz");
  };

  // Back to subject select
  const goBackToSubjects = () => setPage("select");

  // After React quiz → show top players
  const goToTopPlayers = () => setPage("topplayers");

  // Logout → go to login
  const goToLogin = () => {
    localStorage.removeItem("quizUser");
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <Login
          onLogin={handleLoginSuccess}
          goToSignUp={() => setPage("signup")}
          goToForget={() => setPage("forget")}
        />
      )}

      {page === "signup" && <Signup goToLogin={goToLogin} />}

      {page === "forget" && <Forget goToLogin={goToLogin} />}

      {page === "select" && <SelectSubject startQuiz={startQuiz} />}

      {page === "quiz" && (
        <Quiz
          subject={subject}
          goBack={goBackToSubjects}
          goToFinal={goToTopPlayers} // THIS IS IMPORTANT
        />
      )}

      {page === "topplayers" && (
        <TopPlayers goBack={goBackToSubjects} />
      )}
    </>
  );
}

export default App;
