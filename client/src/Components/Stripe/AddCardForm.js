import React, {useContext, useState} from 'react';
import {injectStripe} from 'react-stripe-elements';
import CardSection from './CardSection';
import FormErrors from "../FormErrors/FormErrors";
import Button from "../Button/Button";
import HttpClient from "../../Services/HttpClient";
import AppContext from "../../Contexts/AppContext";

const AddCardForm = ({stripe, elements, setModalOpen}) => {
    const {setUser} = useContext(AppContext);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const handleSubmit = async (ev) => {
        ev.preventDefault();

        setSubmitting(true);
        const sourceResponse = await stripe.createSource({type: 'card'});
        const {source, error} = sourceResponse;
        if (error) {
            setErrors([error.message]);
            setSubmitting(false);
            return;
        }

        const response = await HttpClient().post('/api/billing/add-card', {source});
        setUser(response.data);
        setSubmitting(false);
        setModalOpen(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            {!!errors.length && <FormErrors errors={errors}/>}
            <input className="card__element mb-1" placeholder="Name" value={name}
                   onChange={e => setName(e.target.value)}/>
            <CardSection/>
            <div className="mt-2">
                <Button className='btn--success' type="submit" loading={submitting}>Add Card</Button>
            </div>

        </form>
    );
};

export default injectStripe(AddCardForm);