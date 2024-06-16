import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
// import { get } from "mongoose";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import "./EventListComponent.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = (props) => {
    
    const chat = props.chat;
    const user = props.user;
    const email = props.email;

    return (
        <div className="chat-list">
            {chat.length > 0 ? (
                <div className="Chatcontainer">
                    {chat.map((c,i) => (
                            c.email==email?  
                            <div key={i} className="self">
                                <p className="name">{c.name}</p>
                                <p className="chat">{c.chat}</p>    
                            </div> :
                            <div key={i} className="other">
                                <p className="name">{c.name}</p>
                                <p className="chat">{c.chat}</p>    
                            </div>
                    ))}
                </div>
            ) : (
                <p>No events today</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default List;