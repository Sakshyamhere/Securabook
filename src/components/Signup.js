import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [newUser, setNewUser] = useState({ email: "", password: "", name: "" , cpassword:"" });
const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Redirect
      props.showAlert("Signed In", "success");
      localStorage.setItem("token", json.authToken);
      navigate("/");
    }
  };

  const handelOnChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handelOnChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="name"
            name="name"
            className="form-control"
            id="exampleInputText"
            aria-describedby="emailHelp"
            onChange={handelOnChange}
            required
          minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handelOnChange}
            required
            minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="exampleInputPassword2"
            onChange={handelOnChange}
            required
            minLength={8}
          />
        </div>

        <button disabled={newUser.password.length<8 || newUser.password!==newUser.cpassword} type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
