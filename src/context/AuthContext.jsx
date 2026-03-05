import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from local storage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Basic simulation of login - all roles are customers for this version
        const newUser = {
            email,
            name: email.split('@')[0],
            role: 'customer'
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
    };

    const signup = (email, password, name) => {
        const newUser = { email, name, role: 'customer' };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
