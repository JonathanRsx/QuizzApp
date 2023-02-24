import React, { useEffect, useState } from "react";
import "./Settings.css";

function Settings({ onStartQuiz }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(null);
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [questionType, setQuestionType] = useState("");

  useEffect(() => {
    const apiUrl = `https://opentdb.com/api_category.php`;
    setLoading(true);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setOptions(response.trivia_categories);
      });
  }, [setOptions]);

  const handleCategoryChange = (event) => {
    setQuestionCategory(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setQuestionDifficulty(event.target.value);
  };

  const handleTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleAmountChange = (event) => {
    setNumberOfQuestions(event.target.value);
  };

  const handleStartQuiz = async () => {
    setLoading(true);

    const apiUrl = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${questionCategory}&difficulty=${questionDifficulty}&type=${questionType}`;
    await fetch(apiUrl)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        onStartQuiz(response.results);
      });
  };

  if (loading) {
    return (
      <div className="conSettingsMain">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="conSettingsMain">
      <h1>Quiz App</h1>
      <div className="conSettingsCategory">
        <p>Select Category:</p>
        <select value={questionCategory} onChange={handleCategoryChange}>
          <option>All</option>
          {options &&
            options.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
        </select>
      </div>
      <div className="conSettingsCategory">
        <p>Select Difficulty:</p>
        <select value={questionDifficulty} onChange={handleDifficultyChange}>
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="conSettingsCategory">
        <p>Select Question Type:</p>
        <select value={questionType} onChange={handleTypeChange}>
          <option value="" key="type-0">
            All
          </option>
          <option value="multiple" key="type-1">
            Multiple Choice
          </option>
          <option value="boolean" key="type-2">
            True/False
          </option>
        </select>
      </div>
      <div className="conSettingsCategory">
        <p>Amount of Questions:</p>
        <input
          type="text"
          value={numberOfQuestions}
          onChange={handleAmountChange}
        />
      </div>
      <div className="conSettingsCategory">
        <button onClick={handleStartQuiz} className="btn">
          Start Quizz
        </button>
      </div>
    </div>
  );
}

export default Settings;
