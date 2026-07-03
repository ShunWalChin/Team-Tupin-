# Guia De Imagens

## Objetivo

Este guia mostra todos os campos de imagem do site `Team Tupina`, com o tamanho atual de exibicao, a proporcao ideal e o tamanho recomendado do arquivo que voce pode me enviar para substituirmos no site.

## Resumo rapido

- Logo principal: arquivo horizontal com transparencia
- Favicon/app icon: arquivo quadrado `1:1`
- Cards da secao de resultados: imagem horizontal `8:5` ou `16:10`
- Social share: imagem horizontal `1200x630`

## Tabela de campos

| Campo | Onde aparece | Arquivo/area atual | Exibicao atual | Proporcao ideal | Tamanho recomendado para envio | Formato ideal | Observacoes |
|---|---|---|---|---|---|---|---|
| Logo mestre da marca | Header, footer e paginas legais | `assets/logo-team.png` | Header responsivo aprox. `148x55` a `214x79`, footer ate `220px` de largura | `2.7:1` | `960x356` ou maior na mesma proporcao | `PNG` com transparencia | Wordmark horizontal da marca Tupina Fitness Coach. |
| Simbolo da marca | Favicon, Apple touch e manifest | `assets/favicon-teamtupina.png`, `assets/icon-192.png`, `assets/icon-512.png` | Uso pelo navegador, sem caixa fixa no layout | `1:1` | `512x512` | `PNG` com transparencia | Recorte quadrado do simbolo geometrico, com respiro interno para nao cortar em abas e atalhos. |
| Social share principal | Open Graph e Twitter | Hoje usa fallback em `assets/logo-team.png` | Compartilhamento social | `1.91:1` | `1200x630` | `JPG` ou `PNG` | Recomendado criar um asset proprio para compartilhamento, em vez de usar so a logo. |
| Resultado 01 | Secao `#resultados`, card 1 | Placeholder `.proof-card:nth-of-type(1) .proof-visual` | Desktop largo aprox. `363x230`, notebook aprox. `349x214`, tablet `486x214` a `427x190`, mobile aprox. `366x190` | `8:5` ou `16:10` | `1600x1000` | `JPG` ou `WebP` | Ideal para antes/depois horizontal ou composicao ampla. |
| Resultado 02 | Secao `#resultados`, card 2 | Placeholder `.proof-card:nth-of-type(2) .proof-visual` | Mesmo comportamento do card 1 | `8:5` ou `16:10` | `1600x1000` | `JPG` ou `WebP` | Ideal para print tratado de WhatsApp ou prova social visual. |
| Resultado 03 | Secao `#resultados`, card 3 | Placeholder `.proof-card:nth-of-type(3) .proof-visual` | Mesmo comportamento do card 1 | `8:5` ou `16:10` | `1600x1000` | `JPG` ou `WebP` | Ideal para case visual curto ou transformacao. |

## Campos atuais que usam a logo

### 1. Header

- Classe: `.brand-badge`
- Tamanho atual: largura fluida entre `148px` e `214px`
- Arquivos:
  - `index.html`
  - `privacy.html`
  - `terms.html`

### 2. Hero

- Classe: `.hero-panel-brand img`
- Tamanho atual:
  - desktop/tablet: `70x70`
  - mobile: `64x64`

### 3. Footer

- Classe: `.footer-brand img`
- Tamanho atual:
  - desktop/tablet: `70x70`
  - telas menores: `62x62`

### 4. Paginas legais

- Classe: `.legal-brand`
- Tamanho atual:
  - desktop/tablet: `78x78`
  - telas menores: `62x62`

## Como preparar cada tipo de imagem

### Logo principal

- fundo transparente
- composicao centralizada
- margem interna de seguranca de pelo menos `10%`
- evitar textos muito finos ou detalhes pequenos demais

### Favicon

- simplificar a marca
- evitar detalhes minimos
- usar versao com leitura forte em tamanhos pequenos

### Social share cover

- usar arte horizontal
- manter texto e elemento principal no centro util
- deixar `60px` de respiro nas bordas
- evitar excesso de informacao

### Cards de resultados

- preferir imagem final ja montada em horizontal
- para antes/depois, enviar o antes e depois em uma mesma composicao
- manter o assunto principal dentro da faixa central da imagem
- evitar colocar texto importante nas extremidades

## Se voce for me enviar fotos reais

### Resultado 01

Sugestao:

- antes e depois lado a lado
- exportar em `1600x1000`
- rosto protegido, se necessario

### Resultado 02

Sugestao:

- print de WhatsApp tratado
- exportar sobre uma arte horizontal em `1600x1000`
- aumentar contraste e legibilidade

### Resultado 03

Sugestao:

- foto do aluno, composicao comparativa ou arte com frase curta
- exportar em `1600x1000`

## Peso recomendado

- logo: ate `350 KB`
- favicon: ate `150 KB`
- social share cover: ate `350 KB`
- cada card de resultado: idealmente ate `250 KB`

## Nomes de arquivo recomendados

- `logo-team-tupina-v2.png`
- `favicon-team-tupina-v2.png`
- `social-share-team-tupina.jpg`
- `resultado-01-antes-depois.jpg`
- `resultado-02-feedback-whatsapp.jpg`
- `resultado-03-transformacao.jpg`

## O que pode ser enviado para eu aplicar no site

Voce pode me mandar:

1. somente a nova logo
2. logo + favicon
3. as 3 imagens de resultados
4. uma capa social `1200x630`
5. o pacote completo com todos os assets acima

Com isso, eu consigo substituir tudo nos pontos certos do site.
