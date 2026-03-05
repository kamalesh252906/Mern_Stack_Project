import React, { createContext, useContext, useState, useEffect } from 'react';

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);

    // Initialize with dummy dat
    useEffect(() => {
        setTickets([
            { id: '1001', subject: 'System downtime', customer: 'Customer User', category: 'Support', status: 'Open', priority: 'High' },
            { id: '1002', subject: 'Inquiry about pricing', customer: 'Customer User', category: 'Sales', status: 'Resolved', priority: 'Medium' },
        ]);
    }, []);

    const addTicket = (ticket) => {
        setTickets([...tickets, { id: (Date.now() % 10000).toString(), ...ticket }]);
    };

    const updateTicketStatus = (id, status) => {
        setTickets(tickets.map(t => t.id === id ? { ...t, status } : t));
    };

    return (
        <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus }}>
            {children}
        </TicketContext.Provider>
    );
};

export const useTickets = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useTickets must be used within a TicketProvider');
    }
    return context;
};
