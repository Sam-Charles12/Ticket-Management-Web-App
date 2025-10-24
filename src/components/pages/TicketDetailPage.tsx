import React from "react";
import { useTickets, TicketStatus } from "../tickets/TicketContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { notifyError } from "../../lib/errorHandling";

interface TicketDetailPageProps {
  ticketId: string;
  onNavigate: (page: string, ticketId?: string) => void;
}

export const TicketDetailPage: React.FC<TicketDetailPageProps> = ({
  ticketId,
  onNavigate,
}) => {
  const { getTicket, deleteTicket } = useTickets();
  const ticket = getTicket(ticketId);

  if (!ticket) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
        <div className="mx-auto w-full max-w-[1440px] px-4">
          <div className="mx-auto max-w-4xl">
            <Card className="rounded-2xl shadow-xl">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <AlertCircle className="mb-4 h-12 w-12 text-gray-400" />
                <h2 className="mb-2">Ticket Not Found</h2>
                <p className="mb-6 text-gray-600">
                  The ticket you're looking for doesn't exist.
                </p>
                <Button onClick={() => onNavigate("tickets")}>
                  Back to Tickets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const STATUS_LABELS: Record<TicketStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-amber-100 text-amber-700";
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

  const handleDelete = () => {
    try {
      deleteTicket(ticketId);
      toast.success("Ticket deleted successfully", {
        description: "The ticket has been removed from the system.",
      });
      onNavigate("tickets");
    } catch (error) {
      notifyError(error, "Failed to delete ticket. Please retry.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate("tickets")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tickets
            </Button>
          </div>

          <Card className="rounded-2xl shadow-xl">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap gap-2">
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
                      {ticket.priority} priority
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{ticket.title}</CardTitle>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate("ticket-form", ticketId)}
                    className="gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the ticket and remove it from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-4">Ticket Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Assigned to</p>
                          <p>{ticket.assignee}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Created by</p>
                          <p>{ticket.createdBy}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4">Timestamps</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="mt-0.5 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Created</p>
                          <p>{new Date(ticket.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600">Last updated</p>
                          <p>{new Date(ticket.updatedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4">Activity Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                          <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        </div>
                        <div className="w-0.5 flex-1 bg-gray-200"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm">
                          Ticket updated to{" "}
                          <Badge
                            variant="secondary"
                            className={getStatusColor(ticket.status)}
                          >
                            {STATUS_LABELS[ticket.status]}
                          </Badge>
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(ticket.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          Ticket created by {ticket.createdBy}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
