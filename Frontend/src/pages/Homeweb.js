import React from 'react'
import "./Homeweb.css"
import { useNavigate } from "react-router-dom";


const Homeweb = () => {
  let navigate = useNavigate();
  return (
    <main className="homewebMain">
      <div className="center1">
        <div className="header">
          <h2 class="titleWeb">
            Welcome to Moji!
          </h2>
        </div>
        <div className='bt1'>
          <button
            class='settings'
          >
            Settings
          </button>
        </div>
        <div className="tabBar">
          <div class="grid-container">
            <div class="grid-item">
              <a href='/profile'>
                <img src="profile.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Profile
                </h3>
              </a>
            </div>
            <div class="grid-item">
              <a href='/follower'>
                <img src="follower.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Follower
                </h3>
              </a>
            </div>
            <div class="grid-item">
              <a href='/following'>
                <img src="following.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Following
                </h3>
              </a>
            </div>
            <div class="grid-item">
              <a href='/posting'>
                <img src="posting.png" alt="Sample profile" width="140" height="140"></img>
                <h3 className="tabText">
                  Posting
                </h3>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Homeweb