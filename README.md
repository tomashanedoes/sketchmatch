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