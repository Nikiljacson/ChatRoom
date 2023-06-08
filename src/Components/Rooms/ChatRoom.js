import axios from "axios";
import React, { useEffect, useState } from "react";

function ChatRoom(props) {

    const [chat,setChat] = useState("");

    const [roomChats,setRoomChats] = useState([]);

    const uname = props.username;


    useEffect(()=>{
        const getChats=async()=>{
            const users = await fetch("http://localhost:8084/register/showChats");
            const data =await users.json();
            console.log(data);
            setRoomChats(data);
        }
        const timer = setTimeout(()=>{
            getChats();
        },1000);

        return ()=>{
            clearTimeout(timer);
        };
        
    },[chat])

    const handleSend = () =>{

        const chatdata = {
            username:props.username,
            chat:chat
        }
        axios.post("http://localhost:8084/register/addChat",chatdata);
        setChat("");

    }

    return(
        
        <div>
            <h1>{props.username}'s Chat Room</h1>
            <br/>
            <div>
            
                {roomChats.map((chatObj, index) => (
                    <h4 key={index}>
                        {chatObj.username}:  {chatObj.chat}
                    </h4>
                    ))}
            
            </div>
            <input type="text" value={chat} onChange={(e)=>{setChat(e.target.value)}}/>
            <button onClick={handleSend}>Send</button>
        </div>
    );
}


export default ChatRoom;