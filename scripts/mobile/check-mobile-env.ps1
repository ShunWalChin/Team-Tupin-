param(
    [switch]$Strict
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

function Test-Command($Name) {
    $cmd = Get-Command $Name -ErrorAction SilentlyContinue
    return $null -ne $cmd
}

$hasFailure = $false
$root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$app = Join-Path $root 'mobile\team-tupina-app'
$backend = $env:TEAM_TUPINA_LOCAL_BACKEND
if ([string]::IsNullOrWhiteSpace($backend)) {
    $backend = 'http://127.0.0.1:8002'
}

Write-Host "Team Tupina mobile environment check"
Write-Host "App: $app"
Write-Host "Backend: $backend"

if (-not (Test-Path $app)) {
    throw "Mobile app folder not found: $app"
}

$tools = @('flutter', 'dart', 'java')
foreach ($tool in $tools) {
    if (Test-Command $tool) {
        Write-Host "OK   $tool found"
    } else {
        Write-Host "MISS $tool not found in PATH"
        $hasFailure = $true
    }
}

if (Test-Command flutter) {
    Write-Host ""
    flutter --version
}

Write-Host ""
Write-Host "Backend probes"
$paths = @('/api/v2/', '/api/v2/version/', '/api/v2/min-app-version/')
foreach ($path in $paths) {
    $url = "$backend$path"
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 8
        Write-Host "OK   $url -> $($response.StatusCode)"
    } catch {
        Write-Host "FAIL $url -> $($_.Exception.Message)"
        $hasFailure = $true
    }
}

Write-Host ""
Write-Host "PowerSync probe endpoint expected in production:"
Write-Host "$backend/api/v2/powersync-token"

if ($Strict -and $hasFailure) {
    exit 1
}
