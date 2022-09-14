import Link from "next/link";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Jeeinstructions() {
    const [visible, setVisible] = useState(false)
    const router = useRouter()
    const ref = useRef(null)
    const handleClick = () => {
        if (ref.current.checked) {
            router.replace('/questions')
        } else {
            setVisible(visible => !visible)
        }
    }
    return (
        <>
            <div className="m-10 text-lg relative">
                <div className="title2">
                    <h2 className="text-center text-xl font-bold">
                        Please read the instructions carefully
                    </h2>
                </div>
                <h2 className="title3 font-semibold underline">General Instructions</h2>
                <ol className="">
                    <li>1.Total duration of JEE-Main - 40503627_BTECH 9th Jan 2020 Shift 2 is 180 min.</li>
                    <li>2. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                    <li id="symbols" >3. The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                        <ol className="mx-3">
                            <li className="flex m-2"> <div className="notvisited text-center border-2 border-slate-500 bg-slate-100 w-7 h-7 mx-2 rounded" id="notvisitedCount">1</div> You have not visited the question yet.</li>
                            <li className="flex m-2"> <div className="notanswered text-center bg-red-600 text-white w-7 h-7 mx-2 rounded" id="notansweredCount">2</div>You have not answered the question.</li>
                            <li className="flex m-2"> <div className="answered text-center bg-green-600 text-white w-7 h-7 mx-2 rounded" id="answeredCount">3</div>You have answered the question.</li>
                            <li className="flex m-2"> <div className="review text-center bg-indigo-800 text-white w-7 h-7 mx-2 rounded-full" id="reviewCount">4</div> You have NOT answered the question, but have marked the question for review.</li>
                            <li className="flex m-2"> <div className="ansNreview text-center bg-blue-500 text-white w-7 h-7 mx-2 rounded-full" id="ansNreviewCount">5</div> The question(s) &quot;Answered and Marked for Review&quot; will be considered for evalution.</li>
                        </ol>
                    </li>
                    <li>4. You can click on the &quot;&gt;&quot; arrow which apperes to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on &quot;&lt;&quot; which appears on the right side of question window.</li>
                    <li>5. You can click on your &quot;Profile&quot; img on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile img you will get a drop-down to change the question content to the desired language.</li>
                    <li>6. You can click on <span className="arrow"><i className="fa fa-arrow-circle-down arrow"></i></span> to navigate to the bottom and <span className="arrow"><i className="fa fa-arrow-circle-up arrow"></i></span>   to navigate to top of the question are, without scrolling.</li>
                </ol>
                <h2 className="title3 font-semibold underline">Navigation to Question</h2>
                <ol start={7}>
                    <li>
                        7. To answer a question, do the following
                        <ol type='a' className="mx-3">
                            <li>a. Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.</li>
                            <li>b. Click on Save &amp; Next to save your answer for the current question and then go to the next question.</li>
                            <li>c. Click on Mark for Review &amp; Next to save your answer for the current question, mark it for review, and then go to the next question.</li>
                        </ol>
                    </li>
                </ol>
                <h2 className="title3 font-semibold underline">Answering a Question:</h2>
                <ol start={8}>
                    <li>8. Procedure for answering a multiple choice type question:
                        <ol type='a' className="mx-3">
                            <li>a. To select you answer, click on the button of one of the options.</li>
                            <li>b. To deselect your chosen answer, click on the button of the chosen option again or click on the Clear Response button</li>
                            <li>c. To change your chosen answer, click on the button of another option</li>
                            <li>d. To save your answer, you MUST click on the Save &amp; Next button.</li>
                            <li>e. To mark the question for review, click on the Mark for Review &amp; Next button.</li>
                        </ol>
                    </li>
                    <li>9. To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.</li>
                </ol>
                <h2 className="title3 font-semibold underline">Navigating through sections:</h2>
                <ol start={10}>
                    <li>10. Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by click on the section name. The section you are currently viewing is highlighted.</li>
                    <li>11. After click the Save &amp; Next button on the last question for a section, you will automatically be taken to the first question of the next section.</li>
                    <li>12. You can shuffle between sections and questions anything during the examination as per your convenience only during the time stipulated.</li>
                    <li>13. Candidate can view the corresponding section summery as part of the legend that appears in every section above the question palette.</li>
                </ol>
                <hr />
                <p className="my-4">Please note all questions will appear in your default language. This language can be changed for a particular question later on.</p>
                <hr />
                <label htmlFor="confirm">
                <p className="my-4">
                    <input type="checkbox" id="confirm" className="mx-3" ref={ref} />
                    I have read and understood the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, bluetooth devices etc. /any prohibited material with me into the Examination Hall.I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include ban from future Tests / Examinations.
                </p>
                </label>
                <hr />
                <div className="btndiv flex justify-center">

                    <button className="btn w-72 h-10 bg-blue-500 text-white my-3 hover:cursor-pointer hover:bg-red-700" id="proceed" onClick={handleClick}>START</button>

                </div>
                <div className="fixed top-1/2 left-[40%] h-72 w-72">
                    {visible && 
                    <div className="bg-yellow-300 text-center h-72 w-80 flex flex-col justify-center p-5">
                        <h1 className='text-xl font-bold'>Warning!</h1>
                        <h3>Please accept the terms and conditions before proceeding.</h3>
                        <button className='bg-red-500 text-white w-15 hover:bg-orange-400' onClick={handleClick}>OK</button>
                    </div>
                }
                </div>
            </div>
        </>
    )
}