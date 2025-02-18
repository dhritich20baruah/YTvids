import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddHolidayForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/holidays/AddHoliday", data);
      alert("Holiday added successfully!");
      reset(); // Reset form after successful submission
    } catch (error) {
      alert("Failed to add holiday.");
      console.error("API Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add Holiday</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {/* Country Input */}
        <div>
          <label>Country:</label>
          <input type="text" {...register("country", { required: "Country is required" })} />
          {errors.country && <p style={styles.error}>{errors.country.message}</p>}
        </div>

        {/* Date Input */}
        <div>
          <label>Date:</label>
          <input type="text" {...register("date", { required: "Date is required" })} />
          {errors.date && <p style={styles.error}>{errors.date.message}</p>}
        </div>

        {/* Holiday Name Input */}
        <div>
          <label>Holiday Name:</label>
          <input type="text" {...register("name", { required: "Holiday name is required" })} />
          {errors.name && <p style={styles.error}>{errors.name.message}</p>}
        </div>

        <button type="submit">Add Holiday</button>
      </form>
    </div>
  );
};

// Inline Styles
const styles = {
  container: { maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "5px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  error: { color: "red", fontSize: "12px" },
};

export default AddHolidayForm;
