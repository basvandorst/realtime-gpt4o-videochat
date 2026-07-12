// ---- OPEND — gedeelde data en helpers voor alle pagina's ----

const FOTO = {
  koffie:    { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80", alt: "Koffie met latte art" },
  cafe:      { src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80",   alt: "Licht café-interieur" },
  wijn:      { src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80", alt: "Glazen natuurwijn" },
  croissant: { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80",   alt: "Verse croissants" },
  ramen:     { src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1200&q=80", alt: "Ramen met ei en lente-ui" },
  cocktails: { src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200&q=80", alt: "Cocktails bij golden hour" },
  galerie:   { src: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80", alt: "Lichtinstallatie tijdens een avondexpositie" },
  boeken:    { src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80", alt: "Boekenkasten tot aan het plafond" },
  winkel:    { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", alt: "Minimalistische conceptstore" },
  tafel:     { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80", alt: "Samen aan tafel in de stad" },
  straat:    { src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80", alt: "Europese straat met karakter" },
  gracht:    { src: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=80", alt: "Grachtenpanden en water in de binnenstad" },
};

const STEDEN = {
  breda: {
    naam: "Breda", code: "BRDA", land: "Nederland",
    hero: FOTO.straat,
    intro: "Van natuurwijn achter een naamloze groene deur tot een dakterras boven de Grote Kerk: elke opening op datum — zodat je er eerder bent dan de rest.",
    buurten: [
      { naam: "Belcrum", sub: "Loodsen, brouwerijen, studio's", foto: FOTO.straat },
      { naam: "Haagdijk", sub: "De straat die iedereen straks kent", foto: FOTO.cafe },
      { naam: "Centrum", sub: "De klassiekers, opnieuw uitgevonden", foto: FOTO.gracht },
      { naam: "Ginneken", sub: "Dorps, groen en verrassend goed", foto: FOTO.koffie },
    ],
    spots: [
      { naam: "Ronde Bonen", ll: [51.576, 4.779], tagline: "twaalf stoelen, één branderij, nul compromissen", cat: "Koffie", buurt: "Ginnekenweg", meta: "€ · vanaf 08:00", datum: "2026-07-10", foto: FOTO.koffie,
        adres: "Ginnekenweg 142",
        verhaal: "Twaalf stoelen, meer niet — en dat is precies de bedoeling. Bij Ronde Bonen draait alles om de wekelijkse single-origin, die eigenaar en brander Jesse elke maandag zelf op de trommel legt. De kardemombroodjes komen uit de oven van de buren en zijn rond tienen op.\n\nGeen wifi-werkers, geen haast: je komt hier voor de koffie en het gesprek aan de leestafel. Wie doorvraagt krijgt de proefbrandjes die nooit op de kaart komen." },
      { naam: "Bar Barrière", ll: [51.5885, 4.769], tagline: "vijftig natuurwijnen achter een groene deur", cat: "Wijn", buurt: "Haagdijk", meta: "€€ · vanaf 17:00", datum: "2026-07-03", foto: FOTO.wijn,
        adres: "Haagdijk 8a",
        verhaal: "Geen uithangbord, alleen een groene deur en een belletje. Binnen: kaarslicht, een muur vol lage-interventiewijnen en een kaart die elke week verandert. De helft van de vijftig flessen komt van kleine domeinen die je nergens anders in Brabant schenkt.\n\nDe sharing plates zijn klein maar raak — denk gegrilde paprika met 'nduja en brood van Boterham & Zo. Reserveren kan niet; wie er is, is er." },
      { naam: "Noedelbar Noord", ll: [51.6005, 4.771], tagline: "handgetrokken noedels in een oude loods", cat: "Eten", buurt: "Belcrum", meta: "€€ · alleen diner", datum: "2026-06-26", foto: FOTO.ramen,
        adres: "Speelhuislaan 173",
        verhaal: "In een voormalige spoorloods trekt chef Mei elke avond haar noedels met de hand — je ziet het gebeuren vanaf de counter, de enige plek waar je kunt zitten. De bouillon trekt achttien uur, de chili-olie bijt terug.\n\nEr draait vinyl, de kaart past op één kaartje en om tien uur is het op. Kom vroeg of kom morgen." },
      { naam: "Boterham & Zo", ll: [51.5875, 4.7785], tagline: "de croissant die om 11:30 uitverkocht is", cat: "Bakkerij", buurt: "Centrum", meta: "€ · 08:00–16:00", datum: "2026-06-18", foto: FOTO.croissant,
        adres: "Veemarktstraat 21",
        verhaal: "Zuurdesem, seizoensgroenten op geroosterd brood en één hazelnootcroissant die inmiddels een eigen wachtrij heeft. De bakkers beginnen om vier uur 's nachts; om half twaalf is de toonbank leeg — en dat is geen marketing.\n\nBinnen is het licht en ongehaast, met een lange tafel voor wie blijft plakken. De koffie komt van Ronde Bonen, drie straten verderop." },
      { naam: "Studio Stof", ll: [51.567, 4.783], tagline: "Dutch design, droogbloemen en keramiek", cat: "Winkels", buurt: "Ginneken", meta: "di t/m za", datum: "2026-05-29", foto: FOTO.winkel,
        adres: "Ginnekenmarkt 3",
        verhaal: "Een conceptstore zoals het Ginneken er nog geen had: klein-serie keramiek, Dutch design en droogbloemen die per steel verkocht worden. Achterin schenkt de espressohoek doordeweeks gratis bakjes voor twijfelende kopers.\n\nOp zaterdag zijn er workshops — draaien, schikken, glazuren — die steevast binnen een dag vol zitten." },
      { naam: "Café Vroeg", ll: [51.5888, 4.7757], tagline: "licht, ruim en de hele dag ontbijt", cat: "Koffie", buurt: "Centrum", meta: "€ · 08:00–17:00", datum: "2026-05-15", foto: FOTO.cafe,
        adres: "Grote Markt 44",
        verhaal: "De naam is het concept: bij Vroeg is het altijd ochtend. Shakshuka om vier uur 's middags, verse jus het hele jaar, en een espressobar die net zo serieus is als het zuurdesembrood.\n\nHet pand — hoge plafonds, veel glas — was jarenlang een bankfiliaal. Nu zit er op de plek van de kluis een leeshoek." },
      { naam: "Dakterras DK9", ll: [51.5886, 4.7768], tagline: "aperitivo met de Grote Kerk op ooghoogte", cat: "Drinken", buurt: "Centrum", meta: "€€€ · reserveren aangeraden", datum: "2026-07-18", foto: FOTO.cocktails,
        adres: "Kerkplein 9, 6e verdieping",
        verhaal: "Zes hoog, met de Grote Kerk letterlijk op ooghoogte: DK9 wordt hét terras van de zomer. De kaart is Italiaans aangelegd — spritz, vermout, kleine borden — en de zon blijft tot het laatste moment hangen.\n\nEr zijn maar veertig stoelen en de golden hour is elke avond uitverkocht. Reserveren dus, of vroeg komen en blijven." },
      { naam: "Loods Lumen", ll: [51.596, 4.766], tagline: "lichtkunst en open studio's aan het water", cat: "Cultuur", buurt: "Havenkwartier", meta: "gratis · do t/m zo", datum: "2026-07-25", foto: FOTO.galerie,
        adres: "Havenkade 12",
        verhaal: "Een rauwe havenloods wordt de nieuwe vrijplaats voor licht- en digitale kunst. De openingsexpositie brengt zes jonge makers samen rond één thema: schemering.\n\nElke eerste vrijdag van de maand gaan de studio's open en draait er een dj tussen de installaties. Entree blijft gratis — de bar betaalt de huur." },
      { naam: "De Leeszaal", ll: [51.5995, 4.7745], tagline: "boekhandel, leescafé en klein podium ineen", cat: "Cultuur", buurt: "Belcrum", meta: "gratis · dagelijks", datum: "2026-08-02", foto: FOTO.boeken,
        adres: "Pastoor Pottersplein 5",
        verhaal: "Een boekhandel waar je mag blijven zitten, een café waar niemand je wegkijkt bij hoofdstuk drie, en een podium ter grootte van een deurmat voor poëzie en auteursavonden.\n\nDe collectie is eigenwijs: veel vertaalde fictie, kleine uitgeverijen, en een antiquarische kast die wekelijks wisselt." },
      { naam: "Lange Tafels", ll: [51.5975, 4.769], tagline: "één avond, één straat, samen eten in Belcrum", cat: "Eten", buurt: "Belcrum", meta: "€€ · eenmalig zomerdiner", datum: "2026-08-15", foto: FOTO.tafel,
        adres: "Belcrumweg, ter hoogte van 23",
        verhaal: "Eén avond in augustus wordt de Belcrumweg afgesloten voor één lange tafel van tweehonderd meter. Drie buurtchefs koken, de wijn komt van Bar Barrière en het dessert van Boterham & Zo.\n\nKaarten gaan half juli in de verkoop en zijn — als vorige edities elders een indicatie zijn — binnen een uur weg." },
    ],
  },
  amsterdam: {
    naam: "Amsterdam", code: "AMS", land: "Nederland",
    hero: FOTO.gracht,
    intro: "Van een branderij in een Noordse loods tot natuurwijn in de Jordaan: elke opening op datum, van De Pijp tot ver voorbij het IJ.",
    buurten: [
      { naam: "De Pijp", sub: "Markt, terras en nieuwe keukens", foto: FOTO.cafe },
      { naam: "Noord", sub: "Loodsen en broedplaatsen aan het IJ", foto: FOTO.straat },
      { naam: "Jordaan", sub: "Klein, karakter, kwaliteit", foto: FOTO.gracht },
      { naam: "Oost", sub: "Waar de stad nu naartoe beweegt", foto: FOTO.koffie },
    ],
    spots: [
      { naam: "Bak & Boon", ll: [52.3557, 4.8927], tagline: "specialty coffee tussen de marktkramen", cat: "Koffie", buurt: "De Pijp", meta: "€ · vanaf 08:00", datum: "2026-07-08", foto: FOTO.koffie, adres: "Albert Cuypstraat 87" },
      { naam: "Wijnlokaal West", ll: [52.3796, 4.8843], tagline: "natuurwijn en kaarslicht in de Jordaan", cat: "Wijn", buurt: "Jordaan", meta: "€€ · vanaf 16:00", datum: "2026-07-01", foto: FOTO.wijn, adres: "Westerstraat 112" },
      { naam: "Broedplaats Noord", ll: [52.401, 4.894], tagline: "ramen en vinyl in een oude scheepsloods", cat: "Eten", buurt: "Noord", meta: "€€ · alleen diner", datum: "2026-06-20", foto: FOTO.ramen, adres: "NDSM-plein 6" },
      { naam: "Zuurdesem & Zonen", ll: [52.365, 4.935], tagline: "de bakkerij waar Oost voor omfietst", cat: "Bakkerij", buurt: "Oost", meta: "€ · 08:00–16:00", datum: "2026-06-10", foto: FOTO.croissant, adres: "Javastraat 41" },
      { naam: "Kade Twaalf", ll: [52.393, 4.905], tagline: "rooftop-aperitivo met uitzicht over het IJ", cat: "Drinken", buurt: "Noord", meta: "€€€ · reserveren aangeraden", datum: "2026-07-21", foto: FOTO.cocktails, adres: "IJkade 12" },
      { naam: "Galerie Gracht", ll: [52.372, 4.885], tagline: "jonge makers in een oud grachtenpand", cat: "Cultuur", buurt: "Centrum", meta: "gratis · wo t/m zo", datum: "2026-08-05", foto: FOTO.galerie, adres: "Keizersgracht 209" },
    ],
  },
  antwerpen: {
    naam: "Antwerpen", code: "ANTW", land: "België",
    hero: FOTO.cafe,
    intro: "Van het Zuid tot het Eilandje: de nieuwe adressen van de stad aan de Schelde, netjes op openingsdatum.",
    buurten: [
      { naam: "Zuid", sub: "Galeries, terrassen en klasse", foto: FOTO.galerie },
      { naam: "Eilandje", sub: "Havens, lofts en lange avonden", foto: FOTO.straat },
      { naam: "Borgerhout", sub: "Rauw, jong en verrassend lekker", foto: FOTO.ramen },
      { naam: "Zurenborg", sub: "Art nouveau en aperitief", foto: FOTO.wijn },
    ],
    spots: [
      { naam: "Koffie Kompas", ll: [51.213, 4.393], tagline: "slow bar met branderij op het Zuid", cat: "Koffie", buurt: "Zuid", meta: "€ · vanaf 08:00", datum: "2026-07-05", foto: FOTO.koffie, adres: "Vlaamsekaai 18" },
      { naam: "Vin Vin", ll: [51.205, 4.432], tagline: "natuurwijn onder de art-nouveaugevels", cat: "Wijn", buurt: "Zurenborg", meta: "€€ · vanaf 17:00", datum: "2026-06-24", foto: FOTO.wijn, adres: "Cogels-Osylei 55" },
      { naam: "Atelier Acht", ll: [51.229, 4.407], tagline: "Belgisch design en keramiek aan de kade", cat: "Winkels", buurt: "Eilandje", meta: "di t/m za", datum: "2026-06-12", foto: FOTO.winkel, adres: "Napoleonkaai 8" },
      { naam: "Tafel van Tien", ll: [51.212, 4.444], tagline: "één lange tafel, één menu, elke avond vol", cat: "Eten", buurt: "Borgerhout", meta: "€€ · alleen diner", datum: "2026-05-20", foto: FOTO.tafel, adres: "Turnhoutsebaan 90" },
      { naam: "MAS Boven", ll: [51.229, 4.4045], tagline: "aperitivo met de haven aan je voeten", cat: "Drinken", buurt: "Eilandje", meta: "€€€ · reserveren aangeraden", datum: "2026-07-30", foto: FOTO.cocktails, adres: "Hanzestedenplaats 1" },
      { naam: "Lichthal", ll: [51.23, 4.409], tagline: "lichtkunst in een voormalig pakhuis", cat: "Cultuur", buurt: "Eilandje", meta: "gratis · do t/m zo", datum: "2026-08-09", foto: FOTO.galerie, adres: "Sint-Aldegondiskaai 30" },
    ],
  },
  berlijn: {
    naam: "Berlijn", code: "BER", land: "Duitsland",
    hero: FOTO.straat,
    intro: "Von Kreuzberg bis Prenzlauer Berg: de nieuwe adressen van de stad die nooit af is — op datum, voordat ze vol zitten.",
    buurten: [
      { naam: "Kreuzberg", sub: "Kanaal, kebab en derde golf koffie", foto: FOTO.koffie },
      { naam: "Neukölln", sub: "Rauw, eigenzinnig, altijd open", foto: FOTO.ramen },
      { naam: "Mitte", sub: "Galeries en daken met uitzicht", foto: FOTO.galerie },
      { naam: "Prenzlauer Berg", sub: "Boekhandels en zondagse markten", foto: FOTO.boeken },
    ],
    spots: [
      { naam: "Kaffee Kollektiv", ll: [52.493, 13.43], tagline: "branderij en bakkerij aan het kanaal", cat: "Koffie", buurt: "Kreuzberg", meta: "€ · vanaf 08:00", datum: "2026-07-06", foto: FOTO.koffie, adres: "Paul-Lincke-Ufer 22" },
      { naam: "Ramen Rixdorf", ll: [52.474, 13.445], tagline: "handgetrokken noedels in een hinterhof", cat: "Eten", buurt: "Neukölln", meta: "€€ · alleen diner", datum: "2026-06-28", foto: FOTO.ramen, adres: "Richardstraße 34" },
      { naam: "Buchbar", ll: [52.54, 13.41], tagline: "boekhandel met wijnbar tot middernacht", cat: "Cultuur", buurt: "Prenzlauer Berg", meta: "gratis · dagelijks", datum: "2026-06-05", foto: FOTO.boeken, adres: "Kastanienallee 77" },
      { naam: "Dach Drei", ll: [52.528, 13.401], tagline: "rooftop boven de daken van Mitte", cat: "Drinken", buurt: "Mitte", meta: "€€€ · reserveren aangeraden", datum: "2026-07-22", foto: FOTO.cocktails, adres: "Torstraße 3" },
      { naam: "Galerie Grau", ll: [52.527, 13.397], tagline: "jonge kunst in een betonnen hal", cat: "Cultuur", buurt: "Mitte", meta: "gratis · wo t/m zo", datum: "2026-08-12", foto: FOTO.galerie, adres: "Linienstraße 158" },
    ],
  },
};

const WERELD = [
  { land: "Nederland", steden: [{ key: "breda" }, { key: "amsterdam" }, { naam: "Rotterdam" }, { naam: "Utrecht" }, { naam: "Eindhoven" }, { naam: "Tilburg" }] },
  { land: "België", steden: [{ key: "antwerpen" }, { naam: "Gent" }, { naam: "Brussel" }] },
  { land: "Duitsland", steden: [{ key: "berlijn" }, { naam: "Hamburg" }, { naam: "Keulen" }] },
  { land: "Frankrijk", steden: [{ naam: "Parijs" }, { naam: "Lyon" }] },
  { land: "Spanje", steden: [{ naam: "Barcelona" }, { naam: "Madrid" }] },
  { land: "Verenigd Koninkrijk", steden: [{ naam: "Londen" }] },
  { land: "Italië", steden: [{ naam: "Milaan" }] },
  { land: "Verenigde Staten", steden: [{ naam: "New York" }] },
  { land: "Japan", steden: [{ naam: "Tokio" }] },
];

// ---- helpers ----
const MAANDEN = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
const vandaag = new Date(); vandaag.setHours(0, 0, 0, 0);
const dvan = s => new Date(s + "T00:00:00");
const fmt = s => { const d = dvan(s); return d.getDate() + " " + MAANDEN[d.getMonth()]; };
const relatief = s => {
  const dagen = Math.round((dvan(s) - vandaag) / 864e5);
  if (dagen === 0) return "vandaag";
  if (dagen === 1) return "morgen";
  return "over " + dagen + " dagen";
};
const esc = t => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const foto = (f, extra) => `<img src="${f.src}" alt="${esc(f.alt)}" loading="lazy">${extra || ""}`;
const slug = naam => naam.toLowerCase().replace(/&/g, "en").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const qs = naam => new URLSearchParams(location.search).get(naam);

const komendVan  = stad => stad.spots.filter(s => dvan(s.datum) >  vandaag).sort((a, b) => a.datum.localeCompare(b.datum));
const geopendVan = stad => stad.spots.filter(s => dvan(s.datum) <= vandaag).sort((a, b) => b.datum.localeCompare(a.datum));
const alleSpots = () => Object.entries(STEDEN).flatMap(([key, stad]) => stad.spots.map(s => ({ ...s, stadKey: key, stad })));
const spotLink = (key, s) => `spot.html?stad=${key}&spot=${slug(s.naam)}`;

function setWordmark(code) {
  document.documentElement.style.setProperty("--wm", JSON.stringify(code));
}

function activeer() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  document.querySelectorAll(".photo img").forEach(img => {
    const fail = () => { img.closest(".photo").classList.add("noimg"); img.remove(); };
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener("error", fail);
  });
}

// Nieuwsbrief (alleen front-end)
function subscribe(e) {
  e.preventDefault();
  const note = document.getElementById("signup-note");
  if (note) note.textContent = "Je staat op de lijst — de eerste editie valt donderdag binnen.";
  e.target.reset();
  return false;
}
