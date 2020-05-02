import React from "react";
import "./Alert.css";

export default function ({children, type}) {
    return (
        <div className={`alert ${"alert--" + type}`}>
            {children}
        </div>
    )
}