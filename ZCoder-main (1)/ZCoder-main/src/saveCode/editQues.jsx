import React from "react";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleArrows, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import List from "./list.jsx"
import ShowQues from "./showQues.jsx"
import FormQues from "./formQues.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from 'react-router-dom'

function editQues(){
    const props = useParams();
    const [privatee,setPrivatee] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (data) => {
        if(data === "Private"){
            document.getElementsByClassName("rdPublic").checked = false;
            if(privatee == true){
                console.log("button checkded");
            }else{
                console.log("button unchecked");
            }
            setPrivatee(!privatee);
        }
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        const question = document.getElementsByClassName("addQ")[0].value;
        const solution = document.getElementsByClassName("addS")[0].value;
        const id = props.id;
        const tag = privatee === true? "public":"private";

        console.log(id, question, solution, tag,"(((((((((((");

        const res = await fetch("http://localhost:1000/updateCode",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id, question, solution, tag
            })
        });
        const data =  await res.json();
        console.log(data);
        navigate("/savedProblems/"+props.email+"/"+props.name);
    }

    return (<>
                <header className="registration-header">
                    <div className="container">
                        <div className="logo">
                            <a href="index.html">ZCoder</a>
                        </div>
                        <nav>
                            <ul>
                            <li className="link">
                                    <a href={"/Home/"+props.email+"/"+props.name}>Home</a>
                                </li>
                                <li className="link">
                                    <a href={"/savedProblems/"+props.email+"/"+props.name}>Save Code</a>
                                </li>
                                <li className="link">
                                    <a href={"/CodeEditor/"+props.email+"/"+props.name}>Code Editor</a>
                                </li>
                                <li className="link">
                                    <a href={"/chatRoom/"+props.email+"/"+props.name}>Chat Room</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Logout</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="savedProblems">
                         <form className="add_show_saved">
                            <textarea placeholder="enter code question" className="addQ" defaultValue={props.Q}></textarea>
                            <textarea placeholder="enter code solution" className="addS" defaultValue={props.sol}></textarea>
                            <div className="radio_div">
                                <label>
                                    <input type="checkbox" className="rdPrivate" value="Private" onChange={() => handleChange("Private")}></input>
                                    <p className="radioPublic">Private</p>
                                </label>
                            </div>
                            <button className="submitQ" onClick={handleUpdate}>Update Question</button>
                        </form>
                    </div>
                </header>
                <ToastContainer containerId="id"/>
            </>);
}
export default editQues;