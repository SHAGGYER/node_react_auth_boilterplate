import React from "react";
import "./Avatar.css"

export default function ({src, children}) {
    return (
        <div className="avatar__container">
            <img src={src} className="avatar"/>
            {children}
        </div>
    )
}