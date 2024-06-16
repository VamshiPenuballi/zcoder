import React, { useState } from "react";
// import {tw, lin, ins, dis} from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faLinkedin, faInstagram, faDiscord} from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import { signUpSchema } from "./schemas";
import { useEffect } from "react";

const initialValues = {
    name: "",
    email: "",
    password: "",
}

const initialValues1 = {
    email: "",
    password: "",
}

function log_reg(){

    function loginbtnClick(e){
        document.querySelector('.user-container').classList.toggle('login-section--display')
    }

    function registerationbtnClick(e){
        document.querySelector('.user-container').classList.toggle('login-section--display')
    }

    const navigate = useNavigate();

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, state) => {
            console.log("file log_reg line 42 values", values);
            // window.history.pushState(JSON.stringify(state), "", getSecuredURL('compProfile'));
            navigate('/compProfile', {state : {name: values.name, email: values.email, password: values.password}});
        },

    });

    const [user, setUser] = useState({});

    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(e);
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email,password);
        const url = new URL("http://localhost:1000/isUser/"+email+"/"+password);
        const res = await fetch(url.href,{
            method:"GET",
            headers: {
                "Accept" : "application/json"
            }
        });
        const data = (await res.json());
        // data =  await res.json();
        // console.log("%%%%%",data);
        // cmt = {...data};
        console.log(data);
        setUser(data);
        console.log(user);
        if(data.message === "Welcome"){
            window.alert("Welcome");
            navigate("/Home/"+data.email+"/"+data.name);
        }else{
            window.alert("incorrect email-id or password");
        }
    }

    useEffect(()=>{
        if(user.length > 0){
            navigate("/Home/"+user[0].email+"/"+user[0].name);
        }
    },[user]);

    return (<>
                <header className="registration-header">
                    <div className="container">
                        <div className="logo">
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
                        <section className = "user-container login-section--display">
                            <div className="registration">
                                <div className="grid-two--column">
                                <div className="form-text">
                                        <h2>Hello, Friend!</h2>
                                        <p>Enter your personal details and start your journey</p>
                                        <button className="registration-btn" onClick={(e) => registerationbtnClick(e)}>Login Here</button>
                                    </div>

                                    <div className="registration-form">
                                        <h2>Create Account</h2>
                                        {/* <div className="social-icons">
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-twitter"><FontAwesomeIcon icon={faTwitter}/></i>
                                            </a>
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-linkedin-in"><FontAwesomeIcon icon={faLinkedin}/></i>
                                            </a>
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-instagram"><FontAwesomeIcon icon={faInstagram}/></i>
                                            </a>
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-discord"><FontAwesomeIcon icon={faDiscord}/></i>
                                            </a>
                                        </div> */}
                                        {/* <p>or use your email for registration</p> */}
                                        <br/><br/>

                                        <form onSubmit={handleSubmit} action='/compProfile'>
                                            <div className="input-field">
                                                <label htmlFor="name">
                                                    <input type="name" name="name" autoComplete="off" id="name" placeholder="Name"  value = {values.name} onChange={handleChange} onBlur={handleBlur}></input>
                                                </label>
                                                {errors.name && touched.name ? (
                                                    <p className="form-error">*{errors.name}</p>
                                                ) : null}
                                                
                                            </div>

                                            <div className="input-field">
                                                <label htmlFor="email">
                                                    <input type="email" name="email" autoComplete="off" id="email" placeholder="Email" value = {values.email} onChange={handleChange} onBlur={handleBlur}></input>
                                                </label>
                                                {errors.email && touched.email ? (
                                                    <p className="form-error">*{errors.email}</p>
                                                ) : null}
                                            </div>

                                            <div className="input-field">    
                                                <label htmlFor="password">
                                                    <input type="password" name="password" autoComplete="off" id="password" placeholder="Password" value = {values.Password} onChange={handleChange} onBlur={handleBlur}></input>
                                                </label>
                                                {errors.password && touched.password ? (
                                                    <p className="form-error">*{errors.password}</p>
                                                ) : null}
                                            </div>

                                            <div className="input-field">
                                                <input type="submit" value="register" id="btn"></input>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="login">
                                <div className="grid-two--column">
                                   
                                    <div className="form-text">
                                        <h2>Welcome Back!</h2>
                                        <p>To keep connected with us please login with your personal info</p>
                                        <button className="login-btn" onClick={(e) => loginbtnClick(e)}>Register Here</button>
                                    </div>

                                    <div className="login-form">
                                        <h2>Sign In</h2>
                                        {/* <div className="social-icons">
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-twitter"><FontAwesomeIcon icon={faTwitter}/></i>
                                            </a>
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-linkedin-in"><FontAwesomeIcon icon={faLinkedin}/></i>
                                            </a>
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-instagram"><FontAwesomeIcon icon={faInstagram}/></i>
                                            </a>
                                            <a href="#" target="_blank">
                                                <i className="fa-brands fa-discord"><FontAwesomeIcon icon={faDiscord}/></i>
                                            </a>
                                        </div> */}
                                        {/* <p>or use your account</p> */}
                                        <br/><br/>

                                        <form onSubmit={handleLogin}>

                                            <div className="input-field">
                                                <label for="Email1">
                                                    <input type="email" name="#" id="Email1" placeholder="Email"></input>
                                                </label>
                                                <p className="form-error">*This field can't be empty</p>
                                            </div>

                                            <div className="input-field">    
                                                <label for="Passsword1">
                                                    <input type="password" name="#" id="Password1" placeholder="Password"></input>
                                                </label>
                                                <p className="form-error">*This field can't be empty</p>
                                            </div>

                                            <div className="input-field">
                                                <input type="submit" value="Log-In" id="btn"></input>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>


                        </section>
                    </main>

                </header>
            </>);
}

export default log_reg;