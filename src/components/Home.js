import React from "react";
import Notes from "./Notes";

function Home(props) {
  return (
    <div>
      <Notes mode={props.mode} showAlert={props.showAlert}/>
    </div>
  );
}

export default Home;
