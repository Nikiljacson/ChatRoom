import React, { useState ,useEffect} from "react";
import axios from "axios";

function RegisterPage(){
    const [uname,setUname] = useState("");
    const [pwd,setPwd] = useState("");
    const [confirmPwd,setConfirmPwd]=useState("");
    const [existingUName,setExistingUName] = useState([]);

useEffect(()=>{
    const getUserNames=async()=>{
        const users = await fetch("http://localhost:8084/register/logincheck");
        const data =await users.json();
        const unameArray = data.map(obj => obj.username);
        setExistingUName(unameArray);
        console.log(unameArray);
    }
    getUserNames();
},[uname])
    
    const checkUserName=(uname)=>{
        const loginData=(
            {
                username:uname,
                password:pwd
            }
        );
        if(existingUName.includes(uname))
        {
            alert("Username Already Exists");
        }
        else if(uname==="" || pwd==="")
        {
            alert("Enter Username and Password")
        }
        else if(confirmPwd != pwd)
        {
            alert("Enter Correct Passowd")
        }
        else{
            axios.post("http://localhost:8084/register",loginData);
            alert("Registered Successfully");
            alert("Login Now")
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        checkUserName(uname);
        setUname("");
        setPwd("");
        setConfirmPwd("");
    }
    
       return(
        <div>
        <h1>User Registeration</h1>
        <label>Username</label>
        <input type="text" name="username" value={uname} onChange={(e)=>{setUname(e.target.value)}}/><br/>
        <label>Password</label>
        <input type="text" name="password" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/><br/>
        <label>Confirm Password</label>
        <input type="text" value={confirmPwd} onChange={(e)=>{setConfirmPwd(e.target.value)}}/><br/>
        <button type="submit" onClick={(e)=>{handleSubmit(e)}}>Register</button>
        </div>
    );
}





export default RegisterPage;