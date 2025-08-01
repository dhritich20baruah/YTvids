import React, { useContext, useState } from "react";
import Timer from "../components/Timer";
import { Questionset } from "../components/Questionset";
import { useRouter } from "next/router";
import { ScoreStateContext } from "../components/Context";
import Image from "next/image";
import profilePic from "../public/profilepic.png";

const Questions = () => {
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState("");
  const [notvisitedCount, setnotvisitedCount] = useState(90);
  const [notansweredCount, setnotansweredCount] = useState(0);
  const [answeredCount, setansweredCount] = useState(0);
  const [reviewCount, setreviewCount] = useState(0);
  const [ansNreviewCount, setansNreviewCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const { score, setScore } = useContext(ScoreStateContext);
  const [screenValue, setScreenValue] = useState("");

  const router = useRouter();

  const handleChange = (event) => {
    setOption(event.target.value);
  };
  //CLEAR BUTTON
  const resetOption = () => {
    setOption("");
    Questionset[index].response = option;
    if (Questionset[index].status != "notanswered") {
      setnotansweredCount(notansweredCount + 1);
    }
    if (Questionset[index].status == "answered") {
      setansweredCount(answeredCount - 1);
    }
    if (Questionset[index].status == "notvisited") {
      setnotvisitedCount(notvisitedCount - 1);
    }
    if (Questionset[index].status == "review") {
      setreviewCount(reviewCount - 1);
    }
    if (Questionset[index].status == "ansNreview") {
      setansNreviewCount(ansNreviewCount - 1);
    }
    if (Questionset[index].result == "Correct") {
      setScore(score - 1);
    }
    if (Questionset[index].result == "Incorrect") {
      setScore(score + 1);
    }
    Questionset[index].result = "";
    Questionset[index].status = "notanswered";
  };

  //Evaluation
  function evaluate() {
    if(Questionset[index].section == "1"){
      if (Questionset[index].answer == option) {
        setScore(score + 4);
        Questionset[index].result = "Correct";
      } else {
        setScore(score - 1);
        Questionset[index].result = "Incorrect";
      }
    }
    else if(Questionset[index].section == "2"){
       if (Questionset[index].answer == screenValue) {
        setScore(score + 4);
        Questionset[index].result = "Correct";
      } else {
        setScore(score - 1);
        Questionset[index].result = "Incorrect";
      }
    }
  }

  //Keypad
  const handleClick = (value) => {
    if (value === "C") {
      setScreenValue("");
    } else {
      setScreenValue((prev) => prev + value);
    }
  };

  const buttons = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "C"],
  ];

  //save and next button
  const nextQuestion = () => {
    Questionset[index].response = option || screenValue;
    if (option != "" || screenValue != "") {
      if (Questionset[index].status != "answered") {
        setansweredCount(answeredCount + 1);
      }
      if (Questionset[index].status == "notanswered") {
        setnotansweredCount(notansweredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "review") {
        setreviewCount(reviewCount - 1);
      }
      if (Questionset[index].status == "ansNreview") {
        setansNreviewCount(ansNreviewCount - 1);
      }
      evaluate();
      Questionset[index].status = "answered";
    } else {
      if (Questionset[index].status != "notanswered") {
        setnotansweredCount(notansweredCount + 1);
      }
      if (Questionset[index].status == "answered") {
        setansweredCount(answeredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "review") {
        setreviewCount(reviewCount - 1);
      }
      if (Questionset[index].status == "ansNreview") {
        setansNreviewCount(ansNreviewCount - 1);
      }
      Questionset[index].status = "notanswered";
    }
    setIndex(index + 1);
    setOption("");
    setScreenValue("")
  };

  //Mark and review
  const marknReview = () => {
    Questionset[index].response = option || screenValue;
    if (option != "" || screenValue != "") {
      if (Questionset[index].status != "ansNreview") {
        setansNreviewCount(ansNreviewCount + 1);
      }
      if (Questionset[index].status == "answered") {
        setansweredCount(answeredCount - 1);
      }
      if (Questionset[index].status == "notanswered") {
        setnotansweredCount(notansweredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "review") {
        setreviewCount(reviewCount - 1);
      }
      evaluate();
      Questionset[index].status = "ansNreview";
    } else {
      if (Questionset[index].status != "review") {
        setreviewCount(reviewCount + 1);
      }
      if (Questionset[index].status == "notanswered") {
        setnotansweredCount(notansweredCount - 1);
      }
      if (Questionset[index].status == "answered") {
        setansweredCount(answeredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "ansNreview") {
        setansNreviewCount(ansNreviewCount - 1);
      }
      Questionset[index].status = "review";
    }
    setIndex(index + 1);
    setOption("");
    setScreenValue("")
  };

  //visibility
  function display() {
    setVisible((visible) => !visible);
  }

  //Redirect to scorecard
  function showScore() {
    router.replace("/Scorecard");
  }

  //Last question
  function last() {
    Questionset[index].response = option || screenValue;
    if (option != "") {
      if (Questionset[index].status != "answered") {
        setansweredCount(answeredCount + 1);
      }
      if (Questionset[index].status == "notanswered") {
        setnotansweredCount(notansweredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "review") {
        setreviewCount(reviewCount - 1);
      }
      if (Questionset[index].status == "ansNreview") {
        setansNreviewCount(ansNreviewCount - 1);
      }
      Questionset[index].status = "answered";
    } else {
      if (Questionset[index].status != "notanswered") {
        setnotansweredCount(notansweredCount + 1);
      }
      if (Questionset[index].status == "answered") {
        setansweredCount(answeredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "review") {
        setreviewCount(reviewCount - 1);
      }
      if (Questionset[index].status == "ansNreview") {
        setansNreviewCount(ansNreviewCount - 1);
      }
      Questionset[index].status = "notanswered";
    }
    setOption("");
    evaluate();
    display();
  }

  //Last question review
  const lastReview = () => {
    Questionset[index].response = option || screenValue;
    if (option != "") {
      if (Questionset[index].status != "ansNreview") {
        setansNreviewCount(ansNreviewCount + 1);
      }
      if (Questionset[index].status == "answered") {
        setansweredCount(answeredCount - 1);
      }
      if (Questionset[index].status == "notanswered") {
        setnotansweredCount(notansweredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "review") {
        setreviewCount(reviewCount - 1);
      }
      Questionset[index].status = "ansNreview";
    } else {
      if (Questionset[index].status != "review") {
        setreviewCount(reviewCount + 1);
      }
      if (Questionset[index].status == "notanswered") {
        setnotansweredCount(notansweredCount - 1);
      }
      if (Questionset[index].status == "answered") {
        setansweredCount(answeredCount - 1);
      }
      if (Questionset[index].status == "notvisited") {
        setnotvisitedCount(notvisitedCount - 1);
      }
      if (Questionset[index].status == "ansNreview") {
        setansNreviewCount(ansNreviewCount - 1);
      }
      Questionset[index].status = "review";
    }
    setOption("");
    evaluate();
    display();
  };

  const handleTimerEnd = () => {
    console.log("Timer ended!");
    // Perform actions when the timer reaches zero
  };

  return (
    <>
      <div className="questions-head bg-blue-200 flex flex-row">
        <div className="profileinfo text-xl flex flex-row">
          <div className="profilepic mx-5">
            <Image src={profilePic} alt="profilepic" width={80} height={80} />
          </div>
          <div className="p-2">
            <p>
              Candidate Name:{" "}
              <span className="head-info text-red-600 ml-3">Your Name</span>
            </p>
            <p>
              Roll No.:
              <span className="head-info text-red-600 ml-3">23045-B890 </span>
            </p>
            <p>
              Exam Name:
              <span className="head-info text-red-600 ml-3">
                JEE Main Shift 1
              </span>
            </p>
            <p className="flex flex-row">
              Remaining Time:
              <span className="head-info ml-3 px-1 rounded-lg bg-blue-700 text-white">
                <Timer />{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="questions-body flex md:flex-row flex-col relative">
        <div className="left-panel md:h-[88vh] md:w-3/4 w-full h-fit">
          <div className="qAndAns mx-10 my-4 overflow-auto md:h-[65vh] h-fit">
            <p className="direction  bg-red-500 text-white w-24 font-bold p-1">
              <span className="font-bold text-lg mr-2">Q. No.:</span>
              {Questionset[index].Number}
            </p>
            <p className="direction">
              <span className="font-bold text-lg mr-2">Question:</span>
            </p>
            <p className="Statement text-justify m-3">
              {/* <Image src={Questionset[index].question} alt="question" height={500} width={500} className="w-[50%] h-auto"/> */}
              <img
                src={Questionset[index].question}
                alt="question"
                className="md:w-3/4 h-auto w-full"
              />
            </p>
            {Questionset[index].section == "1" ? (
              <div>
                <p className="font-bold text-lg my-5">Options</p>
                <div className=" flex flex-row justify-evenly space-x-2 space-y-2 mb-5">
                  <p></p>
                  <label
                    htmlFor="option"
                    className="p-3 h-auto hover:cursor-pointer hover:text-red-700 text-2xl"
                  >
                    <input
                      type="radio"
                      name="option"
                      id="option1"
                      value="1"
                      checked={option == "1"}
                      onChange={handleChange}
                    />{" "}
                    1
                  </label>
                  <label
                    htmlFor="option"
                    className="p-3 h-auto hover:cursor-pointer hover:text-red-700 text-2xl"
                  >
                    <input
                      type="radio"
                      name="option"
                      id="option2"
                      value="2"
                      checked={option == "2"}
                      onChange={handleChange}
                    />{" "}
                    2
                  </label>
                  <label
                    htmlFor="option"
                    className="p-3 h-auto hover:cursor-pointer hover:text-red-700 text-2xl"
                  >
                    <input
                      type="radio"
                      name="option"
                      id="option3"
                      value="3"
                      checked={option == "3"}
                      onChange={handleChange}
                    />{" "}
                    3
                  </label>
                  <label
                    htmlFor="option"
                    className="p-3 h-auto hover:cursor-pointer hover:text-red-700 text-2xl"
                  >
                    <input
                      type="radio"
                      name="option"
                      id="option4"
                      value="4"
                      checked={option == "4"}
                      onChange={handleChange}
                    />{" "}
                    4
                  </label>
                </div>
              </div>
            ) : (
              <div id="input-response" className="block">
                {" "}
                {/* Remove 'hide' if you want it visible */}
                <div id="input-field" className="mb-4 flex justify-center">
                  <input
                    type="text"
                    placeholder="Enter your value"
                    id="input-value"
                    value={screenValue}
                    readOnly
                    className="border p-2 rounded mx-auto border-black"
                  />
                </div>
                <div id="key-pad">
                  <table className="mx-auto">
                    <tbody>
                      {buttons.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((btn, colIndex) => (
                            <td key={colIndex}>
                              <button
                                onClick={() => handleClick(btn)}
                                className="num-pad-btn border m-1 p-3 rounded bg-gray-200 hover:bg-red-500 hover:text-white"
                              >
                                {btn}
                              </button>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <hr />
          <div className="response-buttons flex flex-row justify-between md:mx-10 mx-3 my-4 md:w-[80%] w-fit">
            <div>
              <button
                className="p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer"
                onClick={resetOption}
                type="reset"
              >
                CLEAR
              </button>
              {index == Questionset.length - 1 ? (
                <button
                  className="p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer"
                  onClick={lastReview}
                >
                  MARK FOR REVIEW
                </button>
              ) : (
                <button
                  className="p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer"
                  onClick={marknReview}
                >
                  MARK FOR REVIEW
                </button>
              )}
            </div>
            <div className="text-lg">
              <p>
                Your response:{" "}
                <span className="font-bold text-red-600">
                 {option}
                </span>
              </p>
            </div>
            <div>
              {index == Questionset.length - 1 ? (
                <button
                  className="p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer"
                  onClick={last}
                >
                  SAVE & NEXT
                </button>
              ) : (
                <button
                  className="p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer"
                  onClick={nextQuestion}
                >
                  SAVE & NEXT
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="right-panel bg-orange-200 md:h-[88vh] md:w-1/4 w-full h-auto">
          <div className="Number-board flex flex-row flex-wrap p-3">
            <div className="flex flex-row">
              <div className="notvisited">{notvisitedCount}</div>Not visited
            </div>
            <div className="flex flex-row">
              <div className="notanswered">{notansweredCount}</div>Not answered
            </div>
            <div className="flex flex-row">
              <div className="answered">{answeredCount}</div>
              Answered
            </div>
            <div className="flex flex-row">
              <div className="review">{reviewCount}</div>Marked for review
            </div>
            <div className="flex flex-row">
              <div className="ansNreview">{ansNreviewCount}</div>
              Answered and Marked for Review <br /> (will be considered for
              evaluation)
            </div>
          </div>
          <div className="question-palette">
            <h3 className="font-bold p-3 w-[100%] bg-blue-200">
              Navigate to Q. No.:
            </h3>
            <div className="overflow-auto w-[80%] h-[45vh] mx-6">
              <ul className="flex flex-row flex-wrap hover:cursor-pointer">
                {Questionset.map((item) => {
                  return (
                    <li
                      className={item.status}
                      key={item.Number}
                      onClick={() => {
                        setIndex(item.Number - 1);
                      }}
                    >
                      {" "}
                      {item.Number}{" "}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              className="bg-green-500 text-white p-2 font-bold hover:bg-green-900 my-4 mx-8"
              onClick={display}
            >
              SUBMIT
            </button>
          </div>
        </div>
        {visible && (
          <div className="absolute w-[50%] h-[50%] bg-blue-600 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-bold text-center">
            <p className="text-4xl mt-24">Are you sure you want to submit?</p>
            <div className="flex flex-row justify-center align-middle mt-8 text-2xl">
              <button
                className="bg-green-600 w-24 text-center m-10 p-2 hover:cursor-pointer hover:bg-green-800"
                onClick={showScore}
              >
                Yes
              </button>
              <button
                className="bg-red-600 w-24 text-center m-10 p-2 hover:cursor-pointer hover:bg-red-800"
                onClick={display}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Questions;
