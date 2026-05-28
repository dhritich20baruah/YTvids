import React, { useState, useEffect, useRef } from 'react';

// Main App component (now the default export for the page)
export default function Home() { // Renamed to Home as is common for pages/index.js
  const [isListening, setIsListening] = useState(false);
  const [detectedFrequency, setDetectedFrequency] = useState(0);

  return (
   <div className='flex justify-center items-center w-full h-screen'>
    <p>Upload Audio file</p>
   </div>
  );
}
