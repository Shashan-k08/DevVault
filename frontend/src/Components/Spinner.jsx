import React from "react";
import "../index.css";
const Spinner = (props) => {
  return (
    <>
        <div className="lds-box">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        
          <div> {props.value}...</div>
        </div>
    
    </>
  );
};

export default Spinner;
