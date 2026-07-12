# OPEND — nieuwe hotspots, wereldwijd op datum

Editorial magazine-platform voor nieuwe hotspots. Begonnen als BRDA (Breda),
inmiddels met steden-, stads- en detailpagina's. Puur statisch: openen in de
browser is genoeg, er is geen build-stap.

## Pagina's

- `index.html` — platform-homepage (nieuwste openingen wereldwijd + stedenindex)
- `stad.html?stad=breda` — stadspagina met agenda ("Binnenkort open"),
  "Net geopend"-grid en een lijst/kaart-toggle
- `spot.html?stad=breda&spot=ronde-bonen` — detailpagina per spot: verhaal,
  galerij, social info, details-kaart, agenda-download (.ics) en kaartje

## Data

Alle content staat in `data.js` (`STEDEN`, `WERELD`, `FOTO`). Een spot
toevoegen = één object in de `spots`-array van een stad; de agenda,
grids, kaart en detailpagina volgen automatisch op basis van de
openingsdatum (`datum`) en coördinaten (`ll`).

## Google Maps

De stadskaart gebruikt Google Maps als er een API-key is geconfigureerd:

```sh
cp config.example.js config.js   # en vul googleMapsApiKey in
```

Zonder key (of als het laden mislukt) valt de kaart automatisch terug op de
ingebouwde editorial kaart. Het kaartje en de routeknop op de detailpagina
gebruiken de keyless Google Maps-embed en werken altijd.

Foto's worden gehotlinkt van Unsplash met een nette fallback-tegel als een
beeld niet laadt. Alle getoonde adressen en cijfers zijn illustratief.
