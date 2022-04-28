import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import * as PageLinks from "./constants/routes";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homeweb from "./pages/Homeweb";
import ForgetID from "./pages/ForgetID";
import Bio from "./pages/Bio";
import Interest from "./pages/Interest";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import AccountSetting from "./pages/AccountSetting";
import NewInterest from "./pages/NewInterest";
import PasswordReset from "./pages/PasswordReset";
import UserSearchResult from "./pages/UserSearchResult";
import UserProfile from "./pages/UserProfile";
import Follower from "./pages/Follower";
import Following from "./pages/Following";
import Notification from "./pages/Notification";
import DirectMessage from "./pages/DirectMessage";
import PostDetail from "./pages/PostDetail";
import SavedPosts from "./pages/SavedPosts";

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
        <Route path={PageLinks.SEARCHRES} element={<UserSearchResult />} />
        <Route path={PageLinks.FORGOTID} element={<ForgetID />} />
        <Route path={PageLinks.PROFILE} element={<Profile />} />
        <Route path={PageLinks.USERPROFILE} element={<UserProfile />} />
        <Route path={PageLinks.SETTING} element={<Setting />} />
        <Route path={PageLinks.ACCSETTING} element={<AccountSetting />} />
        <Route path={PageLinks.NEWINTEREST} element={<NewInterest />} />
        <Route path={PageLinks.PASSRESET} element={<PasswordReset />} />
        <Route path={PageLinks.FOLLOWER} element={<Follower />} />
        <Route path={PageLinks.FOLLOWING} element={<Following />} />
        <Route path={PageLinks.NOTIFICATION} element={<Notification />} />
        <Route path={PageLinks.POSTDETAIL} element={<PostDetail />} />
        <Route path={PageLinks.DIRECTMESSAGE} element={<DirectMessage />} />
        <Route path={PageLinks.SAVEDPOSTS} element={<SavedPosts />} />
      </Routes>
    </Router>
  );
}

export default App;
