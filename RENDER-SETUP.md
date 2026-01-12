# Render Deployment Guide - Event Management App

## 🚀 Quick Deploy to Render

### 1. **Create Render Account**
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 2. **Deploy Backend**
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub → Select `eventapp` repo
3. **Service Settings:**
   - **Name:** `event-app-backend`
   - **Runtime:** `Node`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && node server.js`
   - **Plan:** Free

4. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://01fe23bcs182_db_user:EventApp123@cluster0.nv2eubn.mongodb.net/eventapp?retryWrites=true&w=majority
   JWT_SECRET=eventhub_jwt_secret_key_2024_secure_token
   ```

5. **Advanced Settings:**
   - **Health Check Path:** `/api/events`

### 3. **Deploy Frontend**
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub → Select `eventapp` repo
3. **Service Settings:**
   - **Name:** `event-app-frontend`
   - **Runtime:** `Static`
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`
   - **Plan:** Free

4. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://event-app-backend.onrender.com
   ```

5. **Advanced Settings:**
   - **Health Check Path:** `/`

### 4. **Update Frontend API Calls**
After deployment, update frontend API URLs:

**In `frontend/src/context/AuthContext.js`:**
```javascript
const response = await axios.post('https://event-app-backend.onrender.com/api/auth/login', {
```

**In all frontend components:**
- Replace `http://localhost:5000` with `https://event-app-backend.onrender.com`

### 5. **Alternative: Use render.yaml**
1. Push `render.yaml` to your repo
2. In Render: **"New +"** → **"Blueprint"**
3. Connect repo → Select `render.yaml`
4. Render will auto-create both services

## 🔧 Post-Deployment Setup

### Update Frontend URLs
After backend deployment, update these files:

**AuthContext.js:**
```javascript
// Replace all localhost:5000 with your backend URL
const response = await axios.post('https://event-app-backend.onrender.com/api/auth/login', {
const response = await axios.post('https://event-app-backend.onrender.com/api/auth/register', {
```

**AdminDashboard.js:**
```javascript
const response = await axios.get('https://event-app-backend.onrender.com/api/events');
await axios.post('https://event-app-backend.onrender.com/api/events', formData);
```

**EventList.js:**
```javascript
const response = await axios.get('https://event-app-backend.onrender.com/api/events');
await axios.post('https://event-app-backend.onrender.com/api/bookings', { eventId });
```

**MyBookings.js:**
```javascript
const response = await axios.get('https://event-app-backend.onrender.com/api/bookings/my-bookings');
await axios.delete(`https://event-app-backend.onrender.com/api/bookings/${bookingId}`);
```

**AdminBookings.js:**
```javascript
const response = await axios.get('https://event-app-backend.onrender.com/api/bookings/all');
await axios.delete(`https://event-app-backend.onrender.com/api/bookings/${bookingId}`);
```

## 🌐 Access URLs After Deployment

- **Backend:** `https://event-app-backend.onrender.com`
- **Frontend:** `https://event-app-frontend.onrender.com`
- **API:** `https://event-app-backend.onrender.com/api/*`

## 📋 Deployment Checklist

- [ ] GitHub repo connected to Render
- [ ] Backend service created with Node.js
- [ ] Environment variables configured
- [ ] Frontend service created as Static
- [ ] API URLs updated in frontend code
- [ ] Both services deployed successfully
- [ ] Test login and functionality

## 🆘 Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify MongoDB Atlas connection
- Ensure all environment variables are set

### Frontend Issues
- Verify build process completed
- Check API URL replacements
- Clear browser cache

### CORS Issues
Add this to backend `server.js` if needed:
```javascript
app.use(cors({
    origin: ['https://event-app-frontend.onrender.com', 'http://localhost:3000'],
    credentials: true
}));
```

## 🔄 Auto-Deploy Setup

In Render dashboard:
1. Go to each service → **Settings**
2. Enable **"Auto-Deploy"**
3. Select `master` branch
4. Now every push to GitHub auto-deploys

---

**🎯 Your app will be live at:**
**Frontend:** `https://event-app-frontend.onrender.com`
**Backend API:** `https://event-app-backend.onrender.com/api/*`
