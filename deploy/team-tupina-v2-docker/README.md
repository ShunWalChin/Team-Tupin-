# Team Tupina v2 Docker deploy

Implantacao isolada para testes e homologacao do ecossistema Team Tupina.

## Isolamento

- Compose project: `team-tupina-v2`
- Containers: prefixo `team-tupina-v2-*`
- Volumes: prefixo `team_tupina_v2_*`
- Redes: `team_tupina_v2_public` e `team_tupina_v2_internal`
- Portas locais no servidor: `127.0.0.1:48080` para o site e `127.0.0.1:48002` para o wger
- Dominios de producao: `teamtupina.com.br`, `www.teamtupina.com.br` e `app.teamtupina.com.br`
- O wger publica pela borda `team-tupina-v2-wger-public`, que serve `/static/` e `/media/` via Nginx e repassa o restante para o Gunicorn.
- Nao altera o Nginx do host, nao usa portas 80/443 e nao reutiliza volumes existentes.

## Estrutura esperada no servidor

```text
/home/opc/team-tupina-v2/
  docker-compose.yml
  .env
  site-nginx.conf
  wger-nginx.conf
  site/
  wger/
  mobile/
  scripts/
```

## Comandos

```bash
cd /home/opc/team-tupina-v2
docker compose --env-file .env up -d --build
docker compose ps
docker compose logs -f wger-web
```

## URLs de teste

- Site local no servidor: `http://127.0.0.1:48080`
- wger local no servidor: `http://127.0.0.1:48002`

Depois do Nginx do host e Cloudflare:

- Site: `https://teamtupina.com.br`
- Site www: `https://www.teamtupina.com.br`
- Plataforma wger: `https://app.teamtupina.com.br`

Se a rede da Oracle bloquear portas altas, valide pelo proprio servidor:

```bash
curl -I http://127.0.0.1:48080
curl -I http://127.0.0.1:48002
```

Ou abra um tunel SSH local, sem alterar o Nginx existente. Use o caminho da
chave e host reais apenas no ambiente local, nunca no repositorio:

```powershell
ssh -i "CAMINHO_DA_CHAVE_SSH" `
  -N `
  -L 127.0.0.1:48080:127.0.0.1:48080 `
  -L 127.0.0.1:48002:127.0.0.1:48002 `
  USUARIO@HOST_DO_SERVIDOR
```

Com o tunel ativo:

- Site: `http://127.0.0.1:48080`
- wger: `http://127.0.0.1:48002`
