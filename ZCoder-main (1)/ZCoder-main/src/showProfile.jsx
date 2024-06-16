import React from "react"
import { Link, useLocation, useParams } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import { useFormik } from "formik"
import { signUpSchema } from "./schemas/index1"
import profileImg from './assets/profileImg.png'
import { useState, useRef } from "react"
// import { response } from "express"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useEffect } from "react"

function showProfile(){
    const navigate = useNavigate();
    const params = useParams();
    const image = params.image;
   

    return (<>
                <header class="profilecomp-header">
                    <div class="container">
                        <div class="logo">
                            <a href="index.html">ZCoder</a>
                        </div>
                        <nav>
                            <ul>
                            <li className="link">
                                    <a href={"/Home/"+params.email+"/"+params.name}>Home</a>
                                </li>
                                <li className="link">
                                    <a href={"/savedProblems/"+params.email+"/"+params.name}>Save Code</a>
                                </li>
                                <li className="link">
                                    <a href={"/CodeEditor/"+params.email+"/"+params.name}>Code Editor</a>
                                </li>
                                <li className="link">
                                    <a href={"/chatRoom/"+params.email+"/"+params.name}>Chat Room</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Logout</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <main>
                        <section class="user-container profile-comp--display">
                            <div class="sProfile">
                                <h1>Profile</h1>
                                <div class="grid-two--columns">
                                

                                    <div class="info">
                                        <form >
                                            <div class="defined-field input">
                                                <p class="Indicator">Name: </p>
                                                <label for="val">
                                                    <p className="val">{params.name}</p>
                                                </label>
                                            </div>

                                            <div class="defined-field input">
                                                <p class="Indicator">Email: </p>
                                                <label for="val">
                                                    <p className="val">{params.email}</p>
                                                </label>
                                            </div>

                                            <div class="input-field input">
                                                <p class="Indicator">Age: </p>
                                                <label for="age">
                                                <p className="val">{params.age}</p>
                                                </label>
                                                {/* {errors.age && touched.age ? (
                                                    <p className="form-error">{errors.age}</p>
                                                ) : null} */}
                                            </div>

                                            <div class="input-field input">
                                                <p class="Indicator">Score: </p>
                                                <label for="score">
                                                <p className="val">{params.score}</p>
                                                </label>
                                                {/* {errors.score && touched.score ? (
                                                    <p className="form-error">{errors.score}</p>
                                                ) : null} */}
                                            </div>

                                            {/* <div class="input-field input">
                                                <p class="Indicator">Github Link: </p>
                                                <label for="github">
                                                    <input type="url" name="github" id="github"></input>
                                                </label>
                                                {errors.github && touched.github ? (
                                                    <p className="form-error">{errors.github}</p>
                                                ) : null}
                                            </div> */}

                                            <div class="realtime-field input">
                                                <p class="Indicator">Problems Bookmarked: </p>
                                                <label for="val">
                                                    <p className="val">{params.psaved}</p>
                                                </label>
                                            </div>

                                            <div class="realtime-field input">
                                                <p class="Indicator">Problems Solved: </p>
                                                <label for="val">
                                                    <p className="val">{params.psolved}</p>
                                                </label>
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

export default showProfile

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