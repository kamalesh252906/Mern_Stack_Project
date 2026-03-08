import React, { useState } from 'react';
import { useTickets } from '../../context/TicketContext';
import { motion } from 'framer-motion';
import {
  Users,
  Ticket,
  CheckCircle2,
  UserPlus,
  Activity,
  ShieldCheck,
  BarChart3,
  ArrowUpRight,
  Search
} from 'lucide-react';


const ManagerDashboard = () => {

  const { tickets, assignTicket } = useTickets();
  const [selectedSupport, setSelectedSupport] = useState({});


  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    closed: tickets.filter(t => t.status === 'Closed' || t.status === 'Resolved').length,
    urgent: tickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length
  };


  const supportTeam = ['Support Agent A', 'Support Agent B', 'Support Agent C'];


  const handleAssign = (ticketId) => {
    const supportName = selectedSupport[ticketId];
    if (supportName) {
      assignTicket(ticketId, supportName);
      // Clean up the local selection state
      const newSelected = { ...selectedSupport };
      delete newSelected[ticketId];
      setSelectedSupport(newSelected);
    }
  };

  const unassignedTickets = tickets.filter(t => !t.assignedTo);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="content-inner"
    >

      <header className="dashboard-header">
        <div>
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">Real-time service performance and team utilization</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-secondary btn-small-height">
            <Activity size={16} />
            <span>Health Monitor</span>
          </button>
          <button type="button" className="btn btn-primary btn-small-height">
            <BarChart3 size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </header>


      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <span className="stat-label">Total Volume</span>
          <div className="flex items-end gap-2 mt-1">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-trend-up flex items-center">
              <ArrowUpRight size={12} /> 12%
            </span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Unassigned</span>
          <div className="flex items-end gap-2 mt-1">
            <span className="stat-value text-status-open">{stats.open}</span>
            <span className="stat-subtext">Queue Depth</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Resolution Rate</span>
          <div className="flex items-end gap-2 mt-1">
            <span className="stat-value text-success">84.2%</span>
            <span className="stat-subtext">Overall</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Critical SLA</span>
          <div className="flex items-end gap-2 mt-1">
            <span className="stat-value text-danger">{stats.urgent}</span>
            <span className="stat-subtext">Awaiting Action</span>
          </div>
        </div>
      </div>


      <div className="manager-grid">

        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Ticket size={18} className="text-primary" />
              <h2 className="card-title-uppercase">Triage Oversight</h2>
            </div>
            <span className="badge badge-open badge-pending">{unassignedTickets.length} Pending Assign</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>ID</th>
                  <th>Subject & Customer</th>
                  <th>Priority</th>
                  <th>Assign Agent</th>
                  <th className="table-actions-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {unassignedTickets.length > 0 ? (
                  unassignedTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="table-id-cell">#{ticket.id}</td>
                      <td>
                        <div className="flex flex-col">
                          <span className="table-subject-main">{ticket.subject}</span>
                          <span className="table-customer-sub">{ticket.customer}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`priority-${ticket.priority.toLowerCase()}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td>
                        <select
                          className="input-field select-xsmall"
                          value={selectedSupport[ticket.id] || ''}
                          onChange={(e) => setSelectedSupport({ ...selectedSupport, [ticket.id]: e.target.value })}
                        >
                          <option value="">Select Agent</option>
                          {supportTeam.map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="table-actions-right">
                        <button
                          type="button"
                          className="btn btn-primary btn-xsmall"
                          disabled={!selectedSupport[ticket.id]}
                          onClick={() => handleAssign(ticket.id)}
                        >
                          <UserPlus size={14} />
                          <span>Assign</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (

                  <tr>
                    <td colSpan="5" className="empty-state-container">
                      <div className="flex flex-col items-center gap-3">
                        <CheckCircle2 size={48} className="text-success" style={{ opacity: 0.1 }} />
                        <p>Workload is balanced across all teams.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>


        <div className="flex flex-col gap-6">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary" />
                <h2 className="card-title-uppercase">Agent Capacity</h2>
              </div>
            </div>
            <div className="p-6 flex flex-col gap-6">
              {supportTeam.map(member => {
                const memberTickets = tickets.filter(t => t.assignedTo === member);
                const workload = (memberTickets.length / 10) * 100;

                return (
                  <div key={member}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="table-subject-main">{member}</span>
                      <span className="table-category-small text-primary">{memberTickets.length}/10 Tickets</span>
                    </div>

                    <div className="progress-container">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${workload}%`,
                          backgroundColor: workload > 80 ? 'var(--danger)' : workload > 50 ? 'var(--status-open)' : 'var(--primary)',
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          <div className="insight-card">
            <div className="insight-header">
              <div className="insight-icon-bg">
                <ShieldCheck size={18} />
              </div>
              <span className="insight-label">Manager Insight</span>
            </div>
            <p className="insight-text">
              Queue volume is stable. Agent B has the highest resolution rate (92%) this week. Consider assigning them the high-priority technical tasks.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ManagerDashboard;

