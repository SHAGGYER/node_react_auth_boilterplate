import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FormErrors from "../../Components/FormErrors/FormErrors";
import HttpClient from "../../Services/HttpClient";
import "./Login.css";
import Button from "../../Components/Button/Button";
import validator from "validator";
import Input from "../../Components/Input/Input";
import Alert from "../../Components/Alert/Alert";

export default function Login() {
    const history = useHistory();
    const [error, setError] = useState([]);
    const [generalError, setGeneralError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async event => {
        event.preventDefault();
        let _error = {};
        setError({});

        if (!email.trim()) _error.email = "Email is required";
        else if (!validator.isEmail(email)) _error.email = "Email must be in correct format";
        if (!password) _error.password = "Password is required";
        if (Object.keys(_error).length) return setError(_error);

        try {
            const data = {
                email,
                password
            };

            const response = await HttpClient().post("/api/auth/login", data);
            localStorage.setItem("token", response.data.token);
            window.location = "/";
        } catch (e) {
            setGeneralError(e.response.data.message);
        }
    };

    return (
        <div className="page">
            <h1 className="page__title">Login</h1>
            <form onSubmit={onSubmit}>
                {!!generalError.length && <Alert type="error">{generalError}</Alert>}
                <div className="form__group mb-1">
                    <Input onChange={e => setEmail(e.target.value)} value={email} label="Email" error={error.email}/>
                </div>
                <div className="form__group mb-1">
                    <Input type="password" onChange={e => setPassword(e.target.value)} value={password} label="Password"
                           error={error.password}/>
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
