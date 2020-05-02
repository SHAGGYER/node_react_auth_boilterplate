import React from "react";
import "./Backdrop.css";

export default function ({isActive, onClick}) {
    return (
        <div className={"backdrop" + (isActive ? " backdrop--active" : "")} onClick={onClick ? onClick : null}/>
    )
}