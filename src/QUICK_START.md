# 🚀 Quick Start Guide

## For Complete Beginners

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended for most users)
3. Run the installer and follow the prompts
4. Click "Next" through all the options (defaults are fine)
5. Restart your computer after installation

### Step 2: Verify Installation
1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
   - **Windows**: Press `Win + R`, type `cmd`, press Enter
   - **Mac**: Press `Cmd + Space`, type `terminal`, press Enter
   
2. Type this command and press Enter:
   ```bash
   node --version
   ```
   
3. You should see something like `v20.11.0` (the exact numbers don't matter much)

### Step 3: Open the Project Folder
1. Extract the downloaded ZIP file to a folder on your computer
2. Open that folder in your file explorer
3. In the address bar at the top, type `cmd` and press Enter (Windows)
   - Or right-click and select "Open in Terminal" (Mac/Linux)

### Step 4: Install Dependencies
In the terminal/command prompt that just opened, type:
```bash
npm install
```

Press Enter and wait. This will take 1-3 minutes. You'll see lots of text - that's normal!

### Step 5: Start the App
Once the installation is complete, type:
```bash
npm run dev
```

Press Enter. You should see something like:
```
  VITE v5.2.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 6: Open in Browser
1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Type this in the address bar:
   ```
   localhost:5173
   ```
3. Press Enter

🎉 **The app should now be running!**

---

## Test Login Credentials

Use these to log in and test the app:

**Email:** `demo@example.com`  
**Password:** `password123`

Or click "Register" to create a new account.

---

## Common Issues & Solutions

### "npm is not recognized"
- Node.js isn't installed properly
- Solution: Restart your computer and try Step 2 again

### "Port 5173 is already in use"
- Something else is using that port
- Solution: The app will automatically use port 5174 instead. Check the terminal for the correct URL

### "Cannot find module"
- Dependencies didn't install correctly
- Solution: Delete the `node_modules` folder, then run `npm install` again

### Still Having Problems?
1. Make sure you're in the correct folder (where package.json is located)
2. Try closing the terminal and opening a new one
3. Make sure you have internet connection (npm needs to download packages)

---

## Stopping the Server

When you're done testing:
1. Go back to the terminal/command prompt
2. Press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
3. Type `Y` if asked to terminate
4. You can now close the terminal

---

## Next Steps

- See `README.md` for full documentation
- See `STRUCTURE.md` to understand how the code is organized
- Start building! All the code is yours to modify

**Need more help?** Check out:
- [Node.js Download](https://nodejs.org/)
- [What is npm?](https://www.npmjs.com/about)
- [React Documentation](https://react.dev/)
