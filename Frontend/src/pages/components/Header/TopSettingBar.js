import React from "react"
import { PropTypes } from "prop-types"
import "./TopSettingBar.css"

function TopSettingBar({text}) {
    return (
        <div id="topSettingBar_container">
            <p>{text}</p>
            <button>
                Settings
            </button>
        </div>
    );
}

// TopSettingBar.propTypes = {
//     text: PropTypes.text
// }
export default TopSettingBar