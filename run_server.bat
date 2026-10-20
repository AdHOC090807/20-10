@echo off
chcp 65001 > nul
title May Chu 20-10 Ngay Phu Nu Viet Nam
echo ========================================================
echo   🌹 MAY CHU FULL-STACK 20/10 NGAY PHU NU VIET NAM
echo ========================================================
echo.
echo Dang khoi chay FastAPI Server va SQLite Database...
echo Ung dung se tu dong mo tren trinh duyet tai: http://127.0.0.1:8000
echo.
echo Nhan Ctrl + C de dung may chu khi khong su dung.
echo.

start "" "http://127.0.0.1:8000"
py -3 server.py
pause
