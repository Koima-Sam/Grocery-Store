import React from "react";
import {NavLink} from 'react-router-dom'

export default function Nav(){
    return(
        <div className="nav">
            <h1>Online Store</h1>
            <div className="nav-bar">
            <NavLink to='/signup'>Get Started</NavLink>
            <NavLink to='/login'>Sign In</NavLink>
            
        </div>
        </div>
    )
    
}