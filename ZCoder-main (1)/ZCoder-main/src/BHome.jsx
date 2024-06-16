import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom';

function BHome(){
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
                    <div className="textBHome">
                        <h1 className="BHomeh10">Welcome To</h1>
                        <h1 className="BHomeh11">ZCoder</h1>
                        <h3 className="BHomeh30">A place for true coders</h3>
                    </div>
                    <div className="intro">
                    Welcome to ZCoder, your ultimate platform for coders and programming enthusiasts alike! Here, you can store your coding questions and solutions securely, ensuring that your valuable insights are always at your fingertips. Our integrated code editor empowers you to test and refine your code right here on the site, streamlining your development process.<br/><br/>

But that's not all! Engage with a vibrant community of like-minded individuals in our communal chat rooms, where ideas flow freely and collaborations ignite. Whether you're a seasoned developer or just starting your coding journey, ZCoder provides the tools and community support you need to thrive.<br/><br/>

Join us today and experience coding in a whole new way. Welcome to a world of endless possibilities at ZCoder.
                    </div>
                    
                </header>
            </>);
}
export default BHome;