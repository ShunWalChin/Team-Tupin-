# Team Tupina Mobile

Este diretorio contem o app Flutter oficial do wger personalizado para Team Tupina.

## Estado atual

- Nome do app: Team Tupina / Team Tupina no launcher.
- Android package id: `br.com.teamtupina.app`.
- iOS bundle id: `br.com.teamtupina.app`.
- Cores e assets principais trocados para a identidade Team Tupina.
- Backend padrao de producao: `https://app.teamtupina.com.br`.
- Backend local recomendado para Android Emulator: `http://10.0.2.2:8002`.
- Deep link mantido como `wger://app-auth`, porque o backend atual do wger redireciona o login mobile para esse esquema.
- Login mobile ativo no backend de producao em modo API-only.
- PowerSync ainda nao esta ativo no backend de producao.

## Status de ativacao em producao

Validado em 2026-07-03:

- `https://app.teamtupina.com.br/api/v2/`
- `https://app.teamtupina.com.br/api/v2/version/`
- `https://app.teamtupina.com.br/api/v2/min-app-version/`
- `https://app.teamtupina.com.br/allauth/app/v1/auth/login`
- `https://app.teamtupina.com.br/allauth/app/v1/tokens/refresh`
- `https://app.teamtupina.com.br/api/v2/issue-refresh-token`

Usuarios validados no fluxo mobile:

- `teamadmin`
- `professor.teste`
- `aluno.teste`

## Scripts

Rode a partir da raiz do projeto:

```powershell
.\scripts\mobile\check-mobile-env.ps1
```

```powershell
.\scripts\mobile\run-android-local.ps1
```

```powershell
.\scripts\mobile\run-android-production.ps1
```

```powershell
.\scripts\mobile\build-android-release.ps1 -ServerUrl https://app.teamtupina.com.br
```

```powershell
.\scripts\mobile\build-android-apk.ps1 -ServerUrl https://app.teamtupina.com.br
```

Enquanto o PowerSync nao estiver publicado, gere build Android com:

```powershell
.\scripts\mobile\build-android-release.ps1 -ServerUrl https://app.teamtupina.com.br -AllowApiOnly
```

Para gerar um APK instalavel diretamente no Android enquanto o PowerSync nao estiver publicado:

```powershell
.\scripts\mobile\build-android-apk.ps1 -ServerUrl https://app.teamtupina.com.br -AllowApiOnly
```

Para aparelho fisico na mesma rede, use o IP da maquina no lugar do emulador:

```powershell
$env:TEAM_TUPINA_SERVER_URL = 'http://SEU_IP_LOCAL:8002'
.\scripts\mobile\run-android-local.ps1
```

## PowerSync

O app Flutter atual usa PowerSync para banco local e sincronizacao. O backend local validado hoje responde:

- `/api/v2/`
- `/api/v2/version/`
- `/api/v2/min-app-version/`

O endpoint `/api/v2/powersync-token` ainda nao existe neste backend wger local. Por isso o script local roda com:

```text
TEAM_TUPINA_REQUIRE_POWERSYNC=false
```

Para producao completa com sincronizacao offline e loja, publicar com PowerSync ativo:

```text
TEAM_TUPINA_REQUIRE_POWERSYNC=true
```

Antes de loja, o backend precisa fornecer:

- `/api/v2/powersync-token`
- `/api/v2/upload-powersync-data`
- URL publica do PowerSync com `/probes/liveness`
- HTTPS valido

## Requisitos Android

- Flutter SDK 3.10+ no PATH.
- Android Studio com Android SDK.
- JDK compativel com Gradle/Android.
- Dispositivo ou emulador Android.
- Conta Google Play Console para publicacao.
- Keystore de release e configuracao de assinatura.

Build beta/API-only:

```powershell
.\scripts\mobile\build-android-release.ps1 -ServerUrl https://app.teamtupina.com.br -AllowApiOnly
```

O arquivo AAB final para Google Play fica em:

```text
mobile/team-tupina-app/build/app/outputs/bundle/release/app-release.aab
```

Para baixar e instalar direto em um aparelho Android, gere o APK:

```powershell
.\scripts\mobile\build-android-apk.ps1 -ServerUrl https://app.teamtupina.com.br -AllowApiOnly
```

O arquivo APK final fica em:

```text
mobile/team-tupina-app/build/app/outputs/flutter-apk/app-release.apk
```

## Requisitos iOS

iOS precisa ser gerado em macOS:

- macOS com Xcode.
- Flutter SDK 3.10+.
- CocoaPods.
- Apple Developer Program.
- Bundle id `br.com.teamtupina.app` registrado no Apple Developer.
- App criado no App Store Connect.

Comandos no macOS:

```bash
cd mobile/team-tupina-app
flutter pub get
flutter build ipa --release \
  --dart-define=TEAM_TUPINA_SERVER_URL=https://app.teamtupina.com.br \
  --dart-define=TEAM_TUPINA_REQUIRE_POWERSYNC=true
```

## Observacao de versionamento

`mobile/team-tupina-app` ainda contem o `.git` do projeto Flutter original. Na etapa de organizacao do repositorio principal, escolher uma opcao:

- manter como submodulo Git;
- remover o `.git` interno e versionar como codigo vendorizado no projeto Team Tupina.
