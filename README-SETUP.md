# Event Management App - Setup Guide

## 🚀 Quick Start Commands

### 1. Setup MongoDB Atlas Data (One-time setup)
```bash
cd D:\Event-App\backend
node setup-atlas-data.js
```

### 2. Start the Application
```bash
# Option 1: Use the batch file (Recommended)
D:\Event-App\start-app.bat

# Option 2: Manual start
# Terminal 1 - Backend
cd D:\Event-App\backend
node server.js

# Terminal 2 - Frontend  
cd D:\Event-App\frontend
npm start
```

## 🔑 Login Credentials

**Admin Access:**
- Email: `admin@eventhub.com`
- Password: `admin123`

**User Registration:**
- Any email/password combination
- Register through the app

## 📱 Access URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB Atlas**: Cloud database

## ✅ Features

**Admin:**
- Manage events (Create, Read, Update, Delete)
- View all user bookings
- Cancel any booking

**Users:**
- Register/Login
- Browse events
- Book events
- View/cancel own bookings

## 🔧 Configuration

- **Database**: MongoDB Atlas
- **Backend**: Node.js + Express
- **Frontend**: React.js
- **Authentication**: JWT tokens
