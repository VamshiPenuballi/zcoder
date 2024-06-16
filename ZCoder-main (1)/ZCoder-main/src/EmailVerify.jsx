import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "./assets/Success.png";
// import styles from "./styles.module.css";
// import { Fragment } from "react/cjs/react.production.min";


const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

    const verifyEmailUrl = async () => {
        try {
            const url = `http://localhost:1000/api/users/${param.id}/verify/${param.token}`;
            const res = await fetch(url,{
                method:"GET",
                headers: {
                    "Accept" : "application/json"
                }
            });
            const data  = await res.json();
            console.log(data);
            setValidUrl(true);
        } catch (error) {
            console.log(error);
            setValidUrl(false);
        }
    };

	useEffect(() => {
		verifyEmailUrl();
	}, [param]);

	return (
		<div>
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
                                    <a href={"/"}>Registration</a>
                                </li>
                                <li className="link">
                                    <a href={"/login"}>Login</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {validUrl ? (
                        <div className="divEV">
                            <img src={success}></img>
                            <div className="EVText">
                                <h1>Email verified successfully</h1>
                                <p>Click Login to get started</p>
                            </div>
                            
                            <Link to="/login">
                                <button >Login</button>
                            </Link>
                        </div>
                    ) : (
                        <h1>404 Not Found</h1>
                    )}
                </header>
			
		</div>
	);
};

export default EmailVerify;