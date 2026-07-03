# System Documentation

## 1. Objetivo do sistema

O site `Team Tupina` e uma landing page estatica com foco em captacao e qualificacao de leads para uma consultoria online de emagrecimento, hipertrofia e reconstrucao corporal. O objetivo principal da experiencia e levar o visitante do entendimento da proposta ate o contato no `WhatsApp` com o menor atrito possivel.

## 2. Stack tecnica

- Estrutura: `HTML` multipage
- Estilo: `CSS` autoral, sem framework
- Interacao: `Vanilla JavaScript`
- Animacao: `Anime.js` local em `assets/vendor/anime.umd.min.js`
- Runtime: navegador, sem backend
- Deploy: hosting estatico

## 3. Arquivos e responsabilidades

### `index.html`

- pagina principal de conversao
- contem a narrativa de copy, CTA principal, FAQ e structured data

### `privacy.html`

- politica de privacidade
- apoio juridico e operacional ao tratamento de dados

### `terms.html`

- termos de uso
- apoio juridico sobre uso do site e limites do conteudo

### `styles.css`

- tokens de cor, espacamento, sombras e raio
- glassmorphism
- layout desktop, tablet e mobile
- estados de acessibilidade
- mobile CTA

### `script.js`

- menu mobile
- estado do header no scroll
- barra de progresso do documento
- destaque da secao atual na navegacao
- reveals com Anime.js
- loops decorativos
- bloqueio de hover animation em dispositivos sem hover

### `manifest.webmanifest`

- metadados para experiencia instalavel e identidade mobile

### `robots.txt`

- regra basica de rastreamento

### `MANUAL_DE_MANUTENCAO.md`

- rotina operacional de manutencao, QA, copy, SEO e publicacao

### `GUIA_DE_IMAGENS.md`

- mapa dos campos visuais e dimensoes recomendadas para novos assets

## 4. Arquitetura de experiencia

### 4.1 Jornada principal

1. Hero explica a promessa e oferece CTA imediato
2. Secao de dor valida frustracoes comuns
3. Secao de metodo explica a estrutura multidisciplinar
4. Secao de jornada mostra como o processo acontece
5. Secao de resultados traduz ganhos praticos
6. Bloco compacto reforca diferenciais
7. FAQ reduz duvidas antes do contato
8. CTA final fecha a navegacao

### 4.2 Jornada legal

1. Usuario acessa politica ou termos
2. Le o contexto juridico/operacional
3. Volta para a landing page

## 5. Diretrizes de UI/UX aplicadas

### 5.1 Padrao desktop

- referencia principal: `1920x1080`, navegador em `100%`
- escala global reduzida para evitar cards grandes demais
- distribuicao das dobras mais compacta e continua
- leitura em ritmo de scroll progressivo, sem blocos excessivamente altos

### 5.2 Hierarquia de copy

- promessa clara acima da dobra
- texto mais escaneavel
- H2 mais diretos e semanticamente fortes
- copy orientada a:
  - emagrecimento
  - hipertrofia
  - reconstrucao corporal
  - consultoria online
  - constancia

### 5.3 Navegacao fluida

- header sticky
- indicador visual da secao atual
- barra de progresso do scroll
- CTA fixo no mobile

## 6. SEO tecnico implementado

### Home

- `title` reescrito
- `meta description` reescrita
- `robots` com `index,follow`
- `Open Graph` e `Twitter card`
- `FAQPage` em JSON-LD
- copy alinhada a termos de busca mais coerentes com o servico

### Paginas legais

- `meta description` revisada
- `robots` com `noindex,follow`
- data de ultima atualizacao

### Observacao importante

As `Open Graph URLs` continuam relativas porque o dominio canonico final nao foi informado dentro do projeto. Quando o dominio de producao estiver confirmado, vale adicionar:

- `canonical`
- `og:url`
- `sitemap.xml` com URLs absolutas

## 7. Motion system

### Principios

- animacao deve direcionar atencao, nao competir com a copy
- loops sutis em elementos de destaque
- reveals em grupos para reduzir ruina visual
- fallback integral para `prefers-reduced-motion`

### Camadas atuais

- intro do header
- intro da hero por linhas e blocos
- cards por secao
- progress bars
- ambient motion
- hover motion apenas em dispositivos com hover real

## 8. Rotina tripla de debug

### Debug 1. Estrutural

- conferir HTML principal e paginas legais
- validar existencia de assets locais
- revisar links internos e externos
- revisar integridade dos scripts carregados

### Debug 2. Runtime

- validar resposta `200` de:
  - `index.html`
  - `privacy.html`
  - `terms.html`
  - `styles.css`
  - `script.js`
  - `manifest.webmanifest`
  - `robots.txt`
- validar `node --check` no `script.js`

### Debug 3. Conteudo e SEO

- revisar apenas um `h1` por pagina
- revisar fluxo semantico dos `h2`
- revisar metadados
- revisar navegacao, CTA e coerencia da copy

## 9. Rotina tripla de responsividade

### Responsividade 1. Desktop full HD

- reduzir escala de cards, tipografia e espacos
- garantir melhor distribuicao por dobra
- priorizar leitura horizontal equilibrada

### Responsividade 2. Tablet e notebook

- quebrar grids em etapas previsiveis
- reduzir altura minima de paineis
- impedir compressao excessiva do conteudo lateral
- antecipar a troca do header para menu mobile em larguras intermediarias para evitar estrangulamento visual
- tratar paginas legais com navegacao estatica em larguras medias para nao herdar dropdown desnecessario

### Responsividade 3. Mobile

- CTA principal fixo no rodape
- empilhamento de grids
- reducao de paddings
- botoes full width
- cards e FAQ em coluna unica
- ajuste de scroll target, cards e timeline em breakpoints menores (`720px`, `640px`, `520px`)

## 10. Checklist de manutencao

Antes de publicar novas revisoes:

1. confirmar telefone e mensagem do WhatsApp
2. revisar data das paginas legais
3. testar home em `1920x1080`, `1366x768`, `1024px`, `768px`, `390px`
4. garantir que qualquer nova prova social tenha autorizacao de uso
5. atualizar metadados se a proposta comercial mudar

## 11. Evolucoes recomendadas

1. adicionar dominio canonico oficial
2. publicar `sitemap.xml`
3. substituir visuais abstratos por provas reais autorizadas
4. incluir captura de lead propria se a estrategia deixar de depender so do WhatsApp
5. considerar versao leve de analytics e eventos de CTA
