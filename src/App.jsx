import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Timer from './components/Timer';
import History from './components/History';
import Navbar from './requir/Navbar';
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
       
      <div>
        
        
            
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/timer" element={user ? <Timer user={user} /> : <Navigate to="/" />} />
          <Route path="/history" element={user ? <History user={user} /> : <Navigate to="/" />} />
          <Route path='/Login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
