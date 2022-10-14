import React from "react";
import GroceryItem from "./GroceryItem";
import {NavLink} from 'react-router-dom'

export default function BuyerHomeDashBoard({groceries,logoutUser}){
    const groceryItems = groceries.map((grocery, index) => {
        return (
          <GroceryItem
            key={index}
            name={grocery.name}
            price={grocery.price}
            description={grocery.description}
            id={grocery.id}
            image={grocery.image}
          />
        );
      });
      // console.log(groceries)
      return (
        <React.Fragment>
        <div className="nav">
                <h1>Online Store</h1>
                <div className="nav-bar">
                <NavLink to='/dashboard'>All Products</NavLink>
                <NavLink onClick={logoutUser}>Sign Out</NavLink>
              </div>
      </div>
      <div className="groceries">
        {groceryItems}
      </div>
      </React.Fragment>
      )
    }