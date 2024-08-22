"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";

export default function Home() {
  const stoppages: string[] = [
    "Goalpara",
    "Guwahati",
    "Nagaon",
    "Bokakhat",
    "Jorhat",
    "Sivsagar",
    "Dibrugarh",
    "Tinsukia",
    "Saikhowa",
  ];

  type BusDetails = {
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
    bookedSeats: Array<string>;
  };

  const [places, setPlaces] = useState<string>("");
  const [filteredOrigins, setFilteredOrigins] = useState<string[]>([]);
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [doj, setDoj] = useState("")
  const [stops, setStops] = useState<string>("");
  const [filteredDestinations, setFilteredDestination] = useState<string[]>([]);
  const [busList, setBusList] = useState<BusDetails[]>([]);

  const [busDisplay, setBusDisplay] = useState(true);

  const today = new Date().toISOString().split("T")[0];

  const handleVisible = () => {
    setBusDisplay((busDisplay) => !busDisplay);
  };

  const getOrigin = (stopp: string) => {
    setPlaces(stopp);
    setOrigin((prevOrigin) => {
      if (prevOrigin !== stopp) {
        return stopp;
      } else {
        return prevOrigin;
      }
    });
  };

  const handleSearchOrigin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setPlaces(query);
    const filteredResult: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredOrigins(filteredResult);
  };

  const getDestination = (stopp: string) => {
    setStops(stopp);
    setDestination((prevDestination) => {
      if (prevDestination !== stopp) {
        return stopp;
      } else {
        return prevDestination;
      }
    });
  };

  //Function for drop down
  const handleSearchDestination = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = e.target.value;
    setStops(query);
    const filteredDestinations: string[] = stoppages.filter((stopp) =>
      stopp.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredDestination(filteredDestinations);
  };

  //Search buses
  async function searchBuses() {
    const searchObj = {
      origin,
      destination,
      doj,
    };
    console.log(searchObj)
    try {
      const response = await axios.get('/api/bus', { params: searchObj });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <main>
      <Head>
       <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
      <div id="main">
        <form
          action=""
          method="post"
          id="searchBus"
          className="absolute top-[30%] left-[68%] translate-x-[-50%] translate-y-[-68%] w-[100vw] flex"
          onSubmit={(e) => {
            e.preventDefault();
            searchBuses();
          }}
        >
          <div id="origin">
            <input
              type="text"
              name="from"
              value={places}
              onChange={handleSearchOrigin}
              className="font-lg p-[2.7em] h-28 font-bold outline-none border-2 border-gray-500 rounded-tl-md rounded-bl-md"
              placeholder="From"
            />
            <div className="absolute bg-white w-56 px-5 py-2">
              {places && (
                <ul id="fromList">
                  {filteredOrigins.map((stopp, index) => (
                    <li
                      key={index}
                      onClick={() => getOrigin(stopp)}
                      className="filteredStops my-2 font-bold text-gray-700 hover:cursor-pointer"
                    >
                      {stopp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div id="destination">
            <input
              type="text"
              name="to"
              id="to"
              className="font-lg p-[2.7em] h-28 font-bold outline-none border-2 border-gray-500"
              value={stops}
              onChange={handleSearchDestination}
              placeholder="To"
            />
            <div className="absolute bg-white w-56 px-5 py-2">
              {stops && (
                <ul id="fromList">
                  {filteredDestinations.map((stopp, index) => (
                    <li
                      key={index}
                      onClick={() => getDestination(stopp)}
                      className="filteredOrigins my-2 font-bold text-gray-700 hover:cursor-pointer"
                    >
                      {stopp}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <input
            type="date"
            name="doj"
            id="doj"
            min={today}
            className="font-lg p-[2.7em] h-28 font-bold outline-none border-2 border-gray-500"
            onChange={(event) => setDoj(event.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 font-bold text-lg p-[2.7em] h-28 text-white rounded-tr-md rounded-br-md"
            onClick={searchBuses}
          >
            SEARCH BUSES
          </button>
        </form>
      </div>
    </main>
  );
}
