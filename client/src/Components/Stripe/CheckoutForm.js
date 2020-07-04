import React, {useContext, useState} from 'react';
import {injectStripe} from 'react-stripe-elements';

import CardSection from './CardSection';
import FormErrors from "../FormErrors/FormErrors";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import HttpClient from "../../Services/HttpClient";

const CheckoutForm = ({stripe, elements, setActiveStep, total, setPaymentId, setStatus}) => {
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [saveCard, setSaveCard] = useState(true);
    const handleSubmit = async (ev) => {
        ev.preventDefault();

        setSubmitting(true);

        if (!saveCard) {
            const data = {
                total
            };
            const paymentIntentResponse = await HttpClient().post("/api/billing/get-payment-intent", data);
            const response = await stripe.confirmCardPayment(paymentIntentResponse.data.client_secret, {
                payment_method: {
                    card: elements.getElement('cardNumber'),
                    billing_details: {
                        name,
                    },
                }
            });

            if (response.paymentIntent && response.paymentIntent.status === "succeeded") {
                setPaymentId(response.paymentIntent.id);
                setStatus('finish')
            } else {
                setErrors([response.error.message]);
                setSubmitting(false);
                setStatus('error');
            }
        } else {
            const sourceResponse = await stripe.createSource({type: 'card'});
            const {source, error} = sourceResponse;
            if (error) {
                setErrors([error.message]);
                setSubmitting(false);
                setStatus('error');
                return;
            }

            const response = await HttpClient().post('/api/billing/add-card-and-pay', {source, total});
            setPaymentId(response.data.id);
            setStatus('finish');
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            {!!errors.length && <FormErrors errors={errors}/>}
            <input className="card__element mb-1" placeholder="Name" value={name}
                   onChange={e => setName(e.target.value)}/>
            <CardSection/>
            <div className='mt-1'>
                <Checkbox checked={saveCard} onChange={e => setSaveCard(e.target.checked)}
                          label='Save Card for later?'/>
            </div>
            <div className="mt-2">
                <Button className="btn--error mr-1" onClick={() => setActiveStep(prevState => prevState - 1)}>
                    Previous
                </Button>
                <Button className='btn--success' type="submit" loading={submitting}>Pay Now</Button>
            </div>

        </form>
    );
}

export default injectStripe(CheckoutForm);