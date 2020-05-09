import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FormErrors from "../../Components/FormErrors/FormErrors";
import validator from "validator";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import Alert from "../../Components/Alert/Alert";

export default function Register() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState([]);

    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [generalError, setGeneralError] = useState("");

    const onSubmit = async event => {
        event.preventDefault();
        let _error = {};
        setError({});

        if (!name.trim()) _error.name = "Name is required";
        if (!email.trim()) _error.email = "Email is required";
        else if (!validator.isEmail(email)) _error.email = "Email must be in correct format";
        if (!password) _error.password = "Password is required";
        if (!passwordAgain) _error.passwordAgain = "Password confirmation is required";
        else if (password !== passwordAgain) _error.passwordAgain = "Passwords must match";
        if (Object.keys(_error).length) return setError(_error);

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
            setGeneralError(e.response.data.message);
        }

    };

    return (
        <div className="page">
            <h1 className="page__title">Register</h1>
            <form onSubmit={onSubmit}>
                {generalError && <Alert type="error">{generalError}</Alert>}
                <div className="form__group mb-1">
                    <Input onChange={e => setName(e.target.value)} value={name} label="Name" error={error.name}/>
                </div>
                <div className="form__group mb-1">
                    <Input onChange={e => setEmail(e.target.value)} value={email} label="Email" error={error.email}/>
                </div>
                <div className="form__group mb-1">
                    <Input type="password" onChange={e => setPassword(e.target.value)} value={password} label="Password"
                           error={error.password}/>
                </div>

                <div className="form__group mb-1">
                    <Input type="password" onChange={e => setPasswordAgain(e.target.value)} value={passwordAgain}
                           label="Password Confirmation" error={error.passwordAgain}/>
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
