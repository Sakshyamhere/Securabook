import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  //Destructure
  const { notes, getNotes, editNote } = context;


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    }
    else {
      navigate("/login")
    }
  }, []);

  const { mode } = props;
  //Use ref hook
  const ref = useRef(null);

  const closeRef = useRef(null);

  const updateNote = (editedNote) => {
    ref.current.click();
    setNote({
      id: editedNote._id,
      edittitle: editedNote.title,
      edittag: editedNote.tag,
      editdescription: editedNote.description,
    });
  };

  const [note, setNote] = useState({
    edittitle: "",
    editdescription: "",
    edittag: "general",
    id: "",
  });

  const handelOnchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    closeRef.current.click();
    editNote(note.edittitle, note.editdescription, note.edittag, note.id);
    props.showAlert("Note Updated", "success");
    console.log(note);
  };

 

  return (
    <div className="container">
      <Addnote showAlert={props.showAlert} mode={props.mode} />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className={`modal fade `}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className={`modal-dialog modal-dialog-centered 
        }`}
        >
          <div
            className={`modal-content my-3 bg-${mode} text-${
              mode === "dark" ? "light" : "dark"
            }  mb-2 mb-lg-0 `}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <form
                className={`container my-3 bg-${mode} text-${
                  mode === "dark" ? "light" : "dark"
                }  mb-2 mb-lg-0 `}
                style={{ padding: "20px", borderRadius: "20px" }}
              >
                <div className="mb-3">
                  <label htmlFor="edittitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="title"
                    value={note.edittitle}
                    className="form-control"
                    id="edittitle"
                    name="edittitle"
                    onChange={handelOnchange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editdescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="Description"
                    value={note.editdescription}
                    className="form-control"
                    id="editdescription"
                    name="editdescription"
                    onChange={handelOnchange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edittag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="edittag"
                    value={note.edittag}
                    className="form-control"
                    id="ediitag"
                    name="edittag"
                    onChange={handelOnchange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={closeRef}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handelUpdate}
                className="btn btn-primary"
                disabled={
                  note.edittitle.length <= 2 ||
                  note.editdescription.length <= 10 ||
                  note.edittag === ""
                }
                required
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container my-3">
          {notes.length === 0 && "No notes Available"}
        </div>
        {notes.map((note) => {
          return (
            <div className="col-md-3 my-3 " key={note._id}>
              <Noteitem
                title={note.title}
                description={note.description}
                id={note._id}
                tag={note.tag}
                mode={mode}
                updateNote={updateNote}
                showAlert={props.showAlert}
                note={note}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Notes;
