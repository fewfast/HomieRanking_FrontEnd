import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        const userString = localStorage.getItem("user");
    
        // ตรวจสอบว่าค่า userString ไม่ใช่ null และไม่ใช่ "undefined"
        let storedUser = null;
        if (userString && userString !== "undefined") {
            try {
                storedUser = JSON.parse(userString);
            } catch (err) {
                console.error("Failed to parse user JSON:", err);
            }
        }
    
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (newToken, userData) => {
        localStorage.setItem("access_token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(newToken);
        setUser(userData);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
