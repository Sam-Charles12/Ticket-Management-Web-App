import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import { TicketProvider } from './components/tickets/TicketContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { Dashboard } from './components/pages/Dashboard';
import { TicketsPage } from './components/pages/TicketsPage';
import { TicketDetailPage } from './components/pages/TicketDetailPage';
import { TicketFormPage } from './components/pages/TicketFormPage';
import { Toaster } from './components/ui/sonner';

type PageType = 
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'tickets'
  | 'ticket-detail'
  | 'ticket-form';

interface NavigationState {
  page: PageType;
  ticketId?: string;
}

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [navigation, setNavigation] = useState<NavigationState>({
    page: 'landing',
  });

  // Redirect to dashboard if authenticated and on auth pages
  useEffect(() => {
    if (isAuthenticated && (navigation.page === 'landing' || navigation.page === 'login' || navigation.page === 'register')) {
      setNavigation({ page: 'dashboard' });
    }
  }, [isAuthenticated]);

  // Redirect to login if not authenticated and trying to access protected pages
  useEffect(() => {
    const protectedPages: PageType[] = ['dashboard', 'tickets', 'ticket-detail', 'ticket-form'];
    if (!isAuthenticated && protectedPages.includes(navigation.page)) {
      setNavigation({ page: 'landing' });
    }
  }, [isAuthenticated, navigation.page]);

  const handleNavigate = (page: string, ticketId?: string) => {
    setNavigation({ page: page as PageType, ticketId });
  };

  const renderPage = () => {
    switch (navigation.page) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'tickets':
        return <TicketsPage onNavigate={handleNavigate} />;
      case 'ticket-detail':
        return navigation.ticketId ? (
          <TicketDetailPage ticketId={navigation.ticketId} onNavigate={handleNavigate} />
        ) : (
          <TicketsPage onNavigate={handleNavigate} />
        );
      case 'ticket-form':
        return <TicketFormPage ticketId={navigation.ticketId} onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header onNavigate={handleNavigate} currentPage={navigation.page} />
      <main className="flex-1">
        {renderPage()}
      </main>
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
