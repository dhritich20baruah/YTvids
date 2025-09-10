'use client';

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return; //This line performs a basic validation check. It uses the .trim() method to remove any leading or trailing whitespace from the prompt state. 

    const userMessage = { text: prompt, sender: 'user' }; //This line creates a new JavaScript object to represent the user's message. It stores the message text from the prompt state and a sender property to identify who sent it.
    setMessages((prev) => [...prev, userMessage]); //This line updates the messages state. It uses a function-based update, where prev is a reference to the previous state. It creates a new array by spreading the prev array (...prev) and then adding the new userMessage to the end. 
    setPrompt('');
    setLoading(true); 

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();//This line parses the JSON response from the server into a JavaScript object.
      const botMessage = { text: data.text, sender: 'bot' }; //This creates a new message object for the bot's response. It gets the text from the data object and sets the sender to 'bot'.
      setMessages((prev) => [...prev, botMessage]); //This updates the messages state with the new bot message, similar to how the user's message was added.
    } catch (error) {
      console.error('Fetch error:', error);
      setMessages((prev) => [...prev, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Gemini Chatbot</h1>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0' }}>
            <span style={{ backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#f0f0f0', padding: '8px', borderRadius: '10px' }}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div style={{ textAlign: 'left', margin: '5px 0' }}>Typing...</div>}
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
          style={{ flex: '1', padding: '10px', borderWidth: 2, borderColor: "black" }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px' }}>
          Send
        </button>
      </form>
    </div>
  );
}