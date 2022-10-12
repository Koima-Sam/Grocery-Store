import './App.css';
import Login from './Components/Login';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path = "/home" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
