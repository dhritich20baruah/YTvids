import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";

const EditHolidays = () => {
  const [items, setItems] = useState([]);
  const [hame, setName] = useState("");
  const [type, setType] = useState("");

//   useEffect(()=>{
//     Axios.get(`http://localhost:5000/holidays/searchByCountry/Samoa`)
//     .then((res)=>console.log(res.data))
//     .catch((err)=>console.log(err))
//   }, [])

  const fetchHolidays = (country) => {
    Axios.get(`http://localhost:5000/holidays/searchByCountry/Samoa`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const updateHolidays = (country) => {
    const holidayObj = {
      name: name,
      type: type,
    };
    Axios.put(
      `http://localhost:5000/holidays/updateMany/${country}`,
      noteObj
    ).then(() => {
      alert("Updated");
    });
  };

  return (
    <>
      <div>
        <form action="">
          <input type="text" />
          <button onClick={() => fetchHolidays(country)}>FETCH</button>
        </form>
      </div>
      <div className="container">
        {items.map((holiday, _id) => {
          <div key={holiday._id}>
            <form action="">
              <label htmlFor="name">Holiday Name</label>
              <input
                type="text"
                id="name"
                value={holiday.name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                value={holiday.type}
                onChange={(e) => setType(e.target.value)}
              />
              <button
                className="btn"
                onClick={() => updateHolidays(holiday.country)}
              >
                SUBMIT
              </button>
            </form>
          </div>;
        })}
      </div>
    </>
  );
};

export default EditHolidays;

