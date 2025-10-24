import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Ticket, 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Create and manage tickets in seconds with our intuitive interface.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Assign tickets to team members and track progress together.',
    },
    {
      icon: BarChart3,
      title: 'Powerful Analytics',
      description: 'Get insights into ticket trends and team performance.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security.',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Stay informed with instant notifications and updates.',
    },
    {
      icon: CheckCircle2,
      title: 'Smart Automation',
      description: 'Automate repetitive tasks and focus on what matters.',
    },
  ];

  const benefits = [
    'Unlimited tickets and team members',
    'Priority support and training',
    'Advanced reporting and analytics',
    'Custom workflows and automation',
    'API access for integrations',
    '99.9% uptime guarantee',
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Wavy Background */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        {/* Decorative Circles */}
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 h-32 w-32 rounded-full border-4 border-white/20"></div>
        
        {/* Hero Content */}
        <div className="relative mx-auto w-full max-w-[1440px] px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 shadow-lg backdrop-blur-sm">
              <Ticket className="h-4 w-4" />
              <span className="text-sm">Trusted by 10,000+ teams worldwide</span>
            </div>
            
            <h1 className="mb-6 text-white">
              The Modern Way to
              <br />
              <span className="text-blue-200">Manage Support Tickets</span>
            </h1>
            
            <p className="mb-8 text-xl text-blue-100">
              Streamline your support workflow, collaborate with your team, and deliver
              exceptional customer service with TicketFlow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate('register')} 
                className="gap-2 bg-white text-blue-600 hover:bg-blue-50"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('login')}
                className="border-white bg-transparent text-white hover:bg-white/10"
              >
                Login
              </Button>
            </div>

            <p className="mt-4 text-sm text-blue-200">
              No credit card required • Free 14-day trial
            </p>
          </div>
        </div>

        {/* Wavy Bottom Border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block h-[60px] w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you manage tickets efficiently
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="rounded-2xl border-2 shadow-lg transition-all hover:border-blue-200 hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 shadow-md">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <h3 className="mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4">
          <div className="rounded-3xl bg-white p-8 shadow-xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6">
                  Why Teams Choose
                  <br />
                  TicketFlow
                </h2>
                <p className="mb-8 text-lg text-gray-600">
                  Join thousands of teams who have transformed their support workflow
                  with our comprehensive ticket management solution.
                </p>
                <Button size="lg" onClick={() => onNavigate('register')} className="gap-2">
                  Start Your Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-lg">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4">
          <Card className="rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-2xl">
            <CardContent className="p-12 text-center">
              <h2 className="mb-4 text-white">
                Ready to Get Started?
              </h2>
              <p className="mb-8 text-xl text-blue-100">
                Join thousands of teams managing their tickets with TicketFlow
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => onNavigate('register')}
                  className="gap-2 bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onNavigate('login')}
                  className="border-white bg-transparent text-white hover:bg-white/10"
                >
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
