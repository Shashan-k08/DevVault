import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'

import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
const Viewnotes = (props) => {
    const context = useContext(noteContext);
    const { notes, getnotes,editNote } = context;
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token'))
        {
        getnotes();

        }
        else
        {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose=useRef(null);
    const [note, setNotes] = useState({ id:"",etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        console.log(currentNote);
      
        setNotes({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }


    const handleclick = (e) => {
        console.log("Updating the note...", note);
        refClose.current.click();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        props.showalert("Notes Updated Successfully","success",)
    }
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }
  return (
    <div>
          <div className='row my-3'>

<h2>Your notes</h2>
<div className="container"> {notes.length===0 && "No notes to display"}</div>
{
    notes.map((note) => {
        return <Noteitem key={note._id} updateNote={updateNote} showalert={props.showalert} note={note} />
    })
}
</div>
    </div>
  )
}

export default Viewnotes