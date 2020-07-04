import React, {useState, useEffect} from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";
import "./CommonCss/Columns/Columns.css";
import "./CommonCss/List/List.css";
import "./CommonCss/Form/Form.css";
import "./CommonCss/Page/Page.css";
import "./CommonCss/Coupons/Coupons.css";
import "./CommonCss/Pagination/Pagination.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AppContext from "./Contexts/AppContext";
import Loading from "./Components/Loading/Loading";
import Error404 from "./Pages/Errors/404/Error404";
import ReactNotification, {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import HttpClient from "./Services/HttpClient";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Install from "./Pages/Install/Install";
import Error400 from "./Pages/Errors/400/Error400";
import Error401 from "./Pages/Errors/401/Error401";
import Error500 from "./Pages/Errors/500/Error500";

const App = ({location}) => {
    const [user, setUser] = useState(null);
    const [initiated, setInitiated] = useState(false);
    const [installed, setInstalled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const {data} = await HttpClient().get("/api/auth/init");
        if (data.user) {
            setUser(data.user);
        }
        setInstalled(data.installed);
        setInitiated(true);
    };

    const logout = () => {
        setUser(null);
        localStorage.setItem("token", null);
    };

    return (
        <div className="h-100">
            {loading && <Loading/>}
            <ReactNotification/>
            {initiated && (
                <AppContext.Provider value={{
                    user,
                    setUser,
                    logout,
                    loading,
                    setLoading,
                    installed,
                    setInstalled,
                }}>
                    <section className="flex flex--column h-100">
                        <Navbar/>
                        <Switch>
                            <Route path="/auth/login">
                                {!user ? <Login/> : <Redirect to="/"/>}
                            </Route>
                            <Route path="/auth/register">
                                {!user ? <Register/> : <Redirect to="/"/>}
                            </Route>
                            <Route path="/auth/forgot-password">
                                <ForgotPassword/>
                            </Route>
                            <Route path="/auth/reset-password">
                                <ResetPassword/>
                            </Route>
                            <Route path="/errors/400">
                                <Error400/>
                            </Route>
                            <Route path="/errors/401">
                                <Error401/>
                            </Route>
                            <Route path="/errors/404">
                                <Error404/>
                            </Route>
                            <Route path="/errors/500">
                                <Error500/>
                            </Route>
                        </Switch>
                    </section>
                </AppContext.Provider>
            )}
        </div>
    );
};

export default withRouter(App);
