import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   console.log(email, password);
    // const result = await fetch(`http://localhost:5000/SignIn`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         email,
    //         password,
    //     }),
    // });
  //   const data = await result.json()

  //   if (data.user) {
  //     localStorage.setItem("token", data.user);
  //     alert("Login successful");
  //     navigate("/userDashboard");
  //   } else {
  //     alert("Please check email and password");
  //   }
  // };

// The code makes a POST request to the endpoint http://localhost:5000/SignIn using the fetch API.
// The options object passed as a second argument to fetch specifies the following:
// method: 'POST': The HTTP request method is set to POST.
// headers: { 'Content-Type': 'application/json' }: The Content-Type header is set to application/json to indicate that the request body is in JSON format.
// body: JSON.stringify({ email, password }): The request body is set to a JSON string representation of an object with properties email and password. These properties are passed as arguments to the function.
// The fetch call returns a Promise object that resolves to the response from the server, which is then stored in the result variable.
// The body option in the fetch API needs to be a string. Since the API endpoint expects the request body to be in JSON format, we use the JSON.stringify method to convert the JavaScript object to a JSON string representation. This way, the API endpoint will receive the request body in the expected format.
// For example, if email has the value "example@email.com" and password has the value "secret", the request body will look like this after JSON.stringify:
// The body option in the fetch API needs to be a string. Since the API endpoint expects the request body to be in JSON format, we use the JSON.stringify method to convert the JavaScript object to a JSON string representation. This way, the API endpoint will receive the request body in the expected format.
// For example, if email has the value "example@email.com" and password has the value "secret", the request body will look like this after JSON.stringify:

  const handleSubmit = async () => {
    try {
        const result = await Axios.post(`http://localhost:5000/SignIn`, {
            email,
            password
        });
        const data = result.data;
        console.log(data)
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Sign In successful");
            navigate(-1);
        } else {
            alert("Please check email and password");
        }
    } catch (error) {
        console.error(error);
    }
};

  return (
    <>
      <div className="contact-form m-10 h-[70vh]">
        <input
          type="text"
          placeholder="Enter your email ID"
          className="w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Enter your password"
          className="w-[100%] md:w-[50%] shadow-lg rounded-lg m-4 p-2 outline-none"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <br />
        <button
          className="m-4 p-2 bg-yellow-500 rounded-lg text-white hover:bg-orange-600"
          onClick={handleSubmit}
        >
          Sign In
        </button>
      </div>
    </>
  );
};

export default SignIn;
