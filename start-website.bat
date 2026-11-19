@echo off
title Marketecture Dev Server
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;%PATH%"

echo ===================================================
echo   Starting Marketecture Development Server...
echo   Server URL: http://localhost:3000
echo ===================================================
echo.

:: Open browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"

:: Run Next.js Dev Server
call npm.cmd run dev -- -p 3000
pause
