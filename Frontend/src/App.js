import './App.css'
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Homeweb from "./pages/Homeweb"
import ForgetID from './pages/ForgetID';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Homeweb />} />
        <Route path="/forget" element={<ForgetID />} />
      </Routes>
    </Router>
  );
}

export default App;