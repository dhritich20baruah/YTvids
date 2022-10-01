import React, { useState } from 'react'
import Image from 'next/image'
import profilePic from '../public/profilepic.png'
import { Questionset } from '../component/Questionset'

const Questions = () => {
  const [index, setindex] = useState(0)
  const [score, setScore] = useState(0)
  const [option, setOption] = useState('')
  const [notvisitedCount, setNotvisitedCount] = useState(30)
  const [notansweredCount, setNotansweredCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [reviewCount, setreviewCount] = useState(0)
  const [ansNreviewCount, setansNreviewCount] = useState(0)

  const handleChange = (event) =>{
    setOption(event.target.value)
  }

  //To evaluate the answered
  function evaluate(){
    if(Questionset[index].answer == option){
      setScore(score + 1) // One mark will be rewarded for every right answered
      Questionset[index].result = "Correct" //the questionset array will store the candidates response and result
    }
    else{
      setScore(score - 0.25) //One fourth of the mark will be deducted for every wrong answered
      Questionset[index].result = 'Incorrect'
    }
  }
  //To display the next question we are going to increment the index value by 1
  const nextQuestion = () => {
    Questionset[index].response = option
    if(option != ""){
      if(Questionset[index].status != 'answered'){
        setAnsweredCount(answeredCount + 1)
      }
      if(Questionset[index].status == 'notanswered'){
        setNotansweredCount(notansweredCount - 1)
      }
      if(Questionset[index].status == 'notvisited'){
        setNotvisitedCount(notvisitedCount - 1)
      }
      if(Questionset[index].status == 'review'){
        setreviewCount(reviewCount - 1)
      }
      if(Questionset[index].status == 'ansNreview'){
        setansNreviewCount(ansNreviewCount - 1)
      }
      evaluate()
      Questionset[index].status = 'answered'
    }else{
      if(Questionset[index].status != 'notanswered'){
        setNotansweredCount(notansweredCount + 1)
      }
      if(Questionset[index].status == 'answered'){
        setAnsweredCount(answeredCount - 1)
      }
      if(Questionset[index].status == 'notvisited'){
        setNotvisitedCount(notvisitedCount - 1)
      }
      if(Questionset[index].status == 'review'){
        setreviewCount(reviewCount - 1)
      }
      if(Questionset[index].status == 'ansNreview'){
        setansNreviewCount(ansNreviewCount - 1)
      }
      Questionset[index].status = 'notanswered'
    }
    setindex(index+1)
    setOption('')
  }

  //For the mark and review button
  const marknReview = () =>{
    Questionset[index].response = option
    if(option != ""){
      if(Questionset[index].status != 'ansNreview'){
        setansNreviewCount(ansNreviewCount + 1)
      }
      if(Questionset[index].status == 'notanswered'){
        setNotansweredCount(notansweredCount - 1)
      }
      if(Questionset[index].status == 'notvisited'){
        setNotvisitedCount(notvisitedCount - 1)
      }
      if(Questionset[index].status == 'review'){
        setreviewCount(reviewCount - 1)
      }
      if(Questionset[index].status == 'answered'){
        setAnsweredCount(answeredCount - 1)
      }
      evaluate()
      Questionset[index].status = 'ansNreview'
    }else{
      if(Questionset[index].status != 'review'){
        setreviewCount(reviewCount + 1)
      }
      if(Questionset[index].status == 'notanswered'){
        setNotansweredCount(notansweredCount - 1)
      }
      if(Questionset[index].status == 'answered'){
        setansweredCount(answeredCount - 1)
      }
      if(Questionset[index].status == 'notvisited'){
        setNotvisitedCount(notvisitedCount - 1)
      }
      if(Questionset[index].status == 'ansNreview'){
        setansNreviewCount(ansNreviewCount - 1)
      }
      Questionset[index].status = 'review'
    }
    setindex(index+1)
    setOption('')
  }

  const resetOption = ()=>{
    setOption('')
    Questionset[index].response = option
    if(Questionset[index].status == 'review'){
      setreviewCount(reviewCount - 1)
    }
    if(Questionset[index].status != 'notanswered'){
      setNotansweredCount(notansweredCount + 1)
    }
    if(Questionset[index].status == 'answered'){
      setAnsweredCount(answeredCount - 1)
    }
    if(Questionset[index].status == 'notvisited'){
      setNotvisitedCount(notvisitedCount - 1)
    }
    if(Questionset[index].status == 'ansNreview'){
      setansNreviewCount(ansNreviewCount - 1)
    }
    if(Questionset[index].result == "Correct"){
      setScore(score - 1)
    }
    if(Questionset[index].result == "Incorrect"){
      setScore(score - 0.25)
    }
    Questionset[index].result = ""
    Questionset[index].status = 'notanswered'
  }

  return (
    <>
    <div className='questionHead bg-blue-200 flex flex-row justify-between'>
      <div className='font-bold text-lg p-2'>FRONTEND TEST</div>
      <div className='font-bold text-lg p-2 flex'>Time remaining: <span className=' text-red-700 ml-3'>00:00:00</span></div>
      <div className="profileinfo text-xl flex flex-row">
        <div className="profilePic mx-5">
              <Image src={profilePic} alt="profilepic" width={80} height={80} />
        </div>
        <div className='p-2'>Candidate Name: <span className='text-red-600 ml-3'>Your Name</span>
          <br />
          Roll No.: <span className='text-red-600 ml-3'>8945024</span>
        </div>
      </div>
    </div>

    <div className="questions-body flex relative">
      <div className="left-panel h-[88vh] w-[75vw]">
        <div className='section flex flex-row space-x-4 space-y-2'>
          <p></p>
          <p className='font-bold p-2'>Section: </p>
          <button className='bg-indigo-700 p-2 text-white rounded hover:bg-slate-200 hover:text-indigo-800 hover:cursor-pointer'>HTML</button>
          <button className='bg-indigo-700 p-2 text-white rounded hover:bg-slate-200 hover:text-indigo-800 hover:cursor-pointer'>CSS</button>
          <button className='bg-indigo-700 p-2 text-white rounded hover:bg-slate-200 hover:text-indigo-800 hover:cursor-pointer'>JAVASCRIPT</button>
        </div>
        <div className="QnA mx-10 my-4 overflow-auto h-[60vh]">
          <p className="QNo bg-red-500 text-white w-36 font-bold p-1">Question No.: <span>{Questionset[index].number}</span></p>
          <p className="question text-lg mr-2">Question: <span>{Questionset[index].question}</span></p>
          <div className='flex flex-col space-x-2 space-y-2'>
            <p></p>
            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
              <input type="radio" name="option" id="option1" value="1" checked={option == '1'} onChange={handleChange}/> {Questionset[index].options[0]}
            </label>
            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
              <input type="radio" name="option" id="option2" value="2" checked={option == '2'} onChange={handleChange}/> {Questionset[index].options[1]} 
            </label>
            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
              <input type="radio" name="option" id="option3" value="3" checked={option == '3'} onChange={handleChange}/> {Questionset[index].options[2]} 
            </label>
            <label htmlFor="option" className='border-2 border-slate-400 rounded w-[80%] p-2 h-auto hover:cursor-pointer hover:bg-slate-200'>
              <input type="radio" name="option" id="option4" value="4" checked={option == '4'} onChange={handleChange}/> {Questionset[index].options[3]} 
            </label>
          </div>
        </div>
        <hr/>
        <div className="responseBtns flex flex-row justify-between mx-10 my-4 w-[80%]">
          <div>
            <button className='p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer' onClick={resetOption}>CLEAR</button>
            <button className='p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer' onClick={marknReview}>MARK FOR REVIEW</button>
          </div>
          <div className='text-lg'>
            <p>Your response: <span className='font-bold text-red-600'>{Questionset[index].response}</span></p>
          </div>
          <div>
            <button className='p-2 text-blue-800 border-2 border-blue-800 rounded m-2 hover:text-white hover:bg-blue-800 hover:cursor-pointer' onClick={nextQuestion}>SAVE</button>
          </div>
        </div>
      </div>


      {/* RIGHTPANEL */}
      <div className="right-panel bg-orange-200 w-[25vw] h-[88vh]">
        <div className="number-board flex flex-row flex-wrap p-3">
          <div className='flex flex-row'>
            <div className='notvisited '>{notvisitedCount}</div>Not visited
          </div>
          <div className='flex flex-row'>
            <div className='notanswered '>{notansweredCount}</div>Not answered
          </div>
          <div className='flex flex-row'>
            <div className='answered '>{answeredCount}</div>Answered
          </div>
          <div className='flex flex-row'>
            <div className='review'>{reviewCount}</div>Marked for review
          </div>
          <div className='flex flex-row'>
            <div className='ansNreview '>{ansNreviewCount}</div>Answered and marked for  <br/>Review (will be considered for evaluation)
          </div>
        </div>

        <div className="question-palette">
          <h3 className='font-bold p-3 w-[100%] bg-blue-200'>Section: <span className='text-red-500'>{Questionset[index].section} {score}</span></h3>
          <div className='overflow-auto w-[80%] h-[35vh] mx-6'>
            <ul className='flex flex-row flex-wrap hover:cursor-pointer'>
              {Questionset.map((item)=>{
                return(
                  <li key={item.number} className={item.status} onClick={()=>{setindex(item.number - 1)}}>{item.number}</li>
                )
              })}
            </ul>
          </div>
          <button className='bg-green-500 text-white p-2 font-bold hover:bg-green-900 my-4 mx-8'>SUBMIT</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Questions