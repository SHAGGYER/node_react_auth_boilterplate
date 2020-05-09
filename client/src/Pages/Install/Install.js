import React, {useContext, useState} from "react";
import validator from "validator";
import HttpClient from "../../Services/HttpClient";
import Button from "../../Components/Button/Button";
import AppContext from "../../Contexts/AppContext";
import Input from "../../Components/Input/Input";
import Alert from "../../Components/Alert/Alert";

export default function () {
    const {loading, setLoading} = useContext(AppContext);
    const [generalError, setGeneralError] = useState(null);
    const [error, setError] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

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
            setLoading(true);
            const data = {
                name,
                email,
                password
            };

            await HttpClient().post("/api/auth/register-admin", data);
            setLoading(false);
            window.location = "/auth/login";
        } catch (e) {
            setGeneralError([e.response.data.message]);
            setLoading(false);
        }
    };

    return (
        <div className="page page--50">
            <h1 className="page__title">Install Software</h1>
            <form onSubmit={onSubmit}>
                {!!generalError && <Alert type="error"/>}
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
                <Button className="btn--primary" loading={loading} type="submit">Install Software</Button>
            </form>
        </div>
    )
}
