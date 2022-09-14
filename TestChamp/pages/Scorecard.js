import React, {useContext} from 'react'
import { Questionset } from '../components/Questionset'
import { ScoreStateContext } from '../components/Context'

const Scorecard = () => {
    const {score, setScore} = useContext(ScoreStateContext)

    return (
        <>
            <div className='text-center text-2xl font-bold my-12'>Your Score: {score}</div>
            {Questionset.map((item)=>{
                return(<div className='flex flex-row mx-32 my-3 border-b-2 border-slate-600 space-x-32 font-bold text-xl' key={item.number}>
                <p>Question No.: {item.number}</p>
                <p>Answer: {item.answer}</p>
                <p>Your response: {item.response}</p>
                <p>Result: {item.result}</p>
            </div>)
            })}
        </>
    )
}

export default Scorecard