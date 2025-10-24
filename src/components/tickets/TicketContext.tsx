import React, { createContext, useContext, useState, ReactNode } from "react";

export type TicketStatus = "open" | "in_progress" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignee: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

interface TicketContextType {
  tickets: Ticket[];
  getTicket: (id: string) => Ticket | undefined;
  createTicket: (
    ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">
  ) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return context;
};

interface TicketProviderProps {
  children: ReactNode;
}

const ALLOWED_STATUSES: ReadonlyArray<TicketStatus> = [
  "open",
  "in_progress",
  "closed",
] as const;

const isValidStatus = (status: string): status is TicketStatus =>
  ALLOWED_STATUSES.includes(status as TicketStatus);

// Mock initial data
const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Login page not responding",
    description:
      "Users are experiencing timeout errors when trying to log in during peak hours.",
    status: "in_progress",
    priority: "high",
    assignee: "John Doe",
    createdAt: new Date("2025-10-20"),
    updatedAt: new Date("2025-10-23"),
    createdBy: "user@example.com",
  },
  {
    id: "2",
    title: "Add dark mode support",
    description: "Implement dark mode toggle for better user experience.",
    status: "open",
    priority: "medium",
    assignee: "Jane Smith",
    createdAt: new Date("2025-10-22"),
    updatedAt: new Date("2025-10-22"),
    createdBy: "admin@example.com",
  },
  {
    id: "3",
    title: "Critical security vulnerability",
    description:
      "SQL injection vulnerability found in the search feature. Needs immediate attention.",
    status: "closed",
    priority: "critical",
    assignee: "Mike Johnson",
    createdAt: new Date("2025-10-15"),
    updatedAt: new Date("2025-10-18"),
    createdBy: "security@example.com",
  },
  {
    id: "4",
    title: "Update documentation",
    description: "API documentation needs to be updated with new endpoints.",
    status: "open",
    priority: "low",
    assignee: "Sarah Williams",
    createdAt: new Date("2025-10-21"),
    updatedAt: new Date("2025-10-21"),
    createdBy: "user@example.com",
  },
  {
    id: "5",
    title: "Dashboard loading slowly",
    description:
      "Dashboard takes more than 5 seconds to load. Need to optimize queries.",
    status: "closed",
    priority: "medium",
    assignee: "John Doe",
    createdAt: new Date("2025-10-10"),
    updatedAt: new Date("2025-10-19"),
    createdBy: "admin@example.com",
  },
];

export const TicketProvider: React.FC<TicketProviderProps> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  const sanitizeTicket = (ticket: Ticket): Ticket => {
    if (!ticket.title.trim()) {
      throw new Error("Ticket title is required.");
    }
    if (!isValidStatus(ticket.status)) {
      throw new Error(`Invalid ticket status: ${ticket.status}`);
    }
    if (!ticket.description.trim()) {
      throw new Error("Ticket description is required.");
    }
    if (ticket.description.trim().length > 2000) {
      throw new Error("Description must be 2000 characters or less.");
    }
    return ticket;
  };

  const getTicket = (id: string): Ticket | undefined => {
    return tickets.find((ticket) => ticket.id === id);
  };

  const createTicket = (
    ticketData: Omit<Ticket, "id" | "createdAt" | "updatedAt">
  ) => {
    if (!ticketData.title?.trim()) {
      throw new Error("Title is required.");
    }
    if (!isValidStatus(ticketData.status)) {
      throw new Error("Status must be open, in_progress, or closed.");
    }
    if (ticketData.description && ticketData.description.trim().length > 2000) {
      throw new Error("Description must be 2000 characters or less.");
    }
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTickets((prev) => [sanitizeTicket(newTicket), ...prev]);
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    if (updates.title !== undefined && !updates.title.trim()) {
      throw new Error("Title cannot be empty.");
    }
    if (updates.status !== undefined && !isValidStatus(updates.status)) {
      throw new Error("Status must be open, in_progress, or closed.");
    }
    if (
      updates.description !== undefined &&
      updates.description.trim().length > 2000
    ) {
      throw new Error("Description must be 2000 characters or less.");
    }
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? sanitizeTicket({ ...ticket, ...updates, updatedAt: new Date() })
          : ticket
      )
    );
  };

  const deleteTicket = (id: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        getTicket,
        createTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
