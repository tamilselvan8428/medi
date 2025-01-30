import React, { useEffect, useState } from "react";
import axios from "axios";
import './History.css'
import Navbar from "../requir/Navbar";
const History = ({ user }) => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/sessions/${user._id}`);
                console.log(res.data); 
                setSessions(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching session history", error);
                setError("Failed to fetch session history");
                setLoading(false);
            }
        };

        if (user) {
            fetchHistory();
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div id='head4'>
            <Navbar/>
            <h2>History</h2>
            {sessions.length === 0 ? (
                <p>No meditation sessions found</p>
            ) : (
                <ul>
                    {sessions.map((session) => (
                        <div id="value" key={session._id}>
                            Duration: {session.duration} minutes | Start: {new Date(session.startTime).toLocaleString()} | End: {new Date(session.endTime).toLocaleString()}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default History;
