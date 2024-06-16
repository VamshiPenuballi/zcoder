import { faCreativeCommonsSamplingPlus } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import "./EventListComponent.css";

const EventListComponent = (props) => {
    // const [events,setEvents]= useState({});
    // console.log("eventListComponent",events.parameter);
    // const eventlst = events();
    // console.log("*****",props.parameter);
    // const handleEvent = async()=>{
    //     const data =  await eve.parameter();
    //     console.log("HIIIIIII",data);
    //     setEvents(data);
    // }
    // handleEvent();
    // const [events,setEvents] = useState({});
    // const filteredEvents = async(e) => {
    //     // console.log("selsctedDate=", date);
    //     const date = props.date;
    //     const email = props.email;
    //     console.log(date, email);
    //     const url = new URL("http://localhost:1000/cal/search/"+date+"/"+email);
    //     console.log(url);
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
    //     setEvents(data);
    //     const controller = new AbortController();
    //     return () => controller.abort();
    // };
    // filteredEvents();

    const handleClick = async(e) => {
        console.log(e);
        const res = await fetch("http://localhost:1000/cal/delete",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                eventid: e,
            })
        });
        const data =  await res.json();
        console.log("%%%%%",data);
        props.filteredEvents();
    }

    let events = props.events;
    events = events.reverse();
    return (
        <div className="event-list">
            <h2>Events</h2>
            {events.length > 0 ? (
                <ul>
                    {events.slice(0).map((event, index) => (
                        <li key = {index} id = {index}>
                            {/* <p>
                                <strong>Date:</strong> {event.date}
                            </p> */}
                            <p className="calTitle">
                                <strong>Title:</strong> {event.Title}
                            </p>
                            <p className="calDesc">
                                <strong>Description:</strong> {event.Description}
                            </p>
                            <button className="deletEvent" onClick={() => handleClick(event._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No events today</p>
            )}
        </div>
    );
};

export default EventListComponent;