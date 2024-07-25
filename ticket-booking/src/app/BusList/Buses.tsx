'use client'
import { useState } from "react"
type busArr = {
    busName: string;
    details: string;
    total_seats: number;
    stoppages: Array<string>;
    fare: number;
    start_time: string;
    speed?: number;
    service: "day" | "night";
    travelTime: {
      startDate: string;
      startTime: string;
      endDate: string;
      endTime: string;
    };
    origin: string;
    destination: string;
    doj: string;
    bookedSeats: Array<string>
  };

  export default function Buses(){
    const [origin, setOrigin] = useState("origin")
    const [destination, setDestination] = useState("destination")
    const [seatVisibility, setSeatVisibility] = useState(false);
    const [busFare, setbusFare] = useState(0);
    const [bus, setBus] = useState("")
    const [startTime, setStartTime] = useState("")

    function handleModify(){

    }

    return(
        <main id="buses">
            <p id="busRoute" className="m-4">
                <strong>Home</strong> &gt; Bus Tickets 
            </p>
            <p id="travelPlan" className="flex font-bold m-4">
        {" "}
        {origin} <i className="material-icons">arrow_forward</i> {destination}{" "}
        <i className="material-icons">chevron_left</i>10 Oct Tue{" "}
        <i className="material-icons">chevron_right</i>
        <button
          className="mx-1 p-1 text-white bg-red-500 rounded-md hover:cursor-pointer"
          onClick={handleModify}
        >
          Modify
        </button>
      </p>
        </main>
    )
  }