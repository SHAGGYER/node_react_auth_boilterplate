import React from "react";
import "./Button.css";

export default function ({children, onClick, loading, disabled, className, type}) {
    return (
        <button className={`btn${className ? ` ${className}` : ''}`}
                type={type ? type : 'button'}
                onClick={onClick}
                disabled={loading || disabled}>
            {loading && <i className="fa fa-spinner fa-spin"/>}{children}
        </button>
    )
}