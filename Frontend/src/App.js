import './App.css'
import * as React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homeweb from "./pages/Homeweb";
import ForgetID from "./pages/ForgetID";
import Bio from "./pages/Bio";
import Interest from "./pages/Interest"
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import AccountSetting from "./pages/AccountSetting"
import UserSearchResult from './pages/UserSearchResult';
import * as PageLinks from "./constants/routes"
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PageLinks.HOME} element={<Home />} />
        <Route path={PageLinks.LOGIN} element={<Login />} />
        <Route path={PageLinks.SIGNUP} element={<Signup />} />
        <Route path={PageLinks.BIO} element={<Bio />} />
        <Route path={PageLinks.INTEREST} element={<Interest />} />
        <Route path={PageLinks.HOMEWEB} element={<Homeweb />} />
        <Route path={PageLinks.SEARCHRES} element={<UserSearchResult/>}/>
        <Route path={PageLinks.FORGOTID} element={<ForgetID />} />
        <Route path={PageLinks.PROFILE} element={<Profile />} />
        <Route path={PageLinks.USERPROFILE} element={<UserProfile/>}/>
        <Route path={PageLinks.SETTING} element={<Setting />} />
        <Route path={PageLinks.ACCSETTING} element={<AccountSetting />} />
      </Routes>
    </Router>
  );
}

export default App;
