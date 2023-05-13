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
    const { notes, getnotes,editNote } = context;

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
        <>  
            <AddNote showalert={props.showalert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" name='etitle' id="etitle" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3 ">
                                    <input type="text" name="etag" value={note.etag} className="form-label" id="etag" onChange={onChange} />
                                    <label className="form-label" htmlFor="etag">Tag</label>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button"  onClick={handleclick}  disabled={note.etitle.length<5||note.edescription.length<5} className="btn btn-primary">Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>

                <h2>Your notes</h2>
                <div className="container"> {notes.length===0 && "No notes to display"}</div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} showalert={props.showalert} note={note} />
                    })
                }
            </div>

        </>
    )
}

export default Notes
