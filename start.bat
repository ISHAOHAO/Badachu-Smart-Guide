@chcp 936 >nul
@echo off
chcp 65001 >nul
title 八大处·智慧导览 启动器

echo ========================================
echo   八大处佛教文化智慧导览系统
echo   Badachu Buddhist Smart Guide System
echo ========================================
echo.

:: 检测 Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python，请安装 Python 3.8+
    pause
    exit /b
)
echo [OK] Python 已就绪

:: 安装后端依赖
echo.
echo [1/3] 安装后端依赖...
cd /d "%~dp0server"
pip install -r requirements.txt -q
if %errorlevel% neq 0 (
    echo [警告] 依赖安装可能有误，继续执行...
)

:: 初始化数据库
echo.
echo [2/3] 初始化数据库...
python scripts/seed_data.py

:: 启动后端服务
echo.
echo [3/3] 启动后端服务...
echo.
echo 后端 API 地址: http://localhost:5000
echo 前端项目: client/ 目录使用微信开发者工具打开
echo.
echo 按 Ctrl+C 停止服务
echo ========================================
python app.py

pause
