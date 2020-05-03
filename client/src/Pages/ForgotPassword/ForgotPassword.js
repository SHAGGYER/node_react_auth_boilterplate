import React, {useState} from "react";
import FormErrors from "../../Components/FormErrors/FormErrors";
import validator from "validator";
import HttpClient from "../../Services/HttpClient";
import Alert from "../../Components/Alert/Alert";
import Button from "../../Components/Button/Button";
import {Link} from "react-router-dom";

export default function () {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);
    const [info, setInfo] = useState(null);

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        setInfo(null);
        let _errors = [];

        if (!email.trim()) _errors.push("Email is required");
        else if (!validator.isEmail(email)) _errors.push("Wrong email format");

        if (_errors.length) return setErrors(_errors);

        try {
            const data = {
                email
            };

            await HttpClient().post("/api/auth/send-verification-token", data);
            setInfo("Email is sent. Check eventually your spam folder.");
            setEmail("");
        } catch (e) {
            setErrors([e.response.data.message]);
        }
    };

    return (
        <div className="page">
            <h1 className="page__title">Forgot Password</h1>
            <form onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                {info && <Alert type="success">{info}</Alert>}
                <div className="form__group mb-1">
                    <label className="form__label">Your Email</label>
                    <input className="form__input" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form__buttons">
                    <div className="form__buttons__left">
                        <Button className="btn--primary" type="submit">Go</Button>
                    </div>
                    <div>
                        <Link to="/auth/register">Register</Link>
                        <span> | </span>
                        <Link to="/auth/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
