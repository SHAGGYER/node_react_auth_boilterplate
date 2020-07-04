import React, {useState} from "react";
import "./Stepper.css"

export const Stepper = ({children, activeStep}) => {
    return (
        <div className="stepper">
            <div className="stepper__header">
                {children.length > 1 ? children.map(({props}, index) => (
                    <div className={`${index <= activeStep && "active"} stepper__header-item`}
                         key={index}>
                        {index + 1}
                    </div>
                )) : (
                    <li className="stepper__header-item">{activeStep + 1}</li>
                )}
            </div>

            {children.length > 1 ? children[activeStep] : children}
        </div>
    )
};

export const Step = ({children}) => {
    return (
        <div className="step">
            {children}
        </div>
    )
};