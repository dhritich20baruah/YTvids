import React, { useState, useEffect, useRef } from 'react';

// Define standard violin tuning frequencies and notes
const VIOLIN_TUNING = {
  G3: { frequency: 196.00, name: 'G3', string: 'G String' },
  D4: { frequency: 293.66, name: 'D4', string: 'D String' },
  A4: { frequency: 440.00, name: 'A4', string: 'A String' },
  E5: { frequency: 659.25, name: 'E5', string: 'E String' },
};

// Helper function to get the closest note from a frequency
const getClosestNote = (frequency) => {
  let closest = null;
  let minDiff = Infinity;

  // Iterate over all notes in the tuning standard to find the closest one
  for (const key in VIOLIN_TUNING) {
    const note = VIOLIN_TUNING[key];
    const diff = Math.abs(frequency - note.frequency);
    if (diff < minDiff) {
      minDiff = diff;
      closest = note;
    }
  }
  return closest;
};

// AutoCorrelation function to find the fundamental frequency
// This is a more robust method than simple peak detection.
const autoCorrelate = (buffer, sampleRate) => {
  const SIZE = buffer.length;
  const rms = Math.sqrt(buffer.reduce((sum, val) => sum + val * val, 0) / SIZE);

  // If the volume is too low, don't attempt to find a pitch
  if (rms < 0.01) {
    return -1;
  }

  const r1 = new Array(SIZE);
  let d = 0;
  for (let i = 0; i < SIZE; i++) {
    r1[i] = 0;
  }

  // Calculate the autocorrelation values
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      r1[i] += buffer[j] * buffer[j + i];
    }
  }

  // Find the first peak
  let maxval = -1;
  let maxpos = -1;

  for (let i = 1; i < SIZE; i++) {
    if (r1[i] > maxval) {
      maxval = r1[i];
      maxpos = i;
    }
  }

  // Find the second peak
  let T0 = 0;
  for (let i = 1; i < maxpos; i++) {
    if (r1[i] > r1[i - 1] && r1[i] > r1[i + 1]) {
      T0 = i;
      break;
    }
  }

  // Parabolic interpolation for a more precise frequency
  let x1 = r1[T0 - 1], x2 = r1[T0], x3 = r1[T0 + 1];
  let a = (x1 + x3 - 2 * x2) / 2;
  let b = (x3 - x1) / 2;
  let correctedT0 = T0 - b / (2 * a);

  return sampleRate / correctedT0;
};

