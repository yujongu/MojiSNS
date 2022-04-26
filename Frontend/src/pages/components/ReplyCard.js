import React from "react";
import "./ReplyCard.css";
import { useNavigate } from "react-router-dom";
import datePretty from "../../helperFunctions/datePretty";
import Linkify from 'react-linkify';
import axios from "axios";
import { BackendConn } from "../../constants/backendConn";

function ReplyCard({
}) {
    let navigate = useNavigate();
    return (
        <div>
            Hello
        </div>
    );
}


export default ReplyCard