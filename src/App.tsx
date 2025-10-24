import React, { useState, useEffect, useRef } from "react";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import { TicketProvider } from "./components/tickets/TicketContext";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./components/pages/LandingPage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { Dashboard } from "./components/pages/Dashboard";
import { TicketsPage } from "./components/pages/TicketsPage";
import { TicketDetailPage } from "./components/pages/TicketDetailPage";
import { TicketFormPage } from "./components/pages/TicketFormPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type PageType =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "tickets"
  | "ticket-detail"
  | "ticket-form";

interface NavigationState {
  page: PageType;
  ticketId?: string;
}

const PROTECTED_PAGES: PageType[] = [
  "dashboard",
  "tickets",
  "ticket-detail",
  "ticket-form",
];

const resolvePathFromNavigation = (state: NavigationState): string => {
  switch (state.page) {
    case "landing":
      return "/";
    case "login":
      return "/auth/login";
    case "register":
      return "/auth/register";
    case "dashboard":
      return "/app/dashboard";
    case "tickets":
      return "/app/tickets";
    case "ticket-detail":
      return state.ticketId
        ? `/app/tickets/${encodeURIComponent(state.ticketId)}`
        : "/app/tickets";
    case "ticket-form":
      if (state.ticketId) {
        return `/app/tickets/${encodeURIComponent(state.ticketId)}/edit`;
      }
      return "/app/tickets/new";
    default:
      return "/";
  }
};

const resolveNavigationFromPath = (path: string): NavigationState => {
  if (path.startsWith("/auth/login")) {
    return { page: "login" };
  }

  if (path.startsWith("/auth/register")) {
    return { page: "register" };
  }

  if (path === "/app/dashboard") {
    return { page: "dashboard" };
  }

  if (path === "/app/tickets") {
    return { page: "tickets" };
  }

  if (path === "/app/tickets/new") {
    return { page: "ticket-form" };
  }

  const editMatch = path.match(/^\/app\/tickets\/(.+)\/edit$/);
  if (editMatch && editMatch[1]) {
    return { page: "ticket-form", ticketId: decodeURIComponent(editMatch[1]) };
  }

  const detailMatch = path.match(/^\/app\/tickets\/(.+)$/);
  if (detailMatch && detailMatch[1]) {
    return {
      page: "ticket-detail",
      ticketId: decodeURIComponent(detailMatch[1]),
    };
  }

  return { page: "landing" };
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [navigation, setNavigation] = useState<NavigationState>(() => {
    if (typeof window === "undefined") {
      return { page: "landing" };
    }
    return resolveNavigationFromPath(window.location.pathname);
  });
  const wasAuthenticated = useRef(isAuthenticated);
  const historyUpdateMode = useRef<"push" | "replace">("push");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      historyUpdateMode.current = "replace";
      setNavigation(resolveNavigationFromPath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const targetPath = resolvePathFromNavigation(navigation);
    if (window.location.pathname !== targetPath) {
      if (historyUpdateMode.current === "replace") {
        window.history.replaceState(null, "", targetPath);
      } else {
        window.history.pushState(null, "", targetPath);
      }
    }
    historyUpdateMode.current = "push";
  }, [navigation]);

  // Redirect to dashboard if authenticated and on auth pages
  useEffect(() => {
    if (
      isAuthenticated &&
      (navigation.page === "landing" ||
        navigation.page === "login" ||
        navigation.page === "register")
    ) {
      historyUpdateMode.current = "replace";
      setNavigation({ page: "dashboard" });
    }
  }, [isAuthenticated, navigation.page]);

  // Redirect to login if not authenticated and trying to access protected pages
  useEffect(() => {
    if (!isAuthenticated && PROTECTED_PAGES.includes(navigation.page)) {
      const wasAuthBeforeChange = wasAuthenticated.current;
      if (wasAuthBeforeChange) {
        toast.error("Your session has expired — please log in again.");
      } else {
        toast.error("Please log in to access that page.");
      }
      historyUpdateMode.current = "replace";
      setNavigation({ page: "login" });
    }
    wasAuthenticated.current = isAuthenticated;
  }, [isAuthenticated, navigation.page]);

  const handleNavigate = (page: string, ticketId?: string) => {
    historyUpdateMode.current = "push";
    setNavigation({ page: page as PageType, ticketId });
  };

  const renderPage = () => {
    switch (navigation.page) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "register":
        return <RegisterPage onNavigate={handleNavigate} />;
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "tickets":
        return <TicketsPage onNavigate={handleNavigate} />;
      case "ticket-detail":
        return navigation.ticketId ? (
          <TicketDetailPage
            ticketId={navigation.ticketId}
            onNavigate={handleNavigate}
          />
        ) : (
          <TicketsPage onNavigate={handleNavigate} />
        );
      case "ticket-form":
        return (
          <TicketFormPage
            ticketId={navigation.ticketId}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header onNavigate={handleNavigate} currentPage={navigation.page} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <AppContent />
      </TicketProvider>
    </AuthProvider>
  );
}
