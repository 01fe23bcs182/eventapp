@echo off
echo Starting Event Management Application...
echo.

echo [1/3] Starting Backend Server...
cd /d "D:\Event-App\backend"
start "Backend Server" cmd /k "node server.js"

echo [2/3] Waiting for backend to initialize...
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend Server...
cd /d "D:\Event-App\frontend"
start "Frontend Server" cmd /k "npm start"

echo.
echo ========================================
echo Event Management App Started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
