import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [country, setCountry] = useState("");
  const [updatedHolidays, setUpdatedHolidays] = useState({});

  const fetchHolidays = (event) => {
    event.preventDefault();
    Axios.get(`http://localhost:5000/holidays/searchByCountry/${country}`)
      .then((res) => {
        setItems(res.data);
        // Initialize updatedHolidays state
        const initialUpdates = res.data.reduce((acc, holiday) => {
          acc[holiday._id] = {date: holiday.date, name: holiday.name, type: holiday.type };
          return acc;
        }, {});
        setUpdatedHolidays(initialUpdates);
      })
      .catch((err) => console.log(err));
  };

  const handleInputChange = (holidayId, field, value) => {
    setUpdatedHolidays((prev) => ({
      ...prev,
      [holidayId]: { ...prev[holidayId], [field]: value },
    }));
  };

  const updateAllHolidays = () => {
    const updatesArray = Object.entries(updatedHolidays).map(([id, data]) => ({
      _id: id,
      ...data,
    }));

    Axios.put(`http://localhost:5000/holidays/updateMany`, { holidays: updatesArray })
      .then(() => {
        alert("All holidays updated successfully!");
      })
      .catch((err) => console.error("Update failed:", err));
  };

  return (
    <>
      <div>
        <form onSubmit={fetchHolidays}>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">FETCH</button>
        </form>
      </div>

      <div className="container">
        {items.map((holiday) => (
          <div key={holiday._id}>
             <label htmlFor={`date-${holiday._id}`}>Date</label>
            <input
              type="text"
              id={`date-${holiday._id}`}
              value={updatedHolidays[holiday._id]?.date || ""}
              onChange={(e) => handleInputChange(holiday._id, "date", e.target.value)}
            />
            <label htmlFor={`name-${holiday._id}`}>Holiday Name</label>
            <input
              type="text"
              id={`name-${holiday._id}`}
              value={updatedHolidays[holiday._id]?.name || ""}
              onChange={(e) => handleInputChange(holiday._id, "name", e.target.value)}
            />
            <label htmlFor={`type-${holiday._id}`}>Type</label>
            <input
              type="text"
              id={`type-${holiday._id}`}
              value={updatedHolidays[holiday._id]?.type || ""}
              onChange={(e) => handleInputChange(holiday._id, "type", e.target.value)}
            />
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <button className="btn" onClick={updateAllHolidays}>
          SUBMIT ALL
        </button>
      )}
    </>
  );
}

export default App;
