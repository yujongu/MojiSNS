import React from 'react'
import "./Setting.css";

const Setting = () => {
    return (
        <main className="settingMain">
            <div className='center2'>
                <div className="header2">
                    <div className="headerApp">
                        <h2 class="titleWeb">Settings Page</h2>
                    </div>
                    <div className='settingCard'>
                        <button className="btnSetting">
                            General
                        </button>
                        <button className="btnSetting">
                            Privacy
                        </button>
                        <button className="btnSetting">
                            Language
                        </button>
                        <button className="btnSetting">
                            Theme
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Setting