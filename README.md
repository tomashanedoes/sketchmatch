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

## Installeren via Portainer

Omdat deze GitHub-repo **privé** is, kan Portainer de GHCR-image niet zomaar pullen.
Gebruik daarom de standaard compose die **lokaal bouwt** vanaf Git.

1. Open Portainer → **Stacks** → `tekenmoment`.
2. Repository-instellingen:
   - **Repository URL:** `https://github.com/tomashanedoes/sketchmatch`
   - **Reference:** `refs/heads/main`
   - **Compose path:** `docker-compose.yml`
3. Zet **Re-pull image** uit.
4. Zet **Re-build image** aan.
5. Deploy.

Na een geslaagde update zie je bovenaan het startscherm een groene badge:
`Versie 9 · illustraties`

Als je die badge niet ziet: in Chrome → site-instellingen voor de URL → **Gegevens wissen**,
of open een privévenster. Een oude service worker kan anders de vorige app blijven tonen.

### Optioneel: GHCR-image

Alleen als het package public is, of Portainer is ingelogd op `ghcr.io`:

- Compose path: `docker-compose.ghcr.yml`
- **Re-pull image** aan

## HTTPS

Zet een reverse proxy naar `http://127.0.0.1:8080`, bijvoorbeeld `https://sketchmatch.tail2e09c9.ts.net/`.
