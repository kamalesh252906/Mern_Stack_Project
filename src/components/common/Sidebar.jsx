import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    LogOut,
    BarChart3,
    HelpCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const menuItems = {
        customer: [
            { path: '/customer/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        ],
        support: [
            { path: '/support/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        ],
        manager: [
            { path: '/manager/dashboard', icon: <BarChart3 size={18} />, label: 'Dashboard' },
        ]
    };

    const items = menuItems[user?.role] || [];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'var(--primary)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 900,
                    fontSize: '14px'
                }}>
                    SD
                </div>
                <span>SupportDesk</span>
            </div>

            <nav className="sidebar-nav">
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '0 16px 16px' }}>
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800 }}>Help & Resources</p>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <HelpCircle size={14} />
                        Knowledge Base
                    </a>
                </div>
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                    onClick={logout}
                    style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'rgba(255,255,255,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '4px',
                        transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(235, 87, 87, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
