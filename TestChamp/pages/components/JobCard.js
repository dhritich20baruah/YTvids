import React from "react";

const JobCard = ({ jobs }) => {
  return (
    <ul>
      {jobs.map((job) => (
        <li key={job._id}>
          <div className="flex bg-white shadow rounded overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900 to-red-600 text-white font-bold p-4 w-48 flex items-center">
              <span>ARMED FORCES MEDICAL SERVICES</span>
            </div>
            <div className="p-4">
              <a
                href="#"
                className="text-blue-700 font-semibold hover:underline"
              >
                Armed Forces Medical Services Recruitment – 400 Posts
              </a>
              <p className="text-gray-700 mt-2">
                Armed Forces Medical Services (AFMS) has released an employment
                notification...
              </p>
              <p className="mt-2">
                <span className="bg-purple-700 text-white px-2 py-1 text-sm rounded">
                  Last date: 12/05/2025
                </span>
                <span className="ml-2">
                  | Notification:{" "}
                  <a href="#" className="text-blue-600 underline">
                    Click here
                  </a>
                </span>
                <span className="ml-2">
                  | Apply:{" "}
                  <a href="#" className="text-blue-600 underline">
                    Click here
                  </a>
                </span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default JobCard;
