import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        login(credentials.email, credentials.password);
        navigate('/customer');
    };

    return (
        <div className="login-wrapper">
            {/* Background Blobs for Visual Interest */}
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            <div className="bg-blob blob-3"></div>

            <main className="login-card">
                {/* Hero Side (Left) */}
                <section className="login-hero">
                    <div className="hero-overlay"></div>
                    <div className="hero-content">
                        <div className="brand-identity">
                            <div className="logo-crystal">
                                <Sparkles className="sparkle-icon" size={24} />
                            </div>
                            <span className="brand-name">SupportDesk</span>
                        </div>

                        <div className="hero-main-text">
                            <h2>The <span className="gradient-text">Smart</span> Support Experience.</h2>
                            <p>Premium helpdesk management for modern customer support teams.</p>
                        </div>

                        <div className="benefit-list">
                            <div className="benefit-item">
                                <CheckCircle2 size={18} />
                                <span>Real-time Ticket Tracking</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle2 size={18} />
                                <span>Premium Analytical Insights</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle2 size={18} />
                                <span>Seamless Team Collaboration</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Side (Right) */}
                <section className="login-form-container">
                    <div className="form-inner">
                        <header className="form-header">
                            <h1>Welcome Back</h1>
                            <p>Enter your credentials to access your dashboard</p>
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
                                    <a href="#" className="forgot-link">Forgot?</a>
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

                            <button type="submit" className="submit-btn" disabled={!credentials.email || !credentials.password}>
                                <span>Sign In to Dashboard</span>
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        <div className="toggle-auth">
                            <span>New to SupportDesk?</span>
                            <Link to="/signup">
                                <button type="button">Create an account</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Login;

