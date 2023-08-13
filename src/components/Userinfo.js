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
        <p>{user.email}</p>
        <p>{user.name}</p>
    </div>
  )
}


