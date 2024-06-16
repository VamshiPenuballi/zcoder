import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

const FormQues = () => {

    const [code, setCode] = useState({});
    const [call, setCall] = useState(true);

    const Email = useParams();

    const handleAddEvent = async(e) => {
        e.preventDefault();
        const question = document.getElementsByClassName("addQ")[0].value;
        const solution = document.getElementsByClassName("addS")[0].value;
        const email = Email.email;
        const tag = "private";

        console.log(question, solution, email, tag,"(((((((((((");

        const res = await fetch("http://localhost:1000/saveCode",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, question, solution, tag
            })
        });
        const data =  await res.json();
        console.log(data);
        // setCall(!call);
        filteredEvents();
        // useEffect(() => {filteredEvents()}, [code, {handleAddEvent}]);
    };

    const filteredEvents = async() => {
        const email = Email.email;
        const url = new URL("http://localhost:1000/saveSearch/"+email);
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
        setCode(code => (data));
        console.log("code", code);
        // return(data);
    }

    useEffect(() => {filteredEvents()},[call]);
    
    return (<>
                <form className="add_show_saved" onSubmit={handleAddEvent}>
                            <textarea placeholder="enter code question" className="addQ"></textarea>
                            <textarea placeholder="enter code solution" className="addS"></textarea>
                            <div className="radio_div">
                                <label>
                                    <input type="checkbox" className="rdPublic"></input>
                                    <p className="radioPublic">Public</p>
                                </label>
                                <label>
                                    <input type="checkbox" className="rdPrivate"></input>
                                    <p className="radioPublic">Private</p>
                                </label>
                            </div>
                            <button className="submitQ">Add Question</button>
                        </form>
            </>);
};

export default FormQues;