import React, { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Forget from "./Components/Forget";
import Quiz from "./Components/Quiz";
import SelectSubject from "./Components/SelectSubject";
import TopPlayers from "./Components/TopPlayers";
import Profile from "./Components/Profile";
import AdminPanel from "./Components/AdminPanel";

function App() {
  const [page, setPage] = useState("login");
  const [subject, setSubject] = useState("");

  
 const handleLoginSuccess = (role) => {
  if (role === "admin") {
    setPage("admin");   // go to admin panel
  } else {
    setPage("select");  // normal user
  }
};

  
  const startQuiz = (sub) => {
    setSubject(sub);
    setPage("quiz");
  };

  
  const goBackToSubjects = () => setPage("select");

 

  
  const goToTopPlayers = () => setPage("topplayers");

  
  const goToProfile = () => setPage("profile");

  
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
          goToProfile={goToProfile}
        />
      )}

      {page === "quiz" && (
        <Quiz
          subject={subject}
          goBack={goBackToSubjects}
          goToFinal={goToTopPlayers} 
        />
      )}

      {page === "topplayers" && (
        <TopPlayers goBack={goBackToSubjects} />
      )}

      {page === "profile" && (
        <Profile goBack={goBackToSubjects} />
      )}
       {page === "admin" && <AdminPanel />}
    </>
  );
}

export default App;
