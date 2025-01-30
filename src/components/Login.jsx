import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom"; 
import './Login.css'

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/login", { email, password });
            setUser(res.data.user);
            alert("Login successful!");
            navigate("/timer");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div id="head1">
        <h1>Meditation Timer</h1>
       
        <div className="Main">
            
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
            <h2>Enter Your Mail:</h2>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <h2>Enter Your Password:</h2>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br /><br />
                <button type="submit">Login</button>
                <br /><br />
                <Link to='/register'> New user? Register</Link>
            </form>
        </div>
        </div>

    );
};

export default Login;
