# TicketFlow - Ticket Management Application

A modern, production-ready ticket management web application built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

Follow these steps to run the application on your local machine.

### Prerequisites

You need to have **Node.js** installed on your computer. This application requires Node.js version 16 or higher.

**Check if you have Node.js installed:**
```bash
node --version
```

**If you don't have Node.js:**
- Download it from [nodejs.org](https://nodejs.org/)
- Install the LTS (Long Term Support) version
- This will also install npm (Node Package Manager) automatically

### Installation Steps

1. **Extract the downloaded code** to a folder on your computer

2. **Open Terminal/Command Prompt** in that folder:
   - **Windows**: Right-click in the folder → "Open in Terminal" or "Open Command Prompt here"
   - **Mac**: Right-click in the folder → "New Terminal at Folder"
   - **Linux**: Right-click in the folder → "Open in Terminal"

3. **Install dependencies** (this downloads all required packages):
   ```bash
   npm install
   ```
   This will take 1-2 minutes. You'll see a progress bar and lots of text scrolling by - this is normal!

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```
   
   The application should now be running! 🎉

### Troubleshooting

**Port already in use?**
If you see an error about port 5173 being in use, the dev server will automatically try the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

**npm not found?**
Make sure Node.js is properly installed and restart your terminal after installation.

**Installation fails?**
Try deleting `node_modules` folder and `package-lock.json` file, then run `npm install` again.

## 📦 Project Structure

```
/
├── App.tsx                      # Main application component
├── components/
│   ├── auth/                    # Authentication logic
│   ├── layout/                  # Header and Footer
│   ├── pages/                   # All page components
│   ├── tickets/                 # Ticket state management
│   └── ui/                      # Reusable UI components
├── styles/
│   └── globals.css              # Global styles and Tailwind config
└── README.md                    # This file
```

## 🎯 Features

### Authentication
- **Login/Register** with form validation
- Session persistence (stays logged in after refresh)
- Protected routes (can't access tickets without login)

### Dashboard
- Summary statistics (total, open, in-progress, resolved tickets)
- Recent tickets overview
- Quick actions menu

### Ticket Management (Full CRUD)
- ✅ **Create** new tickets with validation
- 📋 **View** all tickets with search and filters
- ✏️ **Edit** existing tickets
- 🗑️ **Delete** tickets with confirmation
- Toast notifications for all actions
- Real-time form validation

### Design Features
- 📱 Fully responsive (works on mobile, tablet, desktop)
- 🎨 Modern UI with shadows and rounded corners
- 🌊 Wavy SVG backgrounds on landing page
- 🎯 Max-width 1440px centered layout
- ✨ Smooth transitions and hover effects

## 🧪 Test the Application

### Default Login Credentials
The app includes demo authentication. Use these credentials:

**Email:** `demo@example.com`  
**Password:** `password123`

Or register a new account - all data is stored in your browser's local storage.

## 🛠️ Available Commands

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment. You can test the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

The application can be deployed to:
- **Vercel** (recommended) - Zero config deployment
- **Netlify** - Drag and drop the `dist` folder
- **GitHub Pages** - Static site hosting
- Any static hosting service

### Quick Deploy to Vercel:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click deploy (it auto-detects Vite/React)

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS
- **Shadcn/UI** - Component library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

## 📖 Documentation

- See `STRUCTURE.md` for detailed architecture overview
- See `guidelines/Guidelines.md` for development guidelines
- Component documentation available in individual component files

## 💡 Tips

- **Data Persistence**: All tickets and user data are stored in browser localStorage
- **Responsive Design**: Try resizing your browser or test on mobile
- **Dark Mode**: Currently not implemented (future enhancement)
- **Real Backend**: This is a frontend-only app. For production, connect to a real API/database

## 🤝 Need Help?

- Check the browser console for error messages (F12 or Ctrl+Shift+I)
- Make sure you're using Node.js version 16 or higher
- Try clearing browser cache and localStorage if you see strange behavior

## 📝 License

This project is open source and available for personal and commercial use.

---

**Happy coding! 🚀**

If you have any questions, check the code comments or the STRUCTURE.md file for more details about how everything works.
