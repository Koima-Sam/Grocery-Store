import React from "react";

function GroceryItem({name,id,image,description,price}){

    return(
        <div className="grocery-card">
        <img
            src={image}
            alt="grocery"
        /><br/>
        <input value={name} readOnly/> 
        <p>Ksh {price} per kg</p>
        <textarea value={description} readOnly/> <br/>
        <i className="fa fa-shopping-cart" id="cart"></i>
    </div>
    )
}

export default GroceryItem