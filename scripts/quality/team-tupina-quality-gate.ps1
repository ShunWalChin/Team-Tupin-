param(
    [switch]$FullDjangoTests,
    [switch]$SkipNetworkAudits,
    [switch]$SkipHttpProbes,
    [switch]$SkipMobileCheck
)

$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$wger = Join-Path $root 'wger'
$python = Join-Path $wger '.venv\Scripts\python.exe'
$mobileCheck = Join-Path $root 'scripts\mobile\check-mobile-env.ps1'
$npmCache = Join-Path ([System.IO.Path]::GetTempPath()) 'team-tupina-npm-cache'

$results = New-Object System.Collections.Generic.List[object]

function Test-Command($Name) {
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Add-Result($Name, $Status, $Detail) {
    $results.Add([PSCustomObject]@{
        Name = $Name
        Status = $Status
        Detail = $Detail
    }) | Out-Null
}

function Invoke-GateStep($Name, [scriptblock]$Command, [switch]$Optional) {
    Write-Host ""
    Write-Host "==> $Name"
    try {
        & $Command
        Add-Result $Name 'OK' ''
        Write-Host "OK  $Name"
    } catch {
        $status = if ($Optional) { 'WARN' } else { 'FAIL' }
        Add-Result $Name $status $_.Exception.Message
        Write-Host "$status $Name"
        Write-Host $_.Exception.Message
        if (-not $Optional) {
            $script:hasFailure = $true
        }
    }
}

function Invoke-NativeCommand($Name, [scriptblock]$Command) {
    $global:LASTEXITCODE = 0
    & $Command
    if ($LASTEXITCODE -ne 0) {
        throw "$Name exited with code $LASTEXITCODE"
    }
}

function Invoke-HttpProbe($Url) {
    $response = Invoke-WebRequest -UseBasicParsing -TimeoutSec 10 -Uri $Url
    if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 400) {
        throw "$Url returned HTTP $($response.StatusCode)"
    }
    Write-Host "OK  $Url -> $($response.StatusCode)"
}

$script:hasFailure = $false

Write-Host "Team Tupina Quality Gate"
Write-Host "Root: $root"
Write-Host "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

if (-not (Test-Path $python)) {
    throw "Python venv not found: $python"
}

Invoke-GateStep 'Django system check' {
    Push-Location $wger
    try {
        $env:DJANGO_SETTINGS_MODULE = 'settings.main'
        Invoke-NativeCommand 'manage.py check' { & $python manage.py check }
    } finally {
        Pop-Location
    }
}

Invoke-GateStep 'Django login regression tests' {
    Push-Location $wger
    try {
        if ($FullDjangoTests) {
            Invoke-NativeCommand 'manage.py test' { & $python manage.py test --keepdb }
        } else {
            Invoke-NativeCommand 'manage.py test login' {
                & $python manage.py test wger.core.tests.test_user_login --keepdb
            }
        }
    } finally {
        Pop-Location
    }
}

Invoke-GateStep 'Ruff custom surface' {
    Push-Location $wger
    try {
        Invoke-NativeCommand 'ruff' {
            & $python -m ruff check settings wger\utils\context_processor.py --quiet
        }
    } finally {
        Pop-Location
    }
}

if (Test-Command node) {
    Invoke-GateStep 'Static JS syntax' {
        Push-Location $root
        try {
            Invoke-NativeCommand 'node --check' { node --check script.js }
        } finally {
            Pop-Location
        }
    }
} else {
    Add-Result 'Static JS syntax' 'WARN' 'node not found in PATH'
}

if (Test-Command npx) {
    Invoke-GateStep 'Static HTML validation' {
        Push-Location $root
        try {
            Invoke-NativeCommand 'html-validate' {
                npx html-validate index.html premium.html reset-7.html privacy.html terms.html
            }
        } finally {
            Pop-Location
        }
    }
} else {
    Add-Result 'Static HTML validation' 'WARN' 'npx not found in PATH'
}

if (-not $SkipNetworkAudits) {
    if (Test-Command npm) {
        Invoke-GateStep 'npm dependency audit' {
            Push-Location $wger
            try {
                Invoke-NativeCommand 'npm audit' {
                    npm audit --omit=dev --audit-level=moderate --cache $npmCache
                }
            } finally {
                Pop-Location
            }
        }
    } else {
        Add-Result 'npm dependency audit' 'WARN' 'npm not found in PATH'
    }

    if (Test-Command uvx) {
        Invoke-GateStep 'Python dependency audit' {
            Push-Location $wger
            try {
                Invoke-NativeCommand 'pip-audit' {
                    uvx pip-audit --path .venv\Lib\site-packages
                }
            } finally {
                Pop-Location
            }
        }
    } else {
        Add-Result 'Python dependency audit' 'WARN' 'uvx not found in PATH'
    }
} else {
    Add-Result 'Dependency audits' 'SKIP' 'SkipNetworkAudits was provided'
}

if (-not $SkipMobileCheck -and (Test-Path $mobileCheck)) {
    Invoke-GateStep 'Mobile/backend environment check' {
        Invoke-NativeCommand 'mobile environment check' { & $mobileCheck -Strict }
    } -Optional
}

if (-not $SkipHttpProbes) {
    Invoke-GateStep 'Local HTTP probes' {
        $urls = @(
            'http://127.0.0.1:8000/',
            'http://127.0.0.1:8000/premium.html',
            'http://127.0.0.1:8000/reset-7.html',
            'http://127.0.0.1:8002/pt-br/software/features',
            'http://127.0.0.1:8002/pt-br/dashboard',
            'http://127.0.0.1:8002/api/v2/version/'
        )

        foreach ($url in $urls) {
            Invoke-HttpProbe $url
        }
    } -Optional
}

Invoke-GateStep 'Whitespace diff check - root' {
    Push-Location $root
    try {
        Invoke-NativeCommand 'git diff --check root' { git diff --check }
    } finally {
        Pop-Location
    }
}

Invoke-GateStep 'Whitespace diff check - wger' {
    Push-Location $wger
    try {
        Invoke-NativeCommand 'git diff --check wger' { git diff --check }
    } finally {
        Pop-Location
    }
}

Write-Host ""
Write-Host "Quality gate summary"
$results | Format-Table -AutoSize

if ($script:hasFailure) {
    exit 1
}
