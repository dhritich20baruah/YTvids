"use client";
import { useState } from "react";
import Head from "next/head";
type busArr = {
  bus_name: string;
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
  bookedSeats: Array<string>;
  routes: string;
  total_fare: string;
  estimated_arrival: string
};

type props = { buses: busArr[]}

const Buses: React.FC<props> = ({ buses }) => {
  const [origin, setOrigin] = useState("origin");
  const [destination, setDestination] = useState("destination");
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [busFare, setbusFare] = useState(0);
  const [bus, setBus] = useState("");
  const [startTime, setStartTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [totalFare, setTotalFare] = useState("");

  function handleModify() {}

  return (
    <main id="buses">
 
      <p id="busRoute" className="m-4">
        <strong>Home</strong> &gt; Bus Tickets
      </p>
      <p id="travelPlan" className="flex font-bold m-4">
        {" "}
        {origin} - {destination}{" "}
       - 10 Oct Tue{" "}
      
        <button
          className="mx-1 p-1 text-white bg-red-500 rounded-md hover:cursor-pointer"
          onClick={handleModify}
        >
          Modify
        </button>
      </p>

      <section id="busList" className="flex">
      <div id="busList" className="w-max-[80%] m-4">
          {(buses.length == 0)
          ?
          (<p className="text-center text-2xl font-bold m-20">NO AVAILABLE BUSES</p>) 
          : 
          (<p>AVAILABLE BUSES</p>)}
          
          {buses.map((item, index) => {
            return (
              <div
              key={index}
                id="card"
                className="p-4 grid grid-cols-7 gap-4 w-[100%] border-2 border-gray-600 font-md my-4"
              >
                <div>
                  <p className="font-bold text-lg">{item.bus_name}</p>
                  <br />
                  <p>{item.details}</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{item.start_time}</p>
                  <p>{item.doj}</p>
                  <p>{item.origin}</p>
                </div>
                <div>
                  <p>Duration</p>
                </div>
                <div>
                  <p className="font-bold text-lg">{item.estimated_arrival}</p>
                  <p>item.travelTime.endDate</p>
                  <p>{item.destination}</p>
                </div>
                <div>
                  <p className="font-bold text-lg">
                    <i className="material-icons">star</i>4.0
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg">INR {item.total_fare}</p>
                </div>
                <div>
                  <br />
                  <p className="font-semibold">{item.total_seats} Total Seats</p>
                  {/* <p className="font-semibold">{item.total_seats - item.bookedSeats.length} Seats Available</p> */}
                  <br />
                  <br />
                  <button
             
                    className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700"
                  >
                    VIEW SEATS
                  </button>
                </div>
              </div>
            );
          })}
          {seatVisibility &&
           <button
          //  onClick={handleSeatVisible}
           className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700 fixed top-[10%] right-[10%]"
           >
                    X
           </button>
          }
        </div>
      </section>
    </main>
  );
}

export default Buses;