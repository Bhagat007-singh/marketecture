Set-Location -Path $PSScriptRoot
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
Start-Sleep -Seconds 1
Start-Process "http://localhost:3000"
npm.cmd run dev -- -p 3000
