import React, {useEffect, useRef, useState} from "react";
import "./Autocomplete.css";
import {useClickOutside} from "../../Hooks/ClickOutside";
import {useKeyPress} from "../../Hooks/KeyPress";
import HttpClient from "../../Services/HttpClient";
import Button from "../Button/Button";

export default function ({items, label, onItemSelected, url, buttons, resource, resetResource, placeholder, closeOnSelect}) {
    const [searchTerm, setSearchTerm] = useState('');
    const closedClass = "autocomplete__results";
    const openClass = "autocomplete__results autocomplete__results--active";
    const [filteredItems, setFilteredItems] = useState(items ? items : []);
    const [className, setClassName] = useState(closedClass);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);
    const wrapperRef = useRef(null);
    const [previousSearchTerm, setPreviousSearchTerm] = useState("");

    useEffect(() => {
        if (filteredItems.length && downPress) {
            setCursor(prevState => prevState < filteredItems.length - 1 ? prevState + 1 : prevState);
        }
    }, [downPress]);
    useEffect(() => {
        if (filteredItems.length && upPress) {
            setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
    }, [upPress]);
    useEffect(() => {
        if (filteredItems.length && enterPress && className === openClass) {
            selectItem(filteredItems[cursor]);
        }
    }, [cursor, enterPress]);
    useEffect(() => {
        if (filteredItems.length && hovered) {
            setCursor(filteredItems.indexOf(hovered));
        }
    }, [hovered]);

    const open = () => {
        setClassName(openClass);
    };

    const close = () => {
        setClassName(closedClass);
    };

    useClickOutside(wrapperRef, () => close());

    const doResetResource = () => {
        setSearchTerm('');
    };

    const search = event => {
        const v = event.target.value;
        setSearchTerm(v);
        if (previousSearchTerm) setPreviousSearchTerm("");
        if (!url) {
            if (className !== openClass) {
                open();
            }

            let _items = [...items];
            _items = _items.filter(item => item[label].toLowerCase().includes(v.toLowerCase()));
            setFilteredItems(_items);
        } else {
            setFilteredItems([]);
        }
    };

    const selectItem = item => {
        if (setSearchTerm) {
            setSearchTerm(item[label]);
        }
        setPreviousSearchTerm(item[label]);
        onItemSelected(item);
        if (closeOnSelect) {
            close();
        }
        if (resetResource) {
            doResetResource();
            if (items) {
                setFilteredItems(items);
            }
        }
    };

    const fetchItems = async () => {
        if (url) {
            setFilteredItems([]);
            const {data} = await HttpClient().get(url + '?searchTerm=' + searchTerm);
            let _items = [...data];
            _items = _items.filter(item => item[label].toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredItems(_items);
            if (_items.length) {
                open();
            }
        }
    };

    const onButtonClick = button => {
        button.onClick();
        close();
    };

    useEffect(() => {
        let handler;
        if (url) {
            if (searchTerm && searchTerm !== previousSearchTerm && !resource) {
                handler = setTimeout(fetchItems, 500);
            }

            if (!searchTerm) {
                setFilteredItems([]);
            }
        }


        return () => {
            clearTimeout(handler);
        }
    }, [searchTerm]);

    return (
        <div className="autocomplete">
            <input className="form__input"
                   value={searchTerm}
                   onChange={e => search(e)}
                   onClick={(url && filteredItems.length) || !url ? open : null}
                   placeholder={placeholder ? placeholder : ""}
                   autoComplete="new-search-term"/>
            <article className="autocomplete__container">
                <div className={className} ref={wrapperRef}>
                    {filteredItems.map((filteredItem, index) => (
                        <div key={index}
                             className={`autocomplete__result${index === cursor ? " autocomplete__result--active" : ""}`}
                             onMouseEnter={() => setHovered(filteredItem)}
                             onMouseLeave={() => setHovered(undefined)}
                             onClick={() => selectItem(filteredItem)}>
                            {filteredItem[label]}
                        </div>
                    ))}

                    {buttons && !!buttons.length && (
                        <article className="autocomplete__buttons">
                            {buttons.map((button, index) => (
                                <Button key={index} className="btn--primary btn--small autocomplete__buttons-btn"
                                        onClick={() => onButtonClick(button)}>{button.text}</Button>
                            ))}
                        </article>
                    )}
                </div>
            </article>
        </div>
    );
}