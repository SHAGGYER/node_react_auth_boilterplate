import React from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

export default function Modal({isOpen, onClose, children, contentClassName}) {
    const closeModal = () => {
        onClose();
    };

    return (
        <div style={{display: isOpen ? "flex" : "none"}}>
            <Backdrop isActive={isOpen} onClick={onClose}/>
            <div className={"modal__content " + contentClassName}>
                <span className="modal__close" onClick={closeModal}>&times;</span>
                {children}
            </div>
        </div>
    )
}
