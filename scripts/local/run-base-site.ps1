$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$python = Join-Path $root "wger\.venv\Scripts\python.exe"

Set-Location $root
& $python -m http.server 8000 --bind 127.0.0.1
