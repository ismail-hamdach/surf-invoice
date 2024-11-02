@echo off
setlocal

:: Set download URLs
set XAMPP_URL=https://kumisystems.dl.sourceforge.net/project/xampp/XAMPP Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe?viasf=1
set GIT_URL=https://github.com/git-for-windows/git/releases/download/v2.40.0.windows.1/Git-2.40.0-64-bit.exe
set NODEJS_URL=https://nodejs.org/dist/latest-v20.x/node-v20.18.0-x64.msi

:: Set installer paths

set XAMPP_INSTALLER=%TEMP%\xampp-installer.exe
set GIT_INSTALLER=%TEMP%\git-installer.exe
set NODEJS_INSTALLER=%TEMP%\nodejs-installer.msi

:: Set repository URL and SQL file path
set REPO_URL=https://github.com/ismail-hamdach/invoice-calculation.git
set SQL_FILE_PATH=C:\path\to\db.sql

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
npm run start

echo Automation complete!
pause
