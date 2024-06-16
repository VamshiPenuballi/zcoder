import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
import { Link, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from './Calendar/MyCalendar/MyCalendar';
import ShowComp  from "./showComplete";
import { useNavigate } from 'react-router-dom';


const ShowQues = (props) => {
    
    const email = props.email;
    const name = props.name;
    const [pques, setPques] = useState([]);
    const [ques, setQues] = useState("");
    const [sol, setSol] = useState("");
    const [tag, setTag] = useState("");
    const [nm, setNm] = useState("");
    const [time, setTime] = useState("");
    const [readmore, setReadmore] = useState(false);

    const getPublicQ = async() => {
        const url = new URL("http://localhost:1000/publicQues");
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
        setPques(data);
        // return(data);
    };
    useEffect(() => {
        getPublicQ()
    },[]);

    const handleClick = async(e) => {
        e.preventDefault();
        console.log(e);
        const q = e.target.outerText.trim();
        console.log(q);
        const url = new URL("http://localhost:1000/ques/"+q);
        const res = await fetch(url.href,{
            method:"GET",
            headers: {
                "Accept" : "application/json"
            }
        });
        const data =  await res.json();
        console.log("%%%%%handleClick",data);
        setQues(data[0].question);
        setSol(data[0].solution);
        setNm(data[0].name);
        setTime(data[0].updatedAt);
        setTag("public");
        setReadmore(!readmore);
    }

    return (
            <div>
                <div className="ques-list">
                    {!readmore ? 
                        pques.length > 0 ? (
                            <ul>
                                {pques.map((p, index) => (
                                    <label>
                                    <li key = {index} onClick={handleClick}>
                                        {/* <p>
                                            <strong>Date:</strong> {event.date}
                                        </p> */}
                                        <p>
                                            <strong>&nbsp; &nbsp;</strong> {p.question}
                                        </p>
                                        {/* <p>
                                            <strong>Solution:</strong> {c.solution}
                                        </p> */}
                                    </li>
                                    <hr />
                                    </label>
                                ))}
                            </ul>
                            ) : (
                                <p className="noCode">No codes</p>
                            )
                :<ShowComp ques = {ques} sol = {sol} tag = {tag} readmore = {readmore} setreadmore = {setReadmore} name = {nm} time = {time} emai={email}/>}


                
                    
                </div>
            </div>    
            );
};

export default ShowQues;
{/* <>
                <div className="add_show_saved">
                    <div placeholder="enter code question" className="addQ">{Q}</div>
                    <div placeholder="enter code solution" className="addS">{props.sol}</div>
                    <p className="tag"><label>Tag:</label> {tag}</p>
                </div>
            </> */}