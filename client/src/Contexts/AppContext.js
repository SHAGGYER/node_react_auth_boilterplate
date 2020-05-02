import {createContext} from "react";

const AppContext = createContext({
    installed: false,
    setInstalled: () => {
    },
    user: null,
    setUser: () => {
    },
    logout: () => {
    },
    loading: false,
    setLoading: () => {
    },
    socket: null,
    notifications: [],
    setNotifications: () => {
    },
    showNotification: () => {
    }
});

export default AppContext;
