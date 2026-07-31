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

De container-image wordt automatisch gebouwd door GitHub Actions naar:

`ghcr.io/tomashanedoes/sketchmatch:latest`

### Eenmalig instellen

1. Open Portainer → **Stacks** → stack `tekenmoment` (of nieuw).
2. Kies **Repository**.
3. Vul in:
   - **Name:** `tekenmoment`
   - **Repository URL:** `https://github.com/tomashanedoes/sketchmatch`
   - **Reference:** `refs/heads/main` (of tijdelijk `refs/heads/cursor/vrijeschool-tekenapp-bd49`)
   - **Compose path:** `docker-compose.yml`
4. Zet **Re-pull image** / **Pull latest image** aan.
5. Deploy.

Na een geslaagde update zie je op het startscherm onderaan:
`versie 3 · 52 tekenimpulsen`

### Later bijwerken

1. Open de stack.
2. **Pull and redeploy** met **Re-pull image** aan.
3. Hard refresh de site, of wis sitegegevens voor `https://sketchmatch.tail2e09c9.ts.net/`.

Eerste keer GHCR: als de image privé is, log Portainer in op `ghcr.io` met een GitHub Personal Access Token (read:packages), of maak het package public onder GitHub → Packages.

### Lokaal bouwen op de NAS (optioneel)

```bash
docker compose -f docker-compose.build.yml up -d --build
```

De app is bereikbaar op:

- `http://<nas-ip>:8080`
- of via Tailscale / reverse proxy, bijvoorbeeld `https://sketchmatch.tail2e09c9.ts.net/`

### HTTPS voor telefoon/PWA

Voor installeren op het beginscherm en offlinegebruik heb je HTTPS nodig. Zet een reverse proxy voor de container naar `http://127.0.0.1:8080`.
