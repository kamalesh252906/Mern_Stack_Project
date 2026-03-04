import React, { useState } from 'react';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, CheckCircle2, Inbox, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';


const CustomerDashboard = () => {
  
  const { tickets } = useTickets();
  const { user } = useAuth(); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [filterStatus, setFilterStatus] = useState('All'); 

  const customerTickets = tickets.filter(t => t.customer === user?.name);

  
  const filteredTickets = customerTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

 
  const stats = {
    total: customerTickets.length,
    open: customerTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length,
    resolved: customerTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="content-inner"
    >

      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Ticket Overview</h1>
          <p className="page-subtitle">Track and manage your support conversations</p>
        </div>
      </header>

   
      <div className="stats-grid">
        <div className="stat-card">
          <div className="flex justify-between items-start mb-2">
            <span className="stat-label">Total Requests</span>
            <Inbox size={16} className="stat-icon-primary" />
          </div>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card stat-card-open">
          <div className="flex justify-between items-start mb-2">
            <span className="stat-label">Unresolved</span>
            <AlertCircle size={16} className="text-status-open" />
          </div>
          <span className="stat-value">{stats.open}</span>
        </div>
        <div className="stat-card stat-card-resolved">
          <div className="flex justify-between items-start mb-2">
            <span className="stat-label">Resolved</span>
            <CheckCircle2 size={16} className="text-status-resolved" />
          </div>
          <span className="stat-value">{stats.resolved}</span>
        </div>
      </div>

     
      <div className="card">
      
        <div className="card-header">
          <div className="flex items-center gap-4">
    
            <div className="search-wrapper">
              <Search size={14} className="search-icon-inside" />
              <input
                type="text"
                className="input-field search-input-small"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        
            <div className="flex items-center gap-2">
              <span className="filter-label">Status:</span>
              <select
                className="input-field select-small"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div>
            <button type="button" className="btn btn-secondary btn-small-height">
              <Filter size={14} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

   
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Priority</th>
                <th className="table-actions-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td className="table-id-cell">#{ticket.id}</td>
                    <td>
                      <span className="table-subject-link">
                        {ticket.subject}
                      </span>
                    </td>
                    <td>
                      <span className="table-text-muted">{ticket.category}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-${ticket.priority.toLowerCase()}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="table-actions-right">
                      <button className="btn btn-secondary btn-xsmall" disabled>
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
               
                <tr>
                  <td colSpan="6" className="empty-state-container">
                    <div className="flex flex-col items-center gap-3">
                      <Inbox size={48} style={{ opacity: 0.2 }} />
                      <p>No tickets found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerDashboard;

