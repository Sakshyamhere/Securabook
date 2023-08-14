import React, { useEffect, useState } from 'react'

export const Userinfo = () => {
 
   const UserInfo = async() => {
     

        const response = await fetch(`http://localhost:5000/api/auth/user`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
        "Auth-token": localStorage.getItem("token"),
          },
         
        });
        const json = await response.json();
        setUser(json);
    }
 const [user, setUser] = useState({email: "" , name: ""})

 useEffect(() => {
   UserInfo();
 }, [])
 
  return (
    <div>
        <div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInputDisabled" placeholder="name@example.com" value={user.name} disabled/>
  <label for="floatingInputDisabled">Username</label>
</div>
<div className="form-floating mb-3">
  <input type="email" className="form-control" id="floatingInputDisabled" placeholder="name@example.com" value={user.email} disabled/>
  <label for="floatingInputDisabled">Email address</label>
</div>
    </div>
  )
}


