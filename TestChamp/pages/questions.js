import React, { useContext, useState } from "react";
import Timer from "../components/Timer";
import { Questionset } from "../components/Questionset";
import { useRouter } from "next/router";
import { ScoreStateContext } from "../components/Context";
import Image from "next/image";
import profilePic from "../public/profilepic.png";
import CountdownTimer from "../components/CountdownTimer";

const Questions = () => {
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState("");
  const [notvisitedCount, setnotvisitedCount] = useState(30);
  const [notansweredCount, setnotansweredCount] = useState(0);
  const [answeredCount, setansweredCount] = useState(0);
  const [reviewCount, setreviewCount] = useState(0);
  const [ansNreviewCount, setansNreviewCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const { score, setScore } = useContext(ScoreStateContext);

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
    if (Questionset[index].answer == option) {
      setScore(score + 1);
      Questionset[index].result = "Correct";
    } else {
      setScore(score - 0.25);
      Questionset[index].result = "Incorrect";
    }
  }

  //save and next button
  const nextQuestion = () => {
    Questionset[index].response = option;
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
  };

  //Mark and review
  const marknReview = () => {
    Questionset[index].response = option;
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
    Questionset[index].response = option;
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
    Questionset[index].response = option;
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
            <span className="head-info text-red-600 ml-3">JEE Main Shift 1</span>
            </p>
            <p className="flex flex-row">
            Remaining Time:
            <span className="head-info ml-3 px-1 rounded-lg bg-blue-700 text-white"><Timer/> </span>
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
            <img src={Questionset[index].question} alt="question" className="md:w-3/4 h-auto w-full"/>
            </p>
            <p className="font-bold text-lg my-5">Options</p>
            <div className=" flex flex-row justify-evenly space-x-2 space-y-2 mb-5">
              <p></p>
              <label
                htmlFor="option"
                className="shadow-lg shadow-black rounded p-5 h-auto hover:cursor-pointer hover:shadow-red-500"
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
                className="shadow-lg shadow-black rounded p-5 h-auto hover:cursor-pointer hover:shadow-red-500"
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
                className="shadow-lg shadow-black rounded p-5 h-auto hover:cursor-pointer hover:shadow-red-500"
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
                className="shadow-lg shadow-black rounded p-5 h-auto hover:cursor-pointer hover:shadow-red-500"
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
                  {Questionset[index].response}{" "}{option}
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
              Section:{" "}
              <span className="text-red-500">{Questionset[index].section}</span>{" "}
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
