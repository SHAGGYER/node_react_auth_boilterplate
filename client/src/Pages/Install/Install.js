import React, {useContext, useState} from "react";
import validator from "validator";
import HttpClient from "../../Services/HttpClient";
import FormErrors from "../../Components/FormErrors/FormErrors";
import Button from "../../Components/Button/Button";
import AppContext from "../../Contexts/AppContext";

export default function () {
    const {loading, setLoading} = useContext(AppContext);
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const onSubmit = async event => {
        event.preventDefault();
        let _errors = [];
        setErrors([]);

        if (!name) _errors.push("Name is required");
        if (!email) _errors.push("Email is required");
        else if (!validator.isEmail(email)) _errors.push("Email must be in correct format");
        if (!password) _errors.push("Password is required");
        if (!passwordAgain) _errors.push("Password confirmation is required");
        else if (password !== passwordAgain) _errors.push("Passwords must match");
        if (_errors.length) return setErrors(_errors);

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
            setErrors([e.response.data.message]);
            setLoading(false);
        }
    };

    return (
        <div className="page page--50">
            <h1 className="page__title">Install Software</h1>
            <form onSubmit={onSubmit}>
                {!!errors.length && <FormErrors errors={errors}/>}
                <div className="form__group mb-1">
                    <label className="form__label">Name</label>
                    <input className="form__input" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Email</label>
                    <input className="form__input" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Password</label>
                    <input className="form__input" type="password" value={password}
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="form__group mb-1">
                    <label className="form__label">Password Again</label>
                    <input className="form__input"
                           type="password"
                           value={passwordAgain}
                           onChange={e => setPasswordAgain(e.target.value)}/>
                </div>
                <Button className="btn--primary" loading={loading} type="submit">Install Software</Button>
            </form>
        </div>
    )
}
