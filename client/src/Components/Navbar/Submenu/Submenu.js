import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useClickOutside} from "../../../Hooks/ClickOutside";

export default function ({title, items}) {
    const closedClass = "navbar__submenu-list";
    const openClass = "navbar__submenu-list navbar__submenu--active";
    const wrapperRef = useRef(null);
    const [className, setClassName] = useState(closedClass);

    useClickOutside(wrapperRef, () => setClassName(closedClass));

    const close = () => {
        setClassName(closedClass);
    };

    const open = () => {
        setClassName(openClass);
    };

    const handleOnClick = item => {
        item.onClick();
        close();
    }

    return (
        <li className="navbar__list-item navbar__submenu" ref={wrapperRef}>
            <button className="navbar__link navbar__submenu-btn"
                    onClick={open}>
                {title}
            </button>
            <ul className={className}>
                {items.map((item, index) => (
                    <li className="navbar__submenu-item" key={index}>
                        {!item.onClick ? (
                            <Link className="navbar__link" onClick={close} to={item.to}>{item.title}</Link>
                        ) : (
                            <a href="#" onClick={() => handleOnClick(item)} className="navbar__link">{item.title}</a>
                        )}
                    </li>
                ))}
            </ul>

        </li>
    )
};
