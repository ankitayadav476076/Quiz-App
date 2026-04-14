import React, { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [view, setView] = useState("add"); // add | list

  const [subject, setSubject] = useState("html");
  const [question, setQuestion] = useState("");

  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const [correct, setCorrect] = useState("");

  const [questionsList, setQuestionsList] = useState(
    JSON.parse(localStorage.getItem("quizData")) || []
  );

  const handleAdd = () => {
    if (
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correct
    ) {
      alert("Please fill all fields");
      return;
    }

    const newQuestion = {
      subject,
      question,
      options: [option1, option2, option3, option4],
      correct,
    };

    const updatedList = [...questionsList, newQuestion];

    setQuestionsList(updatedList);
    localStorage.setItem("quizData", JSON.stringify(updatedList));

    // reset
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrect("");

    alert("Question Added ✅");
  };

  const handleDelete = (index) => {
    const updatedList = questionsList.filter((_, i) => i !== index);
    setQuestionsList(updatedList);
    localStorage.setItem("quizData", JSON.stringify(updatedList));
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin Panel 👩‍💻</h1>
        <p className="subtitle">Manage your quiz questions</p>

        {/* Toggle Buttons */}
        <div className="toggle-btns">
          <button
            className={view === "add" ? "active" : ""}
            onClick={() => setView("add")}
          >
            Add Question
          </button>

          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            View Questions
          </button>
        </div>

        {/* ADD FORM */}
        {view === "add" && (
          <>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
              <option value="react">React</option>
            </select>

            <input
              type="text"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <input
              type="text"
              placeholder="Option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />

            <input
              type="text"
              placeholder="Option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />

            <input
              type="text"
              placeholder="Option 3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />

            <input
              type="text"
              placeholder="Option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />

            <select
              value={correct}
              onChange={(e) => setCorrect(e.target.value)}
            >
              <option value="">Select Correct Answer</option>
              <option value={option1}>{option1 || "Option 1"}</option>
              <option value={option2}>{option2 || "Option 2"}</option>
              <option value={option3}>{option3 || "Option 3"}</option>
              <option value={option4}>{option4 || "Option 4"}</option>
            </select>

            <button onClick={handleAdd}>Add Question</button>
          </>
        )}

        {/* QUESTION LIST */}
        {view === "list" && (
          <div className="question-list">
            {questionsList.length === 0 ? (
              <p>No questions added yet</p>
            ) : (
              questionsList.map((q, index) => (
                <div key={index} className="question-item">
                  <p>📘 {q.subject.toUpperCase()}</p>
                  <p><strong>Q:</strong> {q.question}</p>

                  <ul>
                    {q.options.map((opt, i) => (
                      <li key={i}>
                        {opt} {opt === q.correct && "✅"}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;