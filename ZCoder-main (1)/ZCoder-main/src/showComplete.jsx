import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
// import { get } from "mongoose";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import "./EventListComponent.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowComment from "./showComment";

const showComp = (props) => {
    const ques = props.ques;
    const sol = props.sol;
    const tag = props.tag;
    const readmore = props.readmore;
    const setReadmore = props.setreadmore;
    const [comment, setComment] = useState(false);
    const [value, setValue] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        setReadmore(!readmore);
    }

    const showCommt = (e) => {
        e.preventDefault();
        setComment(!comment);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }
    
    const handleAddCommt = async(e) => {
        e.preventDefault();
        console.log(e);
        // console.log(name, email, password, age, github, score, problems_saved, problems_solved);
        console.log(value);
        const question = ques;
        const cmt = value;
        const res = await fetch("http://localhost:1000/addComment",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                question, cmt
            })
        });
        const data =  await res.json();
        console.log("data",data);
        localStorage.setItem("token", data);
        showComment();
        // const data = await res.json();

    }

    const [ct, setCt] = useState([]);

    const showComment = async(e) => {
        const q = props.ques;
        console.log(q);
        const url = new URL("http://localhost:1000/quescomment/"+q);
        const res = await fetch(url.href,{
            method:"GET",
            headers: {
                "Accept" : "application/json"
            }
        });
        setCt(await res.json());
        // data =  await res.json();
        // console.log("%%%%%",data);
        // cmt = {...data};
        
        console.log(ct);
    }
    
    useEffect(() => {showComment()},[]);
    // useEffect(() => {
    //     showComment()
    // },[]);
    console.log("ct",ct);

    
    return (
        <div className="q-list">
            <div className="detailsD">
                <p className="details"><strong>By</strong> {props.name}</p>
                <hr/>
                <p className="details"><strong>On</strong> {props.time}</p>
            </div>
            <div className="displayQ">{ques}</div>
            <div className="displayS">{sol}</div>
            <p className="tag"><label>Tag:</label> {tag}</p>
            <button onClick={handleClick} className="displayBack">Back</button>
            {!comment ? <button onClick={showCommt} className="displayCmmt">Show Comment</button>:<button onClick={showCommt} className="displayCmmt">Hide Comment</button>}
            
            {!comment ? <></> :
                <>
                    <ShowComment ques = {ques} ct={ct}/>
                    <div className="cmmtTag">
                        <input type="text" placeholder="add a comment" value={value} onChange={handleChange} className="commentInput"></input>
                        <button onClick={handleAddCommt} className="commentBtn">Add</button>
                    </div>
                    
                </> 
            }
            <ToastContainer />
        </div>
    );
};

export default showComp;