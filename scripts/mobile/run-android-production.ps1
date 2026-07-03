$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$app = Join-Path $root 'mobile\team-tupina-app'
$serverUrl = 'https://app.teamtupina.com.br'

Set-Location $app

flutter pub get
flutter run `
    --dart-define=TEAM_TUPINA_SERVER_URL=$serverUrl `
    --dart-define=TEAM_TUPINA_TEST_SERVER_URL=$serverUrl `
    --dart-define=TEAM_TUPINA_REQUIRE_POWERSYNC=false
