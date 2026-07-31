# Tekenmoment

Een rustige, niet-competitieve PWA met tekenimpulsen voor op papier. De ervaring is vormgegeven met de vrijeschoolgedachte in gedachten: aandacht voor eigen tempo, verbeelding en het maakproces, zonder scores of vergelijkingen.

## Gebruik

1. Kies een verzameling voor kinderen of volwassenen.
2. Pak papier en een potlood.
3. Volg de tekenimpuls in je eigen tempo.
4. Kies een volgende impuls wanneer je klaar bent.

Voor volwassenen is een optionele soft-timer beschikbaar (vrij spelen, 10 of 20 minuten). Die timer is een zachte herinnering, geen race. Aan het eind zie je alleen een terugblik: afgeronde en overgeslagen impulsen, geen score.

Via Instellingen kun je voorlezen, zachte geluiden, rustige beweging, standaard soft-timer en onderwerpen per verzameling instellen. De laatst gekozen verzameling en een favoriete impuls blijven lokaal bewaard.

## Ontwikkelen

```bash
npm install
npm run dev
```

Tests en productieversie:

```bash
npm test
npm run build
```

De TypeScript React-app gebruikt schermen voor welkom, moduskeuze, volwassenen-setup, tekenronde, terugblik en instellingen. Manifest en service worker maken de app offline en installeerbaar.

## Installeren via Portainer

1. Open Portainer op je NAS.
2. Ga naar **Stacks** → **Add stack**.
3. Kies **Repository**.
4. Vul in:
   - **Name:** `tekenmoment`
   - **Repository URL:** `https://github.com/tomashanedoes/sketchmatch`
   - **Reference:** `refs/heads/cursor/vrijeschool-tekenapp-bd49`
   - **Compose path:** `docker-compose.yml`
5. Zet **Build method** / image build aan als Portainer dat vraagt (de stack bouwt vanuit de `Dockerfile`).
6. Laat **Re-pull image** / **Pull latest image** uitstaan. Er bestaat geen image op Docker Hub; de app wordt lokaal gebouwd.
7. Klik **Deploy the stack**.

### Stack bijwerken na een code-update

1. Open de stack `tekenmoment` in Portainer.
2. Kies **Pull and redeploy** alleen als je Git opnieuw wilt ophalen.
3. Zet **Re-pull image** uit.
4. Zet **Re-build image** / build aan als die optie er is.
5. Deploy opnieuw.

Als Portainer blijft proberen `tekenmoment` van Docker Hub te pullen: bewerk de stack, haal Git opnieuw op, en deploy met rebuild in plaats van image-pull.

De app is daarna bereikbaar op:

- `http://<nas-ip>:8080`
- of via Tailscale, bijvoorbeeld `http://ds920.tail2e09c9.ts.net:8080`

Let op: zonder `:8080` open je DSM zelf, niet Tekenmoment.

### Niet bereikbaar? Controleer dit in Portainer

1. Stack/containerstatus is **running** (niet exited/unhealthy).
2. Bij de container staat published port **`8080:80`**.
3. Open precies: `http://ds920.tail2e09c9.ts.net:8080`
4. In DSM: Control Panel → Security → Firewall — poort **8080/TCP** toestaan.
5. Als 8080 al bezet is, wijzig de mapping naar bijvoorbeeld `"0.0.0.0:3080:80"` en open `:3080`.
6. Bekijk **Logs** van de container; nginx moet zonder crash blijven draaien.

### Na een update zie je nog oude opdrachten?

1. Controleer in Portainer dat de stack opnieuw is **gebouwd** (niet alleen gepulld).
2. Open de app opnieuw en ververs hard:
   - iPhone Safari: tabblad sluiten, opnieuw openen
   - Android Chrome: sitegegevens wissen voor de app-URL, of hard refresh
3. De service worker haalt daarna de nieuwe opdrachtenbibliotheek op.

### HTTPS voor telefoon/PWA

Voor installeren op het beginscherm en offlinegebruik heb je HTTPS nodig. Zet een reverse proxy voor de container:

- Synology: Control Panel → Login Portal → Advanced → Reverse Proxy
- of nginx Proxy Manager / Traefik

Wijs bijvoorbeeld `https://teken.ds920.tail2e09c9.ts.net` naar `http://127.0.0.1:8080`.

Open daarna de HTTPS-URL op je telefoon en kies in de browser **Zet op beginscherm** of **Installeren**.

## Docker zonder Portainer

```bash
docker compose up -d --build
```

Of alleen een image bouwen:

```bash
docker build -t tekenmoment:latest .
docker run --rm -p 8080:8080 tekenmoment:latest
```
