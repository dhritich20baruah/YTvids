import React, { useState, useContext } from 'react'
import { Questionset } from './Questionset'
import { ScoreStateContext } from './Context'
import { useRouter } from 'next/router'

const Countdown = () => {
    const [timer, setTimer] = useState('00:00:00')
    const {timeAlloted, setTimeAlloted, index, setIndex } = useContext(ScoreStateContext)
    const router = useRouter()  

    var date1 = new Date()
    var countDownDate = new Date()
    countDownDate.setTime(date1.getTime() + ({timeAlloted} * 60 * 1000) );

    // Update the count down every 1 second
    var stoptime = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        setTime((hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));


        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(stoptime);
            if (Questionset.section == 1) {
                setIndex(10)
            }
            if (Questionset.section == 2) {
                setIndex(20)
            }
            if (Questionset.section == 3) {
                showScore
            }    
        }
    }, 1000);

    function showScore(){
        router.replace('/Scorecard')
    }
    
  return (
    <div>{time}</div>
  )
}

export default Countdown

