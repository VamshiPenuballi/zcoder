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
    
    const code = props.code;
    const [ccode, setCcode] = useState({});
    const email = props.Email.email;

    const handleShowQues = (e) => {
        console.log(e);
        console.log(e.target.outerText.trim());
        props.setQues(e.target.outerText.trim());
        props.setShowSol(true);
        getEntry(e);
    }
    useEffect(()=>{getEntry},[]);

    const getEntry = async(e) => {
        const Q = e.target.outerText.trim();
        const url = new URL("http://localhost:1000/codeSearch/"+email+"/"+Q);
        console.log("Q $ email for call are: ",Q,email)
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
        console.log("%%%%%",data);
        setCcode(ccode => (data));
        await props.setSol(data[0].solution);
        await props.setTag(data[0].tag);
        await props.setId(data[0]._id);
        console.log("props.sol=",props.sol,"solution=",data.solution);
        console.log("cccode", ccode);
        // return(data);
    }

    // getEntry();

    const handleClick = async(e) => {
        console.log(e);
        const res = await fetch("http://localhost:1000/savedCode/delete",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                codeid: e,
            })
        });
        const data =  await res.json();
        console.log("%%%%%",data);
        props.filteredEvents();
        
            if(res.status == 201){
                toast.success(data.message, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    toastId: 14     
                    });
            }else{
                toast.error(data.error, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    toastId: 14     
                    });
            } 
        
    }



    return (
        <div className="event-list">
            <h2>Events</h2>
            {code.length > 0 ? (
                <ul>
                    {code.reverse().map((c, index) => (
                        <label>
                        <li key = {index} onClick={handleShowQues}>
                            {/* <p>
                                <strong>Date:</strong> {event.date}
                            </p> */}
                            <p>
                                <strong>&nbsp; &nbsp;</strong> {c.question}
                            </p>
                            {/* <p>
                                <strong>Solution:</strong> {c.solution}
                            </p> */}
                        </li>
                        {/* <button className="deleteCode" onClick={() => handleClick(c._id)}>Delete</button> */}
                        <hr />
                        </label>
                    ))}
                </ul>
            ) : (
                <p>No events today</p>
            )}
            <ToastContainer />
        </div>
    );
};

export default List;
