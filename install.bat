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

echo Automation complete!
pause