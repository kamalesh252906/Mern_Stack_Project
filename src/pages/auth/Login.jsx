import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login, user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === 'customer') navigate('/customer/dashboard');
            else if (currentUser.role === 'support') navigate('/support/dashboard');
            else if (currentUser.role === 'manager') navigate('/manager/dashboard');
        }
    }, [currentUser, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(credentials.email, credentials.password);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-wrapper simple-login">
            <div className="login-card centers-card">
                <div className="form-inner">
                    <header className="form-header centered-header">
                        <div className="brand-identity centered-brand">
                            <div className="logo-crystal small-logo">
                                <Sparkles className="sparkle-icon" size={20} />
                            </div>
                            <span className="brand-name">SupportDesk</span>
                        </div>
                        <h1>Sign In</h1>
                        <p>Enter your details to access your account</p>
                    </header>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail className="field-icon" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="label-row">
                                <label>Password</label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <div className="input-with-icon">
                                <Lock className="field-icon" size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={!credentials.email || !credentials.password || loading}>
                            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="toggle-auth">
                        <span>New here?</span>
                        <Link to="/signup">
                            <button type="button">Create an account</button>
                        </Link>
                    </div>
                </div>
            </div>

            <footer className="login-footer">
                <p>&copy; 2024 SupportDesk Inc. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </footer>
        </div>
    );
};

export default Login;
