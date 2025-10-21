# Automatiza SQL, migraciones y seeds para el Backend
# Uso:
#   powershell -ExecutionPolicy Bypass -File .\scripts\setup_backend.ps1

param(
  [string]$SqlScriptPath = "scripts/init_auth.sql"
)

$ErrorActionPreference = "Stop"

function Ensure-Command($cmd) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    throw "$cmd no está disponible en PATH. Reinicia PowerShell o instala $cmd."
  }
}

Write-Host "Verificando Node y npm..." -ForegroundColor Cyan
Ensure-Command node
Ensure-Command npm

Write-Host "Instalando dependencias (npm install)..." -ForegroundColor Cyan
npm install

Write-Host "Aplicando SQL ($SqlScriptPath) contra la BD definida en .env..." -ForegroundColor Cyan
node scripts/run_sql.js

Write-Host "Ejecutando migraciones..." -ForegroundColor Cyan
npm run migration:run

Write-Host "Ejecutando seeds..." -ForegroundColor Cyan
npm run seed

Write-Host "Listo. Ahora puedes iniciar el backend con 'npm start'." -ForegroundColor Green