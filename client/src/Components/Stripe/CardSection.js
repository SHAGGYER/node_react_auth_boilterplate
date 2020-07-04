import React from 'react';
import {CardNumberElement, CardCvcElement, CardExpiryElement} from 'react-stripe-elements';
import "./CardSection.css";

const CardSection = () => {
    return (
        <div>
            <CardNumberElement className="card__element mb-1"/>
            <div className="card__column">
                <CardExpiryElement className="card__element"/>
                <CardCvcElement className="card__element"/>
            </div>
        </div>

    );
};

export default CardSection;