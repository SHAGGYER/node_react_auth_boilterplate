import React, {useState} from "react";
import "./Card.css";

export default function ({children, className}) {
    return (
        <div className={'card ' + (className ? className : '')}>
            {children}
        </div>
    )
}