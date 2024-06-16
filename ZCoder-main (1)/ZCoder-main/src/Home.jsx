import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Calendar from './Calendar/MyCalendar/MyCalendar';
import ShowPQues from "./showPQues"

function Home(){
    
    const navigate = useNavigate();

    const Email = useParams();
    // const url = new URL("http://localhost:5173/savedProblems/"+email.email);
    console.log(Email);

    const [user, setUser] = useState({});

    const handleShowPofile = async(e) => {
        e.preventDefault();
        const email = Email.email;
        const url = new URL("http://localhost:1000/getUser/"+email);
        const res = await fetch(url.href,{
            method:"GET",
            headers: {
                "Accept" : "application/json"
            }
        });
        const data = (await res.json());
        console.log(data);
        setUser(data);
        console.log(user);
        return data;
    }
    useEffect(() => {
        if(user.length > 0){
            console.log("U",user);
            navigate("/showProfile/"+user[0].email+"/"+user[0].name+"/"+user[0].age+"/"+user[0].score+"/"+user[0].problems_saved+"/"+user[0].problems_solved);
        }
        }, [user]);



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
                                    <a href={"/savedProblems/"+Email.email+"/"+Email.name}>Saved Code</a>
                                </li>
                                <li className="link">
                                    <a href={"/CodeEditor/"+Email.email+"/"+Email.name}>Code Editor</a>
                                </li>
                                <li className="link">
                                    <a href={"/chatRoom/"+Email.email+"/"+Email.name}>Chat Room</a>
                                </li>
                                <li className="link">
                                    <a onClick={handleShowPofile} className="showProfile">Show Profile</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Logout</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="showpq">
                        <ShowPQues email={Email.email} name={Email.name}/>
                    </div>
                    
                    <div className="calendarC">
                        <Calendar paramater = {useParams()}/>
                    </div>
                    
                    <div className="publicCode">
                        
                    </div>
                </header>
            </>);
}
export default Home;