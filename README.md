# Team Tupina

Ecossistema digital Team Tupina, com site institucional, paginas comerciais,
plataforma wger personalizada, app mobile Flutter, deploy Docker e documentacao
operacional.

## Repositorios

- Site, documentacao e operacao: `ShunWalChin/Team-Tupin-`
- wger personalizado: `ShunWalChin/Team-Tupina-wger`
- App mobile Flutter: `ShunWalChin/Team-Tupina-mobile`

O wger e o app mobile ficam em repositorios separados porque sao projetos
upstream grandes, com historico proprio. Este repositorio principal documenta o
ecossistema e carrega o site, deploy, scripts e manuais de operacao.

## URLs

- Site: <https://teamtupina.com.br>
- Premium: <https://teamtupina.com.br/premium.html>
- RESET 7: <https://teamtupina.com.br/reset-7.html>
- Plataforma wger: <https://app.teamtupina.com.br>

## Estrutura

```text
.
|-- index.html
|-- premium.html
|-- reset-7.html
|-- assets/
|-- deploy/team-tupina-v2-docker/
|-- mobile/README_TEAM_TUPINA.md
|-- scripts/
|-- README_ISA_TUPINA.md
|-- SYSTEM_DOCUMENTATION.md
`-- PROJECT_MAP.md
```

## Site

O site e estatico e pode ser publicado por Nginx, Cloudflare Pages, GitHub Pages,
Netlify ou qualquer hospedagem de arquivos estaticos.

Arquivos principais:

- `index.html`: pagina principal Team Tupina.
- `premium.html`: oferta Premium, refatorada com UX/UI Team Tupina.
- `reset-7.html`: pagina do produto RESET 7.
- `styles.css` e `script.js`: identidade visual e interacoes.
- `assets/`: logos, imagens, icones, videos e imagens otimizadas.

## Plataforma wger

O sistema wger customizado roda como aplicacao Django com PostgreSQL, Redis,
Celery e Nginx. A personalizacao inclui:

- identidade visual Team Tupina;
- textos institucionais com tecnologia F.A.T Tech;
- painel com atalhos para treino, nutricao, medidas e gestao;
- base PT-BR de equipamentos, musculos, exercicios, alimentos e templates;
- endpoints e configuracoes para o app mobile.

O codigo fica no repositorio `Team-Tupina-wger`.

## App mobile

O app mobile e baseado no wger Flutter app, customizado para Team Tupina.

Repositorio: `Team-Tupina-mobile`

Documentacao local:

- `mobile/README_TEAM_TUPINA.md`
- `scripts/mobile/check-mobile-env.ps1`
- `scripts/mobile/build-android-apk.ps1`
- `scripts/mobile/build-android-release.ps1`

## Deploy Docker

O deploy isolado fica em:

```text
deploy/team-tupina-v2-docker/
```

Componentes:

- site estatico em Nginx;
- wger web;
- Nginx publico do wger;
- PostgreSQL;
- Redis;
- Celery worker;
- Celery beat.

Use arquivos `.env` reais somente no servidor. Este repositorio deve manter
apenas `.env.example`, sem chaves, tokens ou senhas reais.

## Documentacao de operacao

- `README_ISA_TUPINA.md`: manual para a Isa operar o sistema.
- `SYSTEM_DOCUMENTATION.md`: documentacao geral do sistema.
- `PROJECT_MAP.md`: mapa rapido do projeto.
- `GUIA_DE_IMAGENS.md`: guia de imagens e assets.
- `MANUAL_DE_MANUTENCAO.md`: manutencao do site.

## Seguranca

Nao versionar:

- `.env` real;
- chaves SSH;
- tokens de Cloudflare, GitHub ou provedores;
- senhas de usuarios;
- dumps de banco;
- backups de producao;
- builds de app assinados.

Senhas de usuarios devem ficar em gerenciador de senhas. Documentos publicos
devem listar apenas nomes de usuarios e papeis, nunca credenciais completas.

## Rotina local

Site estatico:

```powershell
.\scripts\local\run-base-site.ps1
```

wger local:

```powershell
.\scripts\local\run-wger.ps1
```

Qualidade:

```powershell
.\scripts\quality\team-tupina-quality-gate.ps1
```

## Creditos

Projeto personalizado para Team Tupina com tecnologia F.A.T Tech, usando wger
como base open source para treino, nutricao e acompanhamento corporal.
