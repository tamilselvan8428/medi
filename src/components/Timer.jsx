import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../requir/Navbar";
import './Timer.css'
const Timer = ({ user }) => {
    const [duration, setDuration] = useState(5); 
    const [timeLeft, setTimeLeft] = useState(duration * 60); 
    const [timerRunning, setTimerRunning] = useState(false); 
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [intervalId, setIntervalId] = useState(null); 
    const startTimer = () => {
        if (timerRunning) return; 

        setStartTime(new Date()); 
        setTimerRunning(true);

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval); 
                    const end = new Date();
                    setEndTime(end);
                    saveSession(duration, startTime, end); 
                    setTimerRunning(false); 
                    return 0; 
                }
                return prevTime - 1; 
            });
        }, 1000); 
        setIntervalId(interval); 
    };
    const stopTimer = () => {
        clearInterval(intervalId); 
        const end = new Date();
        setEndTime(end);
        setTimerRunning(false);
        saveSession(duration, startTime, end); 
    };
    const resetTimer = () => {
        clearInterval(intervalId); 
        setTimeLeft(duration * 60); 
        setTimerRunning(false); 
        setStartTime(null); 
        setEndTime(null);
    };
    const saveSession = async (duration, start, end) => {
        try {
            await axios.post("http://localhost:5000/api/sessions", {
                userId: user._id,
                duration,
                startTime: start,
                endTime: end,
            });
            alert("Session saved successfully!");
        } catch (error) {
            console.error("Error saving session:", error);
            alert("Error saving session");
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    useEffect(() => {
        setTimeLeft(duration * 60);
    }, [duration]);

    return (
        <div id="im">
            <Navbar/>
            <h1>Meditation Timer</h1>
            <label>Set Duration (minutes):</label><br /><br />
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
            />
            <div>
                <h3>Time Left: {formatTime(timeLeft)}</h3>
                {!timerRunning ? (
                    <button onClick={startTimer}>Start Meditation</button>
                ) : (
                    <button onClick={stopTimer}>Stop Meditation</button>
                )}
                <button onClick={resetTimer}>Reset Timer</button>
            </div>
        </div>
    );
};

export default Timer;
