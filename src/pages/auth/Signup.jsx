import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Sparkles, CheckCircle2, UserPlus } from 'lucide-react';

<<<<<<< HEAD


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

  
    setTimeout(() => {
      const user = signup(name, email, password);
      setLoading(false);
=======
const Signup = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', password: '' });

    const handleSignup = (e) => {
        e.preventDefault();
        signup(user.email, user.password, user.name, 'customer');
        navigate('/');
    };

    return (
        <div className="login-wrapper">
            <div className="bg-blob blob-1"></div>
            <div className="bg-blob blob-2"></div>
            <div className="bg-blob blob-3"></div>

            <main className="login-card">
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
                            <h2>Join the <span className="gradient-text">Future</span> of Support.</h2>
                            <p>Get started today and experience the next generation of helpdesk management.</p>
                        </div>
>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086

                        <div className="benefit-list">
                            <div className="benefit-item">
                                <CheckCircle2 size={18} />
                                <span>Free For Small Teams</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle2 size={18} />
                                <span>Unlimited Customers</span>
                            </div>
                            <div className="benefit-item">
                                <CheckCircle2 size={18} />
                                <span>24/7 Priority Support</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="login-form-container">
                    <div className="form-inner">
                        <header className="form-header">
                            <h1>Create Account</h1>
                            <p>Join thousands of teams growing with SupportDesk</p>
                        </header>

                        <form className="auth-form" onSubmit={handleSignup}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <User className="field-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        value={user.name}
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="submit-btn" disabled={!user.name || !user.email || !user.password}>
                                <span>Create My Account</span>
                                <UserPlus size={18} />
                            </button>
                        </form>

                        <div className="toggle-auth">
                            <span>Already have an account?</span>
                            <Link to="/login">
                                <button type="button">Sign In</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Signup;

