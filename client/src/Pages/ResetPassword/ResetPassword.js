import React, {useEffect, useState} from "react";
import {withRouter, useHistory, Link} from "react-router-dom";
import Alert from "../../Components/Alert/Alert";
import queryString from "query-string";
import HttpClient from "../../Services/HttpClient";
import FormErrors from "../../Components/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";

const ResetPassword = ({location}) => {
    const {token} = queryString.parse(location.search);
    const history = useHistory();
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setError(null);
        setUser(null);

        if (token) {
            checkToken();
        }
    }, [token]);

    const checkToken = async () => {
        try {
            const data = {
                token
            };

            const response = await HttpClient().post("/api/auth/check-email-verification-token", data);
            setUser(response.data);
        } catch (e) {
            setError(e.response.data.message);
        }
    };

    const onSubmit = async event => {
        event.preventDefault();
        setErrors([]);
        let _errors = [];

        if (!password.trim()) _errors.push("Password is required");
        if (!passwordAgain.trim()) _errors.push("Password confirmation is required");
        else if (password !== passwordAgain) _errors.push("Passwords must match");

        if (_errors.length) return setErrors(_errors);

        const data = {
            userId: user._id,
            password
        };

        await HttpClient().post("/api/auth/reset-password", data);
        history.push("/auth/login");
    };

    return (
        <div className="page">
            {user && (
                <div>
                    <h2>Welcome back, {user.name}</h2>
                    <form onSubmit={onSubmit}>
                        {!!errors.length && <FormErrors errors={errors}/>}
                        <div className="form__group mb-1">
                            <label className="form__label">New Password</label>
                            <input className="form__input"
                                   value={password}
                                   type="password"
                                   onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="form__group mb-1">
                            <label className="form__label">Password Again</label>
                            <input className="form__input"
                                   value={passwordAgain}
                                   type="password"
                                   onChange={e => setPasswordAgain(e.target.value)}/>
                        </div>
                        <Button className="btn--primary" type="submit">Reset Password</Button>
                    </form>
                </div>
            )}
            {error && (
                <Alert type="error">{error}</Alert>
            )}
        </div>

    )
};

export default withRouter(ResetPassword);
