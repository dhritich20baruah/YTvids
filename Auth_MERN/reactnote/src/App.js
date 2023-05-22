import React, {useState} from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom'
import Nav from './components/Nav';
import Home from './components/Home';
import Create from './components/Create'
import Edit from './components/Edit'
import Notes from './components/Notes';
import {itemStateContext} from './components/Context'

function App() {
const [post, setPost] = useState([])
const auth = localStorage.getItem("token")

  return (
    <>
    <itemStateContext.Provider value={{ post, setPost}}>
      <Nav />
      <Routes>
        <Route path='/' element={auth ? <Notes/>:<Home/> }/>
        <Route path='/Create' element={auth ? <Create/>:<Home/>}/>
        <Route path='/Notes' element={auth ? <Notes/>:<Home/>}/>
        <Route path='/Edit' element={<Edit/>}/>
      </Routes>
      </itemStateContext.Provider>
    </>
  );
}

export default App;
