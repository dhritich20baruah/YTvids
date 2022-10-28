import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Create from './components/Create'
import Show from './components/Show'
import Post from './components/Post'
import Edit from './components/Edit'
import { Routes, Route } from "react-router-dom"
import {itemStateContext} from './components/Context'

function App() {
  const [post, setpost] = useState([])

  return (
    <>
    <itemStateContext.Provider value={{ post, setpost }}>
      <Nav />
      <Routes>
        <Route path='Create' element={<Create />} />
        <Route path='Show' element={<Show />} />
        <Route path='Post' element={<Post />} />
        <Route path='Edit' element={<Edit />} />
      </Routes>
      </itemStateContext.Provider>
    </>
  );
}

export default App;
