import React from 'react'
import Notes from './Notes'

const Newnote = (props) => {
  return (
    <div >
        <Notes showalert={props.showalert} />
    </div>
  )
}

export default Newnote