import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Sparkles, UserPlus } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup, user: currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === 'customer') navigate('/customer/dashboard');
            else if (currentUser.role === 'support') navigate('/support/dashboard');
            else if (currentUser.role === 'manager') navigate('/manager/dashboard');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signup(name, email, password);
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
                        <h1>Create Account</h1>
                        <p>Join our support community today</p>
                    </header>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <div className="input-with-icon">
                                <User className="field-icon" size={18} />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail className="field-icon" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-with-icon">
                                <Lock className="field-icon" size={18} />
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={!name || !email || !password || loading}>
                            <span>{loading ? 'Creating Account...' : 'Get Started'}</span>
                            {!loading && <UserPlus size={18} />}
                        </button>
                    </form>

                    <div className="toggle-auth">
                        <span>Already have an account?</span>
                        <Link to="/login">
                            <button type="button">Sign In</button>
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

export default Signup;
