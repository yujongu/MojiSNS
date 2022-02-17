import './App.css'
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import BoxSx from './components/Boxes';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;