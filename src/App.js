import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/Login&Registeration/LoginPage';
import RegisterPage from './Components/Login&Registeration/RegisterPage';
import React,{useState} from 'react';
import MessageRoom from './Components/Rooms/MessageRoom';

function App() {


  return (
    <div className="App">

     <LoginPage/>
     
    </div>
  );
}

export default App;
