import Image from "next/image";
import axios from 'axios';

export default async function Home() {
  const ip  = "8.8.8.8"

  const options = {
  method: 'GET',
  url: 'https://currency-exchange-rate-api9.p.rapidapi.com/latest',
  params: {base: 'USD'},
  headers: {
    'x-rapidapi-key': process.env.X_RAPIDAPI_KEY,
    'x-rapidapi-host': 'currency-exchange-rate-api9.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-white text-gray-800 ">
        <div className="flex-col">
        <p className="font-bold text-xl">Convert Currency</p>
        <label htmlFor="ip">Enter IP</label>
        <input type="text" name="ip" id="ip" defaultValue={ip} className="w-56 h-10 rounded-md shadow-lg shadow-gray-800 p-3 m-3"/>
        </div>
      </div>
    </>
  );
}
