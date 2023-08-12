import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { mode } = props;
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Redirect
      props.showAlert("Logged In Successfully", "success");
      localStorage.setItem("token", json.authToken);
      navigate("/");
    } else {
      props.showAlert("Enter Valid Credentials", "danger");
    }
  };

  const handelOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`container my-3 bg-${mode} text-${
        mode === "dark" ? "light" : "dark"
      }  mb-2 mb-lg-0 `}
      style={{ padding: "20px", borderRadius: "20px" }}
    >
      <h1>Login</h1>
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handelOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
