"use client";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Home() {
  const [holidays, setHolidays] = useState<any[]>([]);
  const [selectedHoliday, setSelectedHoliday] = useState<any | null>(null);
  const [country, setCountry] = useState("Germany");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/fetchByCountryAndYear/${country}/2026`,
          { method: "GET" }
        );
        if (!res.ok) throw new Error("Failed to fetch holidays");

        const data = await res.json();
        setHolidays(data);
      } catch (err: any) {
        setError(err.message);
        setHolidays([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [country]);

  const handleDateClick = (date: Date) => {
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    });

    const holiday = holidays.find((h) => h.date === formattedDate);
    setSelectedHoliday(holiday || null);
  };

  if (loading) return <p>Loading holidays…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🌍 Holiday Calendar 2026</h1>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="p-2 rounded text-black mb-4"
      >
        <option value="India">India</option>
        <option value="USA">United States</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
      </select>

      <div className="bg-white rounded-xl shadow-lg p-4 text-black">
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={({ date }) => {
            const isHoliday = holidays.some((h) => {
              const holidayDate = new Date(`${h.date}, ${h.year}`);
              return (
                holidayDate.getDate() === date.getDate() &&
                holidayDate.getMonth() === date.getMonth() &&
                holidayDate.getFullYear() === date.getFullYear()
              );
            });

            return isHoliday
              ? "bg-yellow-300 rounded-full"
              : ""; // non-holiday fallback
          }}
        />
      </div>

      {selectedHoliday && (
        <div className="mt-6 bg-white text-black p-4 rounded-lg shadow-lg w-80 text-center">
          <h2 className="font-bold text-lg">{selectedHoliday.name}</h2>
          <p className="text-sm text-gray-600">
            {selectedHoliday.date} ({selectedHoliday.year})
          </p>
          <p className="text-sm text-gray-800">{selectedHoliday.type}</p>
        </div>
      )}
    </div>
  );
}
