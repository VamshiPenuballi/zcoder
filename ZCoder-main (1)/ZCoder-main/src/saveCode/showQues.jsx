import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { Link, useEffect } from "react";
import { useNavigate} from 'react-router-dom'
import { useState } from "react";

const ShowQues = (props) => {

    const navigate = useNavigate();
    
    const Q = props.ques;
    const email = props.Email.email;
    const tag = props.tag;
    console.log("showques", Q, email);
    const [code, setCode] = useState({});

    // const getEntry = async() => {
    //     const url = new URL("http://localhost:1000/codeSearch/"+email+"/"+Q);
    //     const res = await fetch(url.href,{
    //         method:"GET",
    //         headers: {
    //             "Accept" : "application/json"
    //         }
    //     });
    //     const data =  await res.json();
    //     // const newEvent = {
    //     //     title: data.Title,
    //     //     description: data.Description,
    //     //     date: data.date
    //     // };
    //     console.log("%%%%%",data);
    //     setCode(code => (data));
    //     console.log("cccode", code);
    //     // return(data);
    // }

    // useEffect(() => {getEntry()});

    const handleClick = () => {
        navigate("/edit/"+email+"/"+props.name+"/"+props.id+"/"+Q+"/"+props.sol);
    }


    return (<>
                <div className="add_show_saved">
                    <div placeholder="enter code question" className="addQ">{Q}</div>
                    <div placeholder="enter code solution" className="addS">{props.sol}</div>
                    <p className="tag"><label>Tag:</label> {tag}</p>
                    <button onClick={handleClick} className="editSaved">Edit</button>
                </div>
            </>);
};

export default ShowQues;