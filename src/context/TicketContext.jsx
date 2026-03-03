import React, { createContext, useContext, useState } from 'react';

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([
        {
            id: "TK-1001",
            subject: "Login issue with Chrome",
            category: "Technical",
            status: "Open",
            priority: "High",
            customer: "John Doe",
            date: "2024-03-01"
        },
        {
            id: "TK-1002",
            subject: "Password reset not working",
            category: "Account",
            status: "In Progress",
            priority: "Medium",
            customer: "Jane Smith",
            date: "2024-03-02"
        },
        {
            id: "TK-1003",
            subject: "Feature request: Dark mode",
            category: "Product",
            status: "Resolved",
            priority: "Low",
            customer: "John Doe",
            date: "2024-03-03"
        }
    ]);

    const addTicket = (ticket) => {
        setTickets([...tickets, { ...ticket, id: `TK-${Date.now()}` }]);
    };

    const updateTicketStatus = (id, status) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
    };

    const assignTicket = (id, agentName) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, assignedTo: agentName } : t));
    };

    return (
        <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus, assignTicket }}>
            {children}
        </TicketContext.Provider>
    );
};
