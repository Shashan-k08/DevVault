import React from 'react'
import { Link,useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useCustomToast from '../hooks/toast.hook';
const Navbar=(props)=> {
  const navigate = useNavigate();
  
  const { successToast} = useCustomToast();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    navigate("/login");
    successToast({
      title: 'User logged-out',
      description: "You have been logged out Successfully.",
    });
    //props.showalert("Logged-Out Successfully", "success")
  }
  let location = useLocation();

  useEffect(() => {
   console.log(location);
  }, [location]);
  return ( 
    <div >
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
     <Link  className="navbar-brand titl" to="/">iNoteBook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon "></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav navupd me-auto mb-2 mb-lg-0">
          <li className="nav-item mx-1">
           <Link   className= {`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/"   >Home</Link>
          </li>
          <li className="nav-item mx-1">
           <Link  className= {`nav-link ${location.pathname==="/newnote"?"active":""}`} to="/newnote"   >Add Note</Link>
          </li>
          <li className="nav-item mx-1">
           <Link  className= {`nav-link ${location.pathname==="/viewnotes"?"active":""}`} to="/viewnotes"   >View Notes</Link>
          </li>
          <li className="nav-item mx-1">
           <Link  className= {`nav-link ${location.pathname==="/about"?"active":""}`} to="/about"   >About</Link>
          </li>
       
        </ul>
       { !localStorage.getItem('token')? <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
        </form>:<button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  </div>
  )
}

export default Navbar
