import './App.css'
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import BoxSx from './components/Boxes';
import Home from "./pages/Home"
import Login from "./pages/Login"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
