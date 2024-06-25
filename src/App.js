import React, { useEffect, useState } from "react";
import "./App.css";
import { customQuestions } from "./questions";

export default function App() {
  
  const [currQues, setCurrQues] = useState(1);
  const [val, setVal] = useState(false);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [progressBars, setProgressBars] = useState([
    { name: "STRATEGY", score: 400 / customQuestions.length, key: 1 },
    { name: "UNDERSTANDING", score: 0, key: 2 },
    { name: "APPLICATION", score: 0, key: 3 },
    { name: "DIRECTION", score: 0, key: 4 },
  ]);


  const [isSmallScreen, setSmallScreen] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const handleScreenSizeChange = (e) => setSmallScreen(e.matches);
    const mediaQueryList = window.matchMedia("(max-width: 768px)");

    mediaQueryList.addEventListener("change", handleScreenSizeChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);


  const [sliderValue, setSliderValue] = useState("0");
  const [responseRecords, setResponseRecords] = useState([]);

  function handleQuestionNavigation(direction) {
    let matchingRecord = checkMatchingRecord(currentQuestionNum);

    if (
      direction === "forward" &&
      currentQuestionNum !== 12 &&
      matchingRecord.length > 0
    ) {
      let nextQuestionRecord = checkMatchingRecord(currentQuestionNum + 1);

      if (nextQuestionRecord.length > 0) {
        setSliderValue(nextQuestionRecord[0].sliderValue);
      } else {
        setSliderValue("0");
      }

      handleProgressBarUpdate("Increase");
      setCurrentQuestionNum((prev) => prev + 1);
    } else if (direction === "back" && currentQuestionNum !== 1) {
      let previousQuestionRecord = checkMatchingRecord(currentQuestionNum - 1);
      setSliderValue(previousQuestionRecord[0].sliderValue);
      handleProgressBarUpdate("Decrease");
      setCurrentQuestionNum((prev) => prev - 1);
    } else if (direction === "back" && currentQuestionNum === 1) {
    }
  }

  function handleSliderChange(event) {
    if (responseRecords.length === 0) {
      setResponseRecords([
        { ques: currentQuestionNum, sliderValue: event.target.value },
      ]);
    } else {
      let matchingRecord = checkMatchingRecord(currentQuestionNum);

      if (matchingRecord.length > 0) {
        setResponseRecords((prev) =>
          prev.map((element) =>
            element.ques === currentQuestionNum
              ? { ...element, sliderValue: event.target.value }
              : { ...element }
          )
        );
      } else {
        setResponseRecords((prev) => [
          ...prev,
          { ques: currentQuestionNum, sliderValue: event.target.value },
        ]);
      }
    }

    setSliderValue(event.target.value);
    setTimeout(() => {
      setSliderValue("0");
    }, 250);

    if (currentQuestionNum !== 12) {
      handleProgressBarUpdate("Increase");
      setCurrentQuestionNum((prev) => prev + 1);
    }
  }

  function checkMatchingRecord(num) {
    return responseRecords.filter((element) => num === element.ques);
  }

  let currentQuestionStatement = customQuestions.filter(
    (element) => currentQuestionNum === element.num
  );

  

  useEffect(() => {
    if (val) {
      let quesNo = Math.ceil(currQues / 3);
      console.log(quesNo, "quesNo", currQues, progressBars);

      setProgressBars((prev) =>
        prev.map((element) =>
          element.key <= quesNo
            ? {
                ...element,
                score: element.score + 400 / customQuestions.length,
              }
            : { ...element }
        )
      );
    } else {
      setVal(true);
    }
  }, [currQues]);

  function handleProgressBarUpdate(state) {
    console.log("currQues", currQues);
    setCurrQues((prev) => prev + 1);
  }
  return (
    <section className="CustomQuestionnaire">
      <div className="QuestionnaireContainer">
        <div className="ProgressBars">
          {progressBars.map((element) => (
            <div
              style={{
                display: `${
                  isSmallScreen && element.name !== "STRATEGY" ? "none" : "flex"
                }`,
              }}
              key={element.key}
              className="ProgressBarWrapper"
            >
              <progress
                id={element.name}
                max="100"
                value={element.score}
              ></progress>
              <label
                style={{
                  color: `${
                    element.name === "STRATEGY" ? "rgb(110, 12, 249)" : "black"
                  }`,
                  marginTop: "12px",
                }}
                htmlFor={element.name}
              >
                {element.name}
              </label>
            </div>
          ))}
        </div>
        <div className="QuestionNumber">
          <p>{currentQuestionNum} / 12</p>
        </div>
        <p className="QuestionStatement">
          {currentQuestionStatement[0].Statement}
        </p>
        <div className="SliderWrapper">
          <input
            id="Slider"
            step={25}
            value={sliderValue}
            type="range"
            list="sliderOptions"
            onChange={handleSliderChange}
          />
          <datalist id="sliderOptions">
            <option value="0" label="Strongly Disagree"></option>
            <option value="25" label="Disagree"></option>
            <option value="50" label="Neutral"></option>
            <option value="75" label="Agree"></option>
            <option value="100" label="Strongly Agree"></option>
          </datalist>
        </div>
        <div className="NavigationButtons">
          {currentQuestionNum != 1 ? (
            <div
              onClick={() => {
                handleQuestionNavigation("back");
              }}
              className="ButtonWrapper"
            >
              <p>PREV</p>
            </div>
          ) : (
            <div></div>
          )}

          {currentQuestionNum > 0 && currentQuestionNum !== 12 && (
            <div
              onClick={() => {
                handleQuestionNavigation("forward");
              }}
              className="ButtonWrapper"
            >
              <p style={{ borderBottom: "1px solid rgb(110, 12, 249)" }}>
                NEXT
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
