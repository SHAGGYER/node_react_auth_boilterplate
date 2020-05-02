import React, {useRef, useState} from "react";
import {useClickOutside} from "../../Hooks/ClickOutside";
import {Link} from "react-router-dom";
import "./Dropdown.css";

export default function ({menuTitle, items, buttonAsItem, defaultItem}) {
    const closedClass = "dropdown";
    const openClass = "dropdown dropdown--active";
    const [className, setClassName] = useState(closedClass);
    const wrapperRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState("");

    useClickOutside(wrapperRef, () => setClassName(closedClass));

    const close = () => {
        setClassName(closedClass);
    };

    const open = () => {
        setClassName(openClass);
    };

    const itemOnClick = (item) => {
        setSelectedItem(item);
        item.onClick();
        close();
    };

    return (
        <div ref={wrapperRef} className="dropdown-container">
            <span className="dropdown__btn"
                  onClick={open}>
                <span
                    className="mr-1">{defaultItem && !selectedItem ? defaultItem : buttonAsItem && selectedItem ? selectedItem.text : menuTitle}</span>
                <i className="fas fa-caret-down"></i>
            </span>
            <div className="dropdown__items">
                <ul className={className}>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.onClick && (
                                <button className="dropdown__item"
                                        onClick={() => itemOnClick(item)}>
                                    {item.text}
                                </button>
                            )}
                            {item.to && (
                                <Link className="dropdown__item"
                                      to={item.to}
                                      onClick={close}>
                                    {item.text}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}