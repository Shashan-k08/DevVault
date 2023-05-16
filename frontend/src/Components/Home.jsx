import React from 'react'
import Footer from './Footer';
// import { useNavigate } from "react-router-dom";


import Notes from './Notes';
const Home = (props) => {
  // const navigate = useNavigate();
  // const login=()=>{
  //   navigate("/login");
  // }
 
  return (
    <div className='fl-c box-wrapper'>
    <h6>Tap to Add or View Notes</h6>
    <div className='fl-r button-box'>
     
    <div className="add-box"> <button>Add Notes</button></div>
    <div className="view-box"> <button>View Notes</button></div>
       
       {/* <Notes showalert={props.showalert} /> */}
   

    </div>
    </div>
  )
}

export default Home