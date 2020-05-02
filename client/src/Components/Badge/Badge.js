import React from "react";
import "./Badge.css";

export default function ({children, onClose}) {
    return (
        <span className="badge">
            {children}
            {onClose && (
                <span className="badge__close" onClick={onClose}>&times;</span>
            )}
        </span>
    )
}