import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditForm({onUpdate}){
    const navigate = useNavigate()
    const location = useLocation()
    const{name,id,price,description,image} =location.state
    const[grocery,setGrocery]=useState(
        {
            name,
            price,
            description,
            image,
        })
    

    console.log(grocery)
    function handleSubmit(e){
        e.preventDefault()
        fetch(`products/${id}`,{
                method : "PATCH",
                headers : {
                    'Content-Type':'application/json',
                    'Application' : 'application/json'
                },
                body:JSON.stringify(grocery)
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              onUpdate(data,id)
              navigate("/");
        }
              )
            .catch((error)=>console.log(error))
      }
      function handleChange(e){
        setGrocery({...grocery, [e.target.name] : e.target.value})
    }
    return(
        <div className="bg">
            <div className="form">
            <form className="container" onSubmit={handleSubmit}>
                <input name ="name" value={grocery.name}  type="text" placeholder="Name of the Product" onChange={handleChange}/><br/>
            <input name ="image" value={grocery.image}  type="text" placeholder="Paste url of the grocery image here"  onChange={handleChange}/><br/>
                <input name ="price" value={grocery.price}  type="text" placeholder="Price of the item per Kg" onChange={handleChange} /><br/>
                <input name ="description" value={grocery.description}  type="text" placeholder="Description of the grocery item" onChange={handleChange}/><br/>

                <input id="upload" type="submit" value="Save Changes"/> 
            </form>
        </div>
        </div>
    )
}