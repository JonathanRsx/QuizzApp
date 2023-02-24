import Settings from "./components/settings";
import Question from "./components/question";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [showSettings, setShowSettings] = useState(true);
  // const [settingsValue, setSettingsValue] = useState(null);

  const [questions, setQuestions] = useState([]);

  const handleStartQuiz = (questions) => {
    setQuestions(questions);
    setShowSettings(!showSettings);
  };

  return (
    <div className="App">
      {showSettings ? (
        <Settings onStartQuiz={handleStartQuiz} />
      ) : (
        <Question questions={questions} onStartQuiz={handleStartQuiz} />
      )}
    </div>
  );
};

export default App;
