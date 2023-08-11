//Part of Context api.
import { useState } from "react";
import NoteContext from "./NoteContext";

function NoteState(props) {
  const host = "http://localhost:5000/api/";
  const initialNotes = [];

  //Get notes
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}notes/fetchnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZmRjYzMxZjkyMDI5MzIzOWYwMWRhIn0sImlhdCI6MTY5MTM0NDU1M30.F7PVkbfgZeYdd6wWPCSW8spomQ_JR8hd38UkzL8rf3c",
      },
    });
   const json = await response.json();
   setNotes(json);

  };

  const [notes, setNotes] = useState(initialNotes);
  //Add Note
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}notes/postnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZmRjYzMxZjkyMDI5MzIzOWYwMWRhIn0sImlhdCI6MTY5MTM0NDU1M30.F7PVkbfgZeYdd6wWPCSW8spomQ_JR8hd38UkzL8rf3c",
      },

      body: JSON.stringify({ title, description, tag }),
    });
   

    //Add Logic
    const noteAdd = await response.json()
    setNotes(notes.concat(noteAdd));
  };

  //Del Note
  const delNote = async(id) => {
    //Api Call'
    const response = await fetch(`${host}notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZmRjYzMxZjkyMDI5MzIzOWYwMWRhIn0sImlhdCI6MTY5MTM0NDU1M30.F7PVkbfgZeYdd6wWPCSW8spomQ_JR8hd38UkzL8rf3c",
      },

      // body: JSON.stringify({}),
      
    });

    
    //Delete logic
    const deletedNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(deletedNote);
  };

  //Edit Note
  const editNote = async (title, description, tag, id) => {
    //Api call
    const response = await fetch(`${host}notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjZmRjYzMxZjkyMDI5MzIzOWYwMWRhIn0sImlhdCI6MTY5MTM0NDU1M30.F7PVkbfgZeYdd6wWPCSW8spomQ_JR8hd38UkzL8rf3c",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    let updatedNotes =  JSON.parse(JSON.stringify(notes))
 
    //Logic Edit
    for (let index = 0; index < updatedNotes.length; index++) {
      const element = updatedNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(updatedNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, delNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
