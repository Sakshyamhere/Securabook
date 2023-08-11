import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

function Noteitem(props) {
  const context = useContext(NoteContext);
  //Destructure
  const { delNote } = context;
  const { mode, updateNote, note } = props;

  const handelDelete = (e) => {
    delNote(props.id);
    props.showAlert("Note Deleted", "danger");
  };

  return (
    <div>
      <div
        className={`card my-3 bg-${mode} text-${
          mode === "dark" ? "light" : "dark"
        } `}
        style={{ width: "18rem" }}
      >
        <span
          className={`position-absolute top-0 translate-middle badge rounded-pill bg-${
            mode === "light" ? "dark" : "light"
          } text-${mode}`}
          style={{
            left: "50%",
            zIndex: 1,
          }}
        >
          {props.tag}
        </span>
        <div className="card-body">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-text">{props.description}</p>
          <i
            className="fa-solid fa-user-pen"
            onClick={() => {
              updateNote(note);
            }}
          />
          <i
            className="fa-solid fa-trash  mx-3"
            style={{ color: "#51331f" }}
            onClick={handelDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
