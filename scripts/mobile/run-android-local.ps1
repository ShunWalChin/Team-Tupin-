$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$app = Join-Path $root 'mobile\team-tupina-app'
$serverUrl = $env:TEAM_TUPINA_SERVER_URL

if ([string]::IsNullOrWhiteSpace($serverUrl)) {
    $serverUrl = 'http://10.0.2.2:8002'
}

Set-Location $app

flutter pub get
flutter run `
    --dart-define=TEAM_TUPINA_SERVER_URL=$serverUrl `
    --dart-define=TEAM_TUPINA_TEST_SERVER_URL=$serverUrl `
    --dart-define=TEAM_TUPINA_REQUIRE_POWERSYNC=false
