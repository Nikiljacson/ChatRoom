import React,{useState,useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import RegisterPage from "../Login&Registeration/RegisterPage";
import ChatRoom from './ChatRoom';

function MessageRoom(props) {
    
    const [addRoomMate,setAddRoomMate] = useState();
    const [usernames,setUserNames] = useState();
    const [chatRoom,setChatRoom] = useState(false);
    const [mateCount,setMateCount] = useState(0);

    const [mateCheck, setMateCheck] = useState([]);

    useEffect(()=>{
        const getUserNames=async()=>{
            const users = await fetch("http://localhost:8084/register/logincheck");
            const data =await users.json();
            const unameArray = data.map(obj => obj.username);
            setUserNames(unameArray);
        }
        getUserNames();
    },[addRoomMate])

    const handleAddmate = () => {
        console.log(usernames);
        console.log(addRoomMate);
        const roommateName = {
            roommatename:addRoomMate
        }

        const addname = addRoomMate;

        const newArray = [...mateCheck, addname];

        setMateCheck(newArray);

        console.log(mateCheck);

        if(mateCount<=3){
            if(usernames.includes(addRoomMate)){
                if(!mateCheck.includes(addRoomMate)){
                axios.post("http://localhost:8084/register/addRoomMates",roommateName);
                alert("User Added Successfully");
                setMateCount(mateCount+1);
                setAddRoomMate("");
                console.log(mateCount);
                }
                else{
                    alert("User Already Added");
                }
            }
            else{
                alert("User is not Registered");
            }
    }
        else if(mateCount>=4){
            alert("Room Full");
        }
    }
    
    const handleChatRoom=()=>{
       if(mateCount>0){
        setChatRoom(true);

       }
       else{
        setChatRoom(false);
        alert("Add Room Mates");
       }
    }

    return (
        <div>
        {chatRoom && <ChatRoom username={props.username}/>}
        {!chatRoom &&
        <div>
        <h2>Add Your Room Mates {props.username}</h2>
            
            <div >                
                <label>Enter Room Mate's Username</label><br/>
                <input type="text" value={addRoomMate} onChange={(e)=>{setAddRoomMate(e.target.value)}}/>
                <button type="Submit" onClick={handleAddmate}>Add</button>
            </div>
    
        <button onClick={handleChatRoom}>Start Chat</button>
        </div>}
        </div>
    );
}

export default MessageRoom;