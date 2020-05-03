import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FormErrors from "../../Components/FormErrors/FormErrors";
import HttpClient from "../../Services/HttpClient";
import "./Login.css";
import Button from "../../Components/Button/Button";

export default function Login() {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async event => {
        event.preventDefault();
        let _errors = [];
        setErrors([]);

        if (!email.trim()) _errors.push("Email is required");
        if (!password.trim()) _errors.push("Password is required");

        if (_errors.length) {
            setErrors(_errors);
            return;
        }

        try {
            const data = {
                email,
                password
            };

            const response = await HttpClient().post("/api/auth/login", data);
            localStorage.setItem("token", response.data.token);
            window.location = "/";
        } catch (e) {
            setErrors([e.response.data.message]);
        }
    };

    return (
        <div className="page">
            <h1 className="page__title">Login</h1>
            <form onSubmit={onSubmit}>
                {errors.length ? <FormErrors errors={errors}/> : null}
                <div className="form__group mb-1">
                    <label className="form__label">Email</label>
                    <input className="form__input"
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="text"/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Password</label>
                    <input className="form__input"
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           type="password"/>
                </div>

                <div className="form__buttons">
                    <div className="form__buttons__left">
                        <Button className="btn--primary mb-1" type="submit">Log Ind</Button>
                    </div>

                    <div>
                        <Link to="/auth/forgot-password">Forgot Password?</Link>
                        <span> | </span>
                        <Link to="/auth/register">Register</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}
