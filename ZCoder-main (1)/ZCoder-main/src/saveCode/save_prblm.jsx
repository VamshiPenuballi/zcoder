import React from "react";
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import List from "./list.jsx"
import ShowQues from "./showQues.jsx"
import FormQues from "./formQues.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function savePrblm(props){

    const [code, setCode] = useState({});
    const [call, setCall] = useState(true);
    const [callSQ, setCallSQ] = useState(true);
    const [showSol, setShowSol] = useState(false);
    const [ques, setQues] = useState();
    const [sol, setSol] = useState();
    const [tag, setTag] = useState();
    const [id, setId] = useState();
    const [user, setUser] = useState({});

    const Email = useParams();
    const handleAddEvent = async(e) => {
        e.preventDefault();
        const question = document.getElementsByClassName("addQ")[0].value;
        const solution = document.getElementsByClassName("addS")[0].value;
        const email = Email.email;
        const name = Email.name;
        const tag = privatee === true? "public":"private";

        console.log(name, question, solution, email, tag,"(((((((((((");

        const res = await fetch("http://localhost:1000/saveCode",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, question, solution, tag
            })
        });
        const data =  await res.json();

        if (!toast.isActive(13, "id")){
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
                    toastId: 13     
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
                    toastId: 13     
                    });
            } 
        }
            
        
        // setCall(!call);
        filteredEvents();   
};

        const updatePSaved = async(ps) => {
            const email = Email.email;
            const problems_saved = ps;
            const res = await fetch("http://localhost:1000/psaved",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, problems_saved
            })
            });
            const data =  await res.json();
            console.log(data);
        }

        // useEffect(() => {
        //     updatePSaved(code.length)
        // }, [call]);
        // const getPSaved = async() => {
        //     const email = Email.email;
        //     console.log(email);
        //     const url = new URL("http://localhost:1000/getUser/"+email);
        //     const res = await fetch(url.href,{
        //         method:"GET",
        //         headers: {
        //             "Accept" : "application/json"
        //         }
        //     });
        //     const data = (await res.json());
        //     // data =  await res.json();
        //     // console.log("%%%%%",data);
        //     // cmt = {...data};
        //     console.log(data);
        //     setUser(data);
        //     console.log(user);
        // }
        // const [psaved, setPsaved] = useState(0);
        // useEffect(() => {
        //     getPSaved();
        // },[]);
        // useEffect(() => {
        //     setPsaved(user);
        // },[user]);


    const handleAddSnippet = () => {
        setShowSol(false);
    }

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
        updatePSaved(data.length);
        // return(data);
    }
    // filteredEvents();
    // document.onload(setCall(!call));
    // setCall(!call);
    useEffect(() => {filteredEvents()},[call]);
    

    const [privatee, setPrivatee] = useState(true);
 
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
                    <div className="savedProblems">
                        <div className="showSaved">
                            <h2>Saved Problems</h2>
                            <List code = {code} setShowSol={setShowSol} showSol={showSol} setQues={setQues} ques={ques} setSol={setSol} sol={sol} setTag={setTag} tag={tag} Email={Email} filteredEvents={filteredEvents} setId={setId}></List>
                            <button className="save" onClick={handleAddSnippet}>
                                <i className="fa-plus-icon"><FontAwesomeIcon icon={faPlus}/></i>
                                Add Snippet</button>
                                
                        </div>
                        {!showSol? <form className="add_show_saved" onSubmit={handleAddEvent}>
                            <textarea placeholder="enter code question" className="addQ"></textarea>
                            <textarea placeholder="enter code solution" className="addS"></textarea>
                            <div className="radio_div">
                                <label>
                                    <input type="checkbox" className="rdPrivate" value="Private" onChange={() => handleChange("Private")}></input>
                                    <p className="radioPublic">Private</p>
                                </label>
                            </div>
                            <button className="submitQ">Add Question</button>
                        </form> : <ShowQues Email={Email} ques={ques} setShowSol={setShowSol} sol={sol} tag={tag} setCallSQ={setCallSQ} callSQ={callSQ} id={id} name={Email.name}/>}
                    </div>
                </header>
                <ToastContainer containerId="id"/>
            </>);
}
export default savePrblm;