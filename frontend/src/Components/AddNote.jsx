import React from "react";
import { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Viewnotes from "./Viewnotes";
import {
  Select,
  Textarea,
  Button,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
const AddNote = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { addNote } = context;
  const [note, setNotes] = useState({ title: "", description: "", tag: "" });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNotes({ title: "", description: "", tag: "" });
    props.showalert("Notes Added Successfully", "success");
  };
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <Stack marginTop={4}>
      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
        flexDirection="row"
      >
        <Text className="tool-title-text">NoteSafe</Text>
        <Button colorScheme="blue">Add Note</Button>
      </Flex>
      <Viewnotes/>
    </Stack>
    // <div>

    //     <div className="containerd my-3 fl-c">
    //         <h2>Add a note</h2>
    //         <form className='my-3 fl-c'>
    //             <div className="mb-3">
    //                 <label htmlFor="title" className="form-label">Title</label>
    //                 <input type="text" className="form-control" name='title' value={note.title} id="title" onChange={onChange} />
    //             </div>
    //             <div className="mb-3 ">
    //                 <label className="form-label" htmlFor="tag">Tag</label>
    //                 <input type="text" name="tag" className="form-control" id="tag" value={note.tag} onChange={onChange} />
    //             </div>
    //             <div className="mb-3">
    //                 <label htmlFor="description" className="form-label txt1">Description</label>
    //                 <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
    //             </div>

    //             <button type="submit" style={{width:"max-content",margin:"auto",cursor:"pointer"}} disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleclick}>Submit</button>
    //         </form>
    //     </div>
    // </div>
  );
};

export default AddNote;
