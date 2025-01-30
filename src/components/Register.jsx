import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/register", { name, email, password });
            alert("Registration successful!");
            navigate("/"); 
        } catch (error) {
            alert("Error registering user");
        }
    };

    return (
        <div id='head8'>
            <h1>Register</h1><br /><br />
            <form  id="f1"onSubmit={handleRegister}>
                <h3>Enter your name</h3><br />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <h3>Enter your Mail</h3><br />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <h3>Password:</h3> <br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br /><br />
                <button  id="b1"type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
