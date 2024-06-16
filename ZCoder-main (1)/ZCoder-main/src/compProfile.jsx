import React from "react"
import { Link, useLocation } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import { useFormik } from "formik"
import { signUpSchema } from "./schemas/index1"
import profileImg from './assets/profileImg.png'
import { useState, useRef } from "react"
// import { response } from "express"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const initialValues = {
    age: "",
    score: "",
    github: "",
}

function compProfile(){
    const location = useLocation();

    const navigate = useNavigate();


    // const history = useHistory();

    // const [user, setUser] = useState({
    //     name:"", email:"", password:"", age:"", score:"", github:"",problems_saved:"", problems_solved:""
    // });

    // let nm = location.state.name, em = location.state.email, ps = location.state.password;
   
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: async (values, state) => {
            console.log(nm,em,ps, values.age, values.score, values.github);
            }

        },
    );

    const inputRef = useRef(null);
    const[image, setImage] = useState("");

    const handleImageClick = () => {
        inputRef.current.click();
    };

    let previmg = {profileImg};

    const handleImageChange = async(e) => {
        const imgadd = e.target.files[0];
        let img = imgadd.length==0 ? null : URL.createObjectURL(imgadd);
        const base64 = await convertToBase64(imgadd);
        console.log("imageadd= ", imgadd, "& base64= ", base64);
        setImage(base64);
    }

    const [user, setUser] = useState({
        name:"", email:"", password:"", age:"", score:"", github:"",problems_saved:"", problems_solved:""
    });

    let name,value;
    

    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value, "name": location.state.name, "email": location.state.email, "password": location.state.password,"problems_saved": "0"});
    }
    
    const handlebtnClick = async (e) => {
        e.preventDefault();
        // setUser({"name": location.state.name, "email": location.state.email, "password": location.state.password,...user});
        const {name, email, password, age, github, score, problems_saved, problems_solved} = user;
        const img = image;
        console.log("img= ", image);
        // console.log(name, email, password, age, github, score, problems_saved, problems_solved);
        const res = await fetch("http://localhost:1000/api/users",{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, email, password, age, github, score, problems_saved, problems_solved
            })
        });
        const data =  await res.json();
        console.log("data",data);
        localStorage.setItem("token", data);
        // const data = await res.json();
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
                
                });
                const email = location.state.email;
                const name = location.state.name;
                // navigate("/Home/"+email+"/"+name);
        }else{
            toast.error(data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        

    }


    return (<>
                <header class="profilecomp-header">
                    <div class="container">
                        <div class="logo">
                            <a href="index.html">ZCoder</a>
                        </div>
                        <nav>
                            <ul>
                                <li className="link">
                                    <a href="/">Home</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Save Code</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Code Editor</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Chat Room</a>
                                </li>
                                <li className="link">
                                    <a href={"/login"}>Login</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <main>
                        <section class="user-container profile-comp--display">
                            <div class="cProfile">
                                <h1>Profile</h1>
                                <div class="grid-two--columns">
                                    {/* <div class="profile-image" onClick={handleImageClick}>
                                        <img className="input-image" src={image || profileImg}  alt="" />
                                        <input type="file" ref={inputRef} onChange={handleImageChange}  style={{display: 'none'}}></input>
                                    </div> */}

                                    <div class="info" onSubmit={handleSubmit}>
                                        <form >
                                            <div class="defined-field input">
                                                <p class="Indicator">Name: </p>
                                                <label for="val">
                                                    <p className="val">{location.state.name}</p>
                                                </label>
                                            </div>

                                            <div class="defined-field input">
                                                <p class="Indicator">Email: </p>
                                                <label for="val">
                                                    <p className="val">{location.state.email}</p>
                                                </label>
                                            </div>

                                            <div class="input-field input">
                                                <p class="Indicator">Age: </p>
                                                <label for="age">
                                                    <input type="number" className="val" name="age" id="age" value = {user.age} onChange={handleInput}></input>
                                                </label>
                                                {errors.age && touched.age ? (
                                                    <p className="form-error">{errors.age}</p>
                                                ) : null}
                                            </div>

                                            <div class="input-field input">
                                                <p class="Indicator">Score: </p>
                                                <label for="score">
                                                    <input type="number" name="score" className="val" id="score" value = {user.score} onChange={handleInput}></input>
                                                </label>
                                                {errors.score && touched.score ? (
                                                    <p className="form-error">{errors.score}</p>
                                                ) : null}
                                            </div>

                                            <div class="input-field input">
                                                <p class="Indicator">Github Link: </p>
                                                <label for="github">
                                                    <input type="url" name="github" id="github" className="val" value = {user.github} onChange={handleInput} ></input>
                                                </label>
                                                {errors.github && touched.github ? (
                                                    <p className="form-error">{errors.github}</p>
                                                ) : null}
                                            </div>

                                            <div class="realtime-field input">
                                                <p class="Indicator">Problems Saved: </p>
                                                <label for="Problems-Bookmarked">
                                                    <p className="val">{0}</p>
                                                </label>
                                                <p class="Problems-Bookmarked"></p>
                                            </div>

                                            <div class="realtime-field input">
                                                <p class="Indicator">Favourite Language: </p>
                                                <label for="problems_solved">
                                                    <input type="text" name="problems_solved" className="val" id="problems_solved" value = {user.problems_solved} onChange={handleInput} ></input>
                                                </label>
                                                <p class="Problems-Solved"></p>
                                            </div>

                                            <div class="input-field input">
                                                <input type="submit" value="register" onClick={handlebtnClick} className="compBtn"></input>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </header>
                <ToastContainer />
            </>)
}

export default compProfile

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }