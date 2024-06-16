import FormComponent from "../FormComponent/FormComponent";
import EventListComponent from "../EventList/EventListComponent";
import "./MyCalendar.css";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";

const MyCalendar = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try{
//             const response = await fetch(
//                 "https://jsonplaceholder.typicode.com/posts?_limit=7"
//             );

//             const datas = await response.json();
//             console.log("datas", datas);

//             const transformedEvents = datas.map(({title, body:description }) => {
//                 const generatedRandomDate = new Date(`
//                 ${new Date().toLocaleDateString("en-US", {month: "short"})}
//                 ${Math.floor(Math.random()*28) + 1}
//                 ${new Date().getFullYear()}
//                 ${new Date().toTimeString()}
//                 `);
//                 return {
//                     date: generatedRandomDate,
//                     title,
//                     description
//                 };
//             });

//             // setEvents(transformedEvents);

//             const date = transformedEvents.date;
//             const Title = transformedEvents.Title;
//             const Description = transformedEvents.Description;
//             const email = props.paramater.email;

//             console.log(date, Title, Description, email);

//         // setUser({"name": location.state.name, "email": location.state.email, "password": location.state.password,...user});
//         // const { email, title, date, description } = user;
//         // console.log(name, email, password, age, github, score, problems_saved, problems_solved);
//             const res = await fetch("http://localhost:1000/cal",{
//                 method:"POST",
//                 headers: {
//                     "Content-Type" : "application/json"
//                 },
//                 body: JSON.stringify({
//                     email, date, Title, Description
//                 })
//             });
//             const data =  await res.json();
//             console.log(data);

//         } catch(err){
//             console.error("API fetch error:", err);
//         }
//    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // selectedDate = date;
    };

    useEffect(()=>{
        filteredEvents()
}, [selectedDate])

    const handleAddEvent = async(title, description) => {
        const currdate = selectedDate.getDate();
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        const Title = title;
        const Description = description;
        const email = props.paramater.email;
        const date = `${currdate}-${month}-${year}`;

        console.log(date, Title, Description, email,"(((((((((((");

        // setUser({"name": location.state.name, "email": location.state.email, "password": location.state.password,...user});
        // const { email, title, date, description } = user;
        // console.log(name, email, password, age, github, score, problems_saved, problems_solved);
        const res = await fetch("http://localhost:1000/cal",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email, date, Title, Description
            })
        });
        const data =  await res.json();
        console.log(data);
        filteredEvents();
        // const data = await res.json();

    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const isDateWithEvent = async({currdate}) => {
        const date = currdate;
        const email = props.paramater.email;
        console.log(date, email);
        const res = await fetch("http://localhost:1000/cal/searchone",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                date, email
            })
        });
        const data =  await res.json();
        console.log(data);
        return data;
    };
    const filteredEvents = async(event) => {
        console.log("selsctedDate=", selectedDate);
        const currdate = selectedDate.getDate();
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        const date = `${currdate}-${month}-${year}`;
        const email = props.paramater.email;
        console.log(date, email);
        const url = new URL("http://localhost:1000/cal/search/"+date+"/"+email);
        console.log(url);
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
        setEvents(data);
    };
    // filteredEvents();
    console.log(events,"@@@@@@@@@@");

    return (
        <div className="calendar-container">
            <h1 className="calnm">My Calendar</h1>
            <Calendar 
                className="react-calendar"
                onChange={handleDateChange}
                value={selectedDate}
                titleContent={({date}) => 
                    isDateWithEvent({date}) && <div className="event-pointer"></div>
            }
            ></Calendar>
            
            <div className="form-toggle">
                <button className="cal-btn" onClick={toggleForm}>{showForm ? "Cancel" : "Add Event"}</button>
            </div>
            {showForm && <FormComponent handleAddEvent = {handleAddEvent} />}
            {/* {events.length ==0 || events===undefined? <h1>No events</h1> : <div><h1>{events[0].email}</h1> <p>{events[0].Title}</p> <p>{events[0].Description}</p></div>} */}
            <EventListComponent events={events} filteredEvents={filteredEvents}/>
            
        </div>
    );
};

export default MyCalendar;