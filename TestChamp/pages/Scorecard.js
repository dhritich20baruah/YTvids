import React, {useContext} from 'react'
import { Questionset } from '../components/Questionset'
import { ScoreStateContext } from '../components/Context'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Scorecard = () => {
    const {score, setScore} = useContext(ScoreStateContext)
    const router = useRouter()

    function backHome(){
        router.reload()
    }
    return (
        <>
            <Link href="/">
            <div className='bg-indigo-700 font-bold text-white w-fit p-3 rounded-md m-5 hover:cursor-pointer hover:bg-blue-700' onClick={backHome}>HOME</div>
            </Link>
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