import { Ticket, Mail, Github, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Ticket className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl">TicketFlow</span>
            </div>
            <p className="text-sm text-gray-600">
              The modern way to manage support tickets and deliver exceptional customer service.
            </p>
          </div>

          <div>
            <h4 className="mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">Documentation</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">
              © {currentYear} TicketFlow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
