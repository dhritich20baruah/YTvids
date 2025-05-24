import { useState } from "react";
import "./App.css";
import Axios from "axios";
import emailjs from '@emailjs/browser';

// function App() {
//   const [title, setTitle] = useState("");
//   const [lastDate, setLastDate] = useState("");
//   const [postNum, setPostNum] = useState(0);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [advLink, setAdvLink] = useState("");
//   const [applyLink, setApplyLink] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     try {
//       const jobObj = {
//         title,
//         lastDate,
//         postNum,
//         description,
//         category,
//         advLink,
//         applyLink,
//       };
//       console.log(jobObj)
//       Axios.post(`http://localhost:3600/jobs/addJob`, jobObj).then(() => {
//         alert("posted");
//       });
//     } catch (error) {
//       console.error(error)
//     }    
//   };

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//         className="flex space-y-3 flex-col m-10"
//       >
//         <h2 className="font-medium text-lg">Add Job</h2>
//         <input
//           name="title"
//           placeholder="Job Title"
//           value={title}
//           onChange={(event)=>setTitle(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//         <input
//           name="lastDate"
//           placeholder="Last Date (e.g. 30-Apr-2025)"
//           value={lastDate}
//           onChange={(event)=>setLastDate(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//         <input
//           name="Post"
//           placeholder="No. of Posts"
//           value={postNum}
//           onChange={(event)=>setPostNum(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//         <input
//           name="description"
//           placeholder="Description"
//           value={description}
//           onChange={(event)=>setDescription(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//         <input
//           name="category"
//           placeholder="Category"
//           value={category}
//           onChange={(event)=>setCategory(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//         <input
//           name="advLink"
//           placeholder="Adv Link"
//           value={advLink}
//           onChange={(event)=>setAdvLink(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//           <input
//           name="applyLink"
//           placeholder="Apply Link"
//           value={applyLink}
//           onChange={(event)=>setApplyLink(event.target.value)}
//           className="w-2/3 border-2 border-black rounded-md p-2"
//           required
//         />
//         <button type="submit" className="w-fit p-2 rounded-md bg-red-600 text-white">Submit</button>
//       </form>
//     </>
//   );
// }

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <ContactForm />
    </div>
  );
}

function ContactForm() {
  // State variables to hold the input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  // Handle form submission
   const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Create a new object that contains dynamic template params
    const templateParams = {
      name: name,
      email: email,
      to_name: 'Dhriti',
      message: query,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        alert("Query sent successfully.")
        setName('');
        setEmail('');
        setQuery('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Contact Us</h2>
      <p className="text-gray-600 mb-8 text-center">
        Have a question or want to get in touch? Fill out the form below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Your Full Name"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="you@example.com"
          />
        </div>

        {/* Query Textarea */}
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-1">
            Your Query
          </label>
          <textarea
            id="query"
            name="query"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            rows="5" // Visible height in lines
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-y"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-400 cursor-pointer"
        >
         SUBMIT
        </button>
      </form>
    </div>
  );
}

export default App;
