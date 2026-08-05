@echo off
title 君子兰主页服务器
echo 正在启动君子兰主页...
echo.
echo 浏览器将自动打开 http://localhost:8877
echo.
echo 关闭此窗口可停止服务器
echo.
start msedge http://localhost:8877
node -e "const http=require('http');const fs=require('fs');const path=require('path');http.createServer((req,res)=>{const f=path.join('C:\\Users\\lan\\Desktop','index.html');res.setHeader('Content-Type','text/html;charset=utf-8');res.setHeader('Cache-Control','no-cache,no-store,must-revalidate');res.end(fs.readFileSync(f))}).listen(8877,()=>console.log('服务器已启动: http://localhost:8877'))"
pause
