import React, { useState } from 'react';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Search,
  PlusCircle,
  ClipboardList,
  BookOpen,
  HelpCircle,
  Settings,
  Wallet,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const { tickets } = useTickets();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock KB Data
  const kbCategories = [
    {
      title: 'Login & Account',
      icon: <ShieldCheck size={24} />,
      links: ['Password Reset Guide', 'Changing Account Details', 'Security Best Practices']
    },
    {
      title: 'Payments & Billing',
      icon: <Wallet size={24} />,
      links: ['Accepted Payment Methods', 'Understanding Invoices', 'Refund Policy']
    },
    {
      title: 'Product Guides',
      icon: <BookOpen size={24} />,
      links: ['Getting Started Manual', 'Keyboard Shortcuts', 'API Documentation']
    },
    {
      title: 'Troubleshooting',
      icon: <Settings size={24} />,
      links: ['Common Error Codes', 'Browser Compatibility', 'Slow Performance Fixes']
    }
  ];

  const recentTickets = tickets
    .filter(t => t.customer === user?.name)
    .slice(0, 3); // Just show the 3 most recent

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="content-inner"
    >
      {/* 1. Hero / Search Section */}
      <section className="portal-hero">
        <h1 className="portal-hero-title">How can we help you today?</h1>
        <div className="portal-search-wrapper">
          <Search className="portal-search-icon" size={20} />
          <input
            type="text"
            className="portal-search-input"
            placeholder="Search for articles, solutions or tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* 2. Primary Action Cards */}
      <div className="portal-actions-grid">
        <Link to="#" className="portal-action-card">
          <div className="portal-action-icon">
            <PlusCircle size={32} />
          </div>
          <div className="portal-action-text">
            <h3>New Support Ticket</h3>
            <p>Raise a new request with our agents</p>
          </div>
        </Link>
        <Link to="#" className="portal-action-card">
          <div className="portal-action-icon">
            <ClipboardList size={32} />
          </div>
          <div className="portal-action-text">
            <h3>Check Ticket Status</h3>
            <p>View your active support conversations</p>
          </div>
        </Link>
      </div>

      {/* 3. Knowledge Base Section */}
      <div className="portal-section-header">
        <h2 className="page-title">Browse Knowledge Base</h2>
        <button className="btn btn-secondary btn-small-height">View All Articles</button>
      </div>

      <div className="kb-categories-grid mb-6">
        {kbCategories.map((cat, idx) => (
          <div key={idx} className="kb-card">
            <div className="kb-card-icon">{cat.icon}</div>
            <strong className="kb-card-title">{cat.title}</strong>
            <ul className="kb-card-links">
              {cat.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link to="#" className="kb-card-link">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 4. Recent Activity / Ticket Feed */}
      {recentTickets.length > 0 && (
        <div className="card mt-6">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <ClipboardList size={18} className="text-primary" />
              <h2 className="font-bold">My Recent Support Activity</h2>
            </div>
            <Link to="#" className="table-subject-link text-xs">View Full History</Link>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map(ticket => (
                  <tr key={ticket.id}>
                    <td className="table-id-cell">#{ticket.id}</td>
                    <td><span className="table-subject-link">{ticket.subject}</span></td>
                    <td>
                      <span className={`badge badge-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="text-muted text-xs">Recently</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CustomerDashboard;


