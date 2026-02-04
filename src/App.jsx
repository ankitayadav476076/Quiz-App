import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forget from "./Components/Forget";
import Quiz from "./Components/Quiz";
import SelectSubject from "./Components/SelectSubject";
import TopPlayers from "./Components/TopPlayers";
import Profile from "./Components/Profile";

function App() {
  const [page, setPage] = useState("login");
  const [subject, setSubject] = useState("");

  // Login success → go to select subject
  const handleLoginSuccess = () => setPage("select");

  // Start quiz
  const startQuiz = (sub) => {
    setSubject(sub);
    setPage("quiz");
  };

  // Back to subject select
  const goBackToSubjects = () => setPage("select");

  // After React quiz → go to TopPlayers
  const goToTopPlayers = () => setPage("topplayers");

  // Go to user profile
  const goToProfile = () => setPage("profile");

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

      {page === "select" && (
        <SelectSubject
          startQuiz={startQuiz}
          goToProfile={goToProfile} // optional button in SelectSubject to view profile
        />
      )}

      {page === "quiz" && (
        <Quiz
          subject={subject}
          goBack={goBackToSubjects}
          goToFinal={goToTopPlayers} // called after React quiz
        />
      )}

      {page === "topplayers" && (
        <TopPlayers goBack={goBackToSubjects} />
      )}

      {page === "profile" && (
        <Profile goBack={goBackToSubjects} />
      )}
    </>
  );
}

export default App;
