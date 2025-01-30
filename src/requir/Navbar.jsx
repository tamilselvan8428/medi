import React from 'react'
import {Link} from 'react-router-dom'
import './Navibar.css'
const Navbar = () => {
  return (
    <>
    <div id='name'>
    <div >
    <Link id='li' to='/'>Logout</Link>
    <Link id='li' to="/timer">Start Meditation</Link>
    <Link id='li' to="/history">View History</Link>
    </div>
        <div id='head' >Meditation Timer</div>  
        
    </div>
   </>
  )
}

export default Navbar