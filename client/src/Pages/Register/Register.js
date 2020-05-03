import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FormErrors from "../../Components/FormErrors/FormErrors";
import validator from "validator";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";

export default function Register() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = async event => {
        event.preventDefault();
        let _errors = [];
        setErrors([]);

        if (!name.trim()) _errors.push("Name is required");
        if (!email.trim()) _errors.push("Email is required");
        else if (!validator.isEmail(email)) _errors.push("Email must be in correct format");
        if (!password.trim()) _errors.push("Password is required");
        if (!passwordAgain.trim()) _errors.push("Password confirmation is required");
        else if (password !== passwordAgain) _errors.push("Passwords must match");
        if (_errors.length) return setErrors(_errors);

        try {
            const data = {
                name,
                email,
                password
            };

            const response = await HttpClient().post("/api/auth/register", data);
            localStorage.setItem("token", response.data.token);
            window.location = '/';
        } catch (e) {
            setErrors([e.response.data.message]);
        }

    };

    return (
        <div className="page">
            <h1 className="page__title">Register</h1>
            <form onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group mb-1">
                    <label className="form__label">Name</label>
                    <input className="form__input" value={name}
                           onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Email</label>
                    <input className="form__input" value={email}
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Password</label>
                    <input className="form__input"
                           type="password"
                           value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Password Again</label>
                    <input className="form__input"
                           type="password"
                           value={passwordAgain}
                           onChange={e => setPasswordAgain(e.target.value)}/>
                </div>
                <div className="form__buttons">
                    <div className="form__buttons__left">
                        <Button className="btn--primary" type="submit">Register</Button>
                    </div>
                    <div>
                        <Link to="/auth/forgot-password">Forgot Password?</Link>
                        <span> | </span>
                        <Link to="/auth/login">Login</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}
