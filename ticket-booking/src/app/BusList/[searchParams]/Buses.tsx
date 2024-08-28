"use client";
import { useState } from "react";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import SeatPlan from "./SeatPlan";

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
  estimated_arrival: string;
  duration: string;
  arrival_date: string;
};

type props = { buses: busArr[] };

const Buses: React.FC<props> = ({ buses }) => {
  const [origin, setOrigin] = useState(buses[0].origin);
  const [destination, setDestination] = useState(buses[0].destination);
  const [seatVisibility, setSeatVisibility] = useState(false);
  const [doj, setDoj] = useState(buses[0].doj);
  const parsedDate = parseISO(doj);
  const formated_date = format(parsedDate, "dd/MM/yyyy");

  const handleFare = (fare:number, busName:string, startTime: string, bookedSeats: Array<string>)=>{

    handleSeatVisible()
  }
  const handleSeatVisible = () => {
    setSeatVisibility((seatVisibility) => !seatVisibility);
  };

  return (
    <main id="buses">
      <p id="busRoute" className="my-4 mx-10">
        <strong>Home</strong> &gt; Bus Tickets
      </p>
      <p id="travelPlan" className="flex font-bold my-4 mx-10">
        {" "}
        {origin} - &gt; {destination} - &gt; {formated_date}
        <Link href="/">
          <button className="mx-5 p-1 text-white bg-red-500 rounded-md hover:cursor-pointer">
            Modify
          </button>
        </Link>
      </p>

      <section id="busList" className="flex">
        <div id="busList" className="w-max-[80%] mx-auto">
          {buses.length == 0 ? (
            <p className="text-center text-2xl font-bold m-20">
              NO AVAILABLE BUSES
            </p>
          ) : (
            <p>AVAILABLE BUSES</p>
          )}

          {buses.map((item, index) => {
            return (
              <div
                key={index}
                id="card"
                className="p-4 grid grid-cols-6 gap-4 w-[100%] border-2 border-gray-600 font-md my-4"
              >
                <div>
                  <p className="font-bold text-lg">{item.bus_name}</p>
                  <br />
                  <p>{item.details}</p>
                </div>
                <div>
                  <p className="text-red-700 font-semibold">Start</p>
                  <p className="font-bold text-lg">{item.start_time} hrs</p>
                  <p className="font-bold text-lg">{formated_date}</p>
                  <p className="text-red-700 font-semibold">{item.origin}</p>
                </div>
                <div>
                  <p className="font-bold text-lg">Duration</p>
                  <p className="font-bold text-lg text-red-600">
                    {item.duration}
                  </p>
                </div>
                <div>
                  <p className="text-red-700 font-semibold">Arrival</p>
                  <p className="font-bold text-lg">{item.estimated_arrival} hrs</p>
                  <p className="font-bold text-lg">{item.arrival_date}</p>
                  <p className="text-red-700 font-semibold">
                    {item.destination}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg">INR {item.total_fare}</p>
                </div>
                <div>
                  <br />
                  <p className="font-semibold">
                    {item.total_seats} Total Seats
                  </p>
                  {/* <p className="font-semibold">{item.total_seats - item.bookedSeats.length} Seats Available</p> */}
                  <br />
                  <br />
                  <button className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700" 
                    onClick={() => handleFare(item.fare, item.bus_name, item.start_time, item.bookedSeats)}>
                    VIEW SEATS
                  </button>
                </div>
                <div>
                {seatVisibility && (
                    <div>
                      <SeatPlan
                        busName={item.bus_name}
                        origin={item.origin}
                        destination={item.destination}
                        doj={item.doj}
                        total_seats={item.total_seats}
                        stoppages={item.stoppages}
                        start_time={item.start_time}
                        fare={item.total_fare}
                        bookedArr={item.bookedSeats}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {seatVisibility && (
            <button
              //  onClick={handleSeatVisible}
              className="bg-red-600 p-4 text-white hover:cursor-pointer hover:bg-red-700 fixed top-[10%] right-[10%]"
            >
              X
            </button>
          )}
        </div>
      </section>
    </main>
  );
};

export default Buses;
