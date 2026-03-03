import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Loader2, ChevronRight, Github, ShieldCheck, Sparkles, CheckCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Login Component: Handles user authentication.
 */
const Login = () => {
  // 1. State Management
  const [email, setEmail] = useState('');         // Stores email address
  const [password, setPassword] = useState('');   // Stores password
  const [loading, setLoading] = useState(false);   // Shows loading spinner on button

  // 2. Custom hooks
  const { login, user: currentUser } = useAuth();
  const navigate = useNavigate();

  // 3. Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'customer') navigate('/customer/dashboard');
      else if (currentUser.role === 'support') navigate('/support/dashboard');
      else if (currentUser.role === 'manager') navigate('/manager/dashboard');
    }
  }, [currentUser, navigate]);

  /**
   * Handles form submission for Login.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);

    // Simulate network delay for a better UX (1.2 seconds)
    setTimeout(() => {
      const user = login(email, password);
      setLoading(false);

      if (user.role === 'customer') navigate('/customer/dashboard');
      else if (user.role === 'support') navigate('/support/dashboard');
      else if (user.role === 'manager') navigate('/manager/dashboard');
    }, 1200);
  };

  return (
    <div className="login-wrapper">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <main className="login-card">
        <div className="login-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="brand-identity"
            >
              <div className="logo-crystal">
                <Sparkles size={24} className="sparkle-icon" />
              </div>
              <span className="brand-name">SupportDesk</span>
            </motion.div>

            <div className="hero-main-text">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Elevate Your <br />
                <span className="gradient-text">Customer Experience</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                The world's most intuitive support platform. Designed for teams who obsess over customer happiness.
              </motion.p>
            </div>

            <div className="benefit-list">
              {[
                { icon: <CheckCircle size={16} />, text: "Real-time AI Insights" },
                { icon: <Globe size={16} />, text: "Global Multi-channel Support" },
                { icon: <ShieldCheck size={16} />, text: "Enterprise Grade Security" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="benefit-item"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="form-inner"
          >
            <div className="form-header">
              <h1>Welcome Back</h1>
              <p>Please enter your details to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="field-icon" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>Password</label>
                  <a href="#" className="forgot-link">Forgot?</a>
                </div>
                <div className="input-with-icon">
                  <Lock size={18} className="field-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <Loader2 size={20} className="spinner" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="social-login">
              <div className="or-divider">
                <span>OR CONTINUE WITH</span>
              </div>
              <div className="social-btns">
                <button className="social-btn"><Github size={20} /> Github</button>
                <button className="social-btn"><ShieldCheck size={20} /> SSO</button>
              </div>
            </div>

            <p className="toggle-auth">
              Don't have an account?
              <Link to="/signup">
                Create one now
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Login;
