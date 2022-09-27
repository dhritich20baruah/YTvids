import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';

const Timer = () => {
    const Ref = useRef(null)
    const router = useRouter()
    const [timer, setTimer] = useState('00:00:00');
    
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date())
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor((total / 1000 / 60 / 60) % 60)
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);

        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
        if(total == 0){
            showScore()
        }
    }

    const clearTimer = (e) => {
        setTimer('00:45:00')
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTimer = () => {
        let deadline = new Date();
        deadline.setMinutes(deadline.getMinutes() + 45);
        return deadline;
    }

    useEffect(() => {
        clearTimer(getDeadTimer())
    }, [])

    function showScore(){
        router.replace('/Scorecard')
    }

    return (
        <div className="Timer">
            <h2 className='font-red-500'>{timer}</h2>
        </div>
    )
}

export default Timer

