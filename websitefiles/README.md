# STAPLE Agency - Full Stack Application

A complete multi-service agency website with Node.js backend and modern frontend.

## 🚀 Features

- ✅ Contact form with backend API
- ✅ Request management system
- ✅ Admin dashboard
- ✅ Real-time statistics
- ✅ Complete CRUD operations
- ✅ Persistent data storage (JSON file)
- ✅ RESTful API

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/
   - Choose LTS version
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   npm install
   ```

## 🎯 Running the Application

1. **Start the Backend Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. **Open in Browser**
   - Navigate to: `http://localhost:3000`
   - The website will be served automatically

3. **The server will:**
   - Serve the frontend at `http://localhost:3000`
   - Provide API endpoints at `http://localhost:3000/api`
   - Store data in `data/requests.json`

## 📡 API Endpoints

- **GET** `/api/requests` - Get all requests
- **GET** `/api/stats` - Get statistics (total, pending, completed)
- **POST** `/api/requests` - Create new request
- **PATCH** `/api/requests/:id` - Update request status
- **DELETE** `/api/requests/:id` - Delete request

## 📁 Project Structure

```
staple-agency/
├── server.js           # Backend API server
├── package.json        # Dependencies
├── public/
│   └── index.html     # Frontend website
└── data/
    └── requests.json  # Data storage (auto-created)
```

## 🌐 Deploying to Production

### Option 1: Heroku (Free Tier)
1. Create account at heroku.com
2. Install Heroku CLI
3. Run:
   ```bash
   heroku create staple-agency
   git push heroku main
   ```

### Option 2: Railway
1. Visit railway.app
2. Connect GitHub repo
3. Deploy automatically

### Option 3: DigitalOcean
1. Create a droplet (Ubuntu)
2. Install Node.js
3. Clone your code
4. Run with PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js
   ```

### Option 4: Render
1. Visit render.com
2. Create Web Service
3. Connect GitHub repo
4. Auto-deploys

## 🔧 Configuration

**Change Port** (optional):
- Edit `server.js` or set environment variable:
  ```bash
  PORT=5000 npm start
  ```

**Database Upgrade** (for production):
- Replace JSON file storage with MongoDB or PostgreSQL
- Install database driver: `npm install mongodb` or `npm install pg`

## 📝 Notes

- Data is stored in `data/requests.json` file
- For production, consider using a real database (MongoDB, PostgreSQL)
- The current setup is perfect for small to medium traffic
- CORS is enabled for all origins (adjust for production)

## 🆘 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
npm install
```

## 📞 Support

For issues or questions about STAPLE services, contact through the website form!
