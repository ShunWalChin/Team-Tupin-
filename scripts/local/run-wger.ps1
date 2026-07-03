$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$wger = Join-Path $root "wger"
$python = Join-Path $wger ".venv\Scripts\python.exe"
$manage = Join-Path $wger "manage.py"

$env:DJANGO_SETTINGS_MODULE = "settings.local_dev"
Set-Location $wger
& $python $manage runserver 127.0.0.1:8002 --noreload
