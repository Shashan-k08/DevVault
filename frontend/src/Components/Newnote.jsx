import React from 'react'
import Notes from './Notes'

const Newnote = (props) => {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Notes showalert={props.showalert} />

    </div>
  )
}

export default Newnote