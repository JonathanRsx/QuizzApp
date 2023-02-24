// src/Components/Settings.js
import React, { useEffect, useState } from "react";

function Settings({ onStartQuiz }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(null);
  const [questionCategory, setQuestionCategory] = useState("");
  const [questionDifficulty, setQuestionDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);

  // useEffect hook
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

  // event that is called when an option is chosen
  const handleCategoryChange = (event) => {
    setQuestionCategory(event.target.value);
    console.log("Question Categrory", questionCategory);
  };

  const handleDifficultyChange = (event) => {
    setQuestionDifficulty(event.target.value);
  };

  const handleAmountChange = (event) => {
    setNumberOfQuestions(event.target.value);
    console.log("Number Of Questions:", numberOfQuestions);
  };

  if (!loading) {
    return (
      <div>
        <div>
          <h2>Select Category:</h2>
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
        <div>
          <h2>Select Difficulty:</h2>
          <select value={questionDifficulty} onChange={handleDifficultyChange}>
            <option value="" key="difficulty-0">
              All
            </option>
            <option value="easy" key="difficulty-1">
              Easy
            </option>
            <option value="medium" key="difficulty-2">
              Medium
            </option>
            <option value="hard" key="difficulty-3">
              Hard
            </option>
          </select>
        </div>
        <div>
          <h2>Amount of Questions:</h2>
          <input value={numberOfQuestions} onChange={handleAmountChange} />
        </div>
        <div>
          <button onClick={onStartQuiz}>Start Quizz</button>
        </div>
      </div>
    );
  } else {
    <p>Loading...</p>;
  }
}
export default Settings;
