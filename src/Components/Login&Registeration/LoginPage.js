
import React,{useState,useEffect} from "react";
import MessageRoom from '../Rooms/MessageRoom';
import RegisterPage from "./RegisterPage";



function LoginPage(){
    const [uname,setUname] = useState("");
    const [pwd,setPwd] = useState("");
    const [success,setSuccess] = useState(false);
    const [reg,setReg] = useState(false);

        const getUserNames=async()=>{
            const users = await fetch("http://localhost:8084/register/logincheck");
            const data =await users.json();
            console.log(data);
            const finder=data.find(user => user.username === uname && user.password === pwd);
            console.log(finder);
            if(finder){
                setSuccess(true);
                alert("Login Successful");
                setReg(false);
            }
            else if(uname === "" || pwd === ""){
                alert("Invalid Username or Password");
            }
            else{
                alert("Invalid Username or Password");
            }
            
        }

    const handleSubmit=()=>{
        const userData = {
            username:uname,
            password:pwd
        }
        console.log(userData);
        getUserNames();
        
    }

    

    return(
        <div>
        {success && <MessageRoom username={uname}/>}
        {!success && 
        <div>
        <h1>User Login</h1>
        <label>Username</label>
        <input type="text" name="username" value={uname} onChange={(e)=>{setUname(e.target.value)}}/><br/>
        <label>Password</label>
        <input type="text" name="password" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/><br/>
        <button type="submit" onClick={handleSubmit}>Login</button>
        <h5 onClick={()=>{setReg(true)}}>Register</h5>
        </div>
        }
        {reg && <RegisterPage/>} 
        </div>

        
        
    );
}



export default LoginPage;