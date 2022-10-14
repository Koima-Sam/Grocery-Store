import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";

function NewProduct({onAddNew,user,logoutUser}){
    const navigate = useNavigate()
    const[grocery,setGrocery]=useState(
        {
            name:"",
            price:"",
            description:"",
            image:"",
            user_id:user.id
        }
    )
    function handleChange(e){
        setGrocery({...grocery, [e.target.name] : e.target.value})
    }

    function onGrocerySubmit(e){
        e.preventDefault();
        console.log(grocery)
        fetch("/products",{
            method : "POST",
            headers : {
                'Content-Type':'application/json',
                'Application' : 'application/json'
            },
            body:JSON.stringify(grocery)
        })
        .then(response => response.json())
        .then(data => {
            onAddNew(data)
            navigate('/')
        })
        .catch((error)=>console.log(error))
    }
    return(
        <div className="bg">
            <div className="nav">
            <h1>Online Store</h1>
            <div className="nav-bar">
            <NavLink to='/new'>Upload new Grocery</NavLink>
            <NavLink to='/'>My Products</NavLink>
            <NavLink onClick={logoutUser}>Sign Out</NavLink>
          </div>
        
            </div>
            <div className="form">
            
            <form className="container" onSubmit={onGrocerySubmit}>
            <h2>Please fill in the details to upload a new product</h2>
                <input name ="name" value ={grocery.name} type="text" placeholder="Name of the Product" onChange={handleChange}/><br/>
                <input name ="image" value ={grocery.image} type="text" placeholder="Paste url of the grocery image here" onChange={handleChange}/><br/>
                <input name ="price" value ={grocery.price} type="text" placeholder="Price of the item per Kg" onChange={handleChange}/><br/>
                <input name ="description" value ={grocery.description} type="text" placeholder="Description of the grocery item" onChange={handleChange}/><br/>

                <input id="upload" type="submit" value="Upload Item"/> 
            </form>
        </div>
        </div>
    )
    
}
export default NewProduct