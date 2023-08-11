import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./Context/Notes/NoteState";
import { useState } from "react";
import Alert from "./components/Alerts";

function App() {
  const [mode, setmode] = useState("light");
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert("null");
    }, 1300);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "#050100";
      document.body.style.color = "white";
      showAlert("Dark mode is enabled", "success");
      document.getElementById("textMode").innerHTML = "Enable Light Mode";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      showAlert("Light mode is enabled", "success");
      document.getElementById("textMode").innerHTML = "Enable Dark Mode";
    }
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <div className="container my-3">
            <Routes>
              <Route
                path="/"
                element={<Home mode={mode} showAlert={showAlert} />}
              ></Route>
              <Route
                path="about"
                element={<About mode={mode} showAlert={showAlert} />}
              >
                {" "}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
