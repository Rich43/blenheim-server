import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: window.sessionStorage.getItem('token'),
    updateToken: (newToken: string) => {},
});

export const AuthProvider: React.FC = (props) => {
    const [token, setToken] = useState(window.sessionStorage.getItem('token'));
    const updateToken = (newToken: string) => {
        window.sessionStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const state = {
        token: token,
        updateToken: updateToken
    };

    return (
        <AuthContext.Provider value={ state } {...props} />
    );
};

export const useAuth = () => React.useContext(AuthContext);
