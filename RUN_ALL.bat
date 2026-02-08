@echo off
echo Starting Marketplace Project...

:: Start Backend
start "Backend Server" cmd /k "cd Backend && npm run dev"

:: Start Frontend
start "Frontend Web" cmd /k "cd Frontend && npm run dev"

:: Start Mobile
start "Mobile App" cmd /k "cd Mobile && npx expo start"

echo All services started in new windows!
pause
