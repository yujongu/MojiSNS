import React from "react"
import { PropTypes } from "prop-types"
import "./TopSettingBar.css"
import { useNavigate } from "react-router-dom";

function TopSettingBar({text}) {
    let navigate = useNavigate();

    return (
        <div id="topSettingBar_container">
            <p>{text}</p>
            <button onClick={()=>{navigate("/setting")}}>
                Settings
            </button>
        </div>
    );
}

// TopSettingBar.propTypes = {
//     text: PropTypes.text
// }
export default TopSettingBar