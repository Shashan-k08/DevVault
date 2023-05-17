import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "https://inotebook-id7a.onrender.com";
    const notesInitial = []


    //Get all notes
    const getnotes = async () => {
        // Api call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            }
        })
        const json = await response.json()
        console.log(json);
        setNotes(json)
    }
    // Add a note

    const addNote = async (title, description, tag) => {
        //Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {

                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
             },
            body: JSON.stringify({ title, description, tag })
        })
        // eslint-disable-next-line
        const json = await response.json;
        console.log("Adding a new note")
        const note = await response.json();
        setNotes(notes.concat(note));

    }
    //Delete note

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'aplication/json',
                "auth-token":localStorage.getItem('token')},

        })
        
        const json = response.json();
        console.log(json);
        console.log("Deleteing the note with id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);

    }
    // Edit note
    const editNote = async (id, title, description, tag) => {
        //Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        // eslint-disable-next-line
        const json = await response.json();
        let Newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < Newnotes.length; index++) {
            const element = Newnotes[index];
            if (element._id === id) {
                Newnotes[index].title = title;
                Newnotes[index].description = description;
                Newnotes[index].tag = tag;
                break;
            }
        }
        setNotes(Newnotes);
    }

    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes, deleteNote, editNote, addNote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;