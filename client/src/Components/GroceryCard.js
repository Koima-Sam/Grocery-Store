import React from "react";
import {Link} from "react-router-dom"

function GroceryCard({name,id,image,description,price,onDelete}){

    // handle delete
    function handleDelete(){
        console.log(id)
        fetch(`/products/${id}`,{
            method:"DELETE"
        })
        .then(resp => resp.json())
        .then(()=>onDelete(id))
    }
    return(
        <div className="grocery-card">
        <h1><i className="fa" onClick={handleDelete}>&#xf014;</i></h1>
        <img
            src={image}
            alt="grocery"
        /><br/>
        <input value={name} readOnly/> 
        <p>Ksh {price} per kg</p>
        <textarea value={description} readOnly/> <br/>
        <Link to='/edit' state={{name, id, image , description,price}}>
        <button className="edit">
            Edit Grocery <i className="far fa-edit"></i>
        </button>
        </Link>
    </div>
    )
}

export default GroceryCard