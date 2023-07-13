@echo off

rem Step 1
cd react\fed-final\server

rem Step 2
start "JSON Server" cmd /c "json-server --watch database.json --port 3010"

rem Step 3
start "React Project" powershell -noexit -command "cd react\fed-final; npm run dev"
