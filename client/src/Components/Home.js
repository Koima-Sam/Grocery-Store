import React from "react";
import GroceryCard from "./GroceryCard";
import {NavLink} from 'react-router-dom'

function Home({ groceries, onUpdate, onDelete,logoutUser }) {
  console.log()
  const groceryItems = groceries.map((grocery, index) => {
    return (
      <GroceryCard
        key={index}
        name={grocery.name}
        price={grocery.price}
        description={grocery.description}
        id={grocery.id}
        image={grocery.image}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    );
  });
  // console.log(groceries)
  return (
    <React.Fragment>
    <div className="nav">
            <h1>Online Store</h1>
            <div className="nav-bar">
            <NavLink to='/new'>Upload new Grocery</NavLink>
            <NavLink to='/'>My Products</NavLink>
            <NavLink onClick={logoutUser}>Sign Out</NavLink>
          </div>
  </div>
  <div className="groceries">
    {groceryItems}
  </div>
  </React.Fragment>
  )
}
export default Home;