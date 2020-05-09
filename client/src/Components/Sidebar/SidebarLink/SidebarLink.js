import React from "react";
import {Link} from "react-router-dom";

export default function ({title, to}) {
    return (
        <li className="sidebar__nav-item">
            <Link to={to} className="sidebar__nav-link">
                {title}
            </Link>
        </li>
    )
}