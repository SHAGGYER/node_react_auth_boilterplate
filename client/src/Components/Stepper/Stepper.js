import React, {useState} from "react";
import "./Stepper.css"

export const Stepper = ({children, activeStep}) => {
    let mql = window.matchMedia("(min-width: 421px)");
    const [mqlMatches, setMqlMatches] = useState(mql.matches);

    const watchMedia = () => {
        if (!mql.matches) {
            setMqlMatches(false);
        } else {
            setMqlMatches(true);
        }
    };
    mql.addListener(watchMedia);


    return (
        <div className="stepper">
            <ul className="stepper__header">
                {children.length > 1 ? children.map(({props}, index) => (
                    <li className={`${index <= activeStep && "active"} stepper__header-item`}
                        style={{width: mqlMatches ? `${100 / children.length}%` : "100%"}}
                        key={index}>
                        {props.title}
                    </li>
                )) : (
                    <li className="stepper__header-item">{children.props.title}</li>
                )}
            </ul>

            {children.length > 1 ? children[activeStep] : children}
        </div>
    )
};

export const Step = ({isActive, children, title}) => {
    return (
        <div className="step">
            {children}
        </div>
    )
};