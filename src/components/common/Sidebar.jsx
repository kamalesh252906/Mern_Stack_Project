import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    LogOut,
    HelpCircle
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
<<<<<<< HEAD
    const { logout, user } = useAuth();

    let dashboardPath = '/customer/dashboard';
    if (user?.role === 'manager') dashboardPath = '/manager/dashboard';
    if (user?.role === 'support') dashboardPath = '/support/dashboard';

    const menuItems = [
        { path: dashboardPath, icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
=======
    const { logout } = useAuth();

    const menuItems = [
        { path: '/customer/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
>>>>>>> a871b3c86d545d04a745a8f39da3ffe50c224086
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    SD
                </div>
                <span>SupportDesk</span>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
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


            <div className="sidebar-help-card">
                <p className="sidebar-help-label">Help & Resources</p>
                <a href="#" className="sidebar-help-link">
                    <HelpCircle size={14} />
                    Knowledge Base
                </a>
            </div>

            <div className="sidebar-footer">
                <button
                    onClick={logout}
                    className="sidebar-logout-btn"
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};


export default Sidebar;
