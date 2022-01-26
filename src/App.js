import './App.css'
import * as React from 'react';
import {HashRouter, Route} from "react-router-dom";
import BoxSx from './components/Boxes';
import Home from "./pages/Home"


function App() {
  return (
  // <HashRouter>
  //   <Route path="/" exact={true} component={Home} />
  // </HashRouter>
    <Home/>
  );
}

export default App;
