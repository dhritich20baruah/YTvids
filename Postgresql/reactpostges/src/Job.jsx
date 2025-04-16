import React, { useState } from "react";
import axios from "axios";

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    lastDate: "",
    Post: "",
    category: "",
    advLink: "",
    applyLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/jobs", {
        ...formData,
        Post: Number(formData.Post),
      });
      alert("Job added successfully!");
      setFormData({
        title: "",
        lastDate: "",
        Post: "",
        category: "",
        advLink: "",
        applyLink: "",
      });
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Job</h2>
      <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
      <input name="lastDate" placeholder="Last Date (e.g. 30-Apr-2025)" value={formData.lastDate} onChange={handleChange} required />
      <input name="Post" placeholder="No. of Posts" value={formData.Post} onChange={handleChange} required />
      <input name="category" placeholder="Job Category" value={formData.category} onChange={handleChange} required />
      <input name="advLink" placeholder="Advertisement Link" value={formData.advLink} onChange={handleChange} required />
      <input name="applyLink" placeholder="Apply Link" value={formData.applyLink} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddJobForm;
