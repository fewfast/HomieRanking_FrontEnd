import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUsername] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        const storedUsername = JSON.parse(localStorage.getItem("user"));

        // เช็คสถานะการLoginจาก localStorage
        if (storedToken && storedUsername) {
            setToken(storedToken);
            setUsername(storedUsername);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (newToken, newUsername) => {
        localStorage.setItem("access_token", newToken);
        localStorage.setItem("user", JSON.stringify(newUsername));
        setToken(newToken);
        setUsername(newUsername);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setToken(null);
        setUsername(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};