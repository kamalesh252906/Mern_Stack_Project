import React, { useState } from 'react';
import { useTickets } from '../../context/TicketContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Search, LayoutGrid, UserCheck, Zap, UserPlus, CheckCircle, Filter, ChevronDown } from 'lucide-react';

/**
 * SupportDashboard: Global overview for support agents.
 * Allows picking up unassigned tickets and filtering by assignments.
 */
const SupportDashboard = () => {
  // 1. Hook setup
  const { tickets, assignTicket } = useTickets(); // Access global ticket state and assignment action
  const { user } = useAuth(); // Access logged-in user data
  const [searchTerm, setSearchTerm] = useState(''); // Text search state
  const [viewMode, setViewMode] = useState('All'); // 'All' or 'My' assignments view mode

  // 2. Dashboard Logic
  const filteredTickets = tickets.filter(ticket => {
    // Check if ticket ID, subject or customer name matches search
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if view mode matches assignment
    const matchesView = viewMode === 'All' ? true : ticket.assignedTo === user.name;
    return matchesSearch && matchesView;
  });

  // KPI Calculations
  const stats = {
    total: tickets.length,
    unassigned: tickets.filter(t => !t.assignedTo).length,
    myTickets: tickets.filter(t => t.assignedTo === user.name).length,
    urgent: tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length
  };

  /**
   * Action handler: Assign unassigned ticket to the current agent.
   */
  const handleSelfAssign = (id) => {
    assignTicket(id, user.name);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="content-inner"
    >
      {/* 3. Global Header Area */}
      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Global Helpdesk</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="page-subtitle">Currently viewing:</span>
            <button type="button" className="view-mode-btn">
              {viewMode === 'All' ? 'All Tickets' : 'My Assignments'}
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex gap-2">
          <button
            type="button"
            className={`btn ${viewMode === 'All' ? 'btn-primary' : 'btn-secondary'} btn-small-height`}
            onClick={() => setViewMode('All')}
          >
            <LayoutGrid size={16} />
            <span>All Tickets</span>
          </button>
          <button
            type="button"
            className={`btn ${viewMode === 'My' ? 'btn-primary' : 'btn-secondary'} btn-small-height`}
            onClick={() => setViewMode('My')}
          >
            <UserCheck size={16} />
            <span>My Work</span>
          </button>
        </div>
      </header>

      {/* 4. KPI Scorecards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-queue">
          <span className="stat-label">Global Queue</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card stat-card-needs-assignee">
          <span className="stat-label">Needs Assignee</span>
          <span className="stat-value text-status-open">{stats.unassigned}</span>
        </div>
        <div className="stat-card stat-card-my-open">
          <span className="stat-label">My Open Tasks</span>
          <span className="stat-value">{stats.myTickets}</span>
        </div>
        <div className="stat-card stat-card-urgent-sla">
          <span className="stat-label">Urgent SLA</span>
          <span className="stat-value text-danger">{stats.urgent}</span>
        </div>
      </div>

      {/* 5. Main Content Card */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-4">
            <div className="search-wrapper-large">
              <Search size={14} className="search-icon-inside" />
              <input
                type="text"
                className="input-field search-input-full"
                placeholder="Search by ID, customer, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button type="button" className="btn btn-secondary btn-small-height">
              <Filter size={14} />
              <span>Filters</span>
            </button>
          </div>
          <div className="ticket-found-text">
            {filteredTickets.length} tickets found
          </div>
        </div>

        {/* 6. Tickets Queue Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>ID</th>
                <th>Ticket Infomation</th>
                <th>Customer</th>
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
                      <div className="table-ticket-info">
                        <span className="table-subject-link">
                          {ticket.subject}
                        </span>
                        <span className="table-category-small">{ticket.category}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="customer-avatar-small">
                          {ticket.customer.charAt(0)}
                        </div>
                        <span className="table-customer-name">{ticket.customer}</span>
                      </div>
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
                      {!ticket.assignedTo ? (
                        /* Pickup Action for Unassigned tickets */
                        <button
                          type="button"
                          onClick={() => handleSelfAssign(ticket.id)}
                          className="btn btn-primary btn-xsmall"
                        >
                          <UserPlus size={14} />
                          <span>Pick up</span>
                        </button>
                      ) : (
                        /* Manage Action for assigned tickets */
                        <button className="btn btn-secondary btn-xsmall" disabled>
                          <CheckCircle size={14} />
                          <span>Assigned</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty Result placeholder */
                <tr>
                  <td colSpan="6" className="empty-state-container">
                    <div className="flex flex-col items-center gap-3">
                      <Zap size={48} style={{ opacity: 0.1 }} />
                      <p>The queue is empty. Good job!</p>
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

export default SupportDashboard;
