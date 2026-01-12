# MongoDB Atlas Troubleshooting Guide

## 🔍 Current Error
```
MongoServerError: bad auth : Authentication failed.
```

## ✅ Atlas Setup Checklist

### 1. **Database User Verification**
- Go to MongoDB Atlas → Database Access
- Verify user: `01fe23bcs182_db_user`
- Check if password is correct: `VLYTz4N70w2UnH5q`
- Ensure user has **Read/Write** permissions on `eventapp` database

### 2. **IP Whitelist**
- Go to MongoDB Atlas → Network Access
- Add your current IP address to whitelist
- Or use **0.0.0.0/0** (allows access from anywhere - not recommended for production)

### 3. **Cluster Verification**
- Go to MongoDB Atlas → Clusters
- Verify cluster name: `Cluster0`
- Check if cluster is **active** (not paused)
- Verify cluster region

### 4. **Database Name**
- Go to MongoDB Atlas → Collections
- Verify database name: `eventapp`
- If not exists, create it manually

### 5. **Connection String Format**
Your current connection string:
```
mongodb+srv://01fe23bcs182_db_user:VLYTz4N70w2UnH5q@cluster0.qwhckmp.mongodb.net/eventapp?retryWrites=true&w=majority&appName=Cluster0
```

## 🔧 Fix Steps

### Step 1: Test Connection in Atlas
1. Go to MongoDB Atlas → Clusters → Connect
2. Choose "Connect your application"
3. Copy the connection string from Atlas
4. Replace the one in `.env` file

### Step 2: Update Password if Needed
If password is incorrect:
1. Go to Database Access
2. Edit user `01fe23bcs182_db_user`
3. Set new password
4. Update `.env` file with new password

### Step 3: Create Database Manually
If `eventapp` database doesn't exist:
1. Go to Atlas → Clusters → Collections
2. Click "Add My Own Data"
3. Database name: `eventapp`
4. Collection name: `test`

## 🚀 Once Atlas is Working

After fixing Atlas issues:

```bash
# Setup Atlas database with sample data
cd D:\Event-App\backend
node setup-atlas.js

# Start application
cd D:\Event-App\backend
node server.js

# In another terminal - Start frontend
cd D:\Event-App\frontend
npm start
```

## 🆘 If Still Fails

1. **Check Atlas Dashboard** for any service alerts
2. **Verify Network** - firewall/proxy issues
3. **Try Local MongoDB** as fallback:
   ```
   MONGODB_URI=mongodb://localhost:27017/event_app
   ```

## 📞 Atlas Support
- MongoDB Atlas Documentation: https://docs.mongodb.com/manual/reference/connection-string/
- Atlas Status: https://status.mongodb.com/
