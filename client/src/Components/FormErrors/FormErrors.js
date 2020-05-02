import React from "react";
import "./FormErrors.css";

export default function FormErrors({errors}) {
    return (
        <div className="form-errors">
            {errors.length > 1 ? (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            ) : (
                <span>{errors[0]}</span>
            )}
        </div>
    )
}