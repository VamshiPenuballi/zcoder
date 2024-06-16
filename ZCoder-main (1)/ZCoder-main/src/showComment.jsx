import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
// import { get } from "mongoose";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import "./EventListComponent.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showComp = (props) => {
    const ques = props.ques;
    const ct = props.ct;
    console.log("props.ct=", ct[0]);


    return (
        <div className="comment-list">
            <h1>Comments</h1>
            {ct.length > 0 ? (
                <ul>
                    {ct.map((c, index) => (
                        <label>
                        <p>{c.cmt}</p>
                        <br/>
                        </label>
                        
                    ))}
                </ul>
            ) : (
                <p>No comments</p>
            )}
            
        </div>
    );
};

export default showComp;