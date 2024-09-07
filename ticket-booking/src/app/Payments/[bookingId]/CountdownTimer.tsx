import { useEffect, useState } from 'react';
import axios from 'axios';

type props = {
  recordID: Array<string>,
  isPaused: boolean,
}

const CountdownTimer: React.FC<props> = ({recordID, isPaused}) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if(!isPaused){
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  useEffect(() => {
    if (timeLeft === 0 && isPaused) {
      // Reload the page after 2 minutes
      setTimeout(() => {
        axios.post("http://localhost:3000/deleteRecord", {recordID})
        alert("Transaction timed out!! Please try again.") 
        window.location.reload()
      }, 1000);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <p>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p>
    </div>
  );
};

export default CountdownTimer;
