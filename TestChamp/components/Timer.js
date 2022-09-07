import React, { useState, useRef, useEffect} from 'react'

const Timer = () => {
    const Ref = useRef(null)

    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) =>{
        const total = Date.parse(e) - Date.parse(new Date())
        const seconds = Math.floor((total/1000)%60)
        const minutes = Math.floor((total/1000/60)%60)
        const hours = Math.floor((total/1000/60/60)%60)
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let {total, hours, minutes, seconds} = getTimeRemaining(e);

        if(total>=0){
          setTimer(
            (hours>9?hours:'0'+hours) + ':' + (minutes>9?minutes:'0'+minutes)  + ':' + (seconds>9?seconds:'0'+seconds)
          )  
        }
    }

    const clearTimer = (e) => {
        setTimer('03:00:00')
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(()=>{
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTimer = () => {
        let deadline = new Date();
        deadline.setHours(deadline.getHours() + 3);
        return deadline;
    }

    useEffect(()=>{
        clearTimer(getDeadTimer())
    }, [])

    const onClickReset = () =>{
        clearTimer(getDeadTimer())  
    }
  return (
    <div className="Timer">
    <h2 className='font-red-500'>{timer}</h2>
</div>
  )
}

export default Timer