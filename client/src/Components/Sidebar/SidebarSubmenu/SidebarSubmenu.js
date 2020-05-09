import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function ({title, items}) {
    const closedClass = "sidebar__submenu";
    const openClass = "sidebar__submenu sidebar__submenu--active";
    const [className, setClassName] = useState(closedClass);

    const toggle = () => {
        if (className === closedClass) setClassName(openClass);
        else setClassName(closedClass);
    };

    return (
        <li className="sidebar__nav-item">
            <span className="sidebar__nav-link" onClick={toggle}>{title}</span>
            <ul className={className}>
                {items.map((item, index) => (
                    <li key={index} className="sidebar__nav-item">
                        <Link to={item.to} className="sidebar__nav-link">{item.title}</Link>
                    </li>
                ))}
            </ul>
        </li>
    )
}