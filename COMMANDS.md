# Event Management App - Command Cheat Sheet

## 🚀 Quick Start Commands

### 📋 Database Setup (One-time only)
```bash
# Setup MongoDB Atlas with sample data
cd D:\Event-App\backend
node setup-atlas.js
```

### 🖥️ Start Application (Every time)

#### Option 1: Automated Start (Recommended)
```bash
# Run the batch file
D:\Event-App\start-app.bat
```

#### Option 2: Manual Start
```bash
# Terminal 1 - Start Backend
cd D:\Event-App\backend
node server.js

# Terminal 2 - Start Frontend
cd D:\Event-App\frontend
npm start
```

#### Option 3: PowerShell Commands
```powershell
# Start Backend in background
Start-Process cmd -ArgumentList "/k", "cd /d D:\Event-App\backend && node server.js" -WindowStyle Normal

# Start Frontend in background
Start-Process cmd -ArgumentList "/k", "cd /d D:\Event-App\frontend && npm start" -WindowStyle Normal
```

## 🌐 Render Deployment Commands

### Prepare for Render
```bash
# Update API URLs for Render
node update-api-urls.js

# Commit and push changes
git add .
git commit -m "Update API URLs for Render deployment"
git push origin master
```

### Deploy to Render
1. Go to [render.com](https://render.com)
2. Connect GitHub repo
3. Use `render.yaml` for auto-setup
4. Or follow manual steps in `RENDER-SETUP.md`

## 🔑 Login Credentials

**Admin Access:**
- Email: `01fe23bcs182_db_user@example.com`
- Password: `EventApp123`

**User Registration:**
- Any email/password combination
- Register through the app

## 📱 Access URLs

### Local Development
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: MongoDB Atlas (eventapp)

### After Render Deployment
- **Frontend**: https://event-app-frontend.onrender.com
- **Backend API**: https://event-app-backend.onrender.com
- **Database**: MongoDB Atlas (eventapp)

## 🛠️ Troubleshooting Commands

### Check Backend Status
```bash
# Check if backend is running
curl http://localhost:5000/api/events
```

### Check Frontend Status
```bash
# Check if frontend is running
curl http://localhost:3000
```

### Kill All Node Processes
```bash
# Stop all running Node.js processes
taskkill /F /IM node.exe
```

### Reset Database
```bash
# Clear and recreate database
cd D:\Event-App\backend
node setup-atlas.js
```

### Update API URLs for Render
```bash
# Switch localhost to Render URLs
node update-api-urls.js
```

## 📂 File Locations

```
D:\Event-App\
├── backend\
│   ├── server.js          # Backend server
│   ├── setup-atlas.js     # Database setup
│   └── .env              # Environment variables
├── frontend\
│   └── package.json       # Frontend dependencies
├── render.yaml           # Render configuration
├── RENDER-SETUP.md      # Render deployment guide
├── update-api-urls.js    # API URL updater
├── start-app.bat         # Quick start script
└── COMMANDS.md           # This file
```

## 🔧 Environment Variables (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://01fe23bcs182_db_user:EventApp123@cluster0.nv2eubn.mongodb.net/eventapp?retryWrites=true&w=majority
JWT_SECRET=eventhub_jwt_secret_key_2024_secure_token
```

## ⚡ One-Liner Commands

### Quick Start (Copy & Paste)
```cmd
cd D:\Event-App\backend && node server.js && cd ..\frontend && npm start
```

### Reset Everything
```cmd
taskkill /F /IM node.exe && cd D:\Event-App\backend && node setup-atlas.js && node server.js
```

### Deploy to Render
```cmd
node update-api-urls.js && git add . && git commit -m "Ready for Render" && git push origin master
```

## 📋 Daily Workflow

### Local Development
1. **Open Command Prompt**
2. **Run**: `D:\Event-App\start-app.bat`
3. **Wait** for both servers to start
4. **Open Browser**: http://localhost:3000
5. **Login** with admin credentials

### Render Deployment
1. **Update URLs**: `node update-api-urls.js`
2. **Commit changes**: `git add . && git commit -m "Deploy to Render"`
3. **Push to GitHub**: `git push origin master`
4. **Deploy on Render**: Auto-deploy or manual trigger

## 🆘 Common Issues

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID_NUMBER> /F
```

### MongoDB Connection Issues
```bash
# Test Atlas connection
cd D:\Event-App\backend
node setup-atlas.js
```

### Frontend Not Starting
```bash
# Clear npm cache
cd D:\Event-App\frontend
npm cache clean --force
npm install
npm start
```

### Render Deployment Issues
- Check Render dashboard logs
- Verify environment variables
- Ensure MongoDB Atlas IP whitelist
- Check CORS settings

---

**🎯 Best Practice**: Use `start-app.bat` for local development, `render.yaml` for deployment!
