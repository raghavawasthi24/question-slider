import React from 'react'

export default function App() {
    const [currQues, setCurrQues] = useState(1);
    const [isSmallScreen, setSmallScreen] = useState(
      window.matchMedia("(max-width: 768px)").matches
    );

    const navigate = useNavigate();

    const handleNavigationClick = () => {
      navigate("/");
    };

    useEffect(() => {
      const handleScreenSizeChange = (e) => setSmallScreen(e.matches);
      const mediaQueryList = window.matchMedia("(max-width: 768px)");

      mediaQueryList.addEventListener("change", handleScreenSizeChange);

      return () => {
        mediaQueryList.removeEventListener("change", handleScreenSizeChange);
      };
    }, []);

    const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
    const [progressBars, setProgressBars] = useState([
      { name: "STRATEGY", score: 400 / customQuestions.length, key: 1 },
      { name: "UNDERSTANDING", score: 0, key: 2 },
      { name: "APPLICATION", score: 0, key: 3 },
      { name: "DIRECTION", score: 0, key: 4 },
    ]);

  
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
       
      
      </div>
    </section>
  );
}
