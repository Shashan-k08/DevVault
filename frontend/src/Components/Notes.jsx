import React from 'react'
import { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
    const context = useContext(noteContext);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const { notes, getnotes, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getnotes();

        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNotes] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        console.log(currentNote);

        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }


    const handleclick = (e) => {
        console.log("Updating the note...", note);
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showalert("Notes Updated Successfully", "success",)
    }
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote showalert={props.showalert} />
           

        </>
    )
}

export default Notes
