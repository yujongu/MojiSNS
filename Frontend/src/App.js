
import * as React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import * as Routes from "./constants/routes"
import './App.css'

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Homeweb from "./pages/Homeweb"
import ForgetID from './pages/ForgetID'
import HomeNew from "./pages/HomeNew"


function App() {
  return (
    <BrowserRouter>
      <Route path={Routes.HOME} exact={true} component={HomeNew}/>
      <div>Testing</div>
    </BrowserRouter>
    
  );
}

export default App;