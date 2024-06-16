import React from "react";
import { Link, useParams } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import { useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import List from "./list";

function chatRoom(){

    const [user,setUser] = useState("");
    const [value, setValue] = useState("");
    const [msg, setMsg] = useState([]);
    const [cuser,setCuser] = useState([]);
    const Email = useParams();


    useEffect(() => {

        socket.on('message', (message) => {
            console.log("Message: ",message);
            setMsg((msg) => [...msg, message]);
            // const p = document.createElement("p");
            // p.innerText = message;
            // allMessages.appendChild(p);
        });
        socket.on('name', (name) => {
            console.log("name: ",name);
            setCuser((cuser) => [...cuser, name]);
            // const p = document.createElement("p");
            // p.innerText = message;
            // allMessages.appendChild(p);
        });

        return () => {
            socket.disconnect();
        };

    },[]);

    const socket = useMemo(() => io("http://localhost:1500"), []);
    const sendBtn = document.querySelector(".sendBtn");
    const messageInput = document.querySelector(".message");
    const allMessages = document.querySelector(".messages");

    // useEffect(() => {handleChat}, [cuser, msg]);

    const handleChat = async() => {
        const chat = messageInput.value;
        const name = user;
        const email = Email.email
        console.log(chat, "user = ",user);
        const res = await fetch("http://localhost:1000/sendChat",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                chat, name, email
            })
        });
        const data =  await res.json();
        console.log("data",data);
        localStorage.setItem("token", data);
    };
      

    var scrollableDiv = document.querySelector('.chatRoom');
    
    // sendBtn.addEventListener("click", (e) => {
    //     const message = messageInput.value;
    //     // console.log(message);
    //     socket.emit('user-message', message);
    //     scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    // });

    const handleBtnClick = async() => {
        // await getUser();
        const message = messageInput.value;
        socket.emit('user-message', message);
        socket.emit('user-name', user);
        setValue("");
        scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        await handleChat();
        // getChat();
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    
    const [code, setCode] = useState({});

    const getUser = async() => {
        const email = Email.email;
        console.log(email);
        const url = new URL("http://localhost:1000/chatRoom/search/"+email);
        const res = await fetch(url.href,{
            method:"GET",
                headers: {
                "Accept" : "application/json"
            }
        });
        const data =  await res.json();
        // const newEvent = {
        //     title: data.Title,
        //     description: data.Description,
        //     date: data.date
        // };
        console.log("%%%%%",data[0].name);
        setUser(data[0].name);
        console.log(data[name]);
        console.log("code", code);
        // return(data);
    }

    useEffect(() => {getUser()}, []);

    const [cchat, setCchat] = useState([]);

    const getChat = async() => {
        const url = new URL("http://localhost:1000/chatSearch");
        const res = await fetch(url.href,{
            method:"GET",
                headers: {
                "Accept" : "application/json"
            }
        });
        const data =  await res.json();
        console.log("%%%%%^^^^",data);
        setCchat(data);
    }

    useEffect(() => {getChat()}, []);

    return (<>
                <header className="registration-header">
                    <div className="container">
                        <div className="logo">
                            <a href="index.html">ZCoder</a>
                        </div>
                        <nav>
                            <ul>
                                <li className="link">
                                    <a href={"/Home/"+Email.email+"/"+Email.name}>Home</a>
                                </li>
                                <li className="link">
                                    <a href={"/savedProblems/"+Email.email+"/"+Email.name}>Save Code</a>
                                </li>
                                <li className="link">
                                    <a href={"/CodeEditor/"+Email.email+"/"+Email.name}>Code Editor</a>
                                </li>
                                <li className="link">
                                    <a href={"/chatRoom/"+Email.email+"/"+Email.name}>Chat Room</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Logout</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                
                    <div className="main">
                        {/* <div className="sideBar">
                            <h1>Sidebar</h1>
                            <h2>for fun</h2>
                        </div> */}
                        <div className="chatRoom">
                            <h1>Chatting room</h1>
                    
                            <div className="messages">
                                <List chat={cchat} user={user} email = {Email.email} />
                            {msg.map((m,i) => (
                                    cuser[i]==user? 
                                    <div key={i} className="self">
                                    <p className="name">{cuser[i]}</p>
                                    <p className="chat">{m}</p>    
                                </div> :
                                    <div key={i} className="other">
                                        <p className="name">{cuser[i]}</p>
                                        <p className="chat">{m}</p>    
                                    </div>
                            ))}
                            </div>
                            <footer>
                                <input type="text" className="message" id="message" name="message" placeholder="Enter message" onChange={handleChange} value={value}></input>
                                <button className="sendBtn" onClick={handleBtnClick}><FontAwesomeIcon icon={faPaperPlane} /></button>
                            </footer>
                        </div>
                    </div>
                </header>

                <script src="/socket.io/socket.io.js"></script>
            </>);
}
export default chatRoom;