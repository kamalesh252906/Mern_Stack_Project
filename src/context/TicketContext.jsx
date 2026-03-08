import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * 1. Create a Context object.
 * This is where we will store our tickets data so any component can access it.
 */
const TicketContext = createContext();

/**
 * 2. Create the Provider component.
 * This component "provides" the state to all child components.
 */
export const TicketProvider = ({ children }) => {
    // We use useState to keep track of our tickets.
    // Each ticket is an object with several properties.
    const [tickets, setTickets] = useState([
        {
            id: 'T-1001',
            subject: 'Unable to access billing dashboard',
            description: 'I get a 403 error whenever I try to open the billing tab.',
            category: 'Billing',
            priority: 'High',
            status: 'Open',
            createdDate: '2024-03-20',
            customer: 'John Doe',
            assignedTo: null,
            conversation: [
                { sender: 'John Doe', message: 'Hello, I need help with billing.', time: '10:00 AM' }
            ]
        },
        {
            id: 'T-1002',
            subject: 'Password reset not working',
            description: 'The reset link expires too quickly.',
            category: 'Technical',
            priority: 'Medium',
            status: 'In Progress',
            createdDate: '2024-03-21',
            customer: 'Jane Smith',
            assignedTo: 'Support Agent A',
            conversation: [
                { sender: 'Jane Smith', message: 'The link expires in 2 minutes.', time: '11:00 AM' }
            ]
        }
    ]);

    /**
     * Function to add a brand new ticket to the list.
     */
    const addTicket = (newTicketData) => {
        // Create a new ticket object with some default values (like ID and Date)
        const newTicket = {
            ...newTicketData,
            id: `T-${Math.floor(1000 + Math.random() * 9000)}`, // Generates a random ID
            createdDate: new Date().toISOString().split('T')[0], // Gets today's date
            status: 'Open',
            assignedTo: null,
            conversation: [
                {
                    sender: newTicketData.customer,
                    message: newTicketData.description,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]
        };

        // Update the state by adding the new ticket to the front of the list
        setTickets([newTicket, ...tickets]);
    };

    /**
     * Function to change the status of an existing ticket (e.g., from 'Open' to 'Resolved').
     */
    const updateTicketStatus = (ticketId, nextStatus) => {
        // We use .map() to go through each ticket and find the one we want to update.
        const updatedTicketsList = tickets.map((ticket) => {
            if (ticket.id === ticketId) {
                // If it's the right ticket, return a new version with the new status
                return { ...ticket, status: nextStatus };
            }
            // Otherwise, just return the ticket as it is
            return ticket;
        });

        setTickets(updatedTicketsList);
    };

    /**
     * Function to assign a ticket to a support person.
     */
    const assignTicket = (ticketId, supportPersonName) => {
        const updatedList = tickets.map((ticket) => {
            if (ticket.id === ticketId) {
                return {
                    ...ticket,
                    assignedTo: supportPersonName,
                    status: 'In Progress'
                };
            }
            return ticket;
        });

        setTickets(updatedList);
    };

    /**
     * Function to add a new message/comment to a ticket's conversation.
     */
    const addComment = (ticketId, newComment) => {
        const updatedList = tickets.map((ticket) => {
            if (ticket.id === ticketId) {
                return {
                    ...ticket,
                    conversation: [...ticket.conversation, newComment]
                };
            }
            return ticket;
        });

        setTickets(updatedList);
    };

    // We pass all our data and functions into the "value" prop.
    return (
        <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus, assignTicket, addComment }}>
            {children}
        </TicketContext.Provider>
    );
};

/**
 * 3. Create a custom hook for easy access to the Context.
 * Instead of importing 'useContext' and 'TicketContext' everywhere, 
 * we just import 'useTickets'!
 */
export const useTickets = () => {
    const contextValue = useContext(TicketContext);

    // Safety check just in case we use it outside of the Provider
    if (!contextValue) {
        throw new Error("useTickets must be used within a TicketProvider");
    }

    return contextValue;
};
