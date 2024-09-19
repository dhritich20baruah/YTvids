"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
    "Tezpur",
    "Dhemaji",
    "North Lakhimpur",
    "Mangaldoi"
  ];

  const [places, setPlaces] = useState<string>("");
  const [filteredOrigins, setFilteredOrigins] = useState<string[]>([]);
  const [filteredDestinations, setFilteredDestination] = useState<string[]>([]);
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [doj, setDoj] = useState("")
  const [stops, setStops] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

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
    try {
      router.push(`/BusList/`+ origin + `&` + destination + `&` + doj);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <main className="bg-[url('/busbg.jfif')] bg-cover bg-center h-screen">
      <div id="main" className="flex justify-center items-center w-full h-screen">
        <form
          action=""
          method="post"
          id="searchBus"
          className="flex"
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
              className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500"
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
              className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500"
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
            className="font-lg p-[2.7em] h-20 font-bold outline-none border-2 border-gray-500"
            onChange={(event) => setDoj(event.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 font-bold text-md h-22 px-5 py-5 text-white"
            onClick={searchBuses}
          >
            SEARCH BUSES
          </button>
        </form>
      </div>
    </main>
  );
}
