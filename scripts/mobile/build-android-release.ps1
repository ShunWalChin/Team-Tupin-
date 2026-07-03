param(
    [string]$ServerUrl = $env:TEAM_TUPINA_SERVER_URL,
    [switch]$AllowApiOnly
)

$ErrorActionPreference = 'Stop'

if ([string]::IsNullOrWhiteSpace($ServerUrl)) {
    $ServerUrl = 'https://app.teamtupina.com.br'
}

$requirePowerSync = 'true'
if ($AllowApiOnly) {
    $requirePowerSync = 'false'
}

$root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$app = Join-Path $root 'mobile\team-tupina-app'

Set-Location $app

flutter pub get
flutter build appbundle --release `
    --dart-define=TEAM_TUPINA_SERVER_URL=$ServerUrl `
    --dart-define=TEAM_TUPINA_TEST_SERVER_URL=$ServerUrl `
    --dart-define=TEAM_TUPINA_REQUIRE_POWERSYNC=$requirePowerSync
