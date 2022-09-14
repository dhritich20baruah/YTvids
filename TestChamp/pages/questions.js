import React, { useState } from 'react'
import Timer from '../components/Timer'
import { Questionset } from '../components/Questionset'
import Router, { useRouter } from 'next/router'
import { ScoreStateContext } from '../components/Context'


const Questions = () => {
    const [index, setIndex] = useState(0)
    const [option, setOption] = useState('')
    const [score, setScore] = useState(0)
    const [notvisitedCount, setnotvisitedCount] = useState(30)
    const [notansweredCount, setnotansweredCount] = useState(0)
    const [answeredCount, setansweredCount] = useState(0)
    const [reviewCount, setreviewCount] = useState(0)
    const [ansNreviewCount, setansNreviewCount] = useState(0)
    const [visible, setVisible] = useState(false)

    const router = useRouter()

    const handleChange = (event) => {
        setOption(event.target.value)
    }
    //CLEAR BUTTON
    const resetOption = () => {
        setOption('')
        Questionset[index].status = 'notanswered'
        if( Questionset[index].result == "Correct"){
            setScore(score - 1)
        }else{
            setScore(score + 1)
        }
    }
    //Evaluation
    function evaluate(){
        if(Questionset[index].answer == option){
            setScore(score + 1)
            Questionset[index].result = "Correct"
        }else{
            setScore(score - 1)
            Questionset[index].result = "Incorrect"
        }
    }

    //save and next button
    const nextQuestion = () => {
        Questionset[index].response = option
        if (option != "") {   
            if(Questionset[index].status != 'answered'){
                setansweredCount(answeredCount+1)
            }    
            if(Questionset[index].status == 'notanswered'){
                setnotansweredCount(notansweredCount-1)
            }
            if(Questionset[index].status == 'notvisited'){
                setnotvisitedCount(notvisitedCount-1)
            }         
            if(Questionset[index].status == 'review'){
                setreviewCount(reviewCount-1)
            }
            if(Questionset[index].status == 'ansNreview'){
                setansNreviewCount(ansNreviewCount-1)
            }
            evaluate()
            Questionset[index].status = 'answered'
        }
        else {
            if(Questionset[index].status != 'notanswered'){
                setnotansweredCount(notansweredCount+1)
            }    
            if(Questionset[index].status == 'answered'){
                setansweredCount(answeredCount-1)
            }
            if(Questionset[index].status == 'notvisited'){
                setnotvisitedCount(notvisitedCount-1)
            }         
            if(Questionset[index].status == 'review'){
                setreviewCount(reviewCount-1)
            }
            if(Questionset[index].status == 'ansNreview'){
                setansNreviewCount(ansNreviewCount-1)
            }
            Questionset[index].status = 'notanswered'
        }
        setIndex(index + 1)
        setOption('')
        console.log(Questionset)
    }

    //Mark and review
    const marknReview = () => {
        Questionset[index].response = option
        if (option != "") {
            if(Questionset[index].status != 'ansNreview'){
                setansNreviewCount(ansNreviewCount+1)
            }   
            if(Questionset[index].status == 'answered'){
                setansweredCount(answeredCount-1)
            }    
            if(Questionset[index].status == 'notanswered'){
                setnotansweredCount(notansweredCount-1)
            }
            if(Questionset[index].status == 'notvisited'){
                setnotvisitedCount(notvisitedCount-1)
            }         
            if(Questionset[index].status == 'review'){
                setreviewCount(reviewCount-1)
            }          
            evaluate()
            Questionset[index].status = 'ansNreview'
        }
        else {
            if(Questionset[index].status != 'review'){
                setreviewCount(reviewCount+1)
            }
            if(Questionset[index].status == 'notanswered'){
                setnotansweredCount(notansweredCount-1)
            }    
            if(Questionset[index].status == 'answered'){
                setansweredCount(answeredCount-1)
            }
            if(Questionset[index].status == 'notvisited'){
                setnotvisitedCount(notvisitedCount-1)
            }         
            if(Questionset[index].status == 'ansNreview'){
                setansNreviewCount(ansNreviewCount-1)
            }
            Questionset[index].status = 'review'
        }
        setIndex(index + 1)
        setOption('')
    }

    //visibility
    function display(){
        setVisible(visible => !visible)
    }

    //Redirect to scorecard
    function showScore(){
        router.replace('/Scorecard')
    }

    return (
        <>
            {/* <ScoreStateContext.Provider value={{score, setScore}}></ScoreStateContext.Provider> */}
    
            <div className="questions-head bg-slate-200 flex flex-row justify-between p-3">
                <div className='font-bold text-lg'>IBPS PO PRELIMS 2022</div>
                <div className='flex font-bold text-lg'>
                    Time remaining: <span id="timer" className='text-red-700 ml-3'><Timer /></span>
                </div>
                <div className="profileinfo text-xl">
                    <div className="profilepic">

                    </div>
                    <div>
                        Candidate Name: <span className="head-info text-red-600 ml-3">Your Name</span>
                        <br />
                        Roll No.:<span className="head-info text-red-600 ml-3">23045-B890 </span>
                    </div>
                </div>
            </div>
            <div className='questions-body flex relative'>
                <div className="left-panel h-[90vh] w-[75vw]">
                    <div className='section flex flex-row space-x-4 space-y-2'>
                        <p></p>
                        <p className='font-bold p-2'>Section:</p>
                        <button className='bg-indigo-700 p-2 text-white rounded hover:bg-slate-200 hover:text-indigo-800 hover:cursor-pointer'>English Language</button>
                        <button className='bg-indigo-700 p-2 text-white rounded hover:bg-slate-200 hover:text-indigo-800 hover:cursor-pointer'>Numerical Ability</button>
                        <button className='bg-indigo-700 p-2 text-white rounded hover:bg-slate-200 hover:text-indigo-800 hover:cursor-pointer'>Reasoning Ability</button>
                    </div>
                    <div className="qAndAns mx-10 my-4 overflow-auto h-[65vh]">
                        <p className='direction  bg-red-500 text-white w-24 font-bold p-1'><span className='font-bold text-lg mr-2'>Q. No.:</span>{Questionset[index].number}</p>
                        <p className='direction'><span className='font-bold text-lg mr-2'>Question:</span>{Questionset[index].directions}</p>
                        <p className='Statement text-justify m-3'>{Questionset[index].statement}</p>
                        <p className='question m-3'>{Questionset[index].question}</p>
                        <p className='font-bold text-lg mt-2'>Options</p>
                        <div className=' flex flex-col space-x-2 space-y-2'>
                            <p></p>
                            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
                                <input type="radio" name="option" id="option1" value='1' checked={option == '1'} onChange={handleChange} /> 1. {Questionset[index].options[0]}
                            </label>
                            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
                                <input type="radio" name="option" id="option2" value='2' checked={option == '2'} onChange={handleChange} /> 2. {Questionset[index].options[1]}
                            </label>
                            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
                                <input type="radio" name="option" id="option3" value='3' checked={option == '3'} onChange={handleChange} /> 3. {Questionset[index].options[2]}
                            </label>
                            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
                                <input type="radio" name="option" id="option4" value='4' checked={option == '4'} onChange={handleChange} /> 4. {Questionset[index].options[3]}
                            </label>
                            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
                                <input type="radio" name="option" id="option5" value='5' checked={option == '5'} onChange={handleChange} /> 5. {Questionset[index].options[4]}
                            </label>
                        </div>
                    </div>
                    <hr />
                    <div className="response-buttons flex flex-row justify-between mx-10 my-4 w-[80%]">
                        <div>
                            <button className='p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer' onClick={resetOption} type='reset'>CLEAR</button>
                            <button className='p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer' onClick={marknReview}>MARK FOR REVIEW</button>
                        </div>
                        <div className='text-lg'>
                            <p>Your response: <span className='font-bold text-red-600'>{Questionset[index].response} </span></p>
                        </div>
                        <div>
                            <button className='p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer' onClick={nextQuestion}>SAVE & NEXT</button>
                        </div>
                    </div>
                </div>
                <div className="right-panel bg-orange-200 h-[90vh] w-[25vw]">
                    <div className="number-board flex flex-row flex-wrap p-3">
                        <div className="flex flex-row">
                            <div className="notvisited">{notvisitedCount}</div>Not visited
                        </div>
                        <div className="flex flex-row">
                            <div className="notanswered">{notansweredCount}</div>Not answered
                        </div>
                        <div className="flex flex-row">
                            <div className="answered" >{answeredCount}</div>
                            Answered
                        </div>
                        <div className="flex flex-row">
                            <div className="review">{reviewCount}</div>Marked for review
                        </div>
                        <div className="flex flex-row">
                            <div className="ansNreview">{ansNreviewCount}</div>
                            Answered and Marked for Review <br /> (will be considered for evaluation)
                        </div>
                    </div>
                    <div>Score: {score}</div>
                    <div className="question-palette">
                        <h3 className='font-bold m-3'>Section: </h3>
                        <div className='overflow-auto w-[80%] h-[45vh] mx-6'>
                            <ul className='flex flex-row flex-wrap hover:cursor-pointer'>
                                {Questionset.map((item) => {
                                    return (
                                        <li className={item.status} key={item.number} onClick={() => { setIndex(item.number-1) }}> {item.number} </li>
                                    )
                                })}
                            
                            </ul>
                        </div>
                        <button className='bg-green-500 text-white p-2 font-bold hover:bg-green-900 my-4 mx-8' onClick={display}>SUBMIT</button>
                    </div>
                </div>
                {visible &&
                <div className="absolute w-[50%] h-[50%] bg-blue-600 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white font-bold text-center">
                    <p className='text-4xl mt-24'>Are you sure you want to submit?</p>
                    <div className='flex flex-row justify-center align-middle mt-8 text-2xl'>
                    <button className='bg-green-600 w-24 text-center m-10 p-2 hover:cursor-pointer hover:bg-green-800' onClick={showScore}>Yes</button>
                    <button className='bg-red-600 w-24 text-center m-10 p-2 hover:cursor-pointer hover:bg-red-800' onClick={display}>No</button>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default Questions