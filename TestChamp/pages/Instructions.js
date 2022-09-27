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
                    <li>1. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.</li>
                    <li id="symbols" >2. The Questions Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
                        <ol className="mx-3">
                            <li className="flex m-2"> <div className="notvisited text-center border-2 border-slate-500 bg-slate-100 w-7 h-7 mx-2 rounded" id="notvisitedCount">1</div> You have not visited the question yet.</li>
                            <li className="flex m-2"> <div className="notanswered text-center bg-red-600 text-white w-7 h-7 mx-2 rounded" id="notansweredCount">2</div>You have not answered the question.</li>
                            <li className="flex m-2"> <div className="answered text-center bg-green-600 text-white w-7 h-7 mx-2 rounded" id="answeredCount">3</div>You have answered the question.</li>
                            <li className="flex m-2"> <div className="review text-center bg-indigo-800 text-white w-7 h-7 mx-2 rounded-full" id="reviewCount">4</div> You have NOT answered the question, but have marked the question for review.</li>
                            <li className="flex m-2"> <div className="ansNreview text-center bg-blue-500 text-white w-7 h-7 mx-2 rounded-full" id="ansNreviewCount">5</div> The question(s) &quot;Answered and Marked for Review&quot; will be considered for evalution.</li>
                        </ol>
                    </li>
                    <li>3.The test consists of 30 questions, comprising the folowing sections:
                        <table className="mx-10 space-x-4">
                            <tr>
                                <th>Sr.No</th>
                                <th>Name of test</th>
                                <th>No. of Questions</th>
                                <th>Max Marks</th>
                                <th>Duration</th>
                            </tr>
                            <tr>
                                <td>i</td>
                                <td>English language</td>
                                <td>10</td>
                                <td>10</td>
                                <td>15 mins</td>
                            </tr>
                            <tr>
                                <td>ii</td>
                                <td>Quantitative analysis</td>
                                <td>10</td>
                                <td>10</td>
                                <td>15 mins</td>
                            </tr>
                            <tr>
                                <td>iii</td>
                                <td>Numerical analysis</td>
                                <td>10</td>
                                <td>10</td>
                                <td>15 mins</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Total</td>
                                <td>30</td>
                                <td>30</td>
                                <td>45 mins</td>
                            </tr>
                        </table>
                    </li>
                    <li>
                        4. Each question has five options out of which only one option will be
                        correct.
                    </li>
                    <li>5. Each section should be completed within the alloted time.</li>
                    <li>6. 1/4th of marks will be deducted for every wrong answer.</li>
                    <li>
                        7. No marks will be awarded or deducted for un-attempted question.
                    </li>
                </ol>
             
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