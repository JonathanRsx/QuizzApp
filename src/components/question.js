// src/Components/Question.js
import React, { useEffect, useState } from "react";
import "./Questions.css";
import { ReactComponent as IconRight } from "./Right.svg";
import { ReactComponent as IconWrong } from "./Wrong.svg";

function Question({ questions, onStartQuiz }) {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    setChoices([
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ]);
  }, [currentQuestion]);

  const handleSelectQuestion = (event) => {
    setAnswer(event.target.textContent);
    const listElements = document.querySelectorAll("li");
    listElements.forEach((element) => {
      if (element.textContent === event.target.textContent) {
        element.className = "selected";
      } else {
        element.className = "";
      }
    });
  };

  const handleCheckQuestion = (event) => {
    setIsAnswered(true);
    const listElements = document.querySelectorAll("li");
    listElements.forEach((element) => {
      if (element.textContent === currentQuestion.correct_answer) {
        element.className = "right";
        element.querySelector(".IconRigth").style.display = "flex";
      } else if (element.textContent === answer) {
        element.className = "wrong";
        element.querySelector(".IconWrong").style.display = "flex";
      } else if (answer === currentQuestion.correct_answer) {
        setScore(score + 1);
      }
    });
  };

  const handleChangeQuestion = (event) => {
    setLoading(true);
    setAnswer("");
    if (questionIndex + 1 < questions.length) {
      setCurrentQuestion(questions[questionIndex + 1]);
      setChoices([
        ...questions[questionIndex + 1].incorrect_answers,
        questions[questionIndex + 1].correct_answer,
      ]);

      const listElements = document.querySelectorAll("li");
      listElements.forEach((element) => {
        element.className = "";
        element.querySelector(".IconRigth").style.display = "none";
        element.querySelector(".IconWrong").style.display = "none";
      });
    }
    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    setLoading(false);
  };

  if (!loading) {
    if (questionIndex === questions.length) {
      return (
        <div className="questionMainCon">
          <p>Your Score is </p>
          <div className="conScore">
            <h1 class="score">{score}</h1>
          </div>
          <p>out of {questions.length} questions </p>
          <button onClick={onStartQuiz} className="btn">
            Home Screen
          </button>
        </div>
      );
    } else {
      return (
        <div className="questionMainCon">
          <div className="headerQuestion">
            <span onClick={onStartQuiz}>&#x2715;</span>
            <p>Question {questionIndex + 1}</p>
            <div className="progressBarBG">
              <div
                className="progressBarValue"
                style={{
                  width: ((questionIndex + 1) / questions.length) * 100 + "px",
                }}
              ></div>
            </div>
          </div>

          <div className="conQuestion">
            <p>{decodeHTML(currentQuestion.question)}</p>
            <ul>
              {(currentQuestion.type === "multiple"
                ? choices.sort()
                : choices.sort().reverse()
              ).map((option, i) => (
                <li
                  key={i}
                  onClick={isAnswered ? () => {} : handleSelectQuestion}
                >
                  <IconRight className="IconRigth" />
                  <IconWrong className="IconWrong" />
                  {decodeHTML(option)}
                </li>
              ))}
            </ul>
          </div>
          {!isAnswered && (
            <button
              onClick={answer === "" ? () => {} : handleCheckQuestion}
              className="btn"
            >
              Check
            </button>
          )}
          {isAnswered && (
            <button onClick={handleChangeQuestion} className="btn">
              {" "}
              {questionIndex + 1 === questions.length
                ? "View Score"
                : "Next Question"}
            </button>
          )}
        </div>
      );
    }
  } else {
    return <p>Loading...</p>;
  }
}
export default Question;
