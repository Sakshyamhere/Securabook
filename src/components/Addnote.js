import React, { useContext, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";

function Addnote(props) {
  const { mode } = props;

  const context = useContext(NoteContext);
  //Destructure
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handelOnchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Note Added", "success");
  };

  return (
    <div
      className={`container my-3 bg-${mode} text-${
        mode === "dark" ? "light" : "dark"
      }  mb-2 mb-lg-0 `}
      style={{ padding: "20px", borderRadius: "20px" }}
    >
      <h1>Your Notes</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="title"
            className="form-control"
            id="title"
            name="title"
            onChange={handelOnchange}
            value={note.title}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="Description"
            className="form-control"
            id="description"
            name="description"
            onChange={handelOnchange}
            value={note.description}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Tag
          </label>
          <input
            type="tag"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handelOnchange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handelSubmit}
          disabled={
            note.title.length <= 2 ||
            note.description.length <= 10 ||
            note.tag === ""
          }
        >
          Add Notes
        </button>
      </form>
    </div>
  );
}

export default Addnote;
