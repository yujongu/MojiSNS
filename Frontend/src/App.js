import './App.css'
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homeweb from "./pages/Homeweb";
import ForgetID from "./pages/ForgetID";
import * as PageLinks from "./constants/routes"

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PageLinks.HOME} element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
