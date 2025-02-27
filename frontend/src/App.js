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
import UserState from './context/user/UserState';
import CodeVaultState from './context/codeVault/CodeVaultState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';
import Footer from './Components/Footer';
import Newnote from './Components/Newnote';
import CodeVault from './Pages/codeVault/CodeVault';
import CodeFormatter from './Pages/codeFormatter/CodeFormatter';
import TextPrettier from './Pages/textPrettier/TextPrettier';
import ComingSoon from './Components/ComingSoon';

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
      <UserState>
      <NoteState>
        <CodeVaultState>
        <Router>
        <Alert alert={alert} />
          <Navbar showalert={showalert} />
          <div className="container fl-c" style={{minHeight:"80vh" ,marginTop:"6rem"}}>
            <Routes>
              <Route path='/'  element={<Home showalert={showalert}/>} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/login' element={<Login showalert={showalert} />} />
              <Route exact path='/signup' element={<SignUp showalert={showalert} />} />
              <Route exact path='/footer' element={<Footer showalert={showalert} />} />
              <Route exact path='/devVault/noteSafe' element={<Newnote showalert={showalert} />} />
              <Route exact path='/devVault/codeVault' element={<CodeVault/>} />
              <Route exact path='/devVault/codeFormatter' element={<CodeFormatter/>} />
              <Route exact path='/devVault/textPrettier' element={<TextPrettier/>} />
              <Route exact path='/devVault/regexBuilder' element={<ComingSoon/>} />
              <Route exact path='/devVault/safeKeep' element={<ComingSoon/>} />

            </Routes>
          </div>
        </Router>
        <Footer/>
        </CodeVaultState>
      </NoteState>
      </UserState>
      </div>
    </>
  );
}

export default App;