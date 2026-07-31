# Tekenmoment

Een rustige, niet-competitieve PWA met tekenimpulsen voor op papier. De ervaring is vormgegeven met de vrijeschoolgedachte in gedachten: aandacht voor eigen tempo, verbeelding en het maakproces, zonder scores, timers of vergelijkingen.

## Gebruik

1. Kies een verzameling voor kinderen of volwassenen.
2. Pak papier en potlood.
3. Volg de tekenimpuls in je eigen tempo.
4. Kies een volgende impuls wanneer je klaar bent.

Via Instellingen kunnen spelers een voorleesknop inschakelen, beweging verminderen en onderwerpen per verzameling kiezen.

De app bewaart alleen de laatstgekozen verzameling en deze voorkeuren in de browser. Er zijn geen accounts, scores of online gegevens.

## Ontwikkelen

```bash
npm install
npm run dev
```

Maak een productieversie met:

```bash
npm run build
```

De app bevat een webmanifest en service worker. Installeer haar via de browser nadat de app eenmaal online is geopend; de kernbestanden worden vervolgens lokaal gecachet.

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
6. Klik **Deploy the stack**.

De app is daarna bereikbaar op:

- `http://<nas-ip>:8080`
- of via Tailscale, bijvoorbeeld `http://ds920.tail2e09c9.ts.net:8080`

### Poort wijzigen in Portainer

Bewerk de stack en pas de poortmapping aan, bijvoorbeeld `"9080:8080"`, en deploy opnieuw.

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
