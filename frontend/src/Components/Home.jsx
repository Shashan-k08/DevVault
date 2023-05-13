import React from 'react'
// import { useNavigate } from "react-router-dom";


import Notes from './Notes';
const Home = (props) => {
  // const navigate = useNavigate();
  // const login=()=>{
  //   navigate("/login");
  // }
 
  return (
  
    <div>
    
       
       <Notes showalert={props.showalert} />
    

    </div>
  )
}

export default Home