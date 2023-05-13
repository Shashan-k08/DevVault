import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  return (
    <> 
    <div className="fl-c">
      <NoteState>
        <Router>
        <Alert alert={alert} />
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/'  element={<Home showalert={showalert}/>} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showalert={showalert} />} />
              <Route exact path='/signup' element={<SignUp showalert={showalert} />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
      </div>
    </>
  );
}

export default App;
