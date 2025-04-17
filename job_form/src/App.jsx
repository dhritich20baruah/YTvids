import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [postNum, setPostNum] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [advLink, setAdvLink] = useState("");
  const [applyLink, setApplyLink] = useState("");

  const handleSubmit = () => {
    const jobObj = {
      title,
      lastDate,
      postNum,
      description,
      category,
      advLink,
      applyLink,
    };
    Axios.post(`http://localhost:5000/jobs/addJob`, jobObj).then(() => {
      alert("posted");
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex space-y-3 flex-col m-10"
      >
        <h2 className="font-medium text-lg">Add Job</h2>
        <input
          name="title"
          placeholder="Job Title"
          value={title}
          onChange={(event)=>setTitle(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <input
          name="lastDate"
          placeholder="Last Date (e.g. 30-Apr-2025)"
          value={lastDate}
          onChange={(event)=>setLastDate(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <input
          name="Post"
          placeholder="No. of Posts"
          value={postNum}
          onChange={(event)=>setPostNum(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={description}
          onChange={(event)=>setDescription(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={category}
          onChange={(event)=>setCategory(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <input
          name="advLink"
          placeholder="Apply Link"
          value={advLink}
          onChange={(event)=>setAdvLink(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
          <input
          name="applyLink"
          placeholder="Apply Link"
          value={applyLink}
          onChange={(event)=>setApplyLink(event.target.value)}
          className="w-2/3 border-2 border-black rounded-md p-2"
          required
        />
        <button type="submit" className="w-fit p-2 rounded-md bg-red-600 text-white">Submit</button>
      </form>
    </>
  );
}

export default App;
