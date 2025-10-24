import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useTickets, TicketStatus } from "../tickets/TicketContext";
import { useAuth } from "../auth/AuthContext";
import {
  Ticket,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface DashboardProps {
  onNavigate: (page: string, ticketId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { tickets } = useTickets();
  const { user } = useAuth();

  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
    critical: tickets.filter((t) => t.priority === "critical").length,
  };

  const recentTickets = tickets.slice(0, 5);

  const STATUS_LABELS: Record<TicketStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-600">
              Here's what's happening with your tickets today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Open Tickets</CardTitle>
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.open}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.inProgress}</div>
              <p className="text-xs text-gray-500 mt-1">Being worked on</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">Closed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.closed}</div>
              <p className="text-xs text-gray-500 mt-1">Completed items</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Tickets */}
          <Card className="rounded-2xl shadow-lg lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tickets</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("tickets")}
                className="gap-1"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-start justify-between gap-4 rounded-lg border p-4 transition-colors hover:bg-gray-50 cursor-pointer"
                    onClick={() => onNavigate("ticket-detail", ticket.id)}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="line-clamp-1">{ticket.title}</h4>
                      </div>
                      <p className="line-clamp-2 text-sm text-gray-600">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={getStatusColor(ticket.status)}
                        >
                          {STATUS_LABELS[ticket.status]}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={getPriorityColor(ticket.priority)}
                        >
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{new Date(ticket.updatedAt).toLocaleDateString()}</p>
                      <p className="text-xs">{ticket.assignee}</p>
                    </div>
                  </div>
                ))}

                {recentTickets.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Ticket className="mb-4 h-12 w-12 text-gray-300" />
                    <h3 className="mb-2">No tickets yet</h3>
                    <p className="mb-4 text-gray-600">
                      Create your first ticket to get started
                    </p>
                    <Button onClick={() => onNavigate("ticket-form")}>
                      Create Ticket
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate("ticket-form")}
                >
                  <Ticket className="h-4 w-4" />
                  Create New Ticket
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => onNavigate("tickets")}
                >
                  <TrendingUp className="h-4 w-4" />
                  View All Tickets
                </Button>
              </CardContent>
            </Card>

            {stats.critical > 0 && (
              <Card className="rounded-2xl border-red-200 bg-red-50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5" />
                    Critical Alert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700">
                    You have {stats.critical} critical{" "}
                    {stats.critical === 1 ? "ticket" : "tickets"} that{" "}
                    {stats.critical === 1 ? "requires" : "require"} immediate
                    attention.
                  </p>
                  <Button
                    variant="destructive"
                    className="mt-4 w-full"
                    onClick={() => onNavigate("tickets")}
                  >
                    View Critical Tickets
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card className="rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Ticket Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Open</span>
                  <span className="text-blue-600">{stats.open}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="text-yellow-600">{stats.inProgress}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Closed</span>
                  <span className="text-green-600">{stats.closed}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
