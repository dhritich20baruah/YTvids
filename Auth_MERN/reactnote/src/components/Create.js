import React, { useState } from "react";
import Axios from "axios";


const Create = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const noteObj = {
      title: title,
      note: note,
    };
    Axios.post(`http://localhost:4000/notes/newNote`, noteObj, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    })
      .then(() => {
        alert("Posted");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while posting the note. Please try again.");
      });
  };

  return (
    <>
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Note
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="title"
              onChange={(event) => setNote(event.target.value)}
            ></textarea>

          </div>
          <button className="btn btn-warning" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
