import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {

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
            props.showAlert("Logged In" , "success")
            localStorage.setItem('token', json.authToken)
            navigate("/");
        }
        else {
            props.showAlert("Enter Valid Credentials" , "danger")
        }
     
      }
  
 

  const handelOnChange = (e) => {
    setCredentials({ ...credentials,[e.target.name]: e.target.value });
  };

  return (
    <div>
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
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
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
