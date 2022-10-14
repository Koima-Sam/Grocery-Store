import React, { useState }  from 'react';
import {NavLink, useNavigate} from 'react-router-dom'

function SignUp({setUser}){
    const navigate = useNavigate()
    const [errors, setErrors] = useState([]);
    const [user,setUserData] = useState({
        name: "",
        email:"",
        password: "",
        password_confirmation: "",
        phone: "",
        category:"seller"
    });

    // Keep track of the changes made to the form 
    function handleChanges(e) {
        console.log(e.target.name)
        setUserData({...user,[e.target.name]:e.target.value});
    }

    // Vallidate the user inputs and check if any are emptty
    function validateUserInput(e){
        if(user.name === ""|| user.email === ""||user.phone === ""||user.password === ""||user.password_confirmation === ""){
            alert("All fields are required")
        }
        else{
            createUser(e)
        }
    }

    //add a new user to the database
    function createUser(event){
        event.preventDefault()
        fetch("/users/",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then((response) => {
            if(response.ok){
                response.json().then((userData) =>{
                    setUser(userData)
                    userData.category==='seller'? navigate('/'):navigate('/dashboard')
                    alert("Created account successfully")
                })
            }
            else{
                alert("Failed to create account")
                response.json().then((error)=>setErrors(error.errors))
            }
        })
    }
    return (
        <div className="signUpForm">
            <form onSubmit={validateUserInput}>
                <h2>Fill in the details <br/>to create your account</h2>
                <input name="name" type={"text"} placeholder="Full Name" value={user.name} onChange={handleChanges}/> <br/>
                <input name="email" type={"email"} placeholder="Email" value={user.email} onChange={handleChanges}/><br/>
                <input name="phone" type={"number"} placeholder="Phone" value={user.phone} onChange={handleChanges}/><br/>
                <select name="category" value={user.category} onChange={handleChanges}>
                    <option value="seller">Seller</option>
                    <option value="buyer">Buyer</option>
                </select>
                <br/>
                <input name="password" type={"password"} placeholder="Password" value={user.password} onChange={handleChanges} autoComplete="on"/><br/>
                <input name="password_confirmation" type={"password"} placeholder="Password Confirmation" value={user.password_confirmation} onChange={handleChanges}/><br/>

                <input  type={"submit"} id ="submit"value="Create Account"/> 
                <p>Already have an account? <span><NavLink to={'/login'} className="sign">Sign In</NavLink></span>!</p>
            </form>
        </div>
    )
}
export default SignUp;