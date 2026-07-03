# Manual De Manutencao

## 1. Objetivo

Este manual define as boas praticas para manter o site `Team Tupina` atualizado, consistente e leve, sem perder qualidade visual, SEO, responsividade e estabilidade tecnica.

## 2. Arquivos principais do projeto

- `index.html`: landing page principal e funil de conversao
- `privacy.html`: politica de privacidade
- `terms.html`: termos de uso
- `instagram-posts.json`: indice de permalinks publicos do mural do Instagram
- `styles.css`: layout, glassmorphism, responsividade, estados de interface
- `script.js`: navegacao, scroll, menu mobile, motion e interacoes
- `assets/logo-team.png`: logo horizontal mestre da marca
- `assets/logo-team-symbol.png`: simbolo quadrado da marca
- `assets/favicon-teamtupina.png`: favicon e icone base
- `assets/vendor/anime.umd.min.js`: camada local de animacao
- `manifest.webmanifest`: metadata mobile/app
- `robots.txt`: regra de rastreamento
- `PROJECT_MAP.md`: mapa tecnico do projeto
- `SYSTEM_DOCUMENTATION.md`: documentacao tecnica e de arquitetura
- `GUIA_DE_IMAGENS.md`: especificacoes de imagens e campos visuais

## 3. Regras de manutencao

### 3.1 Antes de editar

1. Confirmar qual pagina sera alterada.
2. Validar se a mudanca afeta somente copy, somente imagem, somente estilo ou mais de uma camada.
3. Garantir que a identidade visual roxa/verde e o padrao glassmorphism sejam preservados.

### 3.2 Depois de editar

1. Revisar se o `h1` principal continua unico por pagina.
2. Conferir se os links internos e externos continuam funcionando.
3. Confirmar que nenhum texto ficou vazando em cards, FAQ, timeline ou CTA final.
4. Validar `script.js` com `node --check`.
5. Abrir a home e as paginas legais no preview local.

## 4. Boas praticas de copy

### 4.1 Home

- O texto principal deve ser direto, escaneavel e orientado a beneficio.
- Evitar frases muito longas em `hero`, FAQ e cards.
- Cada secao deve responder a uma unica pergunta:
  - hero: por que isso importa agora
  - dor: por que a pessoa trava
  - metodo: por que o processo e diferente
  - jornada: como comeca
  - resultados: o que muda na pratica
  - FAQ: o que costuma impedir o contato
  - CTA final: qual e o proximo passo

### 4.2 SEO

- Manter palavras-chave alinhadas ao servico:
  - emagrecimento online
  - hipertrofia
  - reconstrucao corporal
  - consultoria online
  - treino, nutricao e saude
- Nao duplicar `title` e `meta description` com formulacoes vagas.
- Sempre revisar `og:title`, `og:description` e `twitter` quando a proposta central mudar.

## 5. Boas praticas de layout e UI

### 5.1 Escala

- O padrao principal do projeto e `1920x1080` com navegador em `100%`.
- Evitar aumentar demais:
  - paddings
  - alturas minimas
  - sombras
  - raios
  - tipografia de cards

### 5.2 Navegacao

- O fluxo deve continuar claro da hero ate o CTA final.
- Nao criar secao muito alta sem ganho real de leitura.
- CTA principal deve continuar evidente no desktop e no mobile.

### 5.3 Glassmorphism

- Manter superficies com:
  - gradiente leve
  - blur controlado
  - borda transluzida
  - sombra suave
- Nao usar blocos opacos e chapados fora de uma decisao visual clara.

## 6. Boas praticas de imagens

- Usar o `GUIA_DE_IMAGENS.md` como fonte oficial para dimensoes e proporcoes.
- Preferir:
  - `PNG` para logo e icones com transparencia
  - `JPG` ou `WebP` para fotos
- Manter peso reduzido:
  - logo: ideal abaixo de `350 KB`
  - fotos/cards: ideal abaixo de `250 KB` por arquivo
  - social share cover: ideal abaixo de `350 KB`
- Nomear arquivos de forma clara:
  - `resultado-aluna-01.jpg`
  - `resultado-feedback-whatsapp-02.jpg`
  - `social-share-team-tupina.jpg`

## 7. Processo de troca de imagens

### 7.1 Logo

1. Substituir `assets/logo-team.png` se a marca horizontal mudar.
2. Conferir header, hero, footer e paginas legais.
3. Revisar o Open Graph, que hoje ainda usa a logo como fallback visual.

### 7.2 Favicon

1. Substituir `assets/favicon-teamtupina.png`.
2. Confirmar consistencia com:
  - `<link rel="icon">`
  - `<link rel="apple-touch-icon">`
  - `manifest.webmanifest`

### 7.3 Resultados

1. Preparar as imagens seguindo o `GUIA_DE_IMAGENS.md`.
2. Substituir os placeholders da secao `#resultados`.
3. Se optar por imagens reais:
   - usar `object-fit: cover`
   - manter corte seguro
   - preservar leitura do bloco de texto abaixo

### 7.4 Mural do Instagram

1. Abrir `instagram-posts.json`.
2. Inserir somente permalinks publicos de posts, reels ou videos do Instagram:
   - `https://www.instagram.com/p/CODIGO/`
   - `https://www.instagram.com/reel/CODIGO/`
   - `https://www.instagram.com/tv/CODIGO/`
3. Manter o formato:

```json
{
  "posts": [
    "https://www.instagram.com/reel/CODIGO_DO_REEL/"
  ]
}
```

O site remove duplicidades, valida os links aceitos e usa o embed oficial do Instagram. A listagem automatica do perfil nao deve ser feita por scraping, porque o Instagram bloqueia esse acesso sem sessao/API e pode quebrar a pagina em producao.

## 8. Rotina de responsividade

### Desktop e notebook

Validar pelo menos em:

- `1920x1080`
- `1600x900`
- `1440x900`
- `1366x768`

### Tablet

Validar pelo menos em:

- `1024x1366`
- `834x1194`
- `768x1024`

### Mobile

Validar pelo menos em:

- `430x932`
- `390x844`
- `375x812`
- `360x800`

## 9. Rotina de QA manual

### QA 1. Estrutura

- Home abre sem erro
- Politica abre sem erro
- Termos abrem sem erro
- Header funciona
- CTA de WhatsApp funciona

### QA 2. Visual

- Hero nao corta
- Cards nao estouram
- FAQ nao quebra
- Footer nao fica espremido
- CTA mobile nao cobre texto importante

### QA 3. Conteudo

- Textos sem repeticao desnecessaria
- Titulos coerentes entre si
- Dados legais com data correta
- Numero de WhatsApp revisado

## 10. Checklist de publicacao

1. Revisar copy.
2. Revisar metadados.
3. Revisar links.
4. Revisar imagens.
5. Rodar `node --check script.js`.
6. Testar preview local.
7. Confirmar home, legal e mobile CTA.

## 11. Alteracoes que merecem cuidado extra

- troca do numero de WhatsApp
- troca de dominio oficial
- troca de logo
- insercao de imagens reais na secao de resultados
- alteracao de `title`, `meta description`, `og:*` e `twitter:*`
- mudancas no `script.js` que afetem menu, scroll ou motion

## 12. Recomendacao operacional

Quando receber novos assets:

1. conferir o campo no `GUIA_DE_IMAGENS.md`
2. exportar no tamanho recomendado
3. otimizar o peso
4. substituir no projeto
5. revisar desktop, tablet e mobile
