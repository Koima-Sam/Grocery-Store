import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

 function Login({setUser}){
    const navigate = useNavigate()
    const[user,setUserData] = useState({email:"",password:""})
    const [errors, setErrors] = useState([]);

     // Keep track of the changes made to the form 
     function handleChanges(e) {
        console.log(e.target.name)
        setUserData({...user,[e.target.name]:e.target.value});
    }

    // Validates if all fields are filled
    function validateUser(e){
        e.preventDefault()
        if(user.email === ""||user.password === "")
        {
            alert('All fields are required')
        }
        else{
            AuthenticateUser(e)
        }
    }
    // Check if user exists in the database and authenticate
    function AuthenticateUser(e){
        e.preventDefault()
        fetch('/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then((response)=>{
            
            if(response.ok){
                response.json().then((userData) => loginUser(userData))
            }
            else{
                alert("Failed to login")
                response.json().then((error) => setErrors(error.errors))
            }
        })
        

    }

    // handle login
    function loginUser(userData){
        setUser(userData)
        userData.category==="seller"? navigate('/') :navigate('/dashboard')
        alert('logging in...............')
    }


    return(
        <div className="signUpForm" >
            <form className="loginForm" onSubmit={validateUser}>
                <h2>Welcome back <br/> Log in to view groceries</h2>
                <input type={"email"} placeholder="Email" name="email"onChange={handleChanges} value={user.email}/><br/>
                <input type={"password"} placeholder="Password" name="password" autoComplete="on"onChange={handleChanges} value={user.password}/><br/>
                <input  type={"submit"} value="Sign In"/> 

                <p>Not yet registered? <span><NavLink to={'/signup'} className="sign">Sign Up</NavLink></span> to get started! </p>
            </form>
        </div>
        
    )
} 
export default Login