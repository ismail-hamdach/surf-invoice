@echo off
setlocal

:: Set download URLs
set XAMPP_URL=https://www.apachefriends.org/xampp-files/7.4.29/xampp-windows-x64-7.4.29-0-VC15-installer.exe
set GIT_URL=https://github.com/git-for-windows/git/releases/download/v2.40.0.windows.1/Git-2.40.0-64-bit.exe
set NODEJS_URL=https://nodejs.org/dist/latest-v20.x/node-v20.18.0-x64.msi

:: Set installer paths
set XAMPP_INSTALLER=%TEMP%\xampp-installer.exe
set GIT_INSTALLER=%TEMP%\git-installer.exe
set NODEJS_INSTALLER=%TEMP%\nodejs-installer.msi

:: Set repository URL and SQL file path
set REPO_URL=https://github.com/ismail-hamdach/invoice-calculation.git
set SQL_FILE_PATH=C:\path\to\db.sql

echo Downloading and installing XAMPP, Git, and Node.js...

:: Download XAMPP
echo Downloading XAMPP...
curl -L -o %XAMPP_INSTALLER% %XAMPP_URL%

:: Download Git
echo Downloading Git...
curl -L -o %GIT_INSTALLER% %GIT_URL%

:: Download Node.js
echo Downloading Node.js...
curl -L -o %NODEJS_INSTALLER% %NODEJS_URL%

:: Install XAMPP
echo Installing XAMPP...
start /wait "" "%XAMPP_INSTALLER%" /S /D=C:\xampp

:: Install Git
echo Installing Git...
start /wait "" "%GIT_INSTALLER%" /SILENT

:: Install Node.js
echo Installing Node.js...
msiexec /i %NODEJS_INSTALLER% /quiet /norestart

:: Start MySQL
echo Starting MySQL...
"C:\xampp\mysql\bin\mysqld.exe" --console

:: Clone the repository
echo Cloning Git repository...
git clone %REPO_URL%
set REPO_NAME=%REPO_URL:~29,-4%
cd %REPO_NAME%

:: Log in to MySQL and create database
echo Creating MySQL database...
"C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE invoice;"

:: Import the database
echo Importing database...
"C:\xampp\mysql\bin\mysql.exe" -u root invoice < "./invoice.sql"

:: Run npm commands
echo Installing npm dependencies...
npm install

echo Building the project...
npm run build

echo Starting the application...
npm start

echo Automation complete!
pause
