import React from 'react';
import { useTickets } from '../../context/TicketContext';

const SupportDashboard = () => {
    const { tickets } = useTickets();
    const openTickets = tickets.filter(t => t.status === 'Open');

    return (
        <div className="content-inner">
            <header className="dashboard-header">
                <h1 className="page-title">Support Dashboard</h1>
                <p className="page-subtitle">Manage open service requests and issues.</p>
            </header>
            <div className="card">
                <div className="card-header">
                    <h2>Assigned Tickets ({openTickets.length})</h2>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Subject</th>
                                <th>Customer</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {openTickets.map(t => (
                                <tr key={t.id}>
                                    <td>#{t.id}</td>
                                    <td>{t.subject}</td>
                                    <td>{t.customer}</td>
                                    <td>{t.priority}</td>
                                    <td>{t.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SupportDashboard;