// Main App component (now the default export for the page)
export default function Home() { // Renamed to Home as is common for pages/index.js
  const [isListening, setIsListening] = useState(false);
  const [detectedFrequency, setDetectedFrequency] = useState(0);
  const [closestNote, setClosestNote] = useState(null);
  const [deviation, setDeviation] = useState(0);
  const [currentString, setCurrentString] = useState('G String');
  const [error, setError] = useState('');
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamSourceRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    // This effect runs on component mount and when isListening changes.
    // Ensure all browser-specific logic is within this block.
    if (typeof window === 'undefined' || !navigator.mediaDevices) {
      return;
    }

    const startListening = async () => {
      setError('');
      try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        const floatTimeData = new Float32Array(analyserRef.current.fftSize);

        mediaStreamSourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
        mediaStreamSourceRef.current.connect(analyserRef.current);

        const analyzeAudio = () => {
          // Get time-domain data for the autocorrelation
          analyserRef.current.getFloatTimeDomainData(floatTimeData);
          
          const frequency = autoCorrelate(floatTimeData, audioContextRef.current.sampleRate);

          if (frequency !== -1) {
            setDetectedFrequency(frequency);
            const closest = getClosestNote(frequency);
            if (closest) {
              setClosestNote(closest);
              const centDeviation = 1200 * Math.log2(frequency / closest.frequency);
              setDeviation(centDeviation);
            } else {
              setClosestNote(null);
              setDeviation(0);
            }
          } else {
            setDetectedFrequency(0);
            setClosestNote(null);
            setDeviation(0);
          }

          animationFrameIdRef.current = requestAnimationFrame(analyzeAudio);
        };

        animationFrameIdRef.current = requestAnimationFrame(analyzeAudio);
        setIsListening(true);

      } catch (err) {
        console.error('Error accessing microphone:', err);
        setError('Failed to access microphone. Please ensure permissions are granted. If you have denied access, you may need to go to your browser settings to enable it.');
        setIsListening(false);
      }
    };

    const stopListening = () => {
      setIsListening(false);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      if (mediaStreamSourceRef.current) {
        mediaStreamSourceRef.current.disconnect();
        mediaStreamSourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
        mediaStreamSourceRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setDetectedFrequency(0);
      setClosestNote(null);
      setDeviation(0);
    };

    if (isListening) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [isListening]);

  const targetNote = Object.values(VIOLIN_TUNING).find(note => note.string === currentString);
  const targetFrequency = targetNote ? targetNote.frequency : 0;

  const feedbackColorClass = deviation > 10 ? 'text-red-500' :
                             deviation < -10 ? 'text-blue-500' :
                             closestNote && Math.abs(deviation) <= 10 ? 'text-green-500' :
                             'text-gray-400';
  const feedbackText = deviation > 10 ? 'Sharp ⬆️' :
                       deviation < -10 ? 'Flat ⬇️' :
                       closestNote && Math.abs(deviation) <= 10 ? 'In Tune ✅' :
                       '';

  const needleRotation = Math.max(-90, Math.min(90, deviation * 1.8));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 font-inter">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-400 drop-shadow-lg">🎻 Violin Tuner</h1>

      {error && (
        <div className="bg-red-700 text-white p-4 rounded-lg mb-4 shadow-md w-full max-w-md text-center">
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`py-3 px-8 rounded-full shadow-lg text-lg font-semibold transition-all duration-300
            ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            focus:outline-none focus:ring-4 focus:ring-offset-2 ${isListening ? 'focus:ring-red-500' : 'focus:ring-green-500'}`}
        >
          {isListening ? 'Stop Tuner' : 'Start Tuner'}
        </button>

        <select
          value={currentString}
          onChange={(e) => setCurrentString(e.target.value)}
          className="p-3 rounded-full shadow-lg bg-gray-700 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
        >
          {Object.values(VIOLIN_TUNING).map((note) => (
            <option key={note.name} value={note.string}>
              {note.string} ({note.name})
            </option>
          ))}
        </select>
      </div>

      <div className="bg-gray-800 rounded-3xl shadow-xl p-8 w-full max-w-lg flex flex-col items-center relative overflow-hidden">
        <div className="relative w-64 h-32 mb-8 mt-4">
          <div className="absolute top-0 left-0 right-0 bottom-0 border-b-2 border-gray-600 rounded-b-full overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-r from-blue-700 via-green-500 to-red-700 rounded-b-full opacity-75"></div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-500 z-10"></div>
          <div
            className="absolute origin-bottom left-1/2 bottom-0 h-full w-1 bg-white rounded-full transition-transform duration-100 ease-out"
            style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
          ></div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-xl text-gray-400">Target:</p>
          <p className="text-6xl font-bold text-indigo-300 mb-2">{targetNote?.name || 'N/A'}</p>
          <p className="text-xl text-gray-400">({targetFrequency.toFixed(2)} Hz)</p>
        </div>

        <div className="text-center mb-4">
          <p className="text-xl text-gray-400">Detected:</p>
          <p className={`text-5xl font-extrabold ${feedbackColorClass} transition-colors duration-300`}>
            {closestNote ? closestNote.name : '--'}
          </p>
          <p className="text-xl text-gray-400">
            {detectedFrequency > 0 ? `${detectedFrequency.toFixed(2)} Hz` : '--'}
          </p>
        </div>

        <p className={`text-3xl font-bold ${feedbackColorClass} transition-colors duration-300`}>
          {feedbackText} {closestNote && Math.abs(deviation) > 10 ? `(${Math.round(Math.abs(deviation))} cents)` : ''}
        </p>
      </div>

      <p className="mt-8 text-gray-500 text-sm">
        This tuner uses a simplified peak detection algorithm. For professional accuracy, dedicated tuners are recommended.
      </p>
    </div>
  );
}
