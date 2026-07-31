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

## Docker op NAS of VPS

De app draait als lichte nginx-container. Geschikt voor Synology, QNAP, TrueNAS, Unraid en andere Docker-hosts.

### Lokaal of op de NAS bouwen

```bash
docker compose up -d --build
```

De app is daarna bereikbaar op `http://<nas-ip>:8080`.

### Poort wijzigen

Pas in `docker-compose.yml` de poortmapping aan, bijvoorbeeld `"9080:8080"`.

### HTTPS voor telefoon/PWA

Voor installeren op het beginscherm en offlinegebruik heb je HTTPS nodig. Zet een reverse proxy voor de container:

- Synology: Application Portal / Reverse Proxy
- nginx Proxy Manager of Traefik op je NAS/VPS
- Caddy of nginx op een VPS

Wijs bijvoorbeeld `https://teken.jouwdomein.nl` naar `http://127.0.0.1:8080`.

Open daarna de HTTPS-URL op je telefoon en kies in de browser **Zet op beginscherm** of **Installeren**.

### Alleen image bouwen

```bash
docker build -t tekenmoment:latest .
docker run --rm -p 8080:8080 tekenmoment:latest
```
