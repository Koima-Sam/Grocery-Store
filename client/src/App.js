import './App.css';
import Login from './Components/Login';
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import React, { useEffect, useState } from 'react';
import Footer from './Components/Footer';
import Nav from './Components/Nav';
import NewProduct from './Components/NewProduct';
import EditForm from './Components/EditForm';
import BuyerHomeDashBoard from './Components/BuyerDashBoard';
// import BuyerHomeDashBoard from './Components/BuyerDashBoard';
function App() {
  const [user, setUser] = useState(null)
  const [groceries,setGroceries] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    fetch("/products")
    .then((resp)=>resp.json())
    .then((data)=>setGroceries(data))
  },[])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  console.log(user)

  if (!user){
    return (
      <React.Fragment>
      <Nav />
    <Routes>
        <Route exact path='/login'element={<Login setUser={setUser}/>}/>
        <Route exact path='/signup'element={<SignUp setUser={setUser}/>}/>
    </Routes>
    <Footer />
    </React.Fragment>)

  } 

  const filtered = groceries.filter((item)=>{
    if(user!==null){
      return item.user_id===user.id
    }
  })
  //Add new product to the state
  function onAddNew(data){
    setGroceries([...groceries,data])
  }
  // Update the data in the state
  function onUpdate(data){
    const updated = groceries.map((item)=>{
      if(item.id===data.id){
        return data
      }
      return item
    })
    setGroceries(updated)
  }

  // Remove deleted item from the state
  function onDelete(id){
    const filteredProducts = groceries.filter(item => item.id !== id)
    setGroceries(filteredProducts)
  }



  // Logout user
  function logoutUser(){
    if(user!==null){
      fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          navigate('/login')
        }
      });
    }
    else{
      navigate('/login')
      alert('Not logged in')
    }
  }
  
  return (
    <div className="App">
      {/* <Nav /> */}
     
      <Routes>
        <Route exact path='/login'element={<Login setUser={setUser}/>}/>
        <Route exact path='/signup'element={<SignUp setUser={setUser}/>}/>
        {user.category==="seller"? <Route exact path='/' element={<Home groceries={filtered} onDelete={onDelete} onUpdate={onUpdate} logoutUser={logoutUser} />}/>: <Route exact path='/dashboard' element={<BuyerHomeDashBoard groceries={groceries} logoutUser={logoutUser} />}/>}
        <Route exact path='/new' element={<NewProduct user={user} onAddNew={onAddNew} logoutUser={logoutUser}/>}/>
        <Route exact path='/edit' element={<EditForm  onUpdate={onUpdate}/>}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
