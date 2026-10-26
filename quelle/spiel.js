// ================================================================
//  ARTHURS GEISTERJAGD – Teil 10
//  Level 1:  Zimmer 1 – fünf kleine Geister
//            Zimmer 2 – der Geisterkönig
//  Level 2:  Zimmer 3 – drei Kronen-Geister (und Herzen!)
//            Zimmer 4 – der Riesengeist, der zu Geld wird
//  Level 3:  Zimmer 5 – die Kiste mit dem Kistenteufel
//            Zimmer 6 – der Kronen-Geist, der einen jagt
//            Zimmer 7 – der Stehauf-Geist mit zwei Balken
//  Level 4:  Zimmer 8 – Kistenteufel, schneller Geist und die Dynamitkanone
//            Zimmer 9 – der Blink-Geist mit drei Balken
//  Level 5:  Zimmer 10 – die lebendige Truhe, der Kistenteufel, ein Kronen-Geist und zwei Kanonen
//            Zimmer 11 – der Mega-Geist
//  Level 6:  Zimmer 12 – die große Truhe
//            Zimmer 13 – der Weg durch die Lava
//            Zimmer 14 – die Spinnenkanone und zwei Kronen-Geister
//            Zimmer 15 – der Geisterkaiser mit drei Balken
//  Level 7:  Zimmer 16 – der Truhen-Boss mit großem Balken
//            Zimmer 17 – der Lava-Geist
//            Zimmer 18 – der Blitz-Geist
//  Level 8:  Zimmer 19 – Truhe, zwei Blink-Kronen-Geister und die Dynamitkanone
//            Zimmer 20 – über die Lava springen
//            Zimmer 21 – die Bewegungsfalle und der Donner-Geist
//  Level 9:  Zimmer 22 – der Drache und der Pümpel
//  Level 10: Zimmer 23 – Drache, zwei Kanonen, Ventilator und Zeitlupen-Knopf
//  Level 11: Zimmer 24 – die böse Krake mit dem Piratenhut und die Tintenkanone
//  Level 12: Zimmer 25 – die große Kapitäns-Krake mit 300 Punkten und Kugelkanonen
//  Level 13: Zimmer 26 – die Krake, die sich (noch) nicht wehrt
//            Zimmer 27 – die kaputte Brücke über dem Wasser
//            Zimmer 28 – der Kürbis mit der Krake drin: dreimal draufspringen, Tentakel-Schild und Tentakel-Angriffe
//  Level 14: Zimmer 29 – der Kürbis zum Draufspringen
//            Zimmer 30 – das Skelett und das Figuren-Rätsel
//            Zimmer 31 – Kabumm auf dem Laufband (Bomben werfen!)
//  Level 15: Zimmer 32 – das große Skelett (mehr Leben) und das Figuren-Rätsel
//  Level 2 bis 15 hat Arthur selbst erfunden.
// ================================================================

// ---- 0. Stellschrauben -------------------------------------------
// Hier kann man das Spiel leichter oder schwerer machen.
const SAUGKRAFT = 0.32;         // so schnell wird ein Kraft-Balken leer (größer = leichter)
const HERZEN_AM_ANFANG = 3;     // so viele Herzen hat das Männchen in Level 2
const SCHONZEIT = 120;          // so lange ist man nach einem Treffer sicher (60 = 1 Sekunde)
// Das Geld am Ende: wie viele Stücke, welche Münzen und Scheine, und wie viel höchstens zusammen
// (Seit Level 10 gilt überall: Das Ergebnis ist höchstens 10.)
const GELD_LEVEL_2 = { stuecke: [2, 3], sorten: [1, 2, 5], hoechstens: 10 };
const GELD_LEVEL_3 = { stuecke: [2, 3], sorten: [1, 2, 5], hoechstens: 10 };
// Die Aufgabe vom Kistenteufel: drei Zahlen zwischen "von" und "bis"
const TEUFEL_ZAHLEN = { von: 1, bis: 3 };        // drei Zahlen von 1 bis 3 – zusammen höchstens 9
// Level 4: die Dynamitkanone
const DYNAMIT_TEMPO = 2.6;      // so schnell fliegt das Dynamit (das Männchen läuft mit 3.6 – man kann also ausweichen)
const DYNAMIT_PAUSE = 100;      // so lange wartet die Kanone zwischen zwei Schüssen (60 = 1 Sekunde)
// Level 4: der Blink-Geist
const BLINK_DAUER = 180;        // so lange blinkt er und rast durchs Zimmer (180 = 3 Sekunden)
const SAUG_PAUSE = 270;         // so lange ist er danach ruhig – nur dann kann man ihn saugen
const BLINK_TEMPO = 3.3;        // so schnell rast er beim Blinken
// Level 6: die Spinnenkanone
const NETZ_TEMPO = 2.4;         // so schnell fliegt ein Netz
const NETZ_PAUSE = 140;         // so lange wartet die Spinnenkanone zwischen zwei Schüssen
const KLEBEZEIT = 180;          // so lange klebt man im Netz fest (180 = 3 Sekunden)
// Level 8: Springen und die Bewegungsfalle
const SPRUNG_KRAFT = 10;        // so kräftig springt das Männchen ab (größer = höher und weiter)
const SCHWERKRAFT = 0.65;       // so schnell kommt es wieder runter
const PLATTE_TEMPO = 2.0;       // so schnell fährt die Bewegungsfalle
// Level 9: der Drache und der Pümpel
const PUEMPEL_KRAFT = 20;       // so viel nimmt ein Pümpel-Schlag vom Balken weg (größer = leichter)
const SCHLAG_PAUSE = 24;        // so lange dauert es bis zum nächsten Schlag
const FEUER_TEMPO = 3.0;        // so schnell fliegt ein Feuerball (das Männchen läuft mit 3.6)
const FEUER_PAUSE = 120;        // so lange wartet der Drache zwischen zwei Feuerbällen
// Level 10: Ventilator und Zeitlupen-Knopf
const FLUG_HOEHE = 110;         // so hoch pustet einen der Ventilator
const ZEITLUPE_DAUER = 900;     // so lange fliegt alles langsamer (900 = 15 Sekunden)
const ZEITLUPE_TEMPO = 0.4;
// Level 11: die Krake
const KRAKE_PUNKTE = 100;       // so viele Punkte hat die Krake
const TREFFER_PUNKTE = 20;      // so viele Punkte kostet sie ein Tintenballon (100 / 20 = 5 Treffer)
const TENTAKEL_WARNEN = 75;     // so lange sieht man die rote Linie, bevor der Tentakel zuschlägt (75 = 1,25 Sekunden)
const TENTAKEL_PAUSE = 190;     // so lange wartet sie zwischen zwei Tentakel-Angriffen
const TINTE_PAUSE = 180;        // so oft schießt die Tintenkanone einen Ballon
const WURF_WEITE = 440;         // so weit fliegt ein Tintenballon höchstens
// Level 14
const RAETSEL_ZEIT = 1200;      // so lange hat man für das Figuren-Rätsel Zeit (1200 = 20 Sekunden)
const BAND_TEMPO = 1.3;         // so schnell fährt das Laufband auf einen zu (das Männchen läuft mit 3.6)
const BOMBE_SCHADEN = 5;        // so viele Punkte nimmt eine Bombe Kabumm weg (er hat 100)     // so langsam fliegt dann alles (0.4 = weniger als halb so schnell)

// ---- 1. Unsere Bilder --------------------------------------------
const BILDER = {
  vorne:  "__player_down__",   // Männchen von vorne (läuft auf uns zu)
  hinten: "__player_up__",     // Männchen von hinten (läuft von uns weg)
  seite:  "__player_side__",   // Männchen von der Seite (läuft nach rechts)
  geist:  "__ghost_blue__",    // kleiner blauer Geist
  koenig: "__ghost_boss__",    // Geist mit Krone
  sauger: "__vacuum__",        // der Staubsauger
  kiste:  "__kiste__",         // die blaue Kiste mit der Kurbel
  teufel: "__teufel__",        // der Kistenteufel, der herausspringt
  kisteRot: "__kiste_rot__",   // die rote Kiste aus Level 4
  kanone: "__kanone__",        // die Dynamitkanone mit dem Totenkopf
  dynamit: "__dynamit__",      // ein Bündel Dynamit mit brennender Zündschnur
  truheZu:  "__truhe_zu__",    // die gelbe Truhe mit Schloss (Level 5)
  truheAuf: "__truhe_auf__",   // dieselbe Truhe mit offenem Deckel
  kanoneSpinne: "__kanone_spinne__",  // die rote Spinnenkanone (Level 6)
  netzKnaeuel:  "__netz_knaeuel__",   // ein Netz, das noch zusammengeknüllt fliegt
  netzOffen:    "__netz_offen__",     // das aufgegangene Netz
  drache:       "__drache__",         // Arthurs Drache (Level 9)
  dracheFeuer:  "__drache_feuer__",   // derselbe Drache mit offenem Maul
  puempel:      "__puempel__",        // der Pümpel
  krake:        "__krake__",          // die böse Krake mit dem Piratenhut (Level 11)
  krakeGross:   "__krake_gross__",    // die erwachsene Kapitäns-Krake (Level 12)
  kuerbis:      "__kuerbis__",        // der böse Kürbis (Level 13)
  skelett:      "__skelett__",        // das Skelett (Level 14)
  kabumm:       "__kabumm__",         // Kabumm, die lebendige Bombe (Level 14)
};

// Hier laden wir alle Bilder. Erst wenn alle fertig sind, geht's los.
const bild = {};
function ladeBilder(fertig) {
  const namen = Object.keys(BILDER);
  let geladen = 0;
  for (const name of namen) {
    const b = new Image();
    b.onload = () => { geladen = geladen + 1; if (geladen === namen.length) fertig(); };
    b.src = BILDER[name];
    bild[name] = b;
  }
}

// ---- 2. Das Zimmer und die Kamera ------------------------------------
// Das Zimmer ist ein echter Raum mit drei Richtungen:
//   x = links ↔ rechts,   z = hinten ↕ vorne,   y = wie hoch etwas schwebt.
const leinwand = document.getElementById("spielfeld");
let malen = leinwand.getContext("2d");   // (zum Vorbereiten des Hintergrunds malen wir kurz woanders hin)
const BREITE = 900;       // so breit ist das Zimmer
const TIEFE = 560;        // so tief ist das Zimmer (von der Rückwand bis vorne)
const WANDHOEHE = 260;    // so hoch sind die Wände
const TUER = { von: 220, bis: 350, hoehe: 175 };          // die Türen in den Seitenwänden
const TUER_HINTEN_HOEHE = 175;                            // so hoch sind die Türen in der Rückwand

// Die Kamera: Sie schwebt vor dem Zimmer und schaut schräg nach unten.
// Was weiter hinten ist, wird kleiner gemalt – genau wie in echt!
const KAMERA = { abstand: 1031, linse: 1113, hoehe: 1026, mitteY: -523 };
function aufsBild(x, y, z) {
  const weite = KAMERA.abstand + (TIEFE - z);         // wie weit weg von der Kamera
  const groesse = KAMERA.linse / weite;               // je weiter weg, desto kleiner
  return {
    x: 480 + (x - BREITE / 2) * groesse,
    y: KAMERA.mitteY + (KAMERA.hoehe - y) * groesse,
    groesse,
  };
}

// ---- 3. Die Zimmer -----------------------------------------------
// Jedes Zimmer hat seine eigenen Farben, Türen und Regeln.
const ZIMMER = {
  1: { level: 1, hinten: "#d9529a", links: "#c4468a", rechts: "#b83f81", streifen: "rgba(255,255,255,0.10)",
       tuerRechts: true },
  2: { level: 1, hinten: "#8a2f82", links: "#7a2873", rechts: "#6c2266", streifen: "rgba(255,210,255,0.08)",
       tuerLinks: true, tuerRechts: true, fenster: true, teppich: true },
  3: { level: 2, hinten: "#232f73", links: "#1e2964", rechts: "#1a2357", streifen: "rgba(190,220,255,0.10)",
       tuerHinten: { von: 310, bis: 430 }, herzen: true },
  4: { level: 2, hinten: "#3a1230", links: "#311029", rechts: "#290d22", streifen: "rgba(255,211,77,0.10)",
       herzen: true, kerzen: true, geld: GELD_LEVEL_2 },
  // In Level 3 nehmen auch die kleinen Geister Herzen weg (geisterBeissen)
  5: { level: 3, hinten: "#1d5c4f", links: "#184d42", rechts: "#144238", streifen: "rgba(255,211,77,0.12)",
       tuerHinten: { von: 390, bis: 510 }, herzen: true, geisterBeissen: true },
  6: { level: 3, hinten: "#4a3f6b", links: "#41375f", rechts: "#382f52", streifen: "rgba(255,255,255,0.08)",
       tuerHinten: { von: 390, bis: 510 }, herzen: true, geisterBeissen: true },
  7: { level: 3, hinten: "#12302f", links: "#0f2928", rechts: "#0c2221", streifen: "rgba(111,211,255,0.10)",
       tuerHinten: { von: 390, bis: 510, zu: true }, herzen: true, geisterBeissen: true, kerzen: true, geld: GELD_LEVEL_3 },
  // In Level 4 sind die kleinen Geister schneller (geisterTempo)
  8: { level: 4, hinten: "#2e3a4f", links: "#283345", rechts: "#222c3b", streifen: "rgba(255,140,60,0.12)",
       tuerHinten: { von: 390, bis: 510 }, herzen: true, geisterBeissen: true, geisterTempo: 1.9 },
  9: { level: 4, hinten: "#1c1030", links: "#170d28", rechts: "#130a21", streifen: "rgba(255,90,120,0.10)",
       herzen: true, geisterBeissen: true, geisterTempo: 1.9, kerzen: true, geld: GELD_LEVEL_3 },
  // Level 5: Am Anfang hat man keinen Staubsauger – der steckt in der Truhe!
  10: { level: 5, hinten: "#6b4423", links: "#5c3a1e", rechts: "#4f3219", streifen: "rgba(255,211,77,0.14)",
        tuerHinten: { von: 250, bis: 370 }, herzen: true, geisterBeissen: true, geisterTempo: 1.9 },
  11: { level: 5, hinten: "#3d1420", links: "#33101b", rechts: "#2a0d16", streifen: "rgba(255,211,77,0.10)",
        tuerHinten: { von: 620, bis: 740, zu: true, farbe: "#3b82c4" },
        herzen: true, geisterBeissen: true, geisterTempo: 1.9, geld: GELD_LEVEL_3 },
  // Level 6
  12: { level: 6, hinten: "#5e3b1f", links: "#51331a", rechts: "#442b16", streifen: "rgba(255,211,77,0.14)",
        tuerHinten: { von: 240, bis: 360 }, herzen: true },
  // Der Lava-Raum: Nur auf dem Weg ist man sicher. Die Geister schubsen nur – die Lava kostet das Herz.
  13: { level: 6, hinten: "#4a1a10", links: "#3f160d", rechts: "#36120b", streifen: "rgba(255,140,40,0.12)",
        tuerHinten: { von: 480, bis: 600 }, herzen: true, geisterBeissen: true, geisterTempo: 1.9, nurSchubsen: true,
        lava: true,
        // der sichere Weg: Rechtecke [links, hinten, rechts, vorne]
        weg: [[170, 470, 730, 560], [230, 300, 350, 480], [230, 300, 600, 390], [480, -120, 600, 390]] },
  14: { level: 6, hinten: "#3b2a4d", links: "#33243f", rechts: "#2b1f36", streifen: "rgba(255,255,255,0.08)",
        tuerHinten: { von: 640, bis: 760 }, herzen: true, geisterBeissen: true, geisterTempo: 1.9 },
  15: { level: 6, hinten: "#16213e", links: "#121b33", rechts: "#0e1629", streifen: "rgba(111,211,255,0.10)",
        herzen: true, geisterBeissen: true, geisterTempo: 1.9, kerzen: true, geld: GELD_LEVEL_3 },
  // Level 7
  16: { level: 7, hinten: "#1f4d3a", links: "#1a4232", rechts: "#16382a", streifen: "rgba(255,211,77,0.14)",
        tuerHinten: { von: 380, bis: 500 }, herzen: true },
  // Ganz viel Lava und ein Zickzack-Weg. Hinten links die Tür – die geht erst auf, wenn der Lava-Geist weg ist.
  17: { level: 7, hinten: "#3d0f1c", links: "#340c18", rechts: "#2b0a14", streifen: "rgba(255,140,40,0.12)",
        tuerHinten: { von: 140, bis: 260 }, herzen: true, nurSchubsen: true, lava: true,
        weg: [[330, 460, 570, 560], [330, 300, 450, 560], [330, 300, 650, 410], [530, 150, 650, 410],
              [140, 150, 650, 260], [140, -120, 260, 260]] },
  18: { level: 7, hinten: "#22163f", links: "#1d1236", rechts: "#180f2d", streifen: "rgba(255,255,120,0.10)",
        herzen: true, geisterBeissen: true, geisterTempo: 1.9, kerzen: true, geld: GELD_LEVEL_3 },
  // Level 8 – ab hier kann man springen!
  19: { level: 8, hinten: "#2d3b5e", links: "#273352", rechts: "#212c47", streifen: "rgba(255,211,77,0.12)",
        tuerHinten: { von: 400, bis: 520 }, herzen: true, springen: true },
  // Der Weg durch die Lava hat Lücken – da muss man drüberspringen
  20: { level: 8, hinten: "#3d0f1c", links: "#340c18", rechts: "#2b0a14", streifen: "rgba(255,140,40,0.12)",
        tuerHinten: { von: 140, bis: 260 }, herzen: true, lava: true, springen: true,
        weg: [[330, 480, 570, 560], [380, 250, 500, 400], [580, 250, 720, 340], [600, 90, 720, 170],
              [140, 90, 520, 170], [140, -120, 260, 90]] },
  21: { level: 8, hinten: "#1e2a24", links: "#1a241f", rechts: "#151e1a", streifen: "rgba(111,211,255,0.10)",
        herzen: true, geisterBeissen: true, kerzen: true, springen: true, geld: GELD_LEVEL_3 },
  // Level 9 – nur ein Raum: der Drache! Statt Staubsauger gibt es einen Pümpel.
  // Level 10 ist leichter gemacht (Arthurs Rückmeldung): 5 Herzen, langsames Dynamit, seltenere Schüsse
  23: { level: 10, hinten: "#183a3a", links: "#143131", rechts: "#102828", streifen: "rgba(111,211,255,0.10)",
        herzenAnfang: 5, dynamitTempo: 1.8, herzen: true, kerzen: true, springen: true, puempel: true, geld: GELD_LEVEL_3 },
  // Level 11 – drei Wasserbecken, in der Mitte wohnt die Krake. 5 Herzen.
  24: { level: 11, hinten: "#1b3b5a", links: "#173350", rechts: "#132b44", streifen: "rgba(255,255,255,0.08)",
        herzen: true, herzenAnfang: 5, springen: true, tinte: true, geld: GELD_LEVEL_3 },
  // Level 12 – wie Level 11, aber mit der großen Krake, zwei kleinen Becken an der Seite, Kerzen und Kugelkanonen
  25: { level: 12, hinten: "#2a1f3d", links: "#241a35", rechts: "#1e162c", streifen: "rgba(255,211,77,0.10)",
        herzen: true, herzenAnfang: 5, springen: true, tinte: true, kerzen: true, geld: GELD_LEVEL_3 },
  // Level 13
  26: { level: 13, hinten: "#203a4a", links: "#1b3240", rechts: "#162a36", streifen: "rgba(255,255,255,0.08)",
        tuerHinten: { von: 400, bis: 520 }, herzen: true, herzenAnfang: 5, springen: true, tinte: true },
  // Die kaputte Brücke: Wo Bretter fehlen, ist Wasser. Da muss man drüberspringen.
  27: { level: 13, hinten: "#2d3e2a", links: "#263524", rechts: "#1f2c1d", streifen: "rgba(255,255,255,0.07)",
        tuerHinten: { von: 330, bis: 450 }, herzen: true, herzenAnfang: 5, springen: true, lava: true, wasser: true, ohneSaugen: true,
        start: [390, 530],
        weg: [[330, 500, 450, 560], [330, 360, 450, 430], [330, 220, 450, 290], [330, 80, 450, 150], [330, -120, 450, 10]] },
  28: { level: 13, hinten: "#3a2416", links: "#311e12", rechts: "#28180e", streifen: "rgba(255,160,40,0.12)",
        herzen: true, herzenAnfang: 5, springen: true, kerzen: true, ohneSaugen: true, geld: GELD_LEVEL_3 },
  // Level 14
  29: { level: 14, hinten: "#3a2416", links: "#311e12", rechts: "#28180e", streifen: "rgba(255,160,40,0.12)",
        tuerHinten: { von: 400, bis: 520 }, herzen: true, herzenAnfang: 5, springen: true, ohneSaugen: true },
  30: { level: 14, hinten: "#2b2b33", links: "#24242b", rechts: "#1e1e24", streifen: "rgba(255,255,255,0.07)",
        tuerHinten: { von: 400, bis: 520 }, herzen: true, herzenAnfang: 5, springen: true, geisterBeissen: true },
  // Das Laufband fährt auf einen zu – vorne ist Wasser. Hinten auf seiner Insel steht Kabumm.
  31: { level: 14, hinten: "#1d2f4a", links: "#192840", rechts: "#152236", streifen: "rgba(255,255,255,0.07)",
        herzen: true, herzenAnfang: 5, springen: true, tinte: true, band: true, lava: true, wasser: true,
        start: [450, 330], weg: [[30, 175, 870, 492]], kerzen: true, geld: GELD_LEVEL_3 },
  // Level 15 – nur ein Raum: das große Skelett
  32: { level: 15, hinten: "#1f1f26", links: "#1a1a20", rechts: "#15151a", streifen: "rgba(255,255,255,0.06)",
        herzen: true, herzenAnfang: 5, springen: true, geisterBeissen: true, kerzen: true },
  22: { level: 9, hinten: "#3b2418", links: "#331f15", rechts: "#2b1a11", streifen: "rgba(255,140,40,0.10)",
        herzen: true, kerzen: true, springen: true, puempel: true, geld: GELD_LEVEL_3 },
};
let zimmer = 1;
let tuerOffen = false;
let geschafft = false;    // hat Arthur alles geschafft?
let blende = 0;           // 0 = alles hell, 1 = ganz dunkel (beim Zimmerwechsel)
let wechselt = false;     // läuft gerade ein Zimmerwechsel?
let zeit = 0;             // zählt immer weiter – für Glitzern und Leuchten

// ---- 4. Das Männchen (das bist du!) --------------------------------
const maennchen = {
  x: 180, z: 300,         // wo es im Zimmer steht
  groesse: 180,           // wie groß es ist
  tempo: 3.6,             // wie schnell es läuft
  blickt: "vorne",        // welches Bild: vorne, hinten oder seite
  nachLinks: false,       // schaut es nach links? Dann spiegeln wir das Bild
  richtungX: 0,           // in diese Richtung zeigt der Staubsauger …
  richtungZ: 1,           // … am Anfang nach vorne
  schrittTakt: 0,         // tickt beim Laufen – daraus machen wir die Schritte
  laeuft: false,
  hatSauger: false,
  stossX: 0, stossZ: 0,   // wenn ein Geist einen wegschubst
  klebt: 0,               // zählt runter, solange man im Netz festklebt
  hoehe: 0,               // Level 8: so hoch ist es gerade in der Luft (0 = auf dem Boden)
  sprungTempo: 0,         // so schnell geht es gerade nach oben (oder unten)
  fliegt: false,          // Level 10: schwebt es gerade über dem Ventilator?
  tinte: 0,               // Level 11: so viele Tintenballons hat es dabei
  schlag: 0,              // Level 9: zählt runter, während der Pümpel zuschlägt
  schlagPause: 0,
};
let sprungWunsch = false; // wurde gerade der Spring-Knopf gedrückt?

// Wo fangen bei jedem Bild die Beine an? (0 = ganz oben, 1 = ganz unten)
const BEINE = {
  vorne:  { ab: 0.75, links: 0.25, rechts: 0.75 },
  hinten: { ab: 0.72, links: 0.18, rechts: 0.80 },
  seite:  { ab: 0.78, links: 0.20, rechts: 0.85 },
};

// Die Herzen: In Level 2 hat das Männchen drei Herzen.
// Jede Berührung von einem Kronen-Geist kostet ein Herz.
// Ohne Herzen ist die nächste Berührung das Ende – dann fängt das Zimmer von vorne an.
let herzen = HERZEN_AM_ANFANG;
// Manche Zimmer schenken mehr Herzen (Level 10 hat 5)
function herzenMax() { return ZIMMER[zimmer].herzenAnfang || HERZEN_AM_ANFANG; }
let unverwundbar = 0;     // zählt runter: so lange blinkt das Männchen und ist sicher
let herzHuepfer = 0;      // kleiner Hüpfer in der Herz-Anzeige, wenn eins weg ist
let treffBlitz = 0;       // kurzes rotes Aufblitzen bei einem Treffer

// ---- 5. Der Staubsauger ------------------------------------------
const sauger = {
  x: 730, z: 450, groesse: 115,
  versteckt: false,       // in Level 5 steckt er am Anfang in der Truhe
  flug: 1,                // 0 = springt gerade aus der Truhe, 1 = liegt am Boden
  startX: 0, startZ: 0, zielX: 0, zielZ: 0,
};
let saugtGerade = false;

// ---- 6. Die kleinen Geister ---------------------------------------
let geister = [];
let gefangen = 0;
let glitzer = [];         // kleine Sterne, wenn ein Geist eingesaugt wird
let saugStreifen = [];    // die Luft-Striche vor dem Staubsauger
let sprechblasen = [];    // "Buh!" und "Hahaha!"
let banner = null;        // die große Schrift am Anfang von einem Zimmer

// Eine Zufallszahl zwischen "von" und "bis"
function zufall(von, bis) { return von + Math.random() * (bis - von); }
// Mischt eine Liste durch wie ein Kartenspiel
function mischen(liste) {
  for (let i = liste.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [liste[i], liste[j]] = [liste[j], liste[i]];
  }
  return liste;
}

function kleinenGeistMachen(x, z) {
  return {
    x, z,
    groesse: zufall(100, 125),      // manche Geister sind etwas größer
    dx: zufall(-0.8, 0.8),          // wie schnell er nach links/rechts schwebt
    dz: zufall(-0.6, 0.6),          // wie schnell er nach hinten/vorne schwebt
    wippen: zufall(0, 6.28),        // jeder Geist wippt ein bisschen anders
    zappeln: 0,
    // Nur für Level 3: Da jagen die Geister das Männchen – aber nicht die ganze Zeit.
    jagtGerade: false,              // ist er gerade hinter dem Männchen her?
    jagdUhr: zufall(90, 200),       // zählt runter bis zum nächsten Wechsel zwischen Jagen und Herumschweben
    beissPause: 60,                 // so lange kann er gerade kein Herz wegnehmen
  };
}

function geisterVerteilen(anzahl) {
  geister = [];
  while (geister.length < anzahl) {
    const g = kleinenGeistMachen(zufall(90, BREITE - 90), zufall(60, TIEFE - 60));
    // Kein Geist darf direkt neben dem Männchen oder auf dem Staubsauger anfangen
    const zumMaennchen = Math.hypot(g.x - maennchen.x, g.z - maennchen.z);
    const zumSauger = Math.hypot(g.x - sauger.x, g.z - sauger.z);
    if (zumMaennchen > 220 && zumSauger > 130) geister.push(g);
  }
}

// ---- 7. Die Kronen-Geister (Könige und der Riesengeist) -------------
// Jeder hat einen Kraft-Balken. Beim Ansaugen wird der Balken kleiner.
// Ist der Balken leer, ist der Geist besiegt!
let bosse = [];
let bosseAmAnfang = 0;    // wie viele es in diesem Zimmer am Anfang waren
let letzterOrt = { x: 450, z: 250 };   // wo der letzte besiegte Geist war

function bossMachen(was) {
  const k = {
    name: "Geisterkönig",
    x: 640, z: 200,
    groesse: 230,           // wie groß er ist
    kraftMax: 100,          // wie lang sein Balken ist
    dx: 1.1, dz: 0.7,       // wie er durchs Zimmer schwebt
    jagt: 0.5,              // wie schnell er dem Männchen hinterherkommt
    zieht: 0.6,             // wie stark ihn der Sauger heranzieht (schwere Geister rutschen langsam)
    schwebt: 60,            // wie hoch er über dem Boden schwebt
    zMin: 60,               // so weit nach hinten darf er höchstens
    radius: 75,             // wie nah er kommen muss, um zu schubsen
    reichweite: 300,        // von so weit weg kann man ihn ansaugen
    stoss: 14,              // wie doll er schubst
    leben: 1,               // so viele Balken hat er nacheinander (der Stehauf-Geist hat 2)
    jagdPhasen: false,      // jagt er nur manchmal (Level 3) oder kommt er immer langsam hinterher?
    blinkt: false,          // Level 4: Blinkt er immer wieder und rast dann durchs Zimmer?
    truhe: false,           // Level 5: Ist es gar kein Geist, sondern die lebendige Truhe?
    ruf: "BUH!",            // was er ruft, wenn er das Männchen erwischt
    tiefFaktor: 1,          // große Geister erwischen einen auch, wenn man weiter hinter ihnen steht (kleiner als 1)
    ruftHilfe: false,       // ruft er kleine Geister zu Hilfe?
    balkenOben: false,      // großer Balken oben im Bild – oder kleiner Balken über dem Kopf?
    wirdZuGeld: false,      // zerplatzt er am Ende zu Geld?
  };
  Object.assign(k, was);
  k.kraft = k.kraftMax;     // am Anfang ist der Balken voll
  k.wippen = zufall(0, 6.28);
  k.zappeln = 0;
  k.schubsPause = 90;       // am Anfang wartet er kurz, bevor er schubsen darf
  k.wut = 0;                // nach dem Schubsen leuchtet er kurz rot
  k.gerufen66 = false;      // hat er bei 2/3 Kraft schon Hilfe gerufen?
  k.gerufen33 = false;      // und bei 1/3?
  k.besiegt = false;
  k.verschwinden = 0;       // zählt hoch, während er verschwindet
  k.liegt = 0;              // zählt runter, während er umgefallen am Boden liegt
  k.jagtGerade = false;
  k.jagdUhr = zufall(100, 160);
  k.blinktGerade = false;
  k.blinkUhr = SAUG_PAUSE;  // zählt runter bis zum nächsten Wechsel zwischen Blinken und Ruhe
  k.rasenX = 0; k.rasenZ = 0;   // in diese Richtung rast er beim Blinken
  return k;
}

// Je weniger Kraft ein Kronen-Geist hat, desto kleiner wird er
function bossGroesse(k) { return k.drache || k.kuerbis || k.skelett || k.bandBoss ? k.groesse : k.groesse * (0.7 + 0.3 * k.kraft / k.kraftMax); }

// ---- 8. Das Geld und die Rechen-Aufgabe ----------------------------
let geld = [];            // die Münzen und Scheine, die im Zimmer liegen
let rechnung = null;      // die Aufgabe: Wie viel Geld ist das zusammen?

function summe(zahlen) { let s = 0; for (const z of zahlen) s = s + z; return s; }

// Der Riesengeist zerplatzt – und überall fliegt Geld hin!
function geldRegen(x, z) {
  // Wir würfeln ein paar Geldstücke aus. Zusammen dürfen sie nicht zu viel sein.
  const regel = ZIMMER[zimmer].geld;
  let werte;
  do {
    const anzahl = regel.stuecke[Math.floor(Math.random() * regel.stuecke.length)];
    werte = [];
    for (let i = 0; i < anzahl; i++) werte.push(regel.sorten[Math.floor(Math.random() * regel.sorten.length)]);
  } while (summe(werte) > regel.hoechstens || summe(werte) < 6 || !werte.some((w) => w >= 5));

  // Jedes Stück fliegt an einen anderen Platz im Zimmer
  // (nicht in ein Wasserbecken und nicht hinter das Laufband – da käme man nicht hin)
  const plaetze = mischen([[170, 170], [450, 130], [730, 170], [240, 410], [660, 410], [450, 330],
                           [150, 480], [750, 480], [300, 300], [600, 300]]
    .filter(([px, pz]) => !(becken.length && imBecken(px, pz, 45)) && !(ZIMMER[zimmer].band && pz < 220)));
  geld = werte.map((wert, i) => ({
    wert,
    x, z, y: 120,
    startX: x, startZ: z,
    zielX: plaetze[i][0], zielZ: plaetze[i][1],
    flug: 0,                    // 0 = fliegt gerade los, 1 = gelandet
    wippen: zufall(0, 6.28),
  }));
  rechnung = { art: "geld", anzahl: werte.length, summe: summe(werte), teile: [], phase: "sammeln" };

  for (let i = 0; i < 50; i++) sternchen(x + zufall(-80, 80), zufall(60, 300), z, i % 3 === 0 ? "#8fd6a8" : "#ffd34d");
  kassenTon();
  zaehlerZeigen("Geld: 0 von " + werte.length);
  tippZeigen("Er ist zu <b>Geld</b> zerplatzt! Sammle alles ein!");
}

function geldEinsammeln(g) {
  if (g.weg) return;
  g.weg = true;
  rechnung.teile.push(g.wert);          // das Stück wandert oben in die Rechnung
  muenzTon();
  for (let i = 0; i < 8; i++) sternchen(g.x, 40, g.z, "#ffd34d");
  zaehlerZeigen("Geld: " + rechnung.teile.length + " von " + rechnung.anzahl);
  if (rechnung.teile.length === rechnung.anzahl) frageStellen();
}

// Zeigt die drei Antwort-Knöpfe: Eine Antwort ist richtig, zwei sind falsch.
function antwortenZeigen(falsche, einheit) {
  rechnung.phase = "fragen";
  rechnung.antworten = mischen([rechnung.summe, falsche[0], falsche[1]]);
  antwortKnoepfe.forEach((knopf, i) => {
    knopf.textContent = rechnung.antworten[i] + einheit;
    knopf.disabled = false;
    knopf.classList.remove("falsch");
  });
  document.getElementById("antworten").hidden = false;
}

// Alles eingesammelt – jetzt wird gerechnet!
function frageStellen() {
  const richtig = rechnung.summe;
  // Zwei falsche Antworten, die ganz nah an der richtigen liegen
  const falsche = mischen([richtig - 2, richtig - 1, richtig + 1, richtig + 2].filter((n) => n > 0)).slice(0, 2);
  antwortenZeigen(falsche, " €");
  zaehlerZeigen("Wie viel ist das?");
  tippZeigen("Wie viel ist das <b>zusammen</b>? " + rechnung.teile.map((w) => w + " €").join(" + ") + " = ?");
}

function antwortGeben(nummer) {
  if (!rechnung || rechnung.phase !== "fragen") return;
  const knopf = antwortKnoepfe[nummer];
  if (!knopf || knopf.disabled) return;
  const richtig = rechnung.antworten[nummer] === rechnung.summe;

  // Die Aufgabe vom Kistenteufel
  if (rechnung.art === "teufel") {
    if (richtig) teufelBesiegt(); else teufelLacht();
    return;
  }
  // Das Figuren-Rätsel vom Skelett
  if (rechnung.art === "raetsel") {
    if (richtig) raetselGeloest(); else { knopf.classList.add("falsch"); raetselVerloren("Falsch!"); }
    return;
  }

  // Die Geld-Aufgabe am Ende von einem Level
  if (richtig) {
    rechnung.phase = "fertig";
    geschafft = true;
    document.getElementById("antworten").hidden = true;
    const weiter = document.getElementById("nochmal");
    weiter.textContent = ZIMMER[zimmer + 1] ? "Weiter zu Level " + ZIMMER[zimmer + 1].level : "Nochmal spielen";
    weiter.hidden = false;
    koenigsMelodie();
    zaehlerZeigen(rechnung.summe + " € gewonnen!");
    tippZeigen("Richtig gerechnet! <b>Level " + ZIMMER[zimmer].level + " geschafft!</b>");
  } else {
    // Leider falsch! Raten gilt nicht: Dann geht es zurück in den Raum davor.
    rechnung.phase = "falsch";
    knopf.classList.add("falsch");
    antwortKnoepfe.forEach((k) => { k.disabled = true; });
    falschTon();
    setTimeout(verlorenTon, 300);
    zaehlerZeigen("Leider falsch!");
    tippZeigen("Leider falsch – richtig wären <b>" + rechnung.summe + " €</b>. Zurück in den Raum davor!");
    bannerZeigen("Leider falsch!");
    const zurueck = ZIMMER[zimmer - 1] && ZIMMER[zimmer - 1].level === ZIMMER[zimmer].level ? zimmer - 1 : zimmer;
    setTimeout(() => {
      if (!rechnung || rechnung.phase !== "falsch") return;     // inzwischen ein anderes Level ausgesucht
      document.getElementById("antworten").hidden = true;
      zimmerWechseln(zurueck, "Rechne beim nächsten Mal ganz in Ruhe nach – du schaffst das!");
    }, 2800);
  }
}

// ---- 8b. Die Kiste mit dem Kistenteufel (Level 3) -------------------
// Berührt man die Kurbel, springt der Kistenteufel heraus und stellt eine Rechen-Aufgabe.
// Richtig gerechnet: Er ist besiegt und die Tür geht auf.
// Falsch gerechnet: Er lacht, verschwindet – und zwei Geister kommen und jagen das Männchen.
let kiste = null;
// Wo im Bild die wichtigen Stellen sind (gemessen an den Bildern von Kiste und Teufel)
const KISTE = { massstab: 0.625, ankerX: 106.4, lochDX: -8, lochHoehe: 182.4, teufelAnkerX: 137.2, kurbelDX: 120 };

function kisteAufstellen(x, z, rot) {
  kiste = {
    x, z,                     // wo sie im Zimmer steht
    rot,                      // in Level 4 ist die Kiste rot
    zustand: "zu",            // "zu", "auf" (Teufel ist draußen) oder "besiegt"
    hoch: 0,                  // wie weit der Teufel draußen ist: 0 = drin, 1 = ganz draußen
    sprung: 0,                // zählt die Zeit seit dem Herausspringen
    bereit: true,             // kann man die Kurbel gerade auslösen?
  };
}

function teufelSpringtRaus() {
  kiste.zustand = "auf"; kiste.sprung = 0; kiste.bereit = false;
  boingTon();
  // Drei Zahlen ausdenken. Die Einer sollen zusammen höchstens 9 sein – so muss man nicht über den Zehner rechnen.
  let zahlen;
  do {
    zahlen = [0, 0, 0].map(() => Math.floor(zufall(TEUFEL_ZAHLEN.von, TEUFEL_ZAHLEN.bis + 1)));
  } while (summe(zahlen.map((n) => n % 10)) > 9 || summe(zahlen) > 10);
  rechnung = { art: "teufel", zahlen, summe: summe(zahlen), teile: [], phase: "fragen" };
  // Falsche Antworten: eine ganz knapp daneben, eine um genau zehn daneben
  const s = rechnung.summe;
  if (s <= 10) {
    // Kleine Zahlen: zwei falsche Antworten ganz knapp daneben
    antwortenZeigen(mischen([s - 2, s - 1, s + 1, s + 2].filter((n) => n > 0)).slice(0, 2), "");
  } else {
    const knapp = mischen([s - 2, s - 1, s + 1, s + 2])[0];
    const zehner = Math.random() < 0.5 ? s - 10 : s + 10;
    antwortenZeigen([knapp, zehner], "");
  }
  zaehlerZeigen("Rechne!");
  tippZeigen("Der <b>Kistenteufel</b> fragt: " + zahlen.join(" + ") + " = ?");
}

function teufelLacht() {
  rechnung = null;
  document.getElementById("antworten").hidden = true;
  kiste.zustand = "zu";                 // er verschwindet wieder in der Kiste
  falschTon(); lachTon();
  sprechblase("Falsch! Hahaha!", kiste.x, 330, kiste.z);
  // Zur Strafe fliegen zwei Geister aus der Kiste und jagen das Männchen
  const plaetze = [[-130, -70], [-30, -120]];
  for (const [dx, dz] of plaetze) {
    const g = kleinenGeistMachen(kiste.x + dx, kiste.z + dz);
    g.jagtGerade = true; g.jagdUhr = 240; g.beissPause = 70;
    geister.push(g);
    for (let j = 0; j < 8; j++) sternchen(g.x, 60, g.z, "#6fd3ff");
  }
  zaehlerZeigen("Falsch gerechnet!");
  tippZeigen("Falsch! Fang die Geister – und berühr dann nochmal die <b>Kurbel</b>.");
}

function teufelBesiegt() {
  rechnung = null;
  document.getElementById("antworten").hidden = true;
  kiste.zustand = "besiegt";
  sprechblase("Richtig?! Neiiin!", kiste.x, 330, kiste.z);
  for (let i = 0; i < 40; i++) sternchen(kiste.x + zufall(-60, 60), zufall(120, 330), kiste.z, i % 2 ? "#ffd34d" : "#ff5a5a");
  zaehlerZeigen("Kistenteufel: besiegt!");

  if (zimmer === 10) {
    // Level 5: Die Tür bleibt noch zu. Erst kommt der Kronen-Geist – und die Kanonen wachen auf!
    stufe = 3;
    const k = bossMachen({
      name: "Kronen-Geist", x: 290, z: 200, groesse: 230, kraftMax: 130,
      jagt: 1.6, jagdPhasen: true, dx: 0.8, dz: 0.5, balkenOben: true,
    });
    k.schubsPause = 120;                 // er braucht einen Moment, bis er loslegt
    bosse = [k]; bosseAmAnfang = 1;
    for (let i = 0; i < 30; i++) sternchen(k.x + zufall(-50, 50), zufall(60, 260), k.z, i % 2 ? "#ffd34d" : "#6fd3ff");
    kanonenWecken();
    setTimeout(lachTon, 300);
    zaehlerZeigen("Kronen-Geist!");
    tippZeigen("Richtig! Aber jetzt kommt der <b>Kronen-Geist</b> – und die Kanonen schießen!");
    return;
  }

  tuerOffen = true;
  setTimeout(siegesMelodie, 200);
  tippZeigen("Richtig gerechnet! Die <b>Tür hinten</b> ist offen!");
  // In Level 4 wacht jetzt die Kanone auf!
  if (kanonen.length > 0) {
    kanonenWecken();
    zaehlerZeigen("Ab zur Tür!");
    tippZeigen("Richtig! Aber jetzt schießt die <b>Kanone</b>. Weich dem Dynamit aus und lauf zur Tür!");
  }
}

// Solange der Kistenteufel fragt, steht die Zeit still – so kann man in Ruhe rechnen.
// Auch während man ein Level aussucht, wartet alles.
function zeitSteht() { return levelWahlOffen || (rechnung !== null && (rechnung.art === "teufel" || rechnung.art === "raetsel")); }

function kisteBewegen() {
  if (!kiste) return;
  if (kiste.zustand === "auf") {
    kiste.sprung = kiste.sprung + 1;
    const t = kiste.sprung / 40;
    kiste.hoch = 1 - Math.exp(-5 * t) * Math.cos(11 * t);    // er schnellt hoch, federt nach und bleibt dann stehen
  } else {
    kiste.hoch = Math.max(0, kiste.hoch - 0.1);               // zurück in die Kiste
  }
  if (zeitSteht() || wechselt || geschafft) return;
  // Steht das Männchen an der Kurbel?
  const anDerKurbel = Math.hypot(maennchen.x - (kiste.x + KISTE.kurbelDX), maennchen.z - kiste.z) < 75;
  if (!anDerKurbel) kiste.bereit = true;                       // erst weggehen, dann geht es nochmal
  if (kiste.gesperrt) {
    // Level 5: Die Kurbel klemmt, solange die Truhe noch da ist
    if (anDerKurbel && kiste.bereit) {
      kiste.bereit = false;
      tippZeigen("Die Kurbel klemmt noch. Erst muss die <b>Truhe</b> weg!");
    }
    return;
  }
  if (kiste.zustand === "zu" && anDerKurbel && kiste.bereit && kiste.hoch === 0) teufelSpringtRaus();
}

// ---- 8c. Die Dynamitkanonen (Level 4 und 5) --------------------------
// Eine Kanone hängt an der linken oder rechten Wand. Solange der Kistenteufel noch da ist, schläft sie.
// Danach schwenkt sie hin und her und schießt Dynamit quer durchs Zimmer.
// Das Dynamit fliegt langsam genug zum Ausweichen – und es macht keine Löcher in den Boden.
let kanonen = [];
let dynamit = [];
// Wo im Bild die wichtigen Stellen sind (gemessen an den Bildern)
//   anker = um diesen Punkt dreht sie sich · winkel0 = in diese Richtung zeigt das Rohr im Bild
//   rohr = so weit vorne kommt das Geschoss heraus · abstand = so weit steht sie von der Wand weg
const KANONEN_ARTEN = {
  dynamit: { bild: "kanone",       massstab: 0.8, ankerX: 46.4,  ankerY: 79,   winkel0: 1.4407, muendung: 239, rohr: 175, abstand: 50,  schwenk: 0.72 },
  kugel:   { bild: "kanone",       massstab: 0.8, ankerX: 46.4,  ankerY: 79,   winkel0: 1.4407, muendung: 239, rohr: 175, abstand: 50,  schwenk: 0.6 },
  tinte:   { bild: "kanone",       massstab: 0.8, ankerX: 46.4,  ankerY: 79,   winkel0: 1.4407, muendung: 239, rohr: 175, abstand: 50,  schwenk: 0.5 },
  netz:    { bild: "kanoneSpinne", massstab: 1.0, ankerX: 105.6, ankerY: 70.2, winkel0: 0,      muendung: 109, rohr: 115, abstand: 125, schwenk: 0.55 },
};
const DYNAMIT = { massstab: 0.9, ankerX: 21.2, ankerY: 45.9, winkel0: 1.408 };

// seite: "links" oder "rechts" · z: wie weit hinten · vorlauf: damit zwei Kanonen nicht gleichzeitig schießen
// art: "dynamit" oder "netz" (die Spinnenkanone)
function kanoneAufstellen(seite, z, vorlauf, pause, art) {
  art = art || "dynamit";
  const A = KANONEN_ARTEN[art];
  const grund = seite === "links" ? 0 : Math.PI;      // ihre Grundrichtung: quer durchs Zimmer zur anderen Wand
  kanonen.push({
    seite, art,
    x: seite === "links" ? A.abstand : BREITE - A.abstand, z,
    grund,
    winkel: grund,            // wohin sie gerade zielt
    zeit: vorlauf,
    wach: false,              // sie schläft, bis der Kistenteufel besiegt ist
    schussUhr: 90 + vorlauf,  // zählt runter bis zum nächsten Schuss
    pause,                    // so lange wartet sie zwischen zwei Schüssen
    rueckstoss: 0,            // kurzes Zucken nach dem Schuss
  });
}

function kanonenWecken() {
  for (const k of kanonen) k.wach = true;
  setTimeout(bummTon, 500);
}

function kanonenBewegen() {
  for (const k of kanonen) {
    if (k.rueckstoss > 0) k.rueckstoss = k.rueckstoss - 1;
    if (!k.wach || wechselt || geschafft) continue;
    // Sie schwenkt langsam im Halbkreis hin und her
    k.zeit = k.zeit + 1;
    const A = KANONEN_ARTEN[k.art];
    k.winkel = k.grund + Math.asin(Math.sin(k.zeit * 0.012)) * A.schwenk;      // gleichmäßig nach beiden Seiten
    k.schussUhr = k.schussUhr - 1;
    if (k.schussUhr <= 0 && k.art === "tinte") {
      k.schussUhr = k.pause;
      // Nur schießen, wenn nicht schon genug Ballons herumliegen
      if (ballons.filter((b) => b.vonKanone).length + maennchen.tinte < 3 && krake && !krake.besiegt) {
        k.rueckstoss = 12; pflatschTon();
        ballonSchiessen(k.x + Math.cos(k.winkel) * 175, k.z + Math.sin(k.winkel) * 175);
      }
      continue;
    }
    if (k.schussUhr <= 0) {
      k.schussUhr = k.pause;
      k.rueckstoss = 12;
      if (k.art === "netz") pflatschTon(); else bummTon();
      const richtX = Math.cos(k.winkel), richtZ = Math.sin(k.winkel);
      const tempo = k.art === "netz" ? NETZ_TEMPO : k.art === "kugel" ? 1.8 : (ZIMMER[zimmer].dynamitTempo || DYNAMIT_TEMPO);
      dynamit.push({
        art: k.art,               // Dynamit oder Netz
        x: k.x + richtX * A.rohr, z: k.z + richtZ * A.rohr,
        dx: richtX * tempo, dz: richtZ * tempo,
        wackeln: zufall(0, 6.28),
        alter: 0,                 // ein Netz geht erst nach einer Weile auf
      });
    }
  }
}

// Wie weit muss ein Geschoss vom Männchen weg sein, damit es nicht trifft?
const NETZ_AUF = 38;      // nach so vielen Bildern geht das Netz auf

function dynamitBewegen() {
  const tempo = zeitlupe > 0 ? ZEITLUPE_TEMPO : 1;      // Level 10: der Zeitlupen-Knopf
  for (const d of dynamit) {
    d.x = d.x + d.dx * tempo;
    d.z = d.z + d.dz * tempo;
    d.wackeln = d.wackeln + 0.2 * tempo;
    d.alter = d.alter + 1;
    const netz = d.art === "netz";
    if (!netz && zeit % 4 === 0) glitzer.push({ x: d.x, y: 55, z: d.z, dx: zufall(-1, 1), dy: zufall(0, 2), dz: zufall(-1, 1), leben: 14, farbe: "#ffb347" });
    // Getroffen?
    const zumMaennchen = Math.hypot(maennchen.x - d.x, maennchen.z - d.z);
    const trefferWeite = netz ? (d.alter < NETZ_AUF ? 36 : 60) : 42;      // ein offenes Netz ist breiter
    // Wer drüberspringt, den trifft es nicht mehr (auch nicht beim Landen)
    // (Über dem Ventilator ist man vor dem Dynamit sicher – Feuerbälle fliegen aber auch hoch hinauf!)
    const inDerLuft = maennchen.hoehe >= 35 && !(d.art === "feuer" && maennchen.fliegt);
    if (zumMaennchen < trefferWeite && inDerLuft) d.uebersprungen = true;
    if (zumMaennchen < trefferWeite && unverwundbar === 0 && !wechselt && !inDerLuft && !d.uebersprungen) {
      if (netz) {
        // Ein Netz kostet kein Herz – aber man klebt fest!
        if (maennchen.klebt === 0) {
          d.weg = true;
          festkleben();
        }
      } else {
        // Dynamit kostet ein Herz
        d.weg = true;
        const weit = zumMaennchen || 1;
        maennchen.stossX = ((maennchen.x - d.x) / weit) * 9;
        maennchen.stossZ = ((maennchen.z - d.z) / weit) * 9;
        for (let i = 0; i < 16; i++) sternchen(d.x, 60, d.z, i % 2 ? "#ffb347" : "#ff5a5a");
        puffTon();
        sprechblase(d.art === "feuer" ? "HEISS!" : d.art === "kugel" ? "BUMM!" : "PENG!", d.x, 170, d.z);
        herzVerlieren(d.art === "kugel" ? 2 : 1);
      }
    }
    // An der Wand verpufft es einfach – ohne Loch im Boden
    if (d.x > BREITE - 20 || d.x < 15 || d.z < 12 || d.z > TIEFE - 8) {
      d.weg = true;
      for (let i = 0; i < 8; i++) sternchen(d.x, 60, d.z, netz ? "#f4f6ff" : "#c9b8c2");
    }
  }
  dynamit = dynamit.filter((d) => !d.weg);
}

// Im Netz gefangen: Drei Sekunden lang kann man sich nicht bewegen und nicht saugen.
function festkleben() {
  maennchen.klebt = KLEBEZEIT;
  maennchen.stossX = 0; maennchen.stossZ = 0;
  pflatschTon();
  for (let i = 0; i < 14; i++) sternchen(maennchen.x, 90, maennchen.z, "#f4f6ff");
  sprechblase("Ich klebe fest!", maennchen.x, 230, maennchen.z);
  tippZeigen("Du klebst im <b>Netz</b> fest! Gleich bist du wieder frei …");
}

// ---- 8d. Die Truhe (Level 5) ----------------------------------------
// In der gelben Truhe steckt der Staubsauger. Kommt man nah heran, klappt sie auf und er springt heraus.
// Sobald man ihn aufhebt, wird die Truhe lebendig: Sie jagt das Männchen und klappert mit dem Deckel.
let truhe = null;
// Im ersten Zimmer von Level 5 geht es der Reihe nach:
//   0 = Truhe öffnen und Staubsauger holen   1 = Truhe einsaugen   2 = Kistenteufel
//   3 = Kronen-Geist einsaugen               4 = die Tür ist offen
let stufe = 0;

// groesse, jagt (wie schnell sie jagt) und kraft (wie lang ihr Balken ist) kann man einstellen
// extra: noch mehr Einstellungen, zum Beispiel { balkenOben: true, name: "Truhen-Boss" } (Level 7)
function truheAufstellen(x, z, groesse, jagt, kraft, extra) {
  truhe = { x, z, groesse: groesse || 165, jagt: jagt || 1.25, kraft: kraft || 100, offen: false, extra: extra || {} };
}

function truheBewegen() {
  // Der Staubsauger fliegt im Bogen aus der Truhe
  if (sauger.flug < 1) {
    sauger.flug = Math.min(1, sauger.flug + 1 / 45);
    sauger.x = sauger.startX + (sauger.zielX - sauger.startX) * sauger.flug;
    sauger.z = sauger.startZ + (sauger.zielZ - sauger.startZ) * sauger.flug;
  }
  if (!truhe || truhe.offen || wechselt) return;
  // Kommt das Männchen nah heran, klappt der Deckel auf
  if (Math.hypot(maennchen.x - truhe.x, maennchen.z - truhe.z) < 125 * truhe.groesse / 165) {
    truhe.offen = true;
    boingTon();
    for (let i = 0; i < 20; i++) sternchen(truhe.x + zufall(-30, 30), zufall(120, 200), truhe.z, "#ffd34d");
    sauger.versteckt = false; sauger.flug = 0;
    sauger.startX = truhe.x; sauger.startZ = truhe.z;
    // Er landet ein Stück neben der Truhe – auf der Seite, wo das Männchen nicht steht
    sauger.zielX = truhe.x + (maennchen.x < truhe.x ? 1 : -1) * 170 * truhe.groesse / 165;
    sauger.zielZ = truhe.z + 80;
    sauger.x = sauger.startX; sauger.z = sauger.startZ;
    zaehlerZeigen("Da ist er!");
    tippZeigen("Die Truhe ist auf! Hol dir den <b>Staubsauger</b>!");
  }
}

// Der Staubsauger ist aufgehoben – jetzt wird die Truhe böse!
function truheWirdLebendig() {
  stufe = 1;
  const k = bossMachen({
    name: "Truhe", x: truhe.x, z: truhe.z, groesse: truhe.groesse, kraftMax: truhe.kraft,
    truhe: true, schwebt: 0, radius: 62 * truhe.groesse / 165, jagt: truhe.jagt, jagdPhasen: true,
    dx: 0.6, dz: 0.4, stoss: 12, ruf: "HAPPS!", ...truhe.extra,
  });
  k.jagtGerade = true; k.jagdUhr = 200;    // sie legt sofort los …
  k.schubsPause = 80;                      // … aber man bekommt einen kleinen Vorsprung
  bosse = [k]; bosseAmAnfang = 1;
  truhe = null;
  lachTon();
  sprechblase("Gib ihn zurück!", k.x, 230, k.z);
  zaehlerZeigen("Die Truhe lebt!");
  tippZeigen(istTouch ? "Die Truhe lebt! Halte <b>SAUGEN</b> gedrückt und saug sie ein!"
                      : "Die Truhe lebt! Halte die <b>Leertaste</b> gedrückt und saug sie ein!");
}

// ---- 8f. Der Pümpel (Level 9) ----------------------------------------
// Im Drachen-Zimmer gibt es keinen Staubsauger, sondern einen Pümpel. Damit haut man zu: PLOPP!
// Taste gedrückt halten = immer wieder hauen.
function schlagPunkt() {
  return { x: maennchen.x + maennchen.richtungX * 80, z: maennchen.z + maennchen.richtungZ * 70 };
}
function kampfBeginnt() {
  for (const k of bosse) { k.wartet = false; k.feuerUhr = 150; k.jagdUhr = 120; }
  kanonenWecken();
  if (ventilator) ventilator.an = true;
  brummTon();
  if (bosse[0]) sprechblase("ROAAAR! Jetzt geht's los!", bosse[0].x, 330, bosse[0].z);
  tippZeigen("Der <b>Ventilator</b> ist an – oben bist du vor dem Dynamit sicher! Und der <b>rote Knopf</b> macht alles langsamer.");
}

function hauenBewegen() {
  if (maennchen.schlag > 0) maennchen.schlag = maennchen.schlag - 1;
  if (maennchen.schlagPause > 0) maennchen.schlagPause = maennchen.schlagPause - 1;
  if (!ZIMMER[zimmer].puempel || !maennchen.hatSauger || geschafft || wechselt || maennchen.klebt > 0) return;
  if (!gedrueckt.saugen || maennchen.schlagPause > 0) return;
  maennchen.schlag = 16;
  maennchen.schlagPause = SCHLAG_PAUSE;
  schrittTon();
  const sp = schlagPunkt();
  for (const k of bosse) {
    if (!k.drache || k.besiegt || k.liegt > 0) continue;
    const tief = sp.z < k.z ? k.tiefFaktor : 1;
    if (Math.hypot(sp.x - k.x, (sp.z - k.z) * tief) > k.radius + 45) continue;
    // Getroffen! PLOPP!
    k.kraft = Math.max(0, k.kraft - PUEMPEL_KRAFT);
    k.getroffen = 10;
    ploppTon();
    sprechblase("PLOPP!", k.x + zufall(-40, 40), 240, k.z);
    for (let i = 0; i < 8; i++) sternchen(sp.x, 90, sp.z, i % 2 ? "#ffd34d" : "#ff5a5a");
    // Er weicht ein kleines Stück zurück
    const weit = Math.hypot(k.x - maennchen.x, k.z - maennchen.z) || 1;
    k.x = Math.max(90, Math.min(BREITE - 90, k.x + ((k.x - maennchen.x) / weit) * 14));
    k.z = Math.max(k.zMin, Math.min(TIEFE - 60, k.z + ((k.z - maennchen.z) / weit) * 14));
    if (k.kraft <= 0) {
      k.leben = k.leben - 1;
      if (k.leben > 0) {
        k.liegt = 170;
        plumpsTon();
        sprechblase("Uff!", k.x, 200, k.z);
        tippZeigen("Der Drache ist umgefallen! Aber Achtung: Er hat noch <b>" + (k.leben === 1 ? "einen Balken" : k.leben + " Balken") + "</b>.");
      } else {
        k.besiegt = true;
        riesenSchluerf();
        sprechblase("Neiiiin!", k.x, 300, k.z);
      }
    }
  }
}

// Eine schwarze Kanonenkugel (Level 12)
function kugelMalen(d) {
  schattenMalen(d.x, d.z, 20, 0.3);
  const p = aufsBild(d.x, 55, d.z), r = 19 * p.groesse;
  malen.fillStyle = "#111014"; malen.beginPath(); malen.arc(p.x, p.y, r + 3, 0, 6.28); malen.fill();
  malen.fillStyle = "#3d3a44"; malen.beginPath(); malen.arc(p.x, p.y, r, 0, 6.28); malen.fill();
  malen.fillStyle = "rgba(255,255,255,0.5)"; malen.beginPath(); malen.arc(p.x - r * 0.35, p.y - r * 0.35, r * 0.3, 0, 6.28); malen.fill();
}

// Ein Feuerball vom Drachen
function feuerballMalen(d) {
  schattenMalen(d.x, d.z, 22, 0.25);
  const p = aufsBild(d.x, 60 + Math.sin(d.wackeln) * 6, d.z);
  const r = 26 * p.groesse * (1 + Math.sin(zeit * 0.5) * 0.08);
  const glut = malen.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 1.8);
  glut.addColorStop(0, "rgba(255, 245, 180, 1)"); glut.addColorStop(0.35, "rgba(255, 170, 40, 0.95)");
  glut.addColorStop(0.7, "rgba(240, 60, 20, 0.6)"); glut.addColorStop(1, "rgba(240, 60, 20, 0)");
  malen.fillStyle = glut;
  malen.beginPath(); malen.arc(p.x, p.y, r * 1.8, 0, 6.28); malen.fill();
}

// Der Pümpel in der Hand: in Ruhe hält das Männchen ihn hoch – beim Schlag haut er nach vorne
function puempelInDerHandMalen() {
  const nachLinks = maennchen.richtungX < -0.3 || (Math.abs(maennchen.richtungX) <= 0.3 && maennchen.nachLinks);
  const seite = nachLinks ? -1 : 1;
  const hand = aufsBild(maennchen.x + seite * 38 + maennchen.richtungX * 10, maennchen.hoehe + 70, maennchen.z + maennchen.richtungZ * 20);
  const t = maennchen.schlag > 0 ? Math.sin((1 - maennchen.schlag / 16) * Math.PI) : 0;   // 0 → 1 → 0
  const b = bild.puempel, h = 120 * hand.groesse, w = h * b.width / b.height;
  malen.save();
  malen.translate(hand.x, hand.y);
  malen.rotate(Math.PI + seite * (0.25 + t * 1.5));     // umgedreht: der Saugnapf zeigt nach oben
  malen.drawImage(b, -w / 2, -h * 0.15, w, h);
  malen.restore();
}

// ---- 8g. Ventilator und Zeitlupen-Knopf (Level 10) --------------------
// Der Ventilator geht an, sobald der Kampf beginnt. Wer draufsteht, wird hochgepustet –
// da oben kann einem das Dynamit nichts anhaben. Der rote Knopf macht Dynamit und Feuerbälle langsamer.
let ventilator = null;
let knopf = null;
let zeitlupe = 0;           // zählt runter, solange alles langsamer fliegt

function knopfBewegen() {
  if (zeitlupe > 0) {
    zeitlupe = zeitlupe - 1;
    if (zeitlupe === 0) { tippZeigen("Die Zeitlupe ist vorbei! Drück nochmal auf den <b>roten Knopf</b>."); piep(600, 300, 0.3, "triangle"); }
  }
  if (!knopf || wechselt || geschafft) return;
  if (knopf.pause > 0) knopf.pause = knopf.pause - 1;
  const drauf = Math.hypot(maennchen.x - knopf.x, maennchen.z - knopf.z) < 48 && maennchen.hoehe < 20;
  if (drauf && zeitlupe === 0 && knopf.pause === 0) {
    zeitlupe = ZEITLUPE_DAUER;
    knopf.pause = ZEITLUPE_DAUER + 60;
    piep(900, 300, 0.6, "sine", 0, 0.25); piep(450, 150, 0.6, "triangle", 0.1, 0.2);
    for (let i = 0; i < 16; i++) sternchen(knopf.x, 30, knopf.z, "#6fd3ff");
    sprechblase("Zeitlupe!", knopf.x, 160, knopf.z);
    tippZeigen("<b>Zeitlupe!</b> Dynamit und Feuerbälle fliegen jetzt ganz langsam.");
  }
}

function ventilatorMalen() {
  const V = ventilator, g = 75, t = 60;
  // ein Metall-Gitter im Boden
  flaeche([[V.x - g, 0, V.z - t], [V.x + g, 0, V.z - t], [V.x + g, 0, V.z + t], [V.x - g, 0, V.z + t]], "#4a5560", 5);
  flaeche([[V.x - g + 10, 0, V.z - t + 8], [V.x + g - 10, 0, V.z - t + 8], [V.x + g - 10, 0, V.z + t - 8], [V.x - g + 10, 0, V.z + t - 8]], "#20262c");
  // die Flügel – sie drehen sich, wenn er an ist
  const drehung = V.an ? zeit * 0.35 : 0.4;
  for (let i = 0; i < 4; i++) {
    const w = drehung + i * Math.PI / 2;
    flaeche([[V.x, 0, V.z], [V.x + Math.cos(w) * 58, 0, V.z + Math.sin(w) * 46],
             [V.x + Math.cos(w + 0.5) * 58, 0, V.z + Math.sin(w + 0.5) * 46]], "#c9d3dc", 2);
  }
  // Gitterstäbe obendrauf
  for (let i = -2; i <= 2; i++) {
    linie([V.x + i * 28, 1, V.z - t + 8], [V.x + i * 28, 1, V.z + t - 8], "#111014", 3);
    linie([V.x - g + 10, 1, V.z + i * 22], [V.x + g - 10, 1, V.z + i * 22], "#111014", 3);
  }
  // Luft, die nach oben pustet
  if (V.an) {
    for (let i = 0; i < 6; i++) {
      const hoch = (zeit * 3 + i * 37) % 180;
      const x = V.x - 50 + i * 20;
      const a = aufsBild(x, hoch, V.z), b = aufsBild(x, hoch + 28, V.z);
      malen.strokeStyle = "rgba(255,255,255," + (0.6 - hoch / 300) + ")"; malen.lineWidth = 3;
      malen.beginPath(); malen.moveTo(a.x, a.y); malen.lineTo(b.x, b.y); malen.stroke();
    }
  }
}

function knopfMalen() {
  const K = knopf, bereit = zeitlupe === 0 && K.pause === 0;
  const p = aufsBild(K.x, 0, K.z), oben = aufsBild(K.x, bereit ? 18 : 6, K.z);
  // der graue Sockel
  malen.fillStyle = "#111014";
  malen.beginPath(); malen.ellipse(p.x, p.y, 46 * p.groesse, 18 * p.groesse, 0, 0, 6.28); malen.fill();
  malen.fillStyle = "#8e99a6";
  malen.beginPath(); malen.ellipse(p.x, p.y - 3, 40 * p.groesse, 15 * p.groesse, 0, 0, 6.28); malen.fill();
  // der Knopf: rot, wenn man ihn drücken kann – sonst blau (Zeitlupe läuft) oder grau
  const farbe = bereit ? "#e8343e" : zeitlupe > 0 ? "#6fd3ff" : "#6b5560";
  malen.fillStyle = "#111014";
  malen.fillRect(p.x - 28 * p.groesse, oben.y, 56 * p.groesse, p.y - oben.y - 3);
  malen.fillStyle = farbe;
  malen.fillRect(p.x - 25 * p.groesse, oben.y, 50 * p.groesse, p.y - oben.y - 5);
  malen.beginPath(); malen.ellipse(oben.x, oben.y, 27 * p.groesse, 11 * p.groesse, 0, 0, 6.28); malen.fill();
  malen.strokeStyle = "#111014"; malen.lineWidth = 3; malen.stroke();
  if (bereit) {      // er leuchtet, damit man ihn sieht
    malen.fillStyle = "rgba(255, 80, 80, " + (0.25 + 0.2 * Math.sin(zeit * 0.15)) + ")";
    malen.beginPath(); malen.ellipse(p.x, p.y, 70 * p.groesse, 26 * p.groesse, 0, 0, 6.28); malen.fill();
  }
  // Während der Zeitlupe zeigt ein Ring, wie lange sie noch dauert
  if (zeitlupe > 0) {
    const ring = aufsBild(K.x, 80, K.z);
    malen.strokeStyle = "#6fd3ff"; malen.lineWidth = 6;
    malen.beginPath(); malen.arc(ring.x, ring.y, 16, -Math.PI / 2, -Math.PI / 2 + 6.283 * zeitlupe / ZEITLUPE_DAUER); malen.stroke();
  }
}

// ---- 8h. Die böse Krake (Level 11) ----------------------------------
// Drei Wasserbecken. Die Krake taucht in einem auf und schlägt mit ihren Tentakeln zu –
// vorher zeigt eine rote Linie, wohin. Die Tintenkanone schießt Tintenballons: einsammeln,
// WERFEN gedrückt halten zum Zielen, loslassen – und der Ballon fliegt. Wird die Krake
// getroffen, taucht sie unter und kommt in einem anderen Becken wieder hoch.
let becken = [];
let krake = null;
let ballons = [];           // Tintenballons: fliegend oder am Boden
let kleckse = [];           // Tintenflecken auf dem Boden
let tinteModus = false;     // wirft man gerade Tintenballons (statt zu saugen)?
const wurf = { zielt: false, kraft: 0, hinweis: 0 };

// gross = true: die erwachsene Krake aus Level 12 (größer, 300 Punkte, großes Becken in der Mitte)
function krakeAufstellen(gross) {
  becken = gross
    ? [{ x: 170, z: 235, rx: 80, rz: 50 }, { x: 450, z: 175, rx: 150, rz: 78 }, { x: 730, z: 235, rx: 80, rz: 50 }]
    : [{ x: 210, z: 205, rx: 105, rz: 62 }, { x: 450, z: 175, rx: 105, rz: 62 }, { x: 690, z: 205, rx: 105, rz: 62 }];
  krake = { becken: 1, hoch: 0, zustand: "auftauchen", uhr: 0, ersteMal: true, angriffUhr: 160,
            richtX: 0, richtZ: 1, laenge: 0, getroffen: 0, besiegt: false,
            punkteMax: gross ? 300 : KRAKE_PUNKTE, treffer: gross ? 10 : TREFFER_PUNKTE,
            bild: gross ? bild.krakeGross : bild.krake, groesse: gross ? 380 : 310 };
  krake.punkte = krake.punkteMax;
  tinteModus = true;
}

function imBecken(x, z, extra) {
  return becken.some((b) => ((x - b.x) / (b.rx + extra)) ** 2 + ((z - b.z) / (b.rz + extra)) ** 2 < 1);
}

function ballonSchiessen(x, z) {
  let zx, zz, n = 0;
  do { zx = zufall(130, 770); zz = zufall(320, 530); n++; } while ((imBecken(zx, zz, 40) || Math.hypot(zx - maennchen.x, zz - maennchen.z) < 60) && n < 50);
  ballons.push({ x, z, startX: x, startZ: z, zielX: zx, zielZ: zz, flug: 0, hoehe: 70, vonKanone: true, liegt: false, wippen: 0 });
}

function krakeBewegen() {
  if (!krake || wechselt || geschafft) return;
  const K = krake, B = becken[K.becken];
  if (K.getroffen > 0) K.getroffen = K.getroffen - 1;
  if (K.zustand === "auftauchen") {
    K.hoch = Math.min(1, K.hoch + 0.03);
    if (K.hoch >= 1) { K.zustand = "oben"; K.angriffUhr = K.ersteMal ? 150 : 100; K.ersteMal = false; }
  } else if (K.zustand === "oben") {
    if (!K.passiv) K.angriffUhr = K.angriffUhr - 1;      // Level 13, erster Raum: Sie wehrt sich (noch) nicht
    if (K.angriffUhr <= 0) {
      // Sie zielt auf das Männchen – eine rote Linie zeigt, wo der Tentakel gleich hinschlägt
      const zuX = maennchen.x - B.x, zuZ = maennchen.z - B.z, weit = Math.hypot(zuX, zuZ) || 1;
      K.richtX = zuX / weit; K.richtZ = zuZ / weit;
      K.zustand = "zielt"; K.uhr = TENTAKEL_WARNEN;
      warnTon();
    }
  } else if (K.zustand === "zielt") {
    K.uhr = K.uhr - 1;
    if (K.uhr <= 0) { K.zustand = "schlaegt"; K.uhr = 0; peitschTon(); }
  } else if (K.zustand === "schlaegt") {
    K.uhr = K.uhr + 1;
    K.laenge = K.uhr < 10 ? K.uhr / 10 : K.uhr < 34 ? 1 : Math.max(0, 1 - (K.uhr - 34) / 14);
    // Trifft der Tentakel das Männchen? (Drüberspringen geht!)
    if (K.laenge > 0.2 && unverwundbar === 0 && maennchen.hoehe < 40) {
      const lang = 600 * K.laenge;
      const vx = maennchen.x - B.x, vz = maennchen.z - B.z;
      const entlang = vx * K.richtX + vz * K.richtZ;
      const quer = vx * -K.richtZ + vz * K.richtX;
      if (entlang > 40 && entlang < lang && Math.abs(quer) < 36) {
        const seite = quer < 0 ? -1 : 1;
        maennchen.stossX = -K.richtZ * seite * 12; maennchen.stossZ = K.richtX * seite * 12;
        sprechblase("KLATSCH!", maennchen.x, 200, maennchen.z);
        herzVerlieren();
      }
    }
    if (K.uhr >= 48) { K.zustand = "oben"; K.laenge = 0; K.angriffUhr = TENTAKEL_PAUSE + Math.floor(zufall(-30, 30)); }
  } else if (K.zustand === "taucht") {
    K.hoch = Math.max(0, K.hoch - 0.05);
    if (zeit % 4 === 0) blase(B);
    if (K.hoch <= 0) { K.zustand = "unten"; K.uhr = 80; }
  } else if (K.zustand === "unten") {
    K.uhr = K.uhr - 1;
    if (K.uhr <= 0) {
      const andere = [0, 1, 2].filter((i) => i !== K.becken);
      K.becken = andere[Math.floor(Math.random() * andere.length)];
      K.zustand = "auftauchen";
      for (let i = 0; i < 10; i++) blase(becken[K.becken]);
    }
  } else if (K.zustand === "besiegt") {
    K.hoch = Math.max(0, K.hoch - 0.012);
    if (zeit % 3 === 0) blase(B);
    if (K.hoch <= 0) krakeIstWeg();
  }
}

function blase(b) {
  glitzer.push({ x: b.x + zufall(-60, 60), y: 5, z: b.z + zufall(-30, 30), dx: 0, dy: zufall(2, 4), dz: 0, leben: 30, farbe: "#bfe9ff" });
}

// Die Krake ist besiegt: Aus den anderen beiden Becken kommen zwei kleine Geister – und ein Staubsauger!
function krakeIstWeg() {
  const altesBecken = becken[krake.becken];
  krake = null;
  tinteModus = false;
  ballons = [];
  wurf.zielt = false; wurf.kraft = 0;
  if (zimmer === 26) {
    kanonen = [];
    tuerOffen = true;
    setTimeout(siegesMelodie, 300);
    zaehlerZeigen("Krake: besiegt!");
    tippZeigen("Die Krake ist weg! Die <b>Tür hinten</b> ist offen.");
    return;
  }
  for (let i = 0; i < becken.length; i++) {
    if (becken[i] === altesBecken) continue;
    const g = kleinenGeistMachen(becken[i].x, becken[i].z + 20);
    geister.push(g);
    for (let j = 0; j < 12; j++) sternchen(g.x, 40, g.z, "#6fd3ff");
  }
  lachTon();
  sauger.versteckt = false; sauger.flug = 0;
  sauger.startX = altesBecken.x; sauger.startZ = altesBecken.z;
  sauger.zielX = 450; sauger.zielZ = 460;
  sauger.x = sauger.startX; sauger.z = sauger.startZ;
  zaehlerZeigen("Zwei Geister!");
  tippZeigen("Aus den Becken kommen <b>zwei Geister</b>! Schnell, hol dir den <b>Staubsauger</b>!");
}

function krakeGetroffen() {
  const K = krake, B = becken[K.becken];
  // Level 13: Hat sie die Tentakel hochgefahren, muss man die erst wegmachen
  if (K.schild) {
    K.schild = false;
    K.getroffen = 12;
    pflatschTon();
    for (let i = 0; i < 14; i++) sternchen(B.x + zufall(-60, 60), zufall(100, 220), B.z, "#c86bd6");
    sprechblase("Tentakel weg!", B.x, 300, B.z);
    tippZeigen("Die <b>Tentakel</b> sind weg – jetzt schnell nochmal werfen!");
    return;
  }
  K.punkte = Math.max(0, K.punkte - K.treffer);
  K.getroffen = 30;
  K.laenge = 0;
  for (let i = 0; i < 24; i++) sternchen(B.x + zufall(-50, 50), zufall(80, 220), B.z, i % 2 ? "#2b2f8f" : "#11124a");
  kleckse.push({ x: B.x, z: B.z, leben: 200, r: 70 });
  pflatschTon(); plumpsTon();
  if (K.punkte <= 0) {
    K.zustand = "besiegt"; K.besiegt = true;
    riesenSchluerf();
    sprechblase("Blubb… blubb… NEIIIN!", B.x, 300, B.z);
    zaehlerZeigen("Krake: besiegt!");
  } else {
    K.zustand = "taucht";
    if (K.mitSchild) K.schild = true;       // beim Auftauchen hat sie die Tentakel hochgefahren
    sprechblase("BLUBB!", B.x, 280, B.z);
    zaehlerZeigen("Krake: " + K.punkte + " Punkte");
    tippZeigen("Treffer! Die Krake taucht unter – wo kommt sie wieder hoch?");
  }
}

function ballonsBewegen() {
  if (wechselt || geschafft) return;
  for (const b of ballons) {
    if (b.liegt) {
      b.wippen = b.wippen + 0.08;
      if (ZIMMER[zimmer].band) {           // Bomben fahren auf dem Laufband mit – vorne fallen sie ins Wasser
        b.z = b.z + BAND_TEMPO;
        if (b.z > 492) { b.weg = true; pflatschTon(); for (let i = 0; i < 8; i++) blase({ x: b.x, z: b.z }); continue; }
      }
      // Einsammeln: einfach hinlaufen
      if (maennchen.tinte < 3 && Math.hypot(maennchen.x - b.x, maennchen.z - b.z) < 55) {
        b.weg = true; maennchen.tinte = maennchen.tinte + 1;
        aufhebTon();
        zaehlerZeigen((b.bombe ? "Bomben: " : "Tintenballons: ") + maennchen.tinte);
        if (maennchen.tinte === 1 && wurf.hinweis < 1) {
          wurf.hinweis = 1;
          tippZeigen(istTouch ? "Halte <b>WERFEN</b> gedrückt zum Zielen – loslassen, und der Ballon fliegt!"
                              : "Halte die <b>Leertaste</b> gedrückt zum Zielen – loslassen, und der Ballon fliegt!");
        }
      }
      continue;
    }
    // Er fliegt im Bogen
    b.flug = Math.min(1, b.flug + (b.vonKanone ? 1 / 50 : 1 / 32));
    b.x = b.startX + (b.zielX - b.startX) * b.flug;
    b.z = b.startZ + (b.zielZ - b.startZ) * b.flug;
    b.hoehe = (b.vonKanone ? 70 : 60) * (1 - b.flug) + Math.sin(b.flug * Math.PI) * (b.vonKanone ? 200 : 150);
    if (b.flug >= 1) {
      if (b.vonKanone) { b.liegt = true; b.hoehe = 0; continue; }
      // Ein geworfener Ballon landet: Trifft er die Krake?
      b.weg = true;
      // Level 14: Eine geworfene Bombe – trifft sie Kabumm?
      if (b.bombe) {
        const k = bosse.find((x) => x.bandBoss && !x.besiegt);
        if (k && Math.abs(b.x - k.x) < 90 && Math.abs(b.z - k.z) < 75) { kabummGetroffen(k); continue; }
        bummTon();
        for (let i = 0; i < 14; i++) sternchen(b.x + zufall(-30, 30), zufall(10, 80), b.z, i % 2 ? "#ffb347" : "#9aa3ad");
        sprechblase("Daneben!", b.x, 120, b.z);
        continue;
      }
      const K = krake;
      if (K && !K.besiegt && K.hoch > 0.4 && K.zustand !== "taucht") {
        const B = becken[K.becken];
        if (((b.x - B.x) / (B.rx + 35)) ** 2 + ((b.z - B.z) / (B.rz + 45)) ** 2 < 1) { krakeGetroffen(); continue; }
      }
      // Daneben: ein Tintenfleck (oder es platscht ins Wasser)
      pflatschTon();
      if (imBecken(b.x, b.z, 0)) { for (let i = 0; i < 8; i++) blase({ x: b.x, z: b.z }); }
      else kleckse.push({ x: b.x, z: b.z, leben: 240, r: 34 });
      sprechblase("Daneben!", b.x, 120, b.z);
    }
  }
  ballons = ballons.filter((b) => !b.weg);
  for (const k of kleckse) k.leben = k.leben - 1;
  kleckse = kleckse.filter((k) => k.leben > 0);
}

// WERFEN gedrückt halten: Je länger, desto weiter. Loslassen: Der Ballon fliegt!
function wurfZiel() {
  const weit = 110 + wurf.kraft * WURF_WEITE;
  return { x: Math.max(30, Math.min(BREITE - 30, maennchen.x + maennchen.richtungX * weit)),
           z: Math.max(20, Math.min(TIEFE - 20, maennchen.z + maennchen.richtungZ * weit * 0.85)) };
}
function wurfBewegen() {
  if (!tinteModus || wechselt || geschafft) { wurf.zielt = false; return; }
  if (gedrueckt.saugen) {
    if (maennchen.tinte > 0) {
      wurf.zielt = true;
      wurf.kraft = Math.min(1, wurf.kraft + 1 / 55);
    } else if (wurf.hinweis < 2 && (krake || ZIMMER[zimmer].band)) {
      wurf.hinweis = 2;
      tippZeigen(ZIMMER[zimmer].band ? "Du hast noch keine <b>Bombe</b>. Kabumm wirft welche aufs Laufband – sammle sie ein!"
                                     : "Du hast noch keinen <b>Tintenballon</b>. Die Tintenkanone schießt welche – sammle sie ein!");
    }
  } else if (wurf.zielt) {
    const z = wurfZiel();
    ballons.push({ x: maennchen.x, z: maennchen.z, startX: maennchen.x, startZ: maennchen.z, zielX: z.x, zielZ: z.z,
                   flug: 0, hoehe: 60, vonKanone: false, liegt: false, wippen: 0, bombe: !!ZIMMER[zimmer].band });
    maennchen.tinte = maennchen.tinte - 1;
    zaehlerZeigen((ZIMMER[zimmer].band ? "Bomben: " : "Tintenballons: ") + maennchen.tinte);
    piep(400, 700, 0.15, "triangle", 0, 0.2);
    wurf.zielt = false; wurf.kraft = 0;
  }
}

function beckenMalen() {
  for (const b of becken) {
    const ecken = [];
    for (let i = 0; i < 28; i++) { const w = i / 28 * 6.283; ecken.push([b.x + Math.cos(w) * (b.rx + 14), 0, b.z + Math.sin(w) * (b.rz + 12)]); }
    flaeche(ecken, "#8e99a6", 5);             // der Steinrand
    const wasser = [];
    for (let i = 0; i < 28; i++) { const w = i / 28 * 6.283; wasser.push([b.x + Math.cos(w) * b.rx, 0, b.z + Math.sin(w) * b.rz]); }
    flaeche(wasser, "#2f7fd0");
    for (let i = 0; i < 3; i++) {             // kleine Wellen
      const p = aufsBild(b.x - 50 + i * 50 + Math.sin(zeit * 0.05 + i) * 10, 0, b.z - 15 + i * 12);
      malen.strokeStyle = "rgba(255,255,255,0.5)"; malen.lineWidth = 3;
      malen.beginPath(); malen.arc(p.x, p.y, 14 * p.groesse, 3.5, 5.9); malen.stroke();
    }
  }
  // Tintenflecken
  for (const k of kleckse) {
    const p = aufsBild(k.x, 0, k.z);
    malen.globalAlpha = Math.min(1, k.leben / 60) * 0.8;
    malen.fillStyle = "#1b1d5e";
    malen.beginPath(); malen.ellipse(p.x, p.y, k.r * p.groesse * 1.3, k.r * p.groesse * 0.45, 0, 0, 6.28); malen.fill();
    malen.globalAlpha = 1;
  }
  // Die rote Warn-Linie: Da schlägt der Tentakel gleich hin!
  if (krake && krake.zustand === "zielt") {
    const B = becken[krake.becken];
    malen.globalAlpha = zeit % 10 < 5 ? 0.95 : 0.55;
    linie([B.x + krake.richtX * 60, 2, B.z + krake.richtZ * 60], [B.x + krake.richtX * 600, 2, B.z + krake.richtZ * 600], "rgba(255, 42, 60, 0.25)", 40);
    for (let i = 1; i < 15; i++) {
      const a = 40 + i * 40;
      linie([B.x + krake.richtX * a, 2, B.z + krake.richtZ * a], [B.x + krake.richtX * (a + 24), 2, B.z + krake.richtZ * (a + 24)], "#ff2a3c", 14);
    }
    malen.globalAlpha = 1;
  }
}

function krakeMalen() {
  const K = krake, B = becken[K.becken];
  const p = aufsBild(B.x, 0, B.z);
  // der Tentakel
  if (K.zustand === "schlaegt" && K.laenge > 0) {
    const lang = 600 * K.laenge, punkte = [];   // (so lang wie die rote Linie)
    for (let i = 0; i <= 24; i++) {
      const a = 30 + (lang - 30) * i / 24, welle = Math.sin(i * 0.9 + zeit * 0.4) * 10;
      punkte.push(aufsBild(B.x + K.richtX * a - K.richtZ * welle, 22, B.z + K.richtZ * a + K.richtX * welle));
    }
    for (const [farbe, breite] of [["#111014", 30], ["#9c40aa", 20]]) {
      malen.strokeStyle = farbe; malen.lineCap = "round"; malen.lineJoin = "round";
      malen.lineWidth = breite * p.groesse;
      malen.beginPath(); punkte.forEach((q, i) => (i ? malen.lineTo(q.x, q.y) : malen.moveTo(q.x, q.y))); malen.stroke();
    }
    malen.fillStyle = "#ffaac8";
    for (let i = 2; i < punkte.length; i += 3) { malen.beginPath(); malen.arc(punkte[i].x, punkte[i].y + 3, 4, 0, 6.28); malen.fill(); }
  }
  if (K.hoch <= 0) return;
  // Die Krake – nur der Teil über dem Wasser ist zu sehen
  const b = K.bild, h = K.groesse * p.groesse, w = h * b.width / b.height;
  const unten = p.y + h * 0.18 + (1 - K.hoch) * h * 1.05 + Math.sin(zeit * 0.06) * 4;
  malen.save();
  malen.beginPath(); malen.rect(0, 0, 960, p.y + 4); malen.clip();
  if (K.getroffen > 0) malen.filter = zeit % 6 < 3 ? "brightness(0.35)" : "none";   // voller Tinte!
  const zittern = K.zustand === "zielt" ? zufall(-2, 2) : 0;
  malen.drawImage(b, p.x - w / 2 + zittern, unten - h, w, h);
  malen.restore();
  // die Wasserlinie davor
  malen.strokeStyle = "rgba(255,255,255,0.7)"; malen.lineWidth = 4;
  malen.beginPath(); malen.ellipse(p.x, p.y, 60 * p.groesse * 1.6, 10 * p.groesse, 0, 0.1, 3.04); malen.stroke();
  // Der Tentakel-Schild: zwei hochgefahrene Tentakel vor dem Gesicht
  if (K.schild && K.hoch > 0.5) {
    for (const seite of [-1, 1]) {
      const pkt = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        pkt.push({ x: p.x + seite * (h * 0.32 - t * h * 0.5) + Math.sin(t * 4 + zeit * 0.1) * 6, y: p.y - t * h * 0.75 * K.hoch });
      }
      for (const [farbe, breite] of [["#111014", 26], [K.bild === bild.krakeGross ? "#ce3442" : "#9c40aa", 17]]) {
        malen.strokeStyle = farbe; malen.lineWidth = breite * p.groesse; malen.lineCap = "round"; malen.lineJoin = "round";
        malen.beginPath(); pkt.forEach((q, i) => (i ? malen.lineTo(q.x, q.y) : malen.moveTo(q.x, q.y))); malen.stroke();
      }
    }
  }
  if (K.zustand === "zielt") jagdZeichenMalen(B.x, 270 * K.hoch, B.z);
  // Der Boss-Balken unten drunter – mit Punkten
  if (K.hoch > 0.3) {
    const q = aufsBild(B.x, 0, B.z + B.rz + 34), breite = 150, hoehe = 16;
    malen.fillStyle = "#111014"; malen.beginPath(); malen.roundRect(q.x - breite / 2 - 4, q.y - 4, breite + 8, hoehe + 8, 10); malen.fill();
    malen.fillStyle = "#3a2a3a"; malen.beginPath(); malen.roundRect(q.x - breite / 2, q.y, breite, hoehe, 7); malen.fill();
    malen.fillStyle = "#c86bd6"; malen.beginPath(); malen.roundRect(q.x - breite / 2, q.y, Math.max(8, breite * K.punkte / K.punkteMax), hoehe, 7); malen.fill();
    malen.fillStyle = "#fff4fa"; malen.font = "800 15px 'Baloo 2', sans-serif"; malen.textAlign = "center";
    malen.fillText(K.punkte + " Punkte", q.x, q.y + 13);
  }
}

function ballonMalen(b) {
  if (b.bombe) { bombeMalen(b); return; }
  schattenMalen(b.x, b.z, 18, 0.25);
  const p = aufsBild(b.x, b.hoehe + 18 + (b.liegt ? Math.sin(b.wippen) * 4 : 0), b.z);
  const r = 17 * p.groesse;
  if (b.liegt) {           // er leuchtet, damit man ihn sieht
    malen.fillStyle = "rgba(111, 140, 255, " + (0.25 + 0.15 * Math.sin(zeit * 0.12)) + ")";
    malen.beginPath(); malen.arc(p.x, p.y, r * 2, 0, 6.28); malen.fill();
  }
  malen.fillStyle = "#111014"; malen.beginPath(); malen.ellipse(p.x, p.y, r + 3, r * 1.15 + 3, 0, 0, 6.28); malen.fill();
  malen.fillStyle = "#2b2f8f"; malen.beginPath(); malen.ellipse(p.x, p.y, r, r * 1.15, 0, 0, 6.28); malen.fill();
  malen.fillStyle = "rgba(255,255,255,0.6)"; malen.beginPath(); malen.ellipse(p.x - r * 0.35, p.y - r * 0.4, r * 0.25, r * 0.35, -0.4, 0, 6.28); malen.fill();
  malen.fillStyle = "#111014"; malen.beginPath(); malen.moveTo(p.x - 4, p.y + r * 1.15 + 5); malen.lineTo(p.x + 4, p.y + r * 1.15 + 5); malen.lineTo(p.x, p.y + r * 1.1); malen.fill();
}

function zielMalen() {
  if (!wurf.zielt) return;
  const z = wurfZiel();
  // gepunktete Flug-Linie und ein Ziel-Kreis am Boden
  for (let i = 1; i < 12; i++) {
    const t = i / 12;
    const q = aufsBild(maennchen.x + (z.x - maennchen.x) * t, 60 + Math.sin(t * Math.PI) * 150, maennchen.z + (z.z - maennchen.z) * t);
    malen.fillStyle = "rgba(255,255,255,0.85)"; malen.beginPath(); malen.arc(q.x, q.y, 4, 0, 6.28); malen.fill();
  }
  const p = aufsBild(z.x, 0, z.z);
  let trifft = false;
  const kb = bosse.find((x) => x.bandBoss && !x.besiegt);
  if (kb && Math.abs(z.x - kb.x) < 90 && Math.abs(z.z - kb.z) < 75) trifft = true;
  if (krake && krake.hoch > 0.4 && !krake.besiegt) {
    const B = becken[krake.becken];
    trifft = ((z.x - B.x) / (B.rx + 35)) ** 2 + ((z.z - B.z) / (B.rz + 45)) ** 2 < 1;
  }
  malen.strokeStyle = trifft ? "#7dff9a" : "#fff4fa"; malen.lineWidth = 4;
  malen.beginPath(); malen.ellipse(p.x, p.y, 30 * p.groesse * 1.5, 30 * p.groesse * 0.5, 0, 0, 6.28); malen.stroke();
}

// ---- 8i. Der Kürbis (Level 13) ---------------------------------------
// Man muss dreimal auf ihn draufspringen. Von der Seite anrempeln kostet ein Herz.
function kuerbisBewegen() {
  if (maennchen.hoehe === 0) maennchen.nachStampf = false;    // erst wieder landen, dann zählt der nächste Sprung
  for (const k of bosse) {
    if (!k.kuerbis || k.besiegt) continue;
    if (k.angriff) kuerbisTentakel(k);
    if (k.getroffen > 0) k.getroffen = k.getroffen - 1;
    if (k.stampfPause > 0) { k.stampfPause = k.stampfPause - 1; continue; }
    const weit = Math.hypot(maennchen.x - k.x, (maennchen.z - k.z) * 1.3);
    if (maennchen.hoehe > 15 && weit < k.radius + 45 && !maennchen.nachStampf && k.schild) {
      // Die Krake hat ihre Tentakel hochgefahren: Der Sprung macht nur die Tentakel weg
      k.schild = false;
      k.stampfPause = 40;
      maennchen.sprungTempo = 9;
      maennchen.nachStampf = true;
      pflatschTon();
      for (let i = 0; i < 14; i++) sternchen(k.x + zufall(-50, 50), zufall(120, 220), k.z, "#c86bd6");
      sprechblase("Tentakel weg!", k.x, 260, k.z);
      tippZeigen("Die <b>Tentakel</b> sind weg – jetzt nochmal draufspringen!");
      continue;
    }
    if (maennchen.hoehe > 15 && weit < k.radius + 45 && !maennchen.nachStampf) {   // großzügig: Hauptsache, man springt über ihm
      // Draufgesprungen! Er wird platt gedrückt und das Männchen hüpft wieder hoch.
      k.kraft = k.kraft - 1;
      k.getroffen = 24;
      k.stampfPause = 50;
      k.schubsPause = 70;
      maennchen.sprungTempo = 9;
      maennchen.nachStampf = true;
      // Er hüpft ein Stück weg
      const wegX = k.x - maennchen.x, wegZ = k.z - maennchen.z, w = Math.hypot(wegX, wegZ) || 1;
      k.x = Math.max(120, Math.min(BREITE - 120, k.x + (wegX / w) * 110));
      k.z = Math.max(k.zMin, Math.min(TIEFE - 80, k.z + (wegZ / w) * 80));
      plumpsTon(); boingTon();
      for (let i = 0; i < 16; i++) sternchen(k.x + zufall(-50, 50), zufall(60, 140), k.z, i % 2 ? "#f58c1e" : "#ffd34d");
      if (k.kraft <= 0) {
        k.besiegt = true;
        riesenSchluerf();
        sprechblase("KNACKS!", k.x, 220, k.z);
      } else {
        k.jagt = k.jagt + 0.25;       // er wird wütend und schneller
        if (k.mitKrake) k.schild = true;   // die Krake im Kürbis fährt ihre Tentakel hoch
        sprechblase(k.kraft === 2 ? "AUA!" : "Nur noch einmal!", k.x, 220, k.z);
        if (k.mitKrake) tippZeigen("Treffer! Jetzt hat die Krake ihre <b>Tentakel</b> hochgefahren – spring drauf, dann sind sie weg. Noch <b>" + k.kraft + "-mal</b> treffen!");
        else tippZeigen("Super! Noch <b>" + k.kraft + "-mal</b> draufspringen!");
      }
    }
  }
}

// Die Krake im Kürbis wehrt sich: Sie schlägt mit einem Tentakel zu – vorher zeigt eine rote Linie, wohin.
function kuerbisTentakel(k) {
  const A = k.angriff;
  if (wechselt || geschafft || k.liegt > 0) return;
  if (A.zustand === "warten") {
    A.uhr = A.uhr - 1;
    if (A.uhr <= 0) {
      const zuX = maennchen.x - k.x, zuZ = maennchen.z - k.z, weit = Math.hypot(zuX, zuZ) || 1;
      A.rx = zuX / weit; A.rz = zuZ / weit;
      A.ox = k.x; A.oz = k.z;
      A.zustand = "zielt"; A.uhr = TENTAKEL_WARNEN;
      warnTon();
    }
  } else if (A.zustand === "zielt") {
    A.uhr = A.uhr - 1;
    if (A.uhr <= 0) { A.zustand = "schlaegt"; A.uhr = 0; peitschTon(); }
  } else if (A.zustand === "schlaegt") {
    A.uhr = A.uhr + 1;
    A.laenge = A.uhr < 10 ? A.uhr / 10 : A.uhr < 34 ? 1 : Math.max(0, 1 - (A.uhr - 34) / 14);
    if (A.laenge > 0.2 && unverwundbar === 0 && maennchen.hoehe < 40) {
      const vx = maennchen.x - A.ox, vz = maennchen.z - A.oz;
      const entlang = vx * A.rx + vz * A.rz, quer = vx * -A.rz + vz * A.rx;
      if (entlang > 40 && entlang < 520 * A.laenge && Math.abs(quer) < 36) {
        const seite = quer < 0 ? -1 : 1;
        maennchen.stossX = -A.rz * seite * 12; maennchen.stossZ = A.rx * seite * 12;
        sprechblase("KLATSCH!", maennchen.x, 200, maennchen.z);
        herzVerlieren();
      }
    }
    if (A.uhr >= 48) { A.zustand = "warten"; A.laenge = 0; A.uhr = 230 + Math.floor(zufall(-30, 30)); }
  }
}

// Die rote Warn-Linie am Boden (vor allen Figuren gemalt)
function kuerbisWarnungMalen() {
  for (const k of bosse) {
    if (!k.kuerbis || !k.angriff || k.angriff.zustand !== "zielt") continue;
    const A = k.angriff;
    malen.globalAlpha = zeit % 10 < 5 ? 0.95 : 0.55;
    for (let i = 1; i < 13; i++) {
      const a = 40 + i * 40;
      linie([A.ox + A.rx * a, 2, A.oz + A.rz * a], [A.ox + A.rx * (a + 24), 2, A.oz + A.rz * (a + 24)], "#ff2a3c", 14);
    }
    malen.globalAlpha = 1;
  }
}

// Der zuschlagende Tentakel (als Figur, damit er richtig vor oder hinter dem Männchen liegt)
function kuerbisTentakelMalen(k) {
  const A = k.angriff;
  if (A.zustand !== "schlaegt" || A.laenge <= 0) return;
  const p = aufsBild(A.ox, 0, A.oz), lang = 520 * A.laenge, punkte = [];
  for (let i = 0; i <= 22; i++) {
    const a = 30 + (lang - 30) * i / 22, welle = Math.sin(i * 0.9 + zeit * 0.4) * 10;
    punkte.push(aufsBild(A.ox + A.rx * a - A.rz * welle, 22, A.oz + A.rz * a + A.rx * welle));
  }
  for (const [farbe, breite] of [["#111014", 30], ["#9c40aa", 20]]) {
    malen.strokeStyle = farbe; malen.lineCap = "round"; malen.lineJoin = "round"; malen.lineWidth = breite * p.groesse;
    malen.beginPath(); punkte.forEach((q, i) => (i ? malen.lineTo(q.x, q.y) : malen.moveTo(q.x, q.y))); malen.stroke();
  }
  malen.fillStyle = "#ffaac8";
  for (let i = 2; i < punkte.length; i += 3) { malen.beginPath(); malen.arc(punkte[i].x, punkte[i].y + 3, 4, 0, 6.28); malen.fill(); }
}

// Die Krake, die oben aus dem Kürbis schaut – mit hochgefahrenen Tentakeln, wenn sie sich schützt
function kuerbisKrakeMalen(k, x, y, h) {
  const b = bild.krake, kh = h * 0.9, kw = kh * b.width / b.height;
  const wackeln = Math.sin(zeit * 0.08) * 3;
  malen.drawImage(b, x - kw / 2, y - h * 0.68 - kh + wackeln, kw, kh);
  if (k.schild) {
    for (const seite of [-1, 1]) {
      const pkt = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        pkt.push({ x: x + seite * (h * 0.38 - t * h * 0.5) + Math.sin(t * 4 + zeit * 0.1) * 5, y: y - h * 0.75 - t * h * 0.8 });
      }
      for (const [farbe, breite] of [["#111014", 30], ["#9c40aa", 20]]) {
        malen.strokeStyle = farbe; malen.lineWidth = breite * h / 200; malen.lineCap = "round"; malen.lineJoin = "round";
        malen.beginPath(); pkt.forEach((q, i) => (i ? malen.lineTo(q.x, q.y) : malen.moveTo(q.x, q.y))); malen.stroke();
      }
    }
  }
}

// ---- 8e. Die Bewegungsfalle (Level 8) --------------------------------
// Eine Metall-Platte am Boden, links und rechts an Seilen. Sie fährt immer im Viereck:
// nach rechts, nach vorne, nach links, nach hinten. Wer draufsteht, fährt mit –
// und jedes Mal, wenn sie die Richtung wechselt, gibt es einen Schubs!
let platte = null;
const PLATTE_WEG = [[300, 210], [600, 210], [600, 410], [300, 410]];   // die vier Ecken, die sie abfährt

function platteAufstellen() {
  platte = { x: PLATTE_WEG[0][0], z: PLATTE_WEG[0][1], breite: 250, tiefe: 150, ziel: 1, dx: 0, dz: 0, warten: 60 };
}
function aufDerPlatte() {
  return Math.abs(maennchen.x - platte.x) < platte.breite / 2 && Math.abs(maennchen.z - platte.z) < platte.tiefe / 2;
}
function platteBewegen() {
  if (!platte || wechselt || geschafft) return;
  if (platte.warten > 0) {
    platte.warten = platte.warten - 1;
    platte.dx = 0; platte.dz = 0;
    if (platte.warten === 0 && maennchen.hoehe === 0 && aufDerPlatte()) {
      // Ruck! Sie fährt los – und schubst einen in die neue Richtung
      const [zx, zz] = PLATTE_WEG[platte.ziel];
      const weit = Math.hypot(zx - platte.x, zz - platte.z) || 1;
      maennchen.stossX = ((zx - platte.x) / weit) * 9;
      maennchen.stossZ = ((zz - platte.z) / weit) * 9;
      klapperTon();
      sprechblase("Huiii!", maennchen.x, 220, maennchen.z);
    }
    return;
  }
  const [zx, zz] = PLATTE_WEG[platte.ziel];
  const weit = Math.hypot(zx - platte.x, zz - platte.z);
  if (weit <= PLATTE_TEMPO) {
    platte.x = zx; platte.z = zz; platte.dx = 0; platte.dz = 0;
    platte.ziel = (platte.ziel + 1) % PLATTE_WEG.length;
    platte.warten = 35;
    return;
  }
  platte.dx = ((zx - platte.x) / weit) * PLATTE_TEMPO;
  platte.dz = ((zz - platte.z) / weit) * PLATTE_TEMPO;
  platte.x = platte.x + platte.dx;
  platte.z = platte.z + platte.dz;
}
function platteMalen() {
  const P = platte, x1 = P.x - P.breite / 2, x2 = P.x + P.breite / 2, z1 = P.z - P.tiefe / 2, z2 = P.z + P.tiefe / 2;
  // die Seile links und rechts zur Wand – mit einer Rolle an der Wand
  for (const [vonX, wandX] of [[x1, 0], [x2, BREITE]]) {
    linie([vonX, 14, P.z], [wandX, 40, P.z], "#3b2a1a", 6);
    linie([vonX, 14, P.z], [wandX, 40, P.z], "#c8a46a", 3);
    const rolle = aufsBild(wandX, 40, P.z);
    malen.fillStyle = "#111014"; malen.beginPath(); malen.arc(rolle.x, rolle.y, 9, 0, 6.28); malen.fill();
    malen.fillStyle = "#9aa3ad"; malen.beginPath(); malen.arc(rolle.x, rolle.y, 5, 0, 6.28); malen.fill();
  }
  // die Platte mit gelb-schwarzem Warnrand
  flaeche([[x1, 0, z1], [x2, 0, z1], [x2, 0, z2], [x1, 0, z2]], "#ffd34d", 5);
  for (let i = 0; i < 10; i++) {
    const a = x1 + i * P.breite / 10;
    flaeche([[a, 0, z1], [a + P.breite / 20, 0, z1], [a + P.breite / 20 + 8, 0, z2], [a + 8, 0, z2]], "rgba(17,16,20,0.85)");
  }
  flaeche([[x1 + 18, 0, z1 + 16], [x2 - 18, 0, z1 + 16], [x2 - 18, 0, z2 - 16], [x1 + 18, 0, z2 - 16]], "#8e99a6", 3);
  // ein Pfeil zeigt, wohin sie als Nächstes fährt
  const [zx, zz] = PLATTE_WEG[P.ziel];
  const weit = Math.hypot(zx - P.x, zz - P.z) || 1, rx = (zx - P.x) / weit, rz = (zz - P.z) / weit;
  const qx = -rz, qz = rx, l = 46, b = 26;
  const blinken = P.warten > 0 && Math.floor(zeit / 6) % 2 === 0;
  flaeche([[P.x + rx * l, 0, P.z + rz * l], [P.x + qx * b, 0, P.z + qz * b], [P.x - rx * 10 + qx * 10, 0, P.z - rz * 10 + qz * 10],
           [P.x - rx * l + qx * 10, 0, P.z - rz * l + qz * 10], [P.x - rx * l - qx * 10, 0, P.z - rz * l - qz * 10],
           [P.x - rx * 10 - qx * 10, 0, P.z - rz * 10 - qz * 10], [P.x - qx * b, 0, P.z - qz * b]], blinken ? "#ff5a5a" : "#ffd34d", 3);
}

// Welches Bild gehört zu diesem Gegner?
function bossBild(k) {
  if (k.skelett) return bild.skelett;
  if (k.bandBoss) return bild.kabumm;
  if (k.kuerbis) return bild.kuerbis;
  if (k.drache) return k.maulAuf > 0 || k.besiegt ? bild.dracheFeuer : bild.drache;
  if (!k.truhe) return bild.koenig;
  if (k.besiegt || k.zappeln) return bild.truheAuf;                        // beim Einsaugen reißt sie den Deckel auf
  return Math.floor(zeit / 10) % 2 === 0 ? bild.truheAuf : bild.truheZu;   // sonst: auf, zu, auf, zu …
}

// Die Truhe, solange sie noch still dasteht
function truheMalen() {
  const p = aufsBild(truhe.x, 0, truhe.z);
  if (!truhe.offen) {      // sie leuchtet, damit man hingeht
    const puls = 1 + Math.sin(zeit * 0.1) * 0.12;
    malen.fillStyle = "rgba(255, 211, 77, 0.45)";
    malen.beginPath(); malen.ellipse(p.x, p.y, 95 * puls * p.groesse, 30 * puls * p.groesse, 0, 0, 6.28); malen.fill();
  }
  schattenMalen(truhe.x, truhe.z, 58, 0.28);
  bildMalenAufFuessen(truhe.offen ? bild.truheAuf : bild.truheZu, p.x, p.y + 8 * p.groesse, truhe.groesse * p.groesse, false);
}

// ---- 9. Geräusche ------------------------------------------------
// Der Computer macht die Geräusche selbst – ganz ohne Sounddateien.
let ton = null;
let saugGeraeusch = null;
function tonStarten() {
  if (ton) { if (ton.state === "suspended") ton.resume(); musikStarten(); return; }
  const Klang = window.AudioContext || window.webkitAudioContext;
  if (!Klang) return;
  ton = new Klang();
  // Rauschen erzeugen: ganz viele Zufallszahlen hintereinander
  const puffer = ton.createBuffer(1, ton.sampleRate, ton.sampleRate);
  const daten = puffer.getChannelData(0);
  for (let i = 0; i < daten.length; i++) daten[i] = Math.random() * 2 - 1;
  const quelle = ton.createBufferSource(); quelle.buffer = puffer; quelle.loop = true;
  const filter = ton.createBiquadFilter(); filter.type = "bandpass"; filter.frequency.value = 900; filter.Q.value = 0.8;
  const lautstaerke = ton.createGain(); lautstaerke.gain.value = 0;
  quelle.connect(filter); filter.connect(lautstaerke); lautstaerke.connect(ton.destination);
  quelle.start();
  saugGeraeusch = { lautstaerke, filter };
  musikStarten();
}
// ---- 9b. Die Musik ------------------------------------------------
// Zwei Lieder: eins für die normalen Räume, eins, sobald ein Boss da ist. Beim Wechsel wird übergeblendet.
// Der ♪-Knopf oben links schaltet die Musik an und aus (das merkt sich das Tablet).
const MUSIK = { level: "musik/level.mp3", boss: "musik/boss.mp3" };
const MUSIK_LAUT = 0.32;          // so laut ist die Musik (1 = ganz laut) – die Geräusche sollen noch gut zu hören sein
let musikAn = true;
try { musikAn = localStorage.getItem("geisterjagd-musik") !== "aus"; } catch (e) { /* egal */ }
const musik = { gestartet: false, gewuenscht: "level", wechselUhr: 0, spieler: {}, laut: { level: 0, boss: 0 } };

function musikSpieler(name) {
  if (musik.spieler[name]) return musik.spieler[name];
  const a = new Audio();
  a.loop = true;
  const sp = { audio: a, regler: null, bereit: false, modus: "audio", daten: null, quelle: null, wartet: 0 };
  musik.spieler[name] = sp;
  // Über die Lautstärke-Regler von Web Audio (so klappt das Überblenden auch auf dem iPad)
  try {
    if (ton) { sp.regler = ton.createGain(); sp.regler.gain.value = 0; sp.regler.connect(ton.destination);
               ton.createMediaElementSource(a).connect(sp.regler); }
  } catch (e) { /* dann eben ohne */ }
  if (!sp.regler) a.volume = 0;
  // Klappt das Abspielen über den Audio-Spieler nicht (z. B. in der Claude-Vorschau), spielen wir das Lied direkt über Web Audio
  a.addEventListener("error", () => musikDirekt(sp));
  fetch(MUSIK[name]).then((antwort) => (antwort.ok ? antwort.arrayBuffer() : Promise.reject()))
    .then((daten) => { sp.daten = daten; a.src = URL.createObjectURL(new Blob([daten], { type: "audio/mpeg" })); sp.bereit = true; })
    .catch(() => { a.src = MUSIK[name]; sp.bereit = true; });
  return sp;
}

// Plan B: das Lied in Web Audio entschlüsseln und als Endlosschleife abspielen
function musikDirekt(sp) {
  if (sp.modus === "direkt" || !ton || !sp.daten || !sp.regler) return;
  sp.modus = "direkt";
  try { sp.audio.pause(); } catch (e) { /* egal */ }
  ton.decodeAudioData(sp.daten.slice(0)).then((puffer) => { sp.puffer = puffer; musikDirektVonVorne(sp); }).catch(() => { /* dann ohne Musik */ });
}
function musikDirektVonVorne(sp) {
  if (!sp.puffer) return;
  try { if (sp.quelle) sp.quelle.stop(); } catch (e) { /* egal */ }
  sp.quelle = ton.createBufferSource();
  sp.quelle.buffer = sp.puffer; sp.quelle.loop = true;
  sp.quelle.connect(sp.regler);
  sp.quelle.start(0);
}

function musikStarten() {
  if (musik.gestartet || !ton) return;
  musik.gestartet = true;
  musikSpieler("level");
  setTimeout(() => musikSpieler("boss"), 4000);      // das Boss-Lied lädt etwas später nach
}

function musikBewegen() {
  if (!musik.gestartet) return;
  // Ist gerade ein Boss da? (Ein großer Balken oben, die Krake oder Kabumm)
  const bossDa = bosse.some((b) => (b.balkenOben || b.bandBoss) && !b.besiegt && !b.wartet) || (krake && !krake.besiegt);
  const soll = bossDa ? "boss" : "level";
  if (soll !== musik.gewuenscht) {
    musik.wechselUhr = musik.wechselUhr + 1;
    if (musik.wechselUhr > 40) {               // erst wechseln, wenn es wirklich so bleibt
      musik.gewuenscht = soll; musik.wechselUhr = 0;
      const neu = musik.spieler[soll];         // ein neuer Boss: das Lied fängt von vorne an
      if (neu && neu.modus === "audio" && neu.audio.paused) neu.audio.currentTime = 0;
      if (neu && neu.modus === "direkt" && musik.laut[soll] === 0) musikDirektVonVorne(neu);
    }
  } else musik.wechselUhr = 0;
  for (const name of ["level", "boss"]) {
    const sp = name === musik.gewuenscht ? musikSpieler(name) : musik.spieler[name];
    if (!sp) continue;
    const ziel = musikAn && !document.hidden && name === musik.gewuenscht ? MUSIK_LAUT : 0;
    const l = musik.laut[name];
    musik.laut[name] = ziel > l ? Math.min(ziel, l + 0.012) : Math.max(ziel, l - 0.02);
    if (sp.regler) sp.regler.gain.value = musik.laut[name]; else sp.audio.volume = musik.laut[name];
    if (sp.modus !== "audio") continue;
    if (ziel > 0 && sp.bereit && sp.audio.paused) {
      sp.audio.play().catch((e) => { if (e && e.name === "NotSupportedError") musikDirekt(sp); });
    }
    // Wächter: Soll das Lied laufen, kommt aber nach 3 Sekunden immer noch nichts? Dann Plan B.
    if (ziel > 0 && sp.bereit && sp.daten) {
      sp.wartet = sp.audio.currentTime > 0 ? 0 : sp.wartet + 1;
      if (sp.wartet > 180) musikDirekt(sp);
    }
    if (musik.laut[name] === 0 && !sp.audio.paused) sp.audio.pause();
  }
}

function musikUmschalten() {
  musikAn = !musikAn;
  try { localStorage.setItem("geisterjagd-musik", musikAn ? "an" : "aus"); } catch (e) { /* egal */ }
  musikKnopfZeigen();
  tonStarten();
}
function musikKnopfZeigen() {
  const k = document.getElementById("musikknopf");
  k.textContent = "♪";
  k.classList.toggle("aus", !musikAn);
  k.setAttribute("aria-label", musikAn ? "Musik ausschalten" : "Musik einschalten");
}
document.getElementById("musikknopf").addEventListener("click", musikUmschalten);
musikKnopfZeigen();

function saugTonAnpassen() {
  if (!saugGeraeusch) return;
  saugGeraeusch.lautstaerke.gain.setTargetAtTime(saugtGerade ? 0.12 : 0, ton.currentTime, 0.05);
  saugGeraeusch.filter.frequency.setTargetAtTime(saugtGerade ? 700 + Math.sin(zeit * 0.3) * 150 : 900, ton.currentTime, 0.05);
}
// Ein kurzer Ton, der von einer Höhe zur anderen rutscht
function piep(vonHz, bisHz, dauer, form, verzoegerung, laut) {
  if (!ton) return;
  const start = ton.currentTime + (verzoegerung || 0);
  const o = ton.createOscillator(); const g = ton.createGain();
  o.type = form || "sine";
  o.frequency.setValueAtTime(vonHz, start);
  o.frequency.exponentialRampToValueAtTime(bisHz, start + dauer);
  g.gain.setValueAtTime(laut || 0.25, start);
  g.gain.exponentialRampToValueAtTime(0.001, start + dauer);
  o.connect(g); g.connect(ton.destination);
  o.start(start); o.stop(start + dauer + 0.02);
}
function schluerfTon()  { piep(900, 140, 0.35, "sawtooth"); piep(1300, 1800, 0.12, "sine", 0.3); }
function aufhebTon()    { piep(520, 1040, 0.15, "square"); piep(780, 1560, 0.2, "square", 0.12); }
function schrittTon()   { piep(180, 90, 0.06, "sine", 0, 0.08); }   // leises "tapp"
function buhTon()       { piep(220, 110, 0.45, "sawtooth", 0, 0.2); piep(165, 80, 0.5, "square", 0.05, 0.12); }
function lachTon()      { for (let i = 0; i < 4; i++) piep(420 - i * 30, 300 - i * 30, 0.12, "square", i * 0.15, 0.15); }
function riesenSchluerf() { piep(1200, 60, 1.2, "sawtooth", 0, 0.3); piep(80, 1600, 0.4, "sine", 1.1, 0.25); }
function autschTon()    { piep(620, 200, 0.22, "square", 0, 0.2); piep(300, 120, 0.3, "sawtooth", 0.08, 0.15); }
function verlorenTon()  { [392, 330, 262, 196].forEach((hz, i) => piep(hz, hz * 0.97, 0.28, "triangle", i * 0.2)); }
function muenzTon()     { piep(988, 988, 0.08, "square", 0, 0.15); piep(1319, 1319, 0.25, "square", 0.08, 0.15); }
function kassenTon()    { for (let i = 0; i < 7; i++) piep(900 + i * 160, 900 + i * 160, 0.1, "square", i * 0.06, 0.12); }
function falschTon()    { piep(220, 170, 0.3, "sawtooth", 0, 0.18); }
function boingTon()     { piep(160, 760, 0.18, "sine", 0, 0.3); piep(760, 380, 0.22, "sine", 0.18, 0.25); piep(380, 560, 0.2, "sine", 0.4, 0.2); }
function plumpsTon()    { kameraWackeln(5); piep(200, 50, 0.4, "sine", 0, 0.35); piep(90, 40, 0.3, "square", 0.05, 0.15); }
function zischTon()     { piep(1400, 300, 0.5, "sawtooth", 0, 0.12); piep(700, 120, 0.4, "square", 0.05, 0.08); }
function pflatschTon()  { piep(240, 120, 0.15, "sine", 0, 0.25); piep(500, 300, 0.1, "triangle", 0.05, 0.12); }
function klapperTon()   { piep(520, 260, 0.04, "square", 0, 0.05); }
function bummTon()      { kameraWackeln(6); piep(140, 40, 0.3, "square", 0, 0.22); piep(90, 30, 0.35, "sine", 0.02, 0.3); }
function sprungTon()    { piep(300, 700, 0.15, "sine", 0, 0.18); }
function ploppTon()     { piep(700, 180, 0.12, "sine", 0, 0.3); piep(160, 70, 0.15, "square", 0.03, 0.15); }
function feuerTon()     { piep(260, 90, 0.4, "sawtooth", 0, 0.16); piep(1200, 400, 0.3, "sawtooth", 0.02, 0.06); }
function brummTon()     { piep(90, 140, 0.35, "sawtooth", 0, 0.1); }
function peitschTon()   { piep(1500, 200, 0.18, "sawtooth", 0, 0.15); piep(200, 80, 0.2, "square", 0.1, 0.15); }
function puffTon()      { kameraWackeln(5); piep(500, 80, 0.25, "sawtooth", 0, 0.25); }
function warnTon()      { piep(880, 880, 0.08, "square", 0, 0.14); piep(880, 880, 0.08, "square", 0.14, 0.14); piep(1100, 1100, 0.12, "square", 0.28, 0.14); }
function siegesMelodie() {
  const noten = [523, 659, 784, 1047, 784, 1047];
  noten.forEach((hz, i) => piep(hz, hz, 0.22, "triangle", i * 0.14));
}
function koenigsMelodie() {
  const noten = [392, 523, 659, 784, 659, 784, 1047, 1047];
  noten.forEach((hz, i) => piep(hz, hz, i === 7 ? 0.6 : 0.2, "triangle", i * 0.16));
}

// ---- 10. Tasten, Joystick und Knöpfe --------------------------------
const gedrueckt = { hoch: false, runter: false, links: false, rechts: false, saugen: false };
const TASTEN = {
  ArrowUp: "hoch", ArrowDown: "runter", ArrowLeft: "links", ArrowRight: "rechts",
  w: "hoch", s: "runter", a: "links", d: "rechts", " ": "saugen",
};
addEventListener("keydown", (e) => {
  const was = TASTEN[e.key];
  if (was) { gedrueckt[was] = true; e.preventDefault(); tonStarten(); }
  // Springen (ab Level 8): Taste J, Enter oder Shift
  if ((e.key === "j" || e.key === "J" || e.key === "Enter" || e.key === "Shift") && !e.repeat) {
    sprungWunsch = true; tonStarten(); e.preventDefault();
  }
  // Bei der Rechen-Aufgabe: Tasten 1, 2 und 3 wählen eine Antwort
  if (e.key === "1" || e.key === "2" || e.key === "3") { tonStarten(); antwortGeben(Number(e.key) - 1); }
});
addEventListener("keyup", (e) => {
  const was = TASTEN[e.key];
  if (was) gedrueckt[was] = false;
});

// Der Joystick fürs Handy:
// Daumen irgendwo auf die linke Seite legen und ziehen – wie ein kleiner Steuerknüppel.
const joystick = { aktiv: false, x: 0, z: 0, finger: null, mitteX: 0, mitteY: 0 };
const joyfeld = document.getElementById("joyfeld");
const joyBild = document.getElementById("joy");
const knauf = document.getElementById("knauf");
const JOY_WEITE = 55;     // so weit kann man den Knauf ziehen

function joyRuheplatz() {
  // Ohne Daumen steht der Joystick unten links im Feld
  const feld = joyfeld.getBoundingClientRect();
  const x = Math.min(110, feld.width / 2), y = Math.max(80, feld.height - 100);
  joyBild.style.left = x + "px"; joyBild.style.top = y + "px";
  knauf.style.transform = "";
}
joyfeld.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  tonStarten();
  joyfeld.setPointerCapture(e.pointerId);
  const feld = joyfeld.getBoundingClientRect();
  joystick.finger = e.pointerId;
  joystick.aktiv = true;
  joystick.mitteX = e.clientX; joystick.mitteY = e.clientY;   // hier ist die Mitte
  joyBild.style.left = (e.clientX - feld.left) + "px";
  joyBild.style.top = (e.clientY - feld.top) + "px";
  joystick.x = 0; joystick.z = 0;
});
joyfeld.addEventListener("pointermove", (e) => {
  if (e.pointerId !== joystick.finger) return;
  let dx = e.clientX - joystick.mitteX, dy = e.clientY - joystick.mitteY;
  const weit = Math.hypot(dx, dy);
  if (weit > JOY_WEITE) { dx = dx / weit * JOY_WEITE; dy = dy / weit * JOY_WEITE; }
  knauf.style.transform = "translate(" + dx + "px, " + dy + "px)";
  joystick.x = dx / JOY_WEITE;    // -1 = ganz links, +1 = ganz rechts
  joystick.z = dy / JOY_WEITE;    // -1 = nach hinten, +1 = nach vorne
});
function joyLoslassen(e) {
  if (e.pointerId !== joystick.finger) return;
  joystick.aktiv = false; joystick.finger = null; joystick.x = 0; joystick.z = 0;
  joyRuheplatz();
}
joyfeld.addEventListener("pointerup", joyLoslassen);
joyfeld.addEventListener("pointercancel", joyLoslassen);
addEventListener("resize", joyRuheplatz);
joyRuheplatz();

// Der Saug-Knopf fürs Handy
const saugKnopf = document.getElementById("saugen");
saugKnopf.addEventListener("pointerdown", (e) => {
  e.preventDefault(); tonStarten();
  saugKnopf.setPointerCapture(e.pointerId);
  gedrueckt.saugen = true; saugKnopf.classList.add("an");
});
for (const ende of ["pointerup", "pointercancel"]) {
  saugKnopf.addEventListener(ende, () => { gedrueckt.saugen = false; saugKnopf.classList.remove("an"); });
}
// Der Spring-Knopf fürs Handy (ab Level 8)
const springKnopf = document.getElementById("springen");
springKnopf.addEventListener("pointerdown", (e) => {
  e.preventDefault(); tonStarten();
  sprungWunsch = true; springKnopf.classList.add("an");
});
for (const ende of ["pointerup", "pointercancel", "pointerleave"]) {
  springKnopf.addEventListener(ende, () => springKnopf.classList.remove("an"));
}
// Langes Drücken soll kein Menü öffnen
addEventListener("contextmenu", (e) => e.preventDefault());
addEventListener("blur", () => { for (const k in gedrueckt) gedrueckt[k] = false; });

// Die drei Antwort-Knöpfe für die Rechen-Aufgabe
const antwortKnoepfe = [1, 2, 3].map((n) => document.getElementById("antwort" + n));
antwortKnoepfe.forEach((knopf, i) => knopf.addEventListener("click", () => { tonStarten(); antwortGeben(i); }));

// ---- 11. Das Männchen bewegen ---------------------------------------
function maennchenBewegen() {
  const Z = ZIMMER[zimmer];
  // Im Netz gefangen? Dann geht drei Sekunden lang gar nichts.
  if (maennchen.klebt > 0) {
    maennchen.klebt = maennchen.klebt - 1;
    maennchen.laeuft = false;
    maennchen.schrittTakt = maennchen.schrittTakt * 0.8;
    maennchen.stossX = 0; maennchen.stossZ = 0;
    if (unverwundbar > 0) unverwundbar = unverwundbar - 1;
    if (maennchen.klebt === 0) {
      for (let i = 0; i < 12; i++) sternchen(maennchen.x, 90, maennchen.z, "#f4f6ff");
      tippZeigen("Frei! Pass auf die <b>Netze</b> auf!");
    }
    return;
  }
  // Springen (ab Level 8): hoch in die Luft – und wieder runter
  if (sprungWunsch && Z.springen && maennchen.hoehe === 0) {
    maennchen.sprungTempo = SPRUNG_KRAFT;
    sprungTon();
  }
  sprungWunsch = false;
  if (maennchen.hoehe > 0 || maennchen.sprungTempo > 0) {
    maennchen.hoehe = maennchen.hoehe + maennchen.sprungTempo;
    maennchen.sprungTempo = maennchen.sprungTempo - SCHWERKRAFT;
    if (maennchen.hoehe <= 0) {
      maennchen.hoehe = 0; maennchen.sprungTempo = 0; schrittTon();
      maennchen.quetschen = 10;                                  // beim Landen wird er kurz platt …
      woelkchenMachen(maennchen.x, maennchen.z, 7, 2.2);         // … und es staubt
    }
  }
  // Level 10: Über dem Ventilator wird man hochgepustet und schwebt
  if (ventilator && ventilator.an && Math.abs(maennchen.x - ventilator.x) < 75 && Math.abs(maennchen.z - ventilator.z) < 60) {
    if (!maennchen.fliegt) { piep(300, 900, 0.4, "sine", 0, 0.15); }
    maennchen.fliegt = true;
    maennchen.sprungTempo = 0;
    maennchen.hoehe = maennchen.hoehe + (FLUG_HOEHE + Math.sin(zeit * 0.1) * 8 - maennchen.hoehe) * 0.08;
  } else if (maennchen.fliegt) {
    maennchen.fliegt = false;          // vom Ventilator runter: jetzt fällt man wieder
    maennchen.sprungTempo = 0.1;
  }
  // Auf der Bewegungsfalle fährt man mit
  if (platte && maennchen.hoehe === 0 && aufDerPlatte()) {
    maennchen.x = maennchen.x + platte.dx;
    maennchen.z = maennchen.z + platte.dz;
  }

  let schrittX = 0, schrittZ = 0;
  if (gedrueckt.links)  schrittX = schrittX - 1;
  if (gedrueckt.rechts) schrittX = schrittX + 1;
  if (gedrueckt.hoch)   schrittZ = schrittZ - 1;   // hoch = nach hinten ins Zimmer
  if (gedrueckt.runter) schrittZ = schrittZ + 1;   // runter = nach vorne zu uns

  // Am Handy: der Joystick. Je weiter man zieht, desto schneller läuft das Männchen.
  let gas = 1;
  const joyWeit = Math.hypot(joystick.x, joystick.z);
  if (joystick.aktiv && joyWeit > 0.25) {
    schrittX = joystick.x; schrittZ = joystick.z;
    gas = Math.min(1, 0.45 + joyWeit * 0.6);
  }

  maennchen.laeuft = schrittX !== 0 || schrittZ !== 0;
  if (maennchen.laeuft) {
    const laenge = Math.hypot(schrittX, schrittZ);  // schräg soll nicht schneller sein
    maennchen.richtungX = schrittX / laenge;
    maennchen.richtungZ = schrittZ / laenge;
    const tempo = (saugtGerade ? maennchen.tempo * 0.6 : maennchen.tempo) * gas;  // der Sauger ist schwer!
    maennchen.x = maennchen.x + maennchen.richtungX * tempo;
    maennchen.z = maennchen.z + maennchen.richtungZ * tempo;

    // Der Schritt-Takt: bei jedem halben Takt setzt ein Fuß auf – tapp!
    const vorher = Math.floor(maennchen.schrittTakt / Math.PI);
    maennchen.schrittTakt = maennchen.schrittTakt + (saugtGerade ? 0.14 : 0.2);
    if (Math.floor(maennchen.schrittTakt / Math.PI) !== vorher) {
      schrittTon();
      if (maennchen.hoehe === 0 && !ZIMMER[zimmer].lava) woelkchenMachen(maennchen.x, maennchen.z, 1, 0.6);
    }

    // Welches Bild passt? Geht es mehr zur Seite oder mehr nach vorne/hinten?
    if (Math.abs(schrittX) >= Math.abs(schrittZ) * 0.8) { maennchen.blickt = "seite"; maennchen.nachLinks = schrittX < 0; }
    else if (schrittZ < 0) maennchen.blickt = "hinten";
    else maennchen.blickt = "vorne";
  } else {
    maennchen.schrittTakt = maennchen.schrittTakt * 0.8;   // die Beine gehen wieder zusammen
  }

  // Weggeschubst? Dann rutscht das Männchen ein Stück – und wird langsam wieder langsamer.
  maennchen.x = maennchen.x + maennchen.stossX;
  maennchen.z = maennchen.z + maennchen.stossZ;
  maennchen.stossX = maennchen.stossX * 0.85;
  maennchen.stossZ = maennchen.stossZ * 0.85;

  // Nicht durch die Wände laufen! (Außer durch eine offene Tür.)
  let rechterRand = BREITE - 40;
  const vorDerTuer = maennchen.z > TUER.von + 25 && maennchen.z < TUER.bis - 10;
  if (tuerOffen && Z.tuerRechts && vorDerTuer) rechterRand = BREITE + 80;
  let hintererRand = 30;
  const TH = Z.tuerHinten && !Z.tuerHinten.zu ? Z.tuerHinten : null;     // gibt es hinten eine Tür, die aufgeht?
  if (tuerOffen && TH && maennchen.x > TH.von + 20 && maennchen.x < TH.bis - 20) hintererRand = -70;
  maennchen.x = Math.max(40, Math.min(rechterRand, maennchen.x));
  maennchen.z = Math.max(hintererRand, Math.min(TIEFE - 10, maennchen.z));

  // Lava! Wer vom Weg abkommt, verbrennt sich die Füße.
  // Level 14: Das Laufband trägt einen nach vorne – zum Wasser!
  if (Z.band && !rechnung && maennchen.hoehe === 0 && aufDemWeg(maennchen.x, maennchen.z)) maennchen.z = maennchen.z + BAND_TEMPO;
  if (Z.lava && !wechselt && maennchen.hoehe === 0 && !aufDemWeg(maennchen.x, maennchen.z)) inDieLava();

  // Level 11: In die Wasserbecken kann man nicht hineinlaufen
  for (const b of becken) {
    const ex = (maennchen.x - b.x) / (b.rx + 28), ez = (maennchen.z - b.z) / (b.rz + 22);
    const weit = Math.hypot(ex, ez);
    if (weit < 1) {
      const f = weit > 0.01 ? 1 / weit : 1;
      maennchen.x = b.x + ex * f * (b.rx + 28);
      maennchen.z = b.z + (weit > 0.01 ? ez * f : 1) * (b.rz + 22);
    }
  }
  // Um die Kiste muss man außen herumlaufen
  if (kiste) {
    const dx = maennchen.x - kiste.x, dz = maennchen.z - kiste.z;
    const breit = 95, tief = 38;
    if (Math.abs(dx) < breit && Math.abs(dz) < tief) {
      if (breit - Math.abs(dx) < tief - Math.abs(dz)) maennchen.x = kiste.x + (dx < 0 ? -breit : breit);
      else maennchen.z = kiste.z + (dz < 0 ? -tief : tief);
    }
  }
  // Auch um die Truhe läuft man außen herum (solange sie noch still dasteht)
  if (truhe) {
    const dx = maennchen.x - truhe.x, dz = maennchen.z - truhe.z;
    const weit = Math.hypot(dx, dz), platz = 58 * truhe.groesse / 165;
    if (weit < platz) {
      maennchen.x = truhe.x + (dx / (weit || 1)) * platz;
      maennchen.z = truhe.z + ((weit ? dz : 1) / (weit || 1)) * platz;
    }
  }

  // Staubsauger aufheben: einfach hinlaufen!
  const saugerLiegtDa = !sauger.versteckt && sauger.flug >= 1;
  if (!maennchen.hatSauger && saugerLiegtDa && Math.hypot(maennchen.x - sauger.x, maennchen.z - sauger.z) < 70) {
    maennchen.hatSauger = true;
    aufhebTon();
    for (let i = 0; i < 14; i++) sternchen(sauger.x, 40, sauger.z, "#ffd34d");
    document.getElementById("saugen").textContent = ZIMMER[zimmer].puempel ? "HAUEN" : "SAUGEN";
    if (ZIMMER[zimmer].puempel) tippZeigen(istTouch ? "Lauf zum Drachen und drück <b>HAUEN</b>!" : "Lauf zum Drachen und drück die <b>Leertaste</b> zum Hauen!");
    else tippZeigen(istTouch ? "Halte <b>SAUGEN</b> gedrückt und zeig auf einen Geist!"
                             : "Halte die <b>Leertaste</b> gedrückt und zeig auf einen Geist!");
    if (truhe) truheWirdLebendig();       // Level 5: Jetzt wacht die Truhe auf!
    if (zimmer === 23) kampfBeginnt();    // Level 10: Jetzt geht es los!
  }

  // Geld einsammeln: einfach drüberlaufen!
  for (const g of geld) {
    if (g.flug >= 1 && Math.hypot(maennchen.x - g.x, maennchen.z - g.z) < 55) geldEinsammeln(g);
  }

  // Durch eine offene Tür gelaufen? Dann geht es ins nächste Zimmer.
  if (tuerOffen && !wechselt) {
    if (Z.tuerRechts && maennchen.x > BREITE + 40) zimmerWechseln(zimmer + 1);
    else if (TH && maennchen.z < -30) zimmerWechseln(zimmer + 1);
  }

  if (unverwundbar > 0) unverwundbar = unverwundbar - 1;
}

// Ein Kronen-Geist hat das Männchen erwischt!
function herzVerlieren(anzahl) {
  treffBlitz = 14;
  kameraWackeln(8);
  try { if (navigator.vibrate) navigator.vibrate(80); } catch (e) { /* manche Geräte können nicht vibrieren */ }
  if (herzen > 0) {
    herzen = Math.max(0, herzen - (anzahl || 1));   // ein Herz ist weg (eine Kanonenkugel nimmt zwei)
    unverwundbar = SCHONZEIT;         // jetzt blinkt das Männchen und ist kurz sicher
    herzHuepfer = 24;
    autschTon();
    if (herzen === 0) tippZeigen("Achtung! Kein Herz mehr – jetzt darf dich <b>kein Geist</b> mehr berühren!");
  } else {
    // Kein Herz mehr übrig: Das Zimmer fängt von vorne an.
    verlorenTon();
    sprechblase("Oh nein!", maennchen.x, 220, maennchen.z);
    zimmerWechseln(zimmer, true);
  }
}

// ---- 12. Saugen ----------------------------------------------------
// Steht man auf dem sicheren Weg? (Ein kleines bisschen Rand verzeihen wir.)
function aufDemWeg(x, z) {
  const rand = 14;
  for (const [x1, z1, x2, z2] of ZIMMER[zimmer].weg) {
    if (x > x1 - rand && x < x2 + rand && z > z1 - rand && z < z2 + rand) return true;
  }
  return false;
}

// In die Lava getreten: Autsch! Zurück an den Anfang vom Weg – und ein Herz ist weg.
function inDieLava() {
  const Z = ZIMMER[zimmer];
  if (Z.wasser) {
    for (let i = 0; i < 24; i++) sternchen(maennchen.x + zufall(-20, 20), zufall(20, 120), maennchen.z, i % 2 ? "#bfe9ff" : "#2f7fd0");
    pflatschTon(); plumpsTon();
    sprechblase("Platsch!", maennchen.x, 220, maennchen.z);
  } else {
    for (let i = 0; i < 24; i++) sternchen(maennchen.x + zufall(-20, 20), zufall(20, 120), maennchen.z, i % 2 ? "#ffb347" : "#ff3b1f");
    zischTon();
    sprechblase("Heiß! Heiß!", maennchen.x, 220, maennchen.z);
  }
  const start = Z.start || [450, 520];
  maennchen.x = start[0]; maennchen.z = start[1];
  maennchen.stossX = 0; maennchen.stossZ = 0; maennchen.hoehe = 0; maennchen.sprungTempo = 0;
  maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
  if (unverwundbar === 0) herzVerlieren();
  if (herzen > 0) tippZeigen(Z.wasser ? "Ins <b>Wasser</b> gefallen! Spring über die Lücken in der Brücke." : "Autsch, die <b>Lava</b>! Bleib auf dem Weg.");
}

// Wo ist die Öffnung vom Staubsauger-Rohr?
function duesenPunkt() {
  const daneben = Math.abs(maennchen.richtungX) < 0.5 ? 40 : 0;
  return { x: maennchen.x + maennchen.richtungX * 70 + daneben, y: 25, z: maennchen.z + maennchen.richtungZ * 60 };
}

// Ist etwas vor dem Rohr? Gibt den Abstand zurück – oder -1, wenn nicht.
function vorDemRohr(x, z, reichweite) {
  const duese = duesenPunkt();
  const zuX = x - duese.x, zuZ = z - duese.z;
  const abstand = Math.hypot(zuX, zuZ);
  const vorne = (zuX * maennchen.richtungX + zuZ * maennchen.richtungZ) / (abstand || 1);
  if (abstand < reichweite && (vorne > 0.55 || abstand < 60)) return abstand;
  return -1;
}

// Zieht etwas ein Stück zum Rohr hin
function zumRohrZiehen(ding, staerke) {
  const duese = duesenPunkt();
  const zuX = ding.x - duese.x, zuZ = ding.z - duese.z;
  const abstand = Math.hypot(zuX, zuZ) || 1;
  ding.x = ding.x - (zuX / abstand) * staerke;
  ding.z = ding.z - (zuZ / abstand) * staerke;
}

// ---- 13. Geister und Geld bewegen -----------------------------------
function geisterBewegen() {
  saugtGerade = maennchen.hatSauger && gedrueckt.saugen && !geschafft && !wechselt && !(maennchen.klebt > 0) && !ZIMMER[zimmer].puempel && !tinteModus;
  const boese = ZIMMER[zimmer].geisterBeissen;      // in Level 3 nehmen auch kleine Geister Herzen weg

  for (const g of geister) {
    g.wippen = g.wippen + 0.05;
    g.zappeln = 0;

    // Jagen – aber nicht die ganze Zeit: Mal ist er hinter dem Männchen her, mal schwebt er nur herum.
    if (boese) {
      if (g.beissPause > 0) g.beissPause = g.beissPause - 1;
      g.jagdUhr = g.jagdUhr - 1;
      if (g.jagdUhr <= 0) {
        g.jagtGerade = !g.jagtGerade;
        g.jagdUhr = g.jagtGerade ? zufall(150, 210) : zufall(160, 260);
      }
    }

    if (saugtGerade) {
      const abstand = vorDemRohr(g.x, g.z, 230);
      if (abstand >= 0) {
        zumRohrZiehen(g, 1.5 + (230 - abstand) * 0.03);   // je näher, desto schneller
        g.zappeln = 1;
        if (abstand < 26) eingesaugt(g);
        continue;
      }
    }

    if (boese && g.jagtGerade) {
      // Er fliegt auf das Männchen zu
      const zuX = maennchen.x - g.x, zuZ = maennchen.z - g.z;
      const weit = Math.hypot(zuX, zuZ) || 1;
      const tempo = ZIMMER[zimmer].geisterTempo || 1.5;     // in Level 4 sind sie schneller
      g.x = g.x + (zuX / weit) * tempo;
      g.z = g.z + (zuZ / weit) * tempo * 0.8;
      if (Math.abs(zuX) > 5) g.dx = Math.abs(g.dx) * (zuX < 0 ? -1 : 1);   // er schaut dahin, wo er hinfliegt
    } else {
      // Sonst schwebt er ganz normal herum und prallt an den Wänden ab
      g.x = g.x + g.dx;
      g.z = g.z + g.dz;
      if (g.x < 60 || g.x > BREITE - 60) g.dx = -g.dx;
      if (g.z < 40 || g.z > TIEFE - 40) g.dz = -g.dz;
    }
    g.x = Math.max(60, Math.min(BREITE - 60, g.x));
    g.z = Math.max(40, Math.min(TIEFE - 40, g.z));

    // Erwischt! Das kostet ein Herz.
    const zumMaennchen = Math.hypot(maennchen.x - g.x, maennchen.z - g.z);
    if (boese && zumMaennchen < 50 && g.beissPause === 0 && unverwundbar === 0 && !wechselt) {
      const weit = zumMaennchen || 1;
      const stoss = ZIMMER[zimmer].nurSchubsen ? 13 : 10;      // im Lava-Raum schubsen sie kräftiger
      maennchen.stossX = ((maennchen.x - g.x) / weit) * stoss;
      maennchen.stossZ = ((maennchen.z - g.z) / weit) * stoss;
      g.beissPause = 100;
      g.jagtGerade = false; g.jagdUhr = 140;      // danach lässt er erst mal von einem ab
      buhTon();
      if (ZIMMER[zimmer].nurSchubsen) {
        sprechblase("Schubs!", g.x, 190, g.z);     // Schubsen kostet kein Herz – aber die Lava!
      } else {
        sprechblase("Buh!", g.x, 190, g.z);
        herzVerlieren();
      }
    }
  }
  geister = geister.filter((g) => !g.weg);
}

function eingesaugt(g) {
  g.weg = true;
  gefangen = gefangen + 1;
  schluerfTon();
  for (let i = 0; i < 10; i++) sternchen(g.x, 50, g.z, "#6fd3ff");
  if ((zimmer === 24 || zimmer === 25) && geister.filter((x) => !x.weg).length === 0) {
    setTimeout(siegesMelodie, 300);
    geldRegen(450, 330);
  }
  if (zimmer === 1) {
    zaehlerZeigen("Gefangen: " + gefangen + " von 5");
    if (geister.filter((x) => !x.weg).length === 0) {
      tuerOffen = true;
      setTimeout(siegesMelodie, 400);
      tippZeigen("Super, Arthur! Alle Geister gefangen. Die <b>Tür</b> ist offen!");
    }
  }
}

function bosseBewegen() {
  const vorher = bosse.length;
  for (const k of bosse) einenBossBewegen(k);
  bosse = bosse.filter((k) => !k.weg);
  if (bosse.length < vorher) {
    if (zimmer === 3 || zimmer === 14 || (zimmer === 19 && stufe === 2)) zaehlerZeigen("Kronen-Geister: " + (bosseAmAnfang - bosse.length) + " von " + bosseAmAnfang);
    if (bosse.length === 0) alleBosseBesiegt();
  }
}

function einenBossBewegen(k) {
  k.wippen = k.wippen + 0.04;
  k.zappeln = 0;
  if (k.wut > 0) k.wut = k.wut - 1;
  // Die Truhe klappert beim Jagen mit dem Deckel – klapp, klapp, klapp
  if (k.truhe && k.jagtGerade && !k.besiegt && zeit % 20 === 0) klapperTon();

  // Umgefallen: Er liegt kurz am Boden. Dann füllt sich sein neuer Balken und er steht wieder auf.
  if (k.liegt > 0) {
    k.liegt = k.liegt - 1;
    if (k.liegt === 50) { lachTon(); sprechblase("Ich bin wieder da!", k.x, 260, k.z); }
    if (k.liegt < 50) k.kraft = k.kraftMax * (1 - k.liegt / 50);
    if (k.liegt === 0) { k.kraft = k.kraftMax; k.schubsPause = 60; k.jagtGerade = false; k.jagdUhr = 120; k.blinkUhr = 200; }
    return;
  }

  // Besiegt!
  if (k.besiegt) {
    k.verschwinden = k.verschwinden + 1;
    if (zeit % 3 === 0) sternchen(k.x + zufall(-40, 40), zufall(60, 200), k.z, "#ffd34d");
    if (k.wirdZuGeld) {
      // Der Riesengeist bläht sich auf, bis er platzt
      if (k.verschwinden > 45) { k.weg = true; letzterOrt = { x: k.x, z: k.z }; }
    } else if (k.kuerbis) {
      // Der Kürbis zerplatzt in viele Stücke
      if (k.verschwinden === 1) for (let i = 0; i < 40; i++) sternchen(k.x + zufall(-60, 60), zufall(20, 160), k.z, i % 2 ? "#f58c1e" : "#46963c");
      if (k.verschwinden > 30) { k.weg = true; letzterOrt = { x: k.x, z: k.z }; }
    } else {
      // Alle anderen werden ganz eingesaugt – schlüüürf!
      zumRohrZiehen(k, 4);
      if (k.verschwinden > 70) {
        for (let i = 0; i < 40; i++) sternchen(k.x, 60, k.z, i % 2 ? "#ffd34d" : "#6fd3ff");
        k.weg = true; letzterOrt = { x: k.x, z: k.z };
      }
    }
    return;
  }

  // Level 10: Er wartet, bis man den Pümpel hat
  if (k.wartet) return;
  // Level 14: Das Skelett liegt als Knochenhaufen da, solange das Rätsel läuft
  if (k.zerfallen) return;
  // Level 14: Kabumm läuft auf seiner Insel hin und her und wirft Bomben aufs Laufband
  if (k.bandBoss) { kabummBewegen(k); return; }
  // Level 9: Der Drache spuckt Feuerbälle – immer genau auf das Männchen zu
  if (k.drache) {
    if (k.getroffen > 0) k.getroffen = k.getroffen - 1;
    if (k.maulAuf > 0) k.maulAuf = k.maulAuf - 1;
    k.feuerUhr = k.feuerUhr - 1;
    if (k.feuerUhr === 30) brummTon();                  // er holt Luft …
    if (k.feuerUhr <= 0 && !wechselt && !geschafft) {
      k.feuerUhr = (k.feuerPause || FEUER_PAUSE) + Math.floor(zufall(-20, 20));
      k.maulAuf = 30;
      const zuX = maennchen.x - k.x, zuZ = maennchen.z - (k.z + 30);
      const weit = Math.hypot(zuX, zuZ) || 1;
      dynamit.push({ art: "feuer", x: k.x + (zuX / weit) * 70, z: k.z + 30 + (zuZ / weit) * 40,
                     dx: (zuX / weit) * (k.feuerTempo || FEUER_TEMPO), dz: (zuZ / weit) * (k.feuerTempo || FEUER_TEMPO), wackeln: 0, alter: 0 });
      feuerTon();
    }
  }

  // In Level 3 jagt er nur manchmal – dazwischen schwebt er einfach herum
  let jagt = k.jagt;
  if (k.jagdPhasen) {
    k.jagdUhr = k.jagdUhr - 1;
    if (k.jagdUhr <= 0) {
      k.jagtGerade = !k.jagtGerade;
      k.jagdUhr = k.jagtGerade ? zufall(150, 210) : zufall(160, 240);
    }
    if (!k.jagtGerade) jagt = 0;
  }

  // Level 4: Er blinkt immer wieder. Solange er blinkt, rast er durchs Zimmer und man kann ihn nicht saugen.
  if (k.blinkt) {
    k.blinkUhr = k.blinkUhr - 1;
    if (k.blinkUhr === 45 && !k.blinktGerade) warnTon();          // gleich geht es los!
    if (k.blinkUhr <= 0) {
      k.blinktGerade = !k.blinktGerade;
      k.blinkUhr = k.blinktGerade ? BLINK_DAUER : SAUG_PAUSE;
      if (k.blinktGerade) {
        // Er zielt einmal auf das Männchen und rast dann geradeaus los
        const zuX = maennchen.x - k.x, zuZ = maennchen.z - k.z;
        const weit = Math.hypot(zuX, zuZ) || 1;
        const tempo = k.blinkTempo || BLINK_TEMPO;
        k.rasenX = (zuX / weit) * tempo;
        k.rasenZ = (zuZ / weit) * tempo;
        buhTon();
      }
    }
  }

  // Wird er gerade angesaugt? (Beim Blinken geht das nicht.)
  const abstand = saugtGerade && !k.blinktGerade ? vorDemRohr(k.x, k.z, k.reichweite) : -1;
  if (abstand >= 0) {
    k.kraft = k.kraft - SAUGKRAFT;     // der Balken wird kleiner
    k.zappeln = 1;
    zumRohrZiehen(k, k.zieht);         // er ist schwer – er rutscht nur langsam
    if (k.kraft <= 0 && k.skelett) {
      // Das Skelett zerfällt in seine Knochen – jetzt kommt das Rätsel!
      k.kraft = 0; k.zerfallen = true;
      plumpsTon();
      sprechblase("Klapper-di-klapp!", k.x, 200, k.z);
      setTimeout(raetselStellen, 900);
      return;
    }
    if (k.kraft <= 0) {
      k.kraft = 0;
      k.leben = k.leben - 1;
      if (k.leben > 0) {
        // Der Balken ist leer – aber er hat noch einen! Er fällt um und steht gleich wieder auf.
        k.liegt = 170;
        k.blinktGerade = false;
        plumpsTon();
        sprechblase("Uff!", k.x, 200, k.z);
        tippZeigen("Er ist umgefallen! Aber Achtung: Er hat noch <b>" + (k.leben === 1 ? "einen Balken" : k.leben + " Balken") + "</b>.");
      } else {
        k.besiegt = true;
        riesenSchluerf();
        sprechblase("Neiiiin!", k.x, 260, k.z);
      }
      return;
    }
  } else if (k.blinktGerade) {
    // Er blinkt: Jetzt rast er geradeaus durchs Zimmer und prallt an den Wänden ab
    k.x = k.x + k.rasenX;
    k.z = k.z + k.rasenZ;
    if (k.x < 90 || k.x > BREITE - 90) k.rasenX = -k.rasenX;
    if (k.z < k.zMin || k.z > TIEFE - 60) k.rasenZ = -k.rasenZ;
    if (Math.abs(k.rasenX) > 0.3) k.dx = Math.abs(k.dx) * (k.rasenX < 0 ? -1 : 1);     // er schaut dahin, wo er hinrast
  } else {
    // Sonst schwebt er herum – und kommt dem Männchen dabei ein bisschen hinterher
    const zuX = maennchen.x - k.x, zuZ = maennchen.z - k.z;
    const weit = Math.hypot(zuX, zuZ) || 1;
    k.x = k.x + k.dx + (zuX / weit) * jagt;
    k.z = k.z + k.dz + (zuZ / weit) * jagt * 0.7;
    if (k.x < 90 || k.x > BREITE - 90) k.dx = -k.dx;
    if (k.z < k.zMin || k.z > TIEFE - 60) k.dz = -k.dz;
  }
  k.x = Math.max(90, Math.min(BREITE - 90, k.x));
  k.z = Math.max(k.zMin, Math.min(TIEFE - 60, k.z));

  // Bei 2/3 und 1/3 Kraft ruft er kleine Geister zu Hilfe und springt weg
  if (k.ruftHilfe && !k.gerufen66 && k.kraft < k.kraftMax * 0.66) { k.gerufen66 = true; hilfeRufen(k); }
  if (k.ruftHilfe && !k.gerufen33 && k.kraft < k.kraftMax * 0.33) { k.gerufen33 = true; hilfeRufen(k); }

  // Kommt er dem Männchen zu nah, schubst er es weg: BUH!
  if (k.schubsPause > 0) k.schubsPause = k.schubsPause - 1;
  // Ein großer Geist ist so hoch, dass er einen auch erwischt, wenn man ein Stück hinter ihm steht
  const tief = maennchen.z < k.z ? k.tiefFaktor : 1;
  const zumMaennchen = Math.hypot(maennchen.x - k.x, (maennchen.z - k.z) * tief);
  if (zumMaennchen < k.radius && k.schubsPause === 0 && unverwundbar === 0 && !wechselt && !(k.kuerbis && maennchen.hoehe > 15)) {
    const weit = zumMaennchen || 1;
    maennchen.stossX = ((maennchen.x - k.x) / weit) * k.stoss;
    maennchen.stossZ = ((maennchen.z - k.z) / weit) * k.stoss;
    k.schubsPause = 100;
    k.wut = 20;
    buhTon();
    sprechblase(k.ruf, k.x, k.truhe ? 200 : 250, k.z);
    // Ab Level 2 kostet das ein Herz! (Im Lava-Raum schubst er nur – das Herz kostet dann die Lava.)
    if (ZIMMER[zimmer].herzen && !ZIMMER[zimmer].nurSchubsen) herzVerlieren();
  }
}

function hilfeRufen(k) {
  lachTon();
  sprechblase("Hahaha! Hilfe, Geister!", k.x, 260, k.z);
  // Zwei kleine Geister erscheinen neben ihm
  for (let i = 0; i < 2; i++) {
    const g = kleinenGeistMachen(k.x + (i === 0 ? -90 : 90), k.z + zufall(-40, 40));
    geister.push(g);
    for (let j = 0; j < 8; j++) sternchen(g.x, 50, g.z, "#6fd3ff");
  }
  // Und er selbst springt in die Ecke, die am weitesten vom Männchen weg ist
  for (let j = 0; j < 16; j++) sternchen(k.x, 80, k.z, "#ffd34d");
  const hinten = Math.max(130, k.zMin + 10);
  const ecken = [[160, hinten], [740, hinten], [160, 430], [740, 430]];
  let beste = ecken[0], weiteste = 0;
  for (const e of ecken) {
    const weit = Math.hypot(e[0] - maennchen.x, e[1] - maennchen.z);
    if (weit > weiteste) { weiteste = weit; beste = e; }
  }
  k.x = beste[0]; k.z = beste[1];
  k.schubsPause = 60;
}

// Der letzte Kronen-Geist im Zimmer ist besiegt. Was passiert jetzt?
function alleBosseBesiegt() {
  // Level 5, erstes Zimmer: Hier geht es der Reihe nach
  if (zimmer === 10) {
    if (stufe === 1) {
      // Die Truhe ist weg – jetzt lässt sich die Kurbel am Kistenteufel drehen
      stufe = 2;
      kiste.gesperrt = false; kiste.bereit = true;
      setTimeout(siegesMelodie, 300);
      zaehlerZeigen("Truhe: eingesaugt!");
      tippZeigen("Die Truhe ist weg! Jetzt berühr die <b>Kurbel</b> an der Kiste.");
    } else {
      // Der Kronen-Geist ist weg – die Tür geht auf
      stufe = 4;
      tuerOffen = true;
      setTimeout(siegesMelodie, 300);
      zaehlerZeigen("Kronen-Geist: besiegt!");
      tippZeigen("Besiegt! Die <b>Tür hinten</b> ist offen – pass auf das Dynamit auf!");
    }
    return;
  }
  // Level 8, erstes Zimmer: Die Truhe ist weg – jetzt kommen zwei Kronen-Geister mit Blinkmodus!
  if (zimmer === 19 && stufe === 1) {
    stufe = 2;
    setTimeout(siegesMelodie, 300);
    bosse = [
      bossMachen({ name: "Blink-König", x: 220, z: 120, groesse: 190, kraftMax: 100, radius: 64, jagt: 1.0, jagdPhasen: true,
                   dx: 0.9, dz: 0.6, blinkt: true, blinkTempo: 3.6 }),
      bossMachen({ name: "Blink-König", x: 700, z: 120, groesse: 190, kraftMax: 100, radius: 64, jagt: 1.0, jagdPhasen: true,
                   dx: -0.8, dz: 0.5, blinkt: true, blinkTempo: 3.6 }),
    ];
    bosse[0].blinkUhr = 200; bosse[1].blinkUhr = 340;        // sie blinken nicht gleichzeitig
    bosse[0].schubsPause = 150; bosse[1].schubsPause = 150;
    bosseAmAnfang = 2;
    for (const k of bosse) for (let i = 0; i < 16; i++) sternchen(k.x, 80, k.z, "#6fd3ff");
    lachTon();
    sprechblase("Jetzt kommen wir!", 450, 250, 120);
    kanonenWecken();
    zaehlerZeigen("Kronen-Geister: 0 von 2");
    tippZeigen("Zwei <b>Blink-Könige</b>! Wenn sie blinken, rasen sie los. Und pass auf das <b>Dynamit</b> auf!");
    return;
  }
  if (zimmer === 2) {
    tuerOffen = true;
    setTimeout(koenigsMelodie, 300);
    zaehlerZeigen("Geisterkönig: besiegt!");
    tippZeigen("Du hast den <b>Geisterkönig</b> besiegt! Die Tür ist offen – auf zu Level 2!");
  } else if (zimmer === 3 || zimmer === 6 || zimmer === 12 || zimmer === 14 || zimmer === 16 || zimmer === 17 || zimmer === 19 || zimmer === 29) {
    tuerOffen = true;
    setTimeout(siegesMelodie, 300);
    if (zimmer === 6) zaehlerZeigen("Kronen-Geist: besiegt!");
    if (zimmer === 12 || zimmer === 16) zaehlerZeigen("Truhe: eingesaugt!");
    if (zimmer === 17) zaehlerZeigen("Lava-Geist: besiegt!");
    const geschafftText = { 3: "Alle drei besiegt!", 6: "Besiegt!", 12: "Die Truhe ist eingesaugt!", 14: "Beide besiegt!",
                            16: "Der Truhen-Boss ist eingesaugt!", 17: "Der Lava-Geist ist weg!", 19: "Beide Blink-Könige besiegt!", 29: "Der Kürbis ist kaputt!" };
    if (zimmer === 19) { kanonen = []; dynamit = []; }      // die Kanone hört auf
    tippZeigen(geschafftText[zimmer] + " Die <b>Tür hinten</b> ist offen!");
  } else if (ZIMMER[zimmer].geld) {
    // Die kleinen Helfer-Geister verpuffen …
    for (const g of geister) for (let i = 0; i < 6; i++) sternchen(g.x, 50, g.z, "#6fd3ff");
    geister = [];
    // … und der große Geist wird zu Geld!
    geldRegen(letzterOrt.x, letzterOrt.z);
  }
}

function geldBewegen() {
  for (const g of geld) {
    g.wippen = g.wippen + 0.08;
    if (g.flug < 1) {
      // Das Geldstück fliegt im hohen Bogen an seinen Platz
      g.flug = Math.min(1, g.flug + 1 / 50);
      g.x = g.startX + (g.zielX - g.startX) * g.flug;
      g.z = g.startZ + (g.zielZ - g.startZ) * g.flug;
      g.y = 30 + Math.sin(g.flug * Math.PI) * 230;
      continue;
    }
    g.y = 30 + Math.sin(g.wippen) * 6;
    // Man kann das Geld auch mit dem Staubsauger heranziehen
    if (saugtGerade) {
      const abstand = vorDemRohr(g.x, g.z, 230);
      if (abstand >= 0) { zumRohrZiehen(g, 5); if (abstand < 30) geldEinsammeln(g); }
    }
  }
  geld = geld.filter((g) => !g.weg);
}

// ---- 14. Zimmer wechseln -------------------------------------------
function zimmerWechseln(neuesZimmer, nochmalVersuchen) {
  if (wechselt) return;
  wechselt = true;
  const tempo = nochmalVersuchen ? 0.03 : 0.06;   // nach einem Treffer wird es langsamer dunkel
  // Erst wird alles dunkel …
  const dunkler = setInterval(() => {
    blende = blende + tempo;
    if (blende >= 1) {
      clearInterval(dunkler);
      zimmerAufbauen(neuesZimmer, nochmalVersuchen);
      // … dann wieder hell
      const heller = setInterval(() => {
        blende = blende - 0.06;
        if (blende <= 0) { blende = 0; clearInterval(heller); wechselt = false; }
      }, 16);
    }
  }, 16);
}

function zimmerAufbauen(nummer, nochmalVersuchen) {
  zimmer = nummer;
  document.getElementById("levelknopf").textContent = "Level " + ZIMMER[nummer].level;
  tuerOffen = false;
  glitzer = []; saugStreifen = []; sprechblasen = [];
  geister = []; bosse = []; geld = []; rechnung = null; kiste = null; kanonen = []; dynamit = [];
  truhe = null; stufe = 0; platte = null; ventilator = null; knopf = null; zeitlupe = 0; maennchen.fliegt = false;
  becken = []; krake = null; ballons = []; kleckse = []; tinteModus = false; maennchen.tinte = 0; wurf.zielt = false; wurf.kraft = 0; wurf.hinweis = 0;
  maennchen.hoehe = 0; maennchen.sprungTempo = 0; sprungWunsch = false; maennchen.schlag = 0; maennchen.schlagPause = 0;
  document.getElementById("saugen").textContent = ZIMMER[nummer].puempel ? "HAUEN" : ZIMMER[nummer].tinte ? "WERFEN" : "SAUGEN";
  document.body.classList.toggle("ohneSaugen", !!ZIMMER[nummer].ohneSaugen);
  document.body.classList.toggle("kannSpringen", !!ZIMMER[nummer].springen);
  sauger.x = 730; sauger.z = 450; sauger.versteckt = false; sauger.flug = 1;
  gefangen = 0;
  herzen = ZIMMER[nummer].herzenAnfang || HERZEN_AM_ANFANG; unverwundbar = 0; treffBlitz = 0;
  maennchen.stossX = 0; maennchen.stossZ = 0; maennchen.schrittTakt = 0; maennchen.klebt = 0;
  document.getElementById("antworten").hidden = true;

  if (nummer === 1) {
    maennchen.x = 180; maennchen.z = 300; maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = 1; maennchen.blickt = "vorne";
    geisterVerteilen(5);
    zaehlerZeigen("Gefangen: 0 von 5");
    tippZeigen("Hol dir den <b>Staubsauger</b>!");
    bannerZeigen("Level 1");
  }

  if (nummer === 2) {
    // Das Männchen kommt links durch die Tür herein – den Staubsauger hat es noch!
    maennchen.x = 70; maennchen.z = (TUER.von + TUER.bis) / 2;
    maennchen.hatSauger = true;
    maennchen.richtungX = 1; maennchen.richtungZ = 0; maennchen.blickt = "seite"; maennchen.nachLinks = false;
    bosse = [bossMachen({ name: "Geisterkönig", ruftHilfe: true, balkenOben: true })];
    zaehlerZeigen("Geisterkönig!");
    tippZeigen("Oh nein, der <b>Geisterkönig</b>! Saug so lange, bis sein Balken leer ist!");
    bannerZeigen("Der Geisterkönig!");
    setTimeout(() => {
      if (zimmer === 2 && bosse[0]) { lachTon(); sprechblase("Hahaha! Mich kriegst du nicht!", bosse[0].x, 260, bosse[0].z); }
    }, 700);
  }

  if (nummer === 3) {
    // Level 2, erstes Zimmer – so hat Arthur es gezeichnet:
    // drei Kronen-Geister hinten an der Wand, von links nach rechts immer größer.
    // Den Staubsauger hat man sofort in der Hand.
    maennchen.x = 450; maennchen.z = 500;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [
      bossMachen({ name: "Kleiner König",  x: 200, z: 150, groesse: 130, kraftMax: 100, radius: 55, jagt: 0.6,  dx:  1.0, dz: 0.7 }),
      bossMachen({ name: "Mittlerer König", x: 520, z: 140, groesse: 170, kraftMax: 100, radius: 62, jagt: 0.45, dx: -0.8, dz: 0.5 }),
      bossMachen({ name: "Großer König",   x: 750, z: 160, groesse: 215, kraftMax: 160, radius: 72, jagt: 0.35, dx: -0.6, dz: 0.4 }),
    ];
    zaehlerZeigen("Kronen-Geister: 0 von 3");
    tippZeigen("Drei <b>Kronen-Geister</b>! Jede Berührung kostet ein Herz!");
    bannerZeigen("Level 2");
  }

  if (nummer === 4) {
    // Level 2, zweites Zimmer: der Riesengeist!
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Riesengeist", x: 450, z: 260, groesse: 360, kraftMax: 220, schwebt: 30, zMin: 250, tiefFaktor: 0.6,
      radius: 135, reichweite: 340, zieht: 0.35, jagt: 0.55, dx: 0.9, dz: 0.6, stoss: 18,
      ruftHilfe: true, balkenOben: true, wirdZuGeld: true,
    })];
    zaehlerZeigen("Riesengeist!");
    tippZeigen("Der <b>Riesengeist</b>! Bleib weit weg und saug seinen Balken leer!");
    bannerZeigen("Der Riesengeist!");
    setTimeout(() => {
      if (zimmer === 4 && bosse[0]) { lachTon(); sprechblase("Ich bin der Größte!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  if (nummer === 5) {
    // Level 3, erstes Zimmer – so hat Arthur es gezeichnet:
    // in der Mitte die blaue Kiste mit der Kurbel, hinten in den Ecken zwei Geister ohne Krone.
    maennchen.x = 450; maennchen.z = 510;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    kisteAufstellen(450, 300, false);
    geister = [kleinenGeistMachen(170, 110), kleinenGeistMachen(730, 110)];
    zaehlerZeigen("Was ist in der Kiste?");
    tippZeigen("Berühr die <b>Kurbel</b> an der Kiste! Vorsicht: Hier kosten auch kleine Geister ein Herz.");
    bannerZeigen("Level 3");
  }

  if (nummer === 6) {
    // Level 3, zweites Zimmer: ein Geist mit Krone, der einen jagt – aber nicht die ganze Zeit.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Kronen-Geist", x: 330, z: 200, groesse: 230, kraftMax: 130,
      jagt: 1.3, jagdPhasen: true, dx: 0.8, dz: 0.5, balkenOben: true,
    })];
    zaehlerZeigen("Kronen-Geist!");
    tippZeigen("Der <b>Kronen-Geist</b> jagt dich – aber nicht die ganze Zeit!");
    bannerZeigen("Der Kronen-Geist!");
  }

  if (nummer === 7) {
    // Level 3, drittes Zimmer: der ganz Große mit zwei Balken.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Stehauf-Geist", x: 450, z: 260, groesse: 360, kraftMax: 150, leben: 2, schwebt: 30, zMin: 250, tiefFaktor: 0.6,
      radius: 135, reichweite: 340, zieht: 0.35, jagt: 1.0, jagdPhasen: true, dx: 0.8, dz: 0.5, stoss: 18,
      balkenOben: true, wirdZuGeld: true,
    })];
    zaehlerZeigen("Stehauf-Geist!");
    tippZeigen("Der <b>Stehauf-Geist</b> hat zwei Balken. Du musst ihn zweimal besiegen!");
    bannerZeigen("Der Stehauf-Geist!");
    setTimeout(() => {
      if (zimmer === 7 && bosse[0]) { lachTon(); sprechblase("Mich musst du zweimal besiegen!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  if (nummer === 8) {
    // Level 4, erstes Zimmer – so hat Arthur es gezeichnet:
    // eine rote Kiste mit dem Kistenteufel, ein Geist, hinten die Tür und links an der Wand die Dynamitkanone.
    maennchen.x = 300; maennchen.z = 500;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    kisteAufstellen(560, 300, true);
    kanoneAufstellen("links", 150, 0, DYNAMIT_PAUSE);
    const g = kleinenGeistMachen(770, 140);
    g.jagtGerade = true; g.jagdUhr = 240; g.beissPause = 90;    // er jagt von Anfang an
    geister = [g];
    zaehlerZeigen("Kistenteufel!");
    tippZeigen("Berühr die <b>Kurbel</b>! Pass auf: Der Geist ist schneller als sonst.");
    bannerZeigen("Level 4");
  }

  if (nummer === 9) {
    // Level 4, zweites Zimmer: der große Geist mit drei Balken, der immer wieder blinkt.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Blink-Geist", x: 450, z: 260, groesse: 360, kraftMax: 90, leben: 3, schwebt: 30, zMin: 250, tiefFaktor: 0.55,
      radius: 125, reichweite: 340, zieht: 0.35, jagt: 0.3, dx: 0.6, dz: 0.4, stoss: 18,
      blinkt: true, balkenOben: true, wirdZuGeld: true,
    })];
    zaehlerZeigen("Blink-Geist!");
    tippZeigen("Wenn der <b>Blink-Geist</b> blinkt: weglaufen! Blinkt er nicht: saugen!");
    bannerZeigen("Der Blink-Geist!");
    setTimeout(() => {
      if (zimmer === 9 && bosse[0]) { lachTon(); sprechblase("Ich habe drei Balken!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  if (nummer === 10) {
    // Level 5, erstes Zimmer – so hat Arthur es gezeichnet:
    // in der Mitte die gelbe Truhe, hinten der Kistenteufel, links und rechts je eine Kanone.
    // Der Staubsauger ist weg – er steckt in der Truhe!
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    truheAufstellen(450, 330);
    kisteAufstellen(570, 150, false);
    kiste.gesperrt = true;                         // die Kurbel geht erst, wenn die Truhe weg ist
    kanoneAufstellen("links", 330, 0, 170);        // zwei Kanonen, die abwechselnd schießen
    kanoneAufstellen("rechts", 330, 85, 170);
    zaehlerZeigen("Wo ist der Staubsauger?");
    tippZeigen("Dein Staubsauger ist weg! Schau mal in die <b>gelbe Truhe</b>.");
    bannerZeigen("Level 5");
  }

  if (nummer === 11) {
    // Level 5, zweites Zimmer: der allergrößte Geist. Er hat nur einen Balken – aber der hält lange!
    maennchen.x = 450; maennchen.z = 540;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Mega-Geist", x: 450, z: 300, groesse: 390, kraftMax: 300, schwebt: 18, zMin: 300, tiefFaktor: 0.55,
      radius: 130, reichweite: 350, zieht: 0.3, jagt: 1.0, jagdPhasen: true, dx: 0.8, dz: 0.5, stoss: 18,
      balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].schubsPause = 200; bosse[0].jagdUhr = 220;     // am Anfang lässt er einem ein paar Sekunden Zeit
    zaehlerZeigen("Mega-Geist!");
    tippZeigen("Der <b>Mega-Geist</b> hat nur einen Balken – aber der hält ganz schön lange!");
    bannerZeigen("Der Mega-Geist!");
    setTimeout(() => {
      if (zimmer === 11 && bosse[0]) { lachTon(); sprechblase("Ich bin der Allergrößte!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  if (nummer === 12) {
    // Level 6, erstes Zimmer: nur die Truhe – aber sie ist größer und schneller als in Level 5.
    maennchen.x = 450; maennchen.z = 530;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    truheAufstellen(450, 300, 215, 1.65, 120);
    zaehlerZeigen("Wo ist der Staubsauger?");
    tippZeigen("Der Staubsauger steckt wieder in der <b>Truhe</b>. Aber Achtung – sie ist größer geworden!");
    bannerZeigen("Level 6");
  }

  if (nummer === 13) {
    // Level 6, zweites Zimmer: der Weg durch die Lava. Die Tür ist offen – man muss nur heil hinkommen.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    tuerOffen = true;
    const a = kleinenGeistMachen(130, 110), b = kleinenGeistMachen(770, 110);
    a.beissPause = 120; b.beissPause = 120;
    geister = [a, b];
    zaehlerZeigen("Lava!");
    tippZeigen("Bleib auf dem <b>Weg</b>! Die Geister wollen dich in die Lava schubsen.");
    bannerZeigen("Die Lava!");
  }

  if (nummer === 14) {
    // Level 6, drittes Zimmer: die Spinnenkanone und zwei Kronen-Geister.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    kanoneAufstellen("links", 300, 0, NETZ_PAUSE, "netz");
    kanonen[0].wach = true; kanonen[0].schussUhr = 120;     // sie ist sofort wach
    bosse = [
      bossMachen({ name: "Kronen-Geist", x: 300, z: 150, groesse: 190, kraftMax: 100, radius: 64, jagt: 1.35, jagdPhasen: true, dx: 0.9, dz: 0.6 }),
      bossMachen({ name: "Kronen-Geist", x: 680, z: 150, groesse: 190, kraftMax: 100, radius: 64, jagt: 1.35, jagdPhasen: true, dx: -0.8, dz: 0.5 }),
    ];
    zaehlerZeigen("Kronen-Geister: 0 von 2");
    tippZeigen("Vorsicht, die <b>Spinnenkanone</b>! Wer vom Netz getroffen wird, klebt fest.");
    bannerZeigen("Die Spinnenkanone!");
  }

  if (nummer === 15) {
    // Level 6, letztes Zimmer: der Geisterkaiser – drei Balken und schneller als alle vor ihm.
    maennchen.x = 450; maennchen.z = 540;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Geisterkaiser", x: 450, z: 300, groesse: 390, kraftMax: 110, leben: 3, schwebt: 18, zMin: 300, tiefFaktor: 0.55,
      radius: 130, reichweite: 350, zieht: 0.3, jagt: 1.4, jagdPhasen: true, dx: 0.9, dz: 0.6, stoss: 18,
      balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].schubsPause = 200; bosse[0].jagdUhr = 220;     // am Anfang lässt er einem ein paar Sekunden Zeit
    zaehlerZeigen("Geisterkaiser!");
    tippZeigen("Der <b>Geisterkaiser</b> hat drei Balken – du musst ihn dreimal besiegen!");
    bannerZeigen("Der Geisterkaiser!");
    setTimeout(() => {
      if (zimmer === 15 && bosse[0]) { lachTon(); sprechblase("Ich bin der Kaiser aller Geister!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  if (nummer === 16) {
    // Level 7, erstes Zimmer: wieder die Truhe mit dem Staubsauger – aber jetzt ist sie ein richtiger Boss
    // mit einem großen Balken oben, wie ein Geisterboss.
    maennchen.x = 450; maennchen.z = 530;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    truheAufstellen(450, 300, 230, 1.75, 200, { name: "Truhen-Boss", balkenOben: true });
    zaehlerZeigen("Wo ist der Staubsauger?");
    tippZeigen("Der Staubsauger steckt in der <b>Truhe</b>. Aber Achtung – diesmal ist sie ein <b>Boss</b>!");
    bannerZeigen("Level 7");
  }

  if (nummer === 17) {
    // Level 7, zweites Zimmer: ganz viel Lava, ein Zickzack-Weg – und über der Lava schwebt ein Kronen-Geist.
    // Erst wenn er eingesaugt ist, geht die Tür hinten links auf.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Lava-Geist", x: 760, z: 160, groesse: 200, kraftMax: 120, radius: 66, stoss: 15,
      jagt: 1.2, jagdPhasen: true, dx: -0.8, dz: 0.6, balkenOben: true,
    })];
    bosse[0].schubsPause = 150;
    zaehlerZeigen("Lava-Geist!");
    tippZeigen("Saug den <b>Lava-Geist</b> ein – aber bleib auf dem <b>Weg</b>! Er will dich in die Lava schubsen.");
    bannerZeigen("Der Lava-Geist!");
    setTimeout(() => {
      if (zimmer === 17 && bosse[0]) { lachTon(); sprechblase("Ab in die Lava mit dir!", bosse[0].x, 250, bosse[0].z); }
    }, 700);
  }

  if (nummer === 18) {
    // Level 7, letztes Zimmer: ein ganz großer Geist, der blinkt und dann ganz schnell herumrast.
    // Er hat nur einen Balken.
    maennchen.x = 450; maennchen.z = 540;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Blitz-Geist", x: 450, z: 300, groesse: 400, kraftMax: 240, schwebt: 18, zMin: 300, tiefFaktor: 0.55,
      radius: 130, reichweite: 350, zieht: 0.3, jagt: 0.6, jagdPhasen: true, dx: 0.7, dz: 0.5, stoss: 18,
      blinkt: true, blinkTempo: 4.0, balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].schubsPause = 200; bosse[0].jagdUhr = 220;     // am Anfang lässt er einem ein paar Sekunden Zeit
    zaehlerZeigen("Blitz-Geist!");
    tippZeigen("Wenn der <b>Blitz-Geist</b> blinkt, rast er los: weglaufen! Blinkt er nicht: saugen!");
    bannerZeigen("Der Blitz-Geist!");
    setTimeout(() => {
      if (zimmer === 18 && bosse[0]) { lachTon(); sprechblase("Ich bin schneller als der Blitz!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  const springTipp = istTouch ? "mit <b>SPRINGEN</b>" : "mit der Taste <b>J</b>";

  if (nummer === 19) {
    // Level 8, erstes Zimmer – so hat Arthur es gezeichnet:
    // die Truhe mit dem Staubsauger, hinten zwei Kronen-Geister und rechts an der Wand die Dynamitkanone.
    maennchen.x = 450; maennchen.z = 530;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    truheAufstellen(330, 320, 215, 1.65, 120);
    kanoneAufstellen("rechts", 330, 0, 150);       // sie wacht auf, wenn die Kronen-Geister kommen
    zaehlerZeigen("Wo ist der Staubsauger?");
    tippZeigen("Der Staubsauger steckt in der <b>Truhe</b>. Neu: Ab jetzt kannst du springen – " + springTipp + "!");
    bannerZeigen("Level 8");
  }

  if (nummer === 20) {
    // Level 8, zweites Zimmer: Der Weg durch die Lava hat Lücken. Da muss man drüberspringen!
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    tuerOffen = true;
    zaehlerZeigen("Spring!");
    tippZeigen("Der Weg hat <b>Lücken</b>! Spring drüber – " + springTipp + ".");
    bannerZeigen("Spring über die Lava!");
  }

  if (nummer === 21) {
    // Level 8, letztes Zimmer: die Bewegungsfalle und ein riesiger Geist mit Blinkmodus, der ganz viel aushält.
    maennchen.x = 450; maennchen.z = 540;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    platteAufstellen();
    bosse = [bossMachen({
      name: "Donner-Geist", x: 450, z: 300, groesse: 410, kraftMax: 320, schwebt: 18, zMin: 300, tiefFaktor: 0.55,
      radius: 130, reichweite: 350, zieht: 0.3, jagt: 0.6, jagdPhasen: true, dx: 0.7, dz: 0.5, stoss: 18,
      blinkt: true, blinkTempo: 4.0, balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].schubsPause = 200; bosse[0].jagdUhr = 220;     // am Anfang lässt er einem ein paar Sekunden Zeit
    zaehlerZeigen("Donner-Geist!");
    tippZeigen("Vorsicht, die <b>Bewegungsfalle</b>! Wer draufsteht, fährt mit. Und wenn der Geist blinkt: weg!");
    bannerZeigen("Der Donner-Geist!");
    setTimeout(() => {
      if (zimmer === 21 && bosse[0]) { lachTon(); sprechblase("Ich halte alles aus!", bosse[0].x, 330, bosse[0].z); }
    }, 700);
  }

  if (nummer === 22) {
    // Level 9 – so hat Arthur es gezeichnet: oben links der Drache, unten rechts der Pümpel.
    maennchen.x = 300; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = 1; maennchen.richtungZ = 0; maennchen.blickt = "seite"; maennchen.nachLinks = false;
    sauger.x = 730; sauger.z = 470;
    bosse = [bossMachen({
      name: "Drache", drache: true, x: 260, z: 200, groesse: 300, kraftMax: 240, leben: 2, schwebt: 0, zMin: 120, tiefFaktor: 0.7,
      radius: 95, jagt: 0.7, jagdPhasen: true, dx: 0.6, dz: 0.4, stoss: 16, ruf: "ROAAR!",
      balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].feuerUhr = 200; bosse[0].maulAuf = 0; bosse[0].getroffen = 0;
    bosse[0].schubsPause = 200; bosse[0].jagdUhr = 240;
    zaehlerZeigen("Der Drache!");
    tippZeigen("Ein <b>Drache</b>! Hol dir den <b>Pümpel</b> unten rechts!");
    bannerZeigen("Level 9");
    setTimeout(() => {
      if (zimmer === 22 && bosse[0]) { brummTon(); sprechblase("ROAAAR! Ich bin der Drache!", bosse[0].x, 330, bosse[0].z); }
    }, 900);
  }

  if (nummer === 23) {
    // Level 10 – so hat Arthur es gezeichnet: der Drache, links und rechts eine Dynamitkanone,
    // in der Mitte der Ventilator mit dem roten Knopf daneben, unten links der Pümpel.
    maennchen.x = 300; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = -1; maennchen.richtungZ = 0; maennchen.blickt = "seite"; maennchen.nachLinks = true;
    sauger.x = 170; sauger.z = 470;
    ventilator = { x: 400, z: 300, an: false };
    knopf = { x: 560, z: 330, pause: 0 };
    kanoneAufstellen("rechts", 330, 0, 320);         // nur noch eine Kanone (Arthurs Wunsch) – alle gut 5 Sekunden
    bosse = [bossMachen({
      name: "Drache", drache: true, x: 600, z: 150, groesse: 300, kraftMax: 240, leben: 1, schwebt: 0, zMin: 120, tiefFaktor: 0.7,
      radius: 95, jagt: 0.45, jagdPhasen: true, dx: 0.6, dz: 0.4, stoss: 16, ruf: "ROAAR!",
      balkenOben: true, wirdZuGeld: true, feuerPause: 240, feuerTempo: 2.2,
    })];
    bosse[0].wartet = true; bosse[0].feuerUhr = 99999; bosse[0].maulAuf = 0; bosse[0].getroffen = 0;
    bosse[0].schubsPause = 200;
    zaehlerZeigen("Der Drache ist zurück!");
    tippZeigen("Der <b>Drache</b> ist wieder da! Hol dir den <b>Pümpel</b> unten links – dann geht der Kampf los.");
    bannerZeigen("Level 10");
  }

  if (nummer === 32) {
    // Level 15 – so hat Arthur es gemalt: ein großes Skelett, größer als das andere und mit mehr Leben.
    // Ist es weggesaugt, kommt das Figuren-Rätsel – und dann ist das Level geschafft.
    maennchen.x = 450; maennchen.z = 540;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Großes Skelett", skelett: true, x: 450, z: 300, groesse: 400, kraftMax: 320, schwebt: 0, zMin: 280, tiefFaktor: 0.55,
      radius: 120, reichweite: 350, zieht: 0.3, jagt: 1.0, jagdPhasen: true, dx: 0.8, dz: 0.5, stoss: 18, ruf: "KLAPPER!",
      balkenOben: true,
    })];
    bosse[0].schubsPause = 200; bosse[0].jagdUhr = 220;
    zaehlerZeigen("Das große Skelett!");
    tippZeigen("Das <b>große Skelett</b> – es hält viel mehr aus! Saug es weg, dann kommt das <b>Rätsel</b>.");
    bannerZeigen("Level 15");
    setTimeout(() => {
      if (zimmer === 32 && bosse[0]) { lachTon(); sprechblase("Ich bin das größte Skelett der Welt!", bosse[0].x, 420, bosse[0].z); }
    }, 900);
  }

  if (nummer === 29) {
    // Level 14, erster Raum: der Kürbis – diesmal ohne Krake. Dreimal draufspringen, dann geht die Tür auf.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    bosse = [bossMachen({
      name: "Kürbis", kuerbis: true, x: 450, z: 260, groesse: 170, kraftMax: 3, schwebt: 0, zMin: 120, tiefFaktor: 0.8,
      radius: 62, jagt: 0.8, jagdPhasen: true, dx: 0.9, dz: 0.6, stoss: 14, ruf: "RUMMS!", balkenOben: true,
    })];
    bosse[0].getroffen = 0; bosse[0].stampfPause = 0; bosse[0].schubsPause = 150;
    zaehlerZeigen("Der Kürbis!");
    tippZeigen("Ein <b>Kürbis</b>! Spring <b>dreimal</b> auf ihn drauf – " + springTipp + ".");
    bannerZeigen("Level 14");
  }

  if (nummer === 30) {
    // Level 14, zweiter Raum: das Skelett. Saug es weg – dann kommt das Figuren-Rätsel.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = true;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    bosse = [bossMachen({
      name: "Skelett", skelett: true, x: 450, z: 230, groesse: 250, kraftMax: 150, schwebt: 0, zMin: 120, tiefFaktor: 0.8,
      radius: 70, jagt: 1.0, jagdPhasen: true, dx: 0.8, dz: 0.5, stoss: 14, ruf: "KLAPPER!", balkenOben: true,
    })];
    bosse[0].schubsPause = 150;
    zaehlerZeigen("Das Skelett!");
    tippZeigen("Ein <b>Skelett</b>! Saug es weg – dann musst du ein <b>Rätsel</b> lösen.");
    bannerZeigen("Das Skelett!");
    setTimeout(() => {
      if (zimmer === 30 && bosse[0]) { lachTon(); sprechblase("Klapper, klapper! Hehehe!", bosse[0].x, 290, bosse[0].z); }
    }, 900);
  }

  if (nummer === 31) {
    // Level 14, letzter Raum: Kabumm steht hinten auf seiner Insel. Das Laufband fährt auf einen zu,
    // vorne ist Wasser. Kabumm wirft Bomben aufs Band – einsammeln und zurückwerfen! Jede Bombe: 5 von 100.
    maennchen.x = 450; maennchen.z = 330;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    tinteModus = true;
    bosse = [bossMachen({
      name: "Kabumm", bandBoss: true, x: 450, z: 95, groesse: 210, kraftMax: 100, schwebt: 0, zMin: 60,
      radius: 0, jagt: 0, dx: 1.2, dz: 0, balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].bombenUhr = 60; bosse[0].getroffen = 0; bosse[0].schubsPause = 99999;
    zaehlerZeigen("Kabumm: 100 von 100");
    tippZeigen("Das <b>Laufband</b> fährt dich zum Wasser – lauf dagegen an! Sammle die <b>Bomben</b> und wirf sie auf Kabumm.");
    bannerZeigen("Kabumm!");
    setTimeout(() => {
      if (zimmer === 31 && bosse[0]) { lachTon(); sprechblase("Ich bin Kabumm! Ab ins Wasser mit dir!", bosse[0].x, 280, bosse[0].z); }
    }, 900);
  }

  if (nummer === 26) {
    // Level 13, erster Raum – so hat Arthur es gemalt: in der Mitte ein großes Becken mit der Krake,
    // oben links und rechts zwei kleine Becken, hinten die Tür. Hier wehrt sich die Krake noch nicht.
    maennchen.x = 450; maennchen.z = 530;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    krakeAufstellen(true);
    becken = [{ x: 170, z: 150, rx: 75, rz: 45 }, { x: 450, z: 300, rx: 130, rz: 70 }, { x: 730, z: 150, rx: 75, rz: 45 }];
    krake.punkteMax = 100; krake.punkte = 100; krake.treffer = 20; krake.groesse = 330; krake.passiv = true;
    kanoneAufstellen("rechts", 460, 0, 150, "tinte");
    kanonen[0].wach = true; kanonen[0].schussUhr = 40;
    zaehlerZeigen("Krake: 100 Punkte");
    tippZeigen("Die <b>Krake</b>! Hier wehrt sie sich noch nicht – bewirf sie mit <b>Tintenballons</b>!");
    bannerZeigen("Level 13");
  }

  if (nummer === 27) {
    // Level 13, zweiter Raum: eine Holzbrücke über dem Wasser, ein paar Bretter fehlen.
    maennchen.x = 390; maennchen.z = 530;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    tuerOffen = true;
    zaehlerZeigen("Die Brücke!");
    tippZeigen("Bei der <b>Brücke</b> fehlen Bretter! Spring über die Lücken – " + springTipp + ".");
    bannerZeigen("Die kaputte Brücke!");
  }

  if (nummer === 28) {
    // Level 13, letzter Raum: der böse Kürbis – und unten drin sitzt die Krake! Dreimal draufspringen, dann ist er kaputt.
    // Hier wehrt sich die Krake: Sie schlägt mit Tentakeln zu, und nach jedem Treffer fährt sie ihre Tentakel hoch –
    // die muss man erst mit einem Sprung wegmachen.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    bosse = [bossMachen({
      name: "Kürbis", kuerbis: true, x: 450, z: 230, groesse: 200, kraftMax: 3, schwebt: 0, zMin: 120, tiefFaktor: 0.8,
      radius: 70, jagt: 0.9, jagdPhasen: true, dx: 0.9, dz: 0.6, stoss: 14, ruf: "RUMMS!",
      balkenOben: true, wirdZuGeld: true,
    })];
    bosse[0].getroffen = 0; bosse[0].stampfPause = 0; bosse[0].schubsPause = 150; bosse[0].schild = false;
    bosse[0].angriff = { zustand: "warten", uhr: 240, rx: 0, rz: 1, ox: 0, oz: 0, laenge: 0 };
    bosse[0].mitKrake = true;
    zaehlerZeigen("Der Kürbis!");
    tippZeigen("Der böse <b>Kürbis</b> – und die <b>Krake</b> sitzt drin! Spring <b>dreimal</b> auf ihn drauf – " + springTipp + ". Pass auf die <b>rote Linie</b> auf!");
    bannerZeigen("Der Kürbis!");
    setTimeout(() => {
      if (zimmer === 28 && bosse[0]) { lachTon(); sprechblase("Arrr! Jetzt wehre ich mich!", bosse[0].x, 300, bosse[0].z); }
    }, 900);
  }

  if (nummer === 25) {
    // Level 12 – so hat Arthur es gemalt: in der Mitte das große Becken mit der erwachsenen Krake,
    // links und rechts zwei kleine Becken, unten zwei Kerzen. Kugelkanonen schießen auf das Männchen
    // (die tun der Krake nichts, aber eine Kugel kostet zwei Herzen!). Rechts die Tintenkanone.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    krakeAufstellen(true);
    kanoneAufstellen("rechts", 460, 0, 130, "tinte");
    kanoneAufstellen("links", 330, 120, 380, "kugel");
    kanoneAufstellen("rechts", 300, 300, 380, "kugel");
    for (const k of kanonen) k.wach = true;
    kanonen[0].schussUhr = 40;
    zaehlerZeigen("Krake: 300 Punkte");
    tippZeigen("Die <b>große Krake</b> ist da – 300 Punkte! Vorsicht vor den <b>Kanonenkugeln</b>: Die kosten zwei Herzen. Drüberspringen hilft!");
    bannerZeigen("Level 12");
    setTimeout(() => {
      if (zimmer === 25 && krake) { lachTon(); sprechblase("Du hast mein Kind geärgert! Arrr!", 450, 330, 175); }
    }, 1200);
  }

  if (nummer === 24) {
    // Level 11 – so hat Arthur es erzählt: drei Wasserbecken, in der Mitte wohnt die böse Krake mit dem Piratenhut.
    // Dazu eine Tintenkanone, die Tintenballons schießt.
    maennchen.x = 450; maennchen.z = 520;
    maennchen.hatSauger = false;
    maennchen.richtungX = 0; maennchen.richtungZ = -1; maennchen.blickt = "hinten";
    sauger.versteckt = true;
    krakeAufstellen(false);
    kanoneAufstellen("links", 440, 0, TINTE_PAUSE, "tinte");
    kanonen[0].wach = true; kanonen[0].schussUhr = 60;
    zaehlerZeigen("Krake: " + KRAKE_PUNKTE + " Punkte");
    tippZeigen("Die böse <b>Krake</b>! Sammle die <b>Tintenballons</b> von der Tintenkanone ein und bewirf sie damit. Pass auf die <b>rote Linie</b> auf!");
    bannerZeigen("Level 11");
    setTimeout(() => {
      if (zimmer === 24 && krake) { lachTon(); sprechblase("Arrr! Ich bin die Piraten-Krake!", 450, 300, 175); }
    }, 1200);
  }

  bosseAmAnfang = bosse.length;
  if (nochmalVersuchen) {
    bannerZeigen("Nochmal!");
    // nochmalVersuchen kann auch ein eigener Text sein (zum Beispiel nach einer falschen Antwort)
    tippZeigen(typeof nochmalVersuchen === "string" ? nochmalVersuchen : "Erwischt! Gleich nochmal – du schaffst das!");
  }
}

// ---- 15. Glitzer, Saug-Luft, Sprechblasen und Banner -----------------
function sternchen(x, y, z, farbe) {
  glitzer.push({ x, y, z, dx: zufall(-4, 4), dy: zufall(2, 7), dz: zufall(-3, 3), leben: 40, farbe });
}
function sprechblase(text, x, y, z) {
  sprechblasen.push({ text, x, y, z, leben: 110 });
}
function bannerZeigen(text) {
  banner = { text, leben: 130 };
}
function effekteBewegen() {
  for (const s of glitzer) { s.x += s.dx; s.y += s.dy; s.z += s.dz; s.dy -= 0.3; s.leben -= 1; }
  glitzer = glitzer.filter((s) => s.leben > 0);
  for (const s of sprechblasen) { s.y += 0.4; s.leben -= 1; }
  sprechblasen = sprechblasen.filter((s) => s.leben > 0);
  if (banner) { banner.leben -= 1; if (banner.leben <= 0) banner = null; }
  if (herzHuepfer > 0) herzHuepfer -= 1;
  if (treffBlitz > 0) treffBlitz -= 1;
  wackeln = wackeln * 0.86;
  if (maennchen.quetschen > 0) maennchen.quetschen -= 1;
  staubBewegen();
  woelkchenBewegen();

  const duese = duesenPunkt();
  if (saugtGerade) {
    for (let i = 0; i < 2; i++) {
      const winkel = Math.atan2(maennchen.richtungZ, maennchen.richtungX) + zufall(-0.5, 0.5);
      const weite = zufall(120, 220);
      saugStreifen.push({ x: duese.x + Math.cos(winkel) * weite, y: zufall(20, 90), z: duese.z + Math.sin(winkel) * weite, leben: 1 });
    }
  }
  for (const s of saugStreifen) {
    s.x += (duese.x - s.x) * 0.12;
    s.y += (duese.y - s.y) * 0.12;
    s.z += (duese.z - s.z) * 0.12;
    s.leben -= 0.06;
  }
  saugStreifen = saugStreifen.filter((s) => s.leben > 0);
}

// ---- 15b. Schöner malen: Stoff, Holz, Licht, Staub und Wackeln ---------
// Alles hier ist nur fürs Aussehen – am Spiel selbst ändert es nichts.
const SCHOEN = { stoff: 0.16, holz: 0.13, staub: 34, vignette: 0.38 };   // wie stark die Effekte sind

// Ein kleines Stoff-Muster (wie gewebt) und ein Holz-Muster – einmal gemalt, dann immer wieder benutzt
function musterMachen(art) {
  const c = document.createElement("canvas");
  c.width = art === "stoff" ? 48 : 256; c.height = art === "stoff" ? 48 : 64;
  const m = c.getContext("2d");
  let samen = art === "stoff" ? 7 : 11;
  const zz = () => { samen = (samen * 16807) % 2147483647; return samen / 2147483647; };   // immer dasselbe Muster
  if (art === "stoff") {
    for (let y = 0; y < 48; y += 3) {
      for (let x = 0; x < 48; x += 3) {
        const hell = ((x + y) / 3) % 2 === 0;
        m.fillStyle = hell ? "rgba(255,255,255," + (0.35 + zz() * 0.3) + ")" : "rgba(0,0,0," + (0.3 + zz() * 0.3) + ")";
        m.fillRect(x, y, hell ? 3 : 2, hell ? 2 : 3);
      }
    }
  } else {
    for (let i = 0; i < 14; i++) {        // Maserung: lange, leicht gewellte Linien
      const y0 = zz() * 64, welle = 1 + zz() * 3;
      m.strokeStyle = zz() < 0.5 ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.5)";
      m.lineWidth = 0.6 + zz() * 1.2;
      m.beginPath();
      for (let x = 0; x <= 256; x += 8) { const y = y0 + Math.sin(x / 30 + i) * welle; if (x === 0) m.moveTo(x, y); else m.lineTo(x, y); }
      m.stroke();
    }
    for (let i = 0; i < 2; i++) {          // ein paar Astlöcher
      const x = zz() * 256, y = zz() * 64;
      m.strokeStyle = "rgba(0,0,0,0.5)"; m.lineWidth = 1;
      m.beginPath(); m.ellipse(x, y, 7, 3, 0, 0, 6.28); m.stroke();
    }
  }
  return malen.createPattern(c, "repeat");
}
let stoffMuster = null, holzMuster = null;

// Legt ein Muster leicht über eine Fläche im Zimmer
function musterUeber(ecken, muster, deckkraft) {
  if (!muster) return;
  malen.save();
  malen.beginPath();
  ecken.forEach(([x, y, z], i) => { const p = aufsBild(x, y, z); if (i === 0) malen.moveTo(p.x, p.y); else malen.lineTo(p.x, p.y); });
  malen.closePath(); malen.clip();
  malen.globalAlpha = deckkraft; malen.fillStyle = muster;
  malen.fillRect(0, 0, 960, 600);
  malen.restore();
}

// Weiches Licht von oben, dunklere Ecken (wie unter einer Lampe)
let lichtBild = null;
function lichtMalen() {
  if (lichtBild) { malen.drawImage(lichtBild, 0, 0); return; }
  const c = document.createElement("canvas"); c.width = 960; c.height = 600;
  const echt = malen; malen = c.getContext("2d");
  lichtMalenEinmal();
  malen = echt; lichtBild = c;
  malen.drawImage(lichtBild, 0, 0);
}
function lichtMalenEinmal() {
  const licht = malen.createRadialGradient(480, 120, 40, 480, 160, 560);
  licht.addColorStop(0, "rgba(255, 244, 220, 0.16)");
  licht.addColorStop(0.55, "rgba(255, 244, 220, 0.04)");
  licht.addColorStop(1, "rgba(255, 244, 220, 0)");
  malen.fillStyle = licht; malen.fillRect(0, 0, 960, 600);
  const rand = malen.createRadialGradient(480, 300, 260, 480, 300, 640);
  rand.addColorStop(0, "rgba(20, 0, 30, 0)");
  rand.addColorStop(1, "rgba(20, 0, 30, " + SCHOEN.vignette + ")");
  malen.fillStyle = rand; malen.fillRect(0, 0, 960, 600);
}

// Schatten in den Ecken, wo Boden und Wände sich treffen
function eckenSchattenMalen() {
  const B = BREITE, T = TIEFE;
  for (let i = 0; i < 4; i++) {
    const breit = 18 + i * 18, a = 0.05;
    flaeche([[0, 0, 0], [breit, 0, 0], [breit, 0, T], [0, 0, T]], "rgba(40, 0, 30, " + a + ")");
    flaeche([[B - breit, 0, 0], [B, 0, 0], [B, 0, T], [B - breit, 0, T]], "rgba(40, 0, 30, " + a + ")");
  }
}

// Staubkörnchen, die langsam durch das Licht schweben
let staub = [];
function staubBewegen() {
  while (staub.length < SCHOEN.staub) {
    staub.push({ x: zufall(40, BREITE - 40), y: zufall(30, WANDHOEHE), z: zufall(20, TIEFE - 20),
                 dx: zufall(-0.15, 0.15), dy: zufall(-0.08, 0.12), phase: zufall(0, 6.28), groesse: zufall(1.2, 2.6) });
  }
  for (const k of staub) {
    k.x += k.dx + Math.sin(zeit * 0.01 + k.phase) * 0.1; k.y += k.dy; k.phase += 0.02;
    if (k.y > WANDHOEHE + 20 || k.y < 0 || k.x < 0 || k.x > BREITE) { k.y = zufall(20, 60); k.x = zufall(40, BREITE - 40); }
  }
}
function staubMalen() {
  malen.fillStyle = "#fff6e6";
  for (const k of staub) {
    const p = aufsBild(k.x, k.y, k.z);
    malen.globalAlpha = 0.18 + 0.18 * Math.sin(k.phase * 2);
    malen.beginPath(); malen.arc(p.x, p.y, k.groesse * p.groesse, 0, 6.28); malen.fill();
  }
  malen.globalAlpha = 1;
}

// Kleine Staubwölkchen bei den Schritten und beim Landen
let woelkchen = [];
function woelkchenMachen(x, z, anzahl, kraft) {
  for (let i = 0; i < anzahl; i++) {
    const w = zufall(0, 6.28);
    woelkchen.push({ x: x + zufall(-12, 12), y: 4, z: z + zufall(-6, 6), dx: Math.cos(w) * kraft, dz: Math.sin(w) * kraft * 0.6,
                     r: zufall(6, 11), leben: 1 });
  }
}
function woelkchenBewegen() {
  for (const w of woelkchen) { w.x += w.dx; w.z += w.dz; w.y += 0.35; w.r += 0.35; w.dx *= 0.92; w.dz *= 0.92; w.leben -= 0.035; }
  woelkchen = woelkchen.filter((w) => w.leben > 0);
}
function woelkchenMalen() {
  for (const w of woelkchen) {
    const p = aufsBild(w.x, w.y, w.z);
    malen.fillStyle = "rgba(255, 245, 250, " + (w.leben * 0.45) + ")";
    malen.beginPath(); malen.arc(p.x, p.y, w.r * p.groesse, 0, 6.28); malen.fill();
  }
}

// Das Bild wackelt kurz bei Explosionen und Treffern
let wackeln = 0;
function kameraWackeln(staerke) { wackeln = Math.max(wackeln, staerke); }

// Glitzer als kleine Sterne mit Leuchten
function sternMalen(x, y, r, farbe, deckkraft) {
  malen.globalAlpha = deckkraft * 0.35;
  malen.fillStyle = farbe;
  malen.beginPath(); malen.arc(x, y, r * 1.8, 0, 6.28); malen.fill();
  malen.globalAlpha = deckkraft;
  malen.beginPath();
  for (let i = 0; i < 8; i++) {
    const w = i * Math.PI / 4 + zeit * 0.05, l = i % 2 === 0 ? r * 1.6 : r * 0.55;
    const px = x + Math.cos(w) * l, py = y + Math.sin(w) * l;
    if (i === 0) malen.moveTo(px, py); else malen.lineTo(px, py);
  }
  malen.closePath(); malen.fill();
}

// ---- 16. Das Zimmer malen ----------------------------------------
// Malt eine Fläche mit vielen Ecken (jede Ecke ist ein Punkt im Zimmer)
function flaeche(ecken, farbe, rand) {
  malen.beginPath();
  ecken.forEach(([x, y, z], i) => {
    const p = aufsBild(x, y, z);
    if (i === 0) malen.moveTo(p.x, p.y); else malen.lineTo(p.x, p.y);
  });
  malen.closePath();
  malen.fillStyle = farbe; malen.fill();
  if (rand) { malen.strokeStyle = "#111014"; malen.lineWidth = rand; malen.lineJoin = "round"; malen.stroke(); }
}
function linie(a, b, farbe, dicke) {
  const p = aufsBild(...a), q = aufsBild(...b);
  malen.strokeStyle = farbe; malen.lineWidth = dicke;
  malen.beginPath(); malen.moveTo(p.x, p.y); malen.lineTo(q.x, q.y); malen.stroke();
}

// Der Hintergrund (Wände und Boden mit Stoff und Holz) ändert sich nie – den malen wir pro Zimmer nur einmal
let hintergrund = null;
function hintergrundBauen() {
  const Z = ZIMMER[zimmer];
  const B = BREITE, T = TIEFE, H = WANDHOEHE;
  const c = document.createElement("canvas"); c.width = 960; c.height = 600;
  const echt = malen;
  malen = c.getContext("2d");
  malen.fillStyle = "#2b1030";
  malen.fillRect(0, 0, 960, 600);

  // Rückwand und Seitenwände
  flaeche([[0, 0, 0], [B, 0, 0], [B, H, 0], [0, H, 0]], Z.hinten);
  flaeche([[0, 0, 0], [0, 0, T], [0, H, T], [0, H, 0]], Z.links);
  flaeche([[B, 0, 0], [B, 0, T], [B, H, T], [B, H, 0]], Z.rechts);
  // Tapeten-Streifen
  for (let x = 45; x < B; x = x + 90) linie([x, 0, 0], [x, H, 0], Z.streifen, 10);
  for (let z = 45; z < T; z = z + 90) {
    linie([0, 0, z], [0, H, z], Z.streifen, 8);
    linie([B, 0, z], [B, H, z], Z.streifen, 8);
  }
  // Die Wände sehen aus wie Stoff
  if (!stoffMuster) { stoffMuster = musterMachen("stoff"); holzMuster = musterMachen("holz"); }
  musterUeber([[0, 0, 0], [B, 0, 0], [B, H, 0], [0, H, 0]], stoffMuster, SCHOEN.stoff);
  musterUeber([[0, 0, 0], [0, 0, T], [0, H, T], [0, H, 0]], stoffMuster, SCHOEN.stoff);
  musterUeber([[B, 0, 0], [B, 0, T], [B, H, T], [B, H, 0]], stoffMuster, SCHOEN.stoff);
  // Oben an den Wänden ist es dunkler, unten fällt das Licht hin
  const wandOben = aufsBild(0, H, 0).y, wandUnten = aufsBild(0, 0, 0).y;
  const wandLicht = malen.createLinearGradient(0, wandOben, 0, wandUnten);
  wandLicht.addColorStop(0, "rgba(10, 0, 20, 0.28)"); wandLicht.addColorStop(1, "rgba(10, 0, 20, 0)");
  flaeche([[0, 0, 0], [B, 0, 0], [B, H, 0], [0, H, 0]], wandLicht);

  // Der pinke Fußboden mit Dielen
  flaeche([[0, 0, 0], [B, 0, 0], [B, 0, T], [0, 0, T]], "#ff69b4");
  for (let z = 0; z < T; z = z + 56) {
    if ((z / 56) % 2 === 1) flaeche([[0, 0, z], [B, 0, z], [B, 0, z + 56], [0, 0, z + 56]], "rgba(255,255,255,0.06)");
    linie([0, 0, z], [B, 0, z], "rgba(120, 20, 70, 0.25)", 1.5);
  }
  musterUeber([[0, 0, 0], [B, 0, 0], [B, 0, T], [0, 0, T]], holzMuster, SCHOEN.holz);
  eckenSchattenMalen();
  malen = echt;
  hintergrund = { zimmer, bild: c };
}

function zimmerMalen() {
  const Z = ZIMMER[zimmer];
  const B = BREITE, T = TIEFE, H = WANDHOEHE;
  if (!hintergrund || hintergrund.zimmer !== zimmer) hintergrundBauen();
  malen.drawImage(hintergrund.bild, 0, 0);

  // Ein Fenster mit Mond an der Rückwand
  if (Z.fenster) {
    const fx1 = 350, fx2 = 550, fy1 = 95, fy2 = 225;
    flaeche([[fx1, fy1, 0], [fx2, fy1, 0], [fx2, fy2, 0], [fx1, fy2, 0]], "#1b1640", 8);
    for (let i = 0; i < 6; i++) {                         // funkelnde Sterne
      const st = aufsBild(fx1 + 20 + ((i * 37) % 160), fy1 + 15 + ((i * 53) % 100), 0);
      malen.fillStyle = "rgba(255, 244, 250, " + (0.4 + 0.4 * Math.sin(zeit * 0.05 + i)) + ")";
      malen.fillRect(st.x, st.y, 3, 3);
    }
    const mond = aufsBild(505, 190, 0);
    malen.fillStyle = "#fff3b0";
    malen.beginPath(); malen.arc(mond.x, mond.y, 20, 0, 6.28); malen.fill();
    malen.fillStyle = "#1b1640";
    malen.beginPath(); malen.arc(mond.x - 9, mond.y - 5, 17, 0, 6.28); malen.fill();
    linie([(fx1 + fx2) / 2, fy1, 0], [(fx1 + fx2) / 2, fy2, 0], "#111014", 7);
    linie([fx1, (fy1 + fy2) / 2, 0], [fx2, (fy1 + fy2) / 2, 0], "#111014", 7);
  }

  // Flackernde Kerzen an der Rückwand (im Zimmer vom Riesengeist)
  if (Z.kerzen) {
    for (const kx of [170, 730]) {
      const fuss = aufsBild(kx, 150, 0), flamme = aufsBild(kx, 185, 0);
      const flackern = 1 + Math.sin(zeit * 0.4 + kx) * 0.15;
      malen.fillStyle = "rgba(255, 190, 80, 0.16)";
      malen.beginPath(); malen.arc(flamme.x, flamme.y, 48 * flackern, 0, 6.28); malen.fill();
      malen.fillStyle = "#111014";
      malen.fillRect(fuss.x - 14, fuss.y, 28, 6);
      malen.fillStyle = "#f5e9d8";
      malen.fillRect(fuss.x - 5, fuss.y - 22, 10, 22);
      malen.fillStyle = "#ffb347";
      malen.beginPath(); malen.ellipse(flamme.x, flamme.y - 2, 6 * flackern, 11 * flackern, 0, 0, 6.28); malen.fill();
      malen.fillStyle = "#fff3b0";
      malen.beginPath(); malen.ellipse(flamme.x, flamme.y, 3, 6, 0, 0, 6.28); malen.fill();
    }
  }

  // Die Tür in der Rückwand – da geht es zum Riesengeist
  if (Z.tuerHinten) {
    const TH = Z.tuerHinten, hoch = TUER_HINTEN_HOEHE;
    const ecken = [[TH.von, 0, 0], [TH.bis, 0, 0], [TH.bis, hoch, 0], [TH.von, hoch, 0]];
    if (!tuerOffen || TH.zu) {
      flaeche(ecken, TH.farbe || "#0d0b12", 5);
      const klinke = aufsBild(TH.bis - 20, 85, 0);
      malen.fillStyle = "#ffd34d";
      malen.beginPath(); malen.arc(klinke.x, klinke.y, 5, 0, 6.28); malen.fill();
    } else {
      flaeche(ecken, "rgba(255, 211, 77, " + (0.65 + Math.sin(zeit * 0.08) * 0.25) + ")", 5);
    }
  }

  // Links die Tür, durch die das Männchen hereingekommen ist
  if (Z.tuerLinks) {
    flaeche([[0, 0, TUER.von], [0, 0, TUER.bis], [0, TUER.hoehe, TUER.bis], [0, TUER.hoehe, TUER.von]], "#1a0f18", 4);
  }

  // Die Tür in der rechten Wand
  if (Z.tuerRechts) {
    const tuerEcken = [[B, 0, TUER.von], [B, 0, TUER.bis], [B, TUER.hoehe, TUER.bis], [B, TUER.hoehe, TUER.von]];
    if (!tuerOffen) {
      flaeche(tuerEcken, "#2a1a24", 4);
      const klinke = aufsBild(B, 85, TUER.bis - 22);
      malen.fillStyle = "#ffd34d";
      malen.beginPath(); malen.arc(klinke.x, klinke.y, 6, 0, 6.28); malen.fill();
    } else {
      flaeche(tuerEcken, "rgba(255, 211, 77, " + (0.65 + Math.sin(zeit * 0.08) * 0.25) + ")", 4);
    }
  }

  // (der Fußboden steckt schon im Hintergrund)
  // Lava mit einem schmalen Weg
  if (Z.lava) lavaMalen(Z);
  // Die Bewegungsfalle (Level 8)
  if (platte) platteMalen();
  // Wasserbecken (Level 11)
  if (becken.length) beckenMalen();
  // Ventilator und Knopf (Level 10)
  if (ventilator) ventilatorMalen();
  if (knopf) knopfMalen();
  // Ein roter Teppich
  if (Z.teppich) {
    flaeche([[200, 0, 120], [700, 0, 120], [700, 0, 470], [200, 0, 470]], "#c2185b", 4);
    flaeche([[225, 0, 140], [675, 0, 140], [675, 0, 450], [225, 0, 450]], "rgba(255, 211, 77, 0.25)");
    flaeche([[245, 0, 158], [655, 0, 158], [655, 0, 432], [245, 0, 432]], "#c2185b");
  }
  // Schatten, wo Boden und Rückwand sich treffen
  const hinten = aufsBild(0, 0, 0).y;
  const verlauf = malen.createLinearGradient(0, hinten, 0, hinten + 40);
  verlauf.addColorStop(0, "rgba(90, 0, 50, 0.35)"); verlauf.addColorStop(1, "rgba(90, 0, 50, 0)");
  flaeche([[0, 0, 0], [B, 0, 0], [B, 0, 60], [0, 0, 60]], verlauf);

  // Schwarze Fußleisten und Kanten – wie bei einem Puppenhaus
  linie([0, 0, 0], [B, 0, 0], "#111014", 6);
  linie([0, 0, 0], [0, 0, T], "#111014", 6);
  linie([B, 0, 0], [B, 0, T], "#111014", 6);
  linie([0, 0, 0], [0, H, 0], "#111014", 4);
  linie([B, 0, 0], [B, H, 0], "#111014", 4);
  linie([0, H, 0], [B, H, 0], "#111014", 10);
  linie([0, H, 0], [0, H, T], "#111014", 10);
  linie([B, H, 0], [B, H, T], "#111014", 10);
  linie([0, 0, T], [0, H, T], "#111014", 10);
  linie([B, 0, T], [B, H, T], "#111014", 10);
  // Die Vorderkante vom Boden – das Zimmer steht wie eine Kiste da
  const vl = aufsBild(0, 0, T), vr = aufsBild(B, 0, T);
  malen.fillStyle = "#111014";
  malen.fillRect(vl.x - 5, vl.y, vr.x - vl.x + 10, 16);

  // Offene Tür: ein Pfeil auf dem Boden zeigt den Weg
  if (tuerOffen && Z.tuerRechts) {
    const mitte = (TUER.von + TUER.bis) / 2;
    const w = Math.sin(zeit * 0.12) * 10;
    malen.globalAlpha = 0.9;
    flaeche([[B - 130 + w, 0, mitte - 30], [B - 80 + w, 0, mitte - 30], [B - 80 + w, 0, mitte - 55],
             [B - 30 + w, 0, mitte], [B - 80 + w, 0, mitte + 55], [B - 80 + w, 0, mitte + 30],
             [B - 130 + w, 0, mitte + 30]], "#ffd34d");
    malen.globalAlpha = 1;
  }
  if (tuerOffen && Z.tuerHinten && !Z.tuerHinten.zu) {
    const mitte = (Z.tuerHinten.von + Z.tuerHinten.bis) / 2;
    const w = Math.sin(zeit * 0.12) * 10;
    malen.globalAlpha = 0.9;
    flaeche([[mitte - 22, 0, 190 + w], [mitte + 22, 0, 190 + w], [mitte + 22, 0, 120 + w],
             [mitte + 48, 0, 120 + w], [mitte, 0, 50 + w], [mitte - 48, 0, 120 + w],
             [mitte - 22, 0, 120 + w]], "#ffd34d");
    malen.globalAlpha = 1;
  }
}

// Die blubbernde Lava – und darauf der pinke Weg
function lavaMalen(Z) {
  const B = BREITE, T = TIEFE;
  if (Z.wasser) { wasserMalen(Z); return; }
  flaeche([[0, 0, 0], [B, 0, 0], [B, 0, T], [0, 0, T]], "#e8410f");
  for (let i = 0; i < 28; i++) {
    const x = (i * 137) % B + Math.sin(zeit * 0.02 + i) * 20;
    const z = (i * 89) % T;
    const r = 20 + 10 * Math.sin(zeit * 0.05 + i * 1.7);
    const p = aufsBild(x, 0, z);
    malen.fillStyle = i % 3 ? "rgba(255, 170, 40, 0.55)" : "rgba(255, 235, 130, 0.6)";
    malen.beginPath(); malen.ellipse(p.x, p.y, r * p.groesse * 1.6, r * p.groesse * 0.5, 0, 0, 6.28); malen.fill();
  }
  // erst ein dunkler Rand, dann der Weg darauf
  for (const [x1, z1, x2, z2] of Z.weg) {
    const a = Math.max(0, z1 - 9);
    flaeche([[x1 - 9, 0, a], [x2 + 9, 0, a], [x2 + 9, 0, z2 + 9], [x1 - 9, 0, z2 + 9]], "#3a1208");
  }
  for (const [x1, z1, x2, z2] of Z.weg) {
    const a = Math.max(0, z1);
    flaeche([[x1, 0, a], [x2, 0, a], [x2, 0, z2], [x1, 0, z2]], "#ff69b4");
  }
}

// Level 13: Wasser mit einer Holzbrücke darüber
function wasserMalen(Z) {
  const B = BREITE, T = TIEFE;
  flaeche([[0, 0, 0], [B, 0, 0], [B, 0, T], [0, 0, T]], "#2f7fd0");
  for (let i = 0; i < 30; i++) {
    const x = (i * 137) % B + Math.sin(zeit * 0.03 + i) * 25, z = (i * 89) % T;
    const p = aufsBild(x, 0, z);
    malen.strokeStyle = "rgba(255,255,255,0.45)"; malen.lineWidth = 3;
    malen.beginPath(); malen.arc(p.x, p.y, 16 * p.groesse, 3.5, 5.9); malen.stroke();
  }
  if (Z.band) { laufbandMalen(Z); return; }
  for (const [x1, z1, x2, z2] of Z.weg) {
    const a = Math.max(0, z1);
    flaeche([[x1 - 8, 0, a], [x2 + 8, 0, a], [x2 + 8, 0, z2 + 8], [x1 - 8, 0, z2 + 8]], "#3b2412");
    flaeche([[x1, 0, a], [x2, 0, a], [x2, 0, z2], [x1, 0, z2]], "#9c6b3c");
    for (let z = a + 18; z < z2; z = z + 18) linie([x1, 0, z], [x2, 0, z], "#6b4423", 3);   // die Bretter
    linie([x1, 0, a], [x1, 0, z2], "#3b2412", 5); linie([x2, 0, a], [x2, 0, z2], "#3b2412", 5);
  }
}

function laufbandMalen(Z) {
  const [x1, z1, x2, z2] = Z.weg[0];
  // Kabumms Insel hinten
  flaeche([[150, 0, 40], [750, 0, 40], [750, 0, 150], [150, 0, 150]], "#8e99a6", 5);
  // das Laufband: graue Fläche mit Streifen, die nach vorne wandern
  flaeche([[x1 - 8, 0, z1 - 8], [x2 + 8, 0, z1 - 8], [x2 + 8, 0, z2 + 8], [x1 - 8, 0, z2 + 8]], "#111014");
  flaeche([[x1, 0, z1], [x2, 0, z1], [x2, 0, z2], [x1, 0, z2]], "#4a4f5a");
  const versatz = (zeit * BAND_TEMPO) % 40;
  for (let z = z1 + versatz; z < z2; z = z + 40) {
    flaeche([[x1, 0, z], [x2, 0, z], [x2, 0, Math.min(z2, z + 16)], [x1, 0, Math.min(z2, z + 16)]], "rgba(255,255,255,0.10)");
  }
  // Pfeile zeigen, wohin das Band fährt
  for (const ax of [200, 450, 700]) {
    const az = z1 + 60 + ((zeit * BAND_TEMPO) % 240);
    if (az < z2 - 30) flaeche([[ax - 26, 0, az], [ax + 26, 0, az], [ax, 0, az + 30]], "rgba(255, 211, 77, 0.6)");
  }
}

// ---- 17. Figuren malen -------------------------------------------
// Malt ein Bild so, dass seine Füße genau auf (x, y) stehen
function bildMalenAufFuessen(b, x, y, hoehe, spiegeln) {
  const breite = hoehe * b.width / b.height;
  malen.save();
  malen.translate(x, y);
  if (spiegeln) malen.scale(-1, 1);
  malen.drawImage(b, -breite / 2, -hoehe, breite, hoehe);
  malen.restore();
}

// Ein weicher Schatten auf dem Boden
function schattenMalen(x, z, breite, deckkraft) {
  breite = Math.max(1, breite);            // ein Schatten ist nie kleiner als nichts
  const p = aufsBild(x, 0, z);
  const r = breite * p.groesse * 1.15;
  // ein weicher Schatten: in der Mitte dunkel, am Rand verschwommen
  malen.save();
  malen.translate(p.x, p.y); malen.scale(1, 0.3);
  const weich = malen.createRadialGradient(0, 0, 0, 0, 0, r);
  weich.addColorStop(0, "rgba(60, 0, 40, " + Math.min(0.6, deckkraft * 1.5) + ")");
  weich.addColorStop(0.6, "rgba(60, 0, 40, " + deckkraft * 0.8 + ")");
  weich.addColorStop(1, "rgba(60, 0, 40, 0)");
  malen.fillStyle = weich;
  malen.beginPath(); malen.arc(0, 0, r, 0, 6.28); malen.fill();
  malen.restore();
}

// Hier passiert der Lauf-Trick!
// Wir schneiden das Foto vom Männchen in Stücke: oben der Körper, unten die Beine.
// Dann bewegen wir die Beine abwechselnd – und schon sieht es aus, als würde es laufen.
function maennchenMalen() {
  const p = aufsBild(maennchen.x, maennchen.hoehe, maennchen.z);
  const b = bild[maennchen.blickt];
  const h = maennchen.groesse * p.groesse;      // Größe auf dem Bildschirm
  const w = h * b.width / b.height;
  const bein = BEINE[maennchen.blickt];
  const takt = Math.sin(maennchen.schrittTakt);  // schwingt zwischen -1 und +1
  const stark = maennchen.laeuft ? 1 : Math.min(1, Math.abs(takt));

  const huepfen = -Math.abs(takt) * h * 0.03 * stark;                 // bei jedem Schritt ein kleiner Hüpfer
  const atmen = maennchen.laeuft ? 1 : 1 + Math.sin(zeit * 0.06) * 0.012;  // im Stehen leise atmen

  malen.save();
  malen.translate(p.x, p.y);                     // (0, 0) sind jetzt die Füße
  // Beim Absprung wird er lang, beim Landen kurz platt – wie ein Gummiball
  const qs = (maennchen.quetschen || 0) / 10, flug = maennchen.sprungTempo > 2 ? 0.08 : 0;
  malen.scale(1 + qs * 0.22 - flug * 0.5, 1 - qs * 0.22 + flug);
  if (maennchen.blickt === "seite" && maennchen.nachLinks) malen.scale(-1, 1);

  const bw = b.width, bh = b.height;
  const beinOben = bein.ab * bh;
  const links = bein.links * bw, rechts = bein.rechts * bw, mitteX = (links + rechts) / 2;
  const s = h / bh;

  if (maennchen.blickt === "seite") {
    // Von der Seite: die Beine schwingen vor und zurück wie eine Schere
    const winkel = takt * 0.42 * stark;
    const huefteX = (mitteX - bw / 2) * s, huefteY = -h + beinOben * s;
    for (const [dreh, dunkel] of [[-winkel, true], [winkel, false]]) {
      malen.save();
      malen.translate(huefteX, huefteY);
      malen.rotate(dreh);
      if (dunkel) malen.filter = "brightness(0.7)";  // das hintere Bein ist im Schatten
      malen.drawImage(b, links, beinOben, rechts - links, bh - beinOben,
                      (links - mitteX) * s, 0, (rechts - links) * s, (bh - beinOben) * s);
      malen.restore();
    }
  } else {
    // Von vorne oder hinten: immer ein Bein hebt sich, dann das andere
    const hebLinks = Math.max(0, takt) * h * 0.07 * stark;
    const hebRechts = Math.max(0, -takt) * h * 0.07 * stark;
    const halbe = (rechts - links) / 2;
    malen.drawImage(b, links, beinOben, halbe, bh - beinOben,
                    (links - bw / 2) * s, -h + beinOben * s - hebLinks, halbe * s, (bh - beinOben) * s);
    malen.drawImage(b, links + halbe, beinOben, halbe, bh - beinOben,
                    (links + halbe - bw / 2) * s, -h + beinOben * s - hebRechts, halbe * s, (bh - beinOben) * s);
  }

  // Jetzt der Körper obendrauf – ohne den Bein-Bereich (den haben wir schon gemalt)
  malen.save();
  const neigen = maennchen.blickt === "seite" ? 0.05 * stark : takt * 0.05 * stark;
  malen.translate(0, huepfen);
  malen.rotate(neigen);
  malen.scale(1, atmen);
  malen.beginPath();
  malen.rect(-w / 2 - 2, -h - 2, w + 4, h + 4);
  malen.rect((links - bw / 2) * s, -h + (beinOben + bh * 0.03) * s, (rechts - links) * s, h);  // Loch für die Beine
  malen.clip("evenodd");
  malen.drawImage(b, -w / 2, -h, w, h);
  malen.restore();

  malen.restore();
}

// Das Netz, in dem das Männchen festklebt
function netzUeberMaennchenMalen() {
  const p = aufsBild(maennchen.x, 0, maennchen.z);
  const b = bild.netzOffen;
  const breite = 150 * p.groesse, hoehe = breite * b.height / b.width;
  const zappeln = Math.sin(zeit * 0.6) * 0.06;
  malen.save();
  malen.translate(p.x, p.y - maennchen.groesse * p.groesse * 0.55);
  malen.rotate(Math.PI + zappeln);           // umgedreht: wie ein Netz, das über ihn geworfen wurde
  malen.drawImage(b, -breite / 2, -hoehe / 2, breite, hoehe);
  malen.restore();
  // ein kleiner Ring zeigt, wie lange es noch dauert
  const ring = aufsBild(maennchen.x, maennchen.groesse + 40, maennchen.z);
  malen.strokeStyle = "#f4f6ff"; malen.lineWidth = 6;
  malen.beginPath(); malen.arc(ring.x, ring.y, 16, -Math.PI / 2, -Math.PI / 2 + 6.283 * maennchen.klebt / KLEBEZEIT); malen.stroke();
}

// Der Staubsauger in der Hand
function saugerInDerHandMalen() {
  if (ZIMMER[zimmer].puempel) { puempelInDerHandMalen(); return; }
  const brummen = saugtGerade ? zufall(-1.5, 1.5) : 0;
  const daneben = Math.abs(maennchen.richtungX) < 0.5 ? 40 : 0;   // nach vorne/hinten: neben sich tragen
  const p = aufsBild(maennchen.x + maennchen.richtungX * 52 + daneben + brummen, maennchen.hoehe, maennchen.z + maennchen.richtungZ * 25);
  // Das Bild zeigt mit dem Rohr nach links – schaut das Männchen nach rechts, spiegeln wir es
  bildMalenAufFuessen(bild.sauger, p.x, p.y, 95 * p.groesse, maennchen.richtungX > 0);
}

// Wie groß wird etwas gemalt, das gerade eingesaugt wird? Je näher am Rohr, desto kleiner.
function schrumpfen(ding, groesse) {
  const d = duesenPunkt();
  return groesse * Math.max(0.25, Math.min(1, Math.hypot(ding.x - d.x, ding.z - d.z) / 110));
}

function geistMalen(g) {
  const schweben = 45 + Math.sin(g.wippen) * 10;       // er schwebt über dem Boden und wippt
  const zittern = g.zappeln ? zufall(-3, 3) : 0;       // wird er eingesaugt, zappelt er
  const groesse = g.zappeln ? schrumpfen(g, g.groesse) : g.groesse;
  schattenMalen(g.x, g.z, groesse * 0.35, 0.2);
  const p = aufsBild(g.x + zittern, schweben, g.z);
  malen.globalAlpha = 0.92;                             // Geister sind ein bisschen durchsichtig
  bildMalenAufFuessen(bild.geist, p.x, p.y, groesse * p.groesse, g.dx < 0);
  malen.globalAlpha = 1;
  if (g.jagtGerade && ZIMMER[zimmer].geisterBeissen) jagdZeichenMalen(g.x, schweben + groesse + 14, g.z);
}

// Ein rotes Ausrufezeichen über dem Kopf: Dieser Geist ist gerade hinter dir her!
function jagdZeichenMalen(x, y, z) {
  const p = aufsBild(x, y + Math.sin(zeit * 0.3) * 4, z);
  malen.fillStyle = "#ff3b5c";
  malen.strokeStyle = "#111014"; malen.lineWidth = 3;
  malen.beginPath(); malen.arc(p.x, p.y, 13, 0, 6.28); malen.fill(); malen.stroke();
  malen.fillStyle = "#fff4fa";
  malen.font = "800 20px 'Baloo 2', sans-serif";
  malen.textAlign = "center"; malen.textBaseline = "middle";
  malen.fillText("!", p.x, p.y + 1);
  malen.textBaseline = "alphabetic";
}

// Die Kiste – und der Kistenteufel, wenn er draußen ist
function kisteMalen() {
  const p = aufsBild(kiste.x, 0, kiste.z);
  const s = p.groesse * KISTE.massstab;           // Bild-Punkte → Bildschirm-Punkte
  schattenMalen(kiste.x + 15, kiste.z, 92, 0.28);

  // Die Kurbel leuchtet, solange man sie noch drehen kann
  if (kiste.zustand === "zu" && kiste.hoch === 0 && !kiste.gesperrt) {
    const k = aufsBild(kiste.x + KISTE.kurbelDX + 5, 72, kiste.z);
    const puls = 1 + Math.sin(zeit * 0.12) * 0.15;
    malen.fillStyle = "rgba(255, 211, 77, 0.45)";
    malen.beginPath(); malen.arc(k.x, k.y, 40 * puls * p.groesse, 0, 6.28); malen.fill();
  }

  const b = kiste.rot ? bild.kisteRot : bild.kiste;
  malen.drawImage(b, p.x - KISTE.ankerX * s, p.y - b.height * s, b.width * s, b.height * s);

  if (kiste.hoch > 0.02) {
    const t = bild.teufel;
    malen.save();
    malen.translate(p.x + KISTE.lochDX * s, p.y - KISTE.lochHoehe * s);     // hier ist das Loch oben in der Kiste
    malen.rotate(Math.sin(zeit * 0.07) * 0.04 * kiste.hoch);              // er schaukelt auf seiner Blitz-Feder
    malen.scale(1, kiste.hoch * (1 + Math.sin(zeit * 0.11) * 0.02));      // und wippt ein bisschen auf und ab
    malen.drawImage(t, -KISTE.teufelAnkerX * s, -t.height * s, t.width * s, t.height * s);
    malen.restore();
  }
}

function bossMalen(k) {
  // Umgefallen? Dann kippt er zur Seite: 0 = steht gerade, 1 = liegt flach.
  let kipp = k.zerfallen ? 1 : 0;
  if (k.liegt > 150) kipp = (170 - k.liegt) / 20;
  else if (k.liegt > 50) kipp = 1;
  else if (k.liegt > 0) kipp = k.liegt / 50;

  // Geister schweben und wippen – die Truhe hüpft
  const schweben = k.truhe ? Math.abs(Math.sin(k.wippen * 4)) * 16
                 : k.drache ? Math.abs(Math.sin(k.wippen * 3)) * 8 * (1 - kipp)
                 : k.kuerbis ? Math.abs(Math.sin(k.wippen * 4)) * 22
                           : (k.schwebt + Math.sin(k.wippen) * 12) * (1 - kipp);
  const b = bossBild(k);
  let zittern = k.zappeln ? zufall(-5, 5) : 0;
  let groesse = bossGroesse(k);
  if (k.besiegt && k.wirdZuGeld) {
    groesse = groesse * (1 + k.verschwinden / 45 * 0.3);    // er bläht sich auf wie ein Luftballon …
    zittern = zufall(-9, 9);
  } else if (k.besiegt) {
    groesse = Math.max(10, schrumpfen(k, groesse) * (1 - k.verschwinden / 80));   // … oder er wird eingesaugt
  }
  schattenMalen(k.x, k.z, groesse * 0.38, 0.3);
  const p = aufsBild(k.x + zittern, schweben, k.z);
  // Ein goldenes Leuchten um ihn herum – beim Blinken leuchtet es rot
  if (kipp === 0 && !k.truhe && !k.drache && !k.kuerbis && !k.skelett && !k.bandBoss) {
    malen.fillStyle = k.blinktGerade ? "rgba(255, 40, 80, " + (zeit % 8 < 4 ? 0.45 : 0.15) + ")"
                                     : "rgba(255, 211, 77, " + (0.12 + 0.06 * Math.sin(zeit * 0.1)) + ")";
    malen.beginPath(); malen.arc(p.x, p.y - groesse * p.groesse * 0.5, groesse * p.groesse * 0.55, 0, 6.28); malen.fill();
  }
  malen.globalAlpha = k.blinktGerade && zeit % 8 < 4 ? 0.35 : 0.95;       // beim Blinken flackert er
  if (k.wut > 0 && !k.kuerbis) malen.filter = "hue-rotate(150deg) saturate(1.5)";       // nach dem Schubsen leuchtet er rot vor Wut
  if (k.besiegt && k.wirdZuGeld && zeit % 6 < 3) malen.filter = "sepia(1) saturate(4) brightness(1.3)";   // er wird golden
  if (k.drache || k.kuerbis || k.skelett || k.bandBoss) malen.globalAlpha = 1;
  if (k.bandBoss && k.getroffen > 0 && zeit % 4 < 2) malen.filter = "brightness(2.2)";
  if (k.kuerbis && k.getroffen > 0) {       // plattgedrückt!
    malen.save(); malen.translate(p.x, p.y); malen.scale(1.25, 0.6 + 0.4 * (1 - k.getroffen / 24)); malen.translate(-p.x, -p.y);
    k.platt = true;
  }
  if (k.getroffen > 0 && zeit % 4 < 2) malen.filter = "brightness(2.2)";                                  // PLOPP – er blitzt weiß
  if (k.kuerbis && k.mitKrake && kipp === 0 && !k.besiegt) kuerbisKrakeMalen(k, p.x, p.y, groesse * p.groesse);
  if (kipp > 0) {
    malen.save();
    malen.translate(p.x, p.y);
    malen.rotate(kipp * 1.45);
    bildMalenAufFuessen(b, 0, 0, groesse * p.groesse, false);
    malen.restore();
  } else {
    // Geister schauen dahin, wo sie hinschweben – die Truhe schaut immer zum Männchen
    bildMalenAufFuessen(b, p.x, p.y, groesse * p.groesse, k.truhe ? maennchen.x < k.x : k.drache ? maennchen.x > k.x : k.dx < 0);
  }
  if (k.platt) { malen.restore(); k.platt = false; }
  malen.filter = "none";
  malen.globalAlpha = 1;
  // Das Ausrufezeichen: Er jagt gerade, er blinkt – oder er fängt gleich an zu blinken
  const gleichBlinken = k.blinkt && !k.blinktGerade && k.blinkUhr < 45;
  if (((k.jagdPhasen && k.jagtGerade) || k.blinktGerade || gleichBlinken) && !k.besiegt && kipp === 0) {
    jagdZeichenMalen(k.x, schweben + groesse + 16, k.z);
  }
}

// Eine Kanone an der Wand
function kanoneMalen(k) {
  const A = KANONEN_ARTEN[k.art];
  const links = k.seite === "links";
  const wand = aufsBild(links ? 0 : BREITE, 72, k.z);
  const p = aufsBild(k.x, 72, k.z);
  const s = p.groesse * A.massstab;
  // die Halterung an der Wand
  malen.fillStyle = "#111014";
  malen.beginPath(); malen.ellipse(wand.x + (links ? 4 : -4), wand.y, 12, 30, 0, 0, 6.28); malen.fill();
  malen.strokeStyle = "#111014"; malen.lineWidth = 12;
  malen.beginPath(); malen.moveTo(wand.x, wand.y); malen.lineTo(p.x, p.y); malen.stroke();
  // Auf dem Bildschirm ist "nach vorne" etwas kürzer als "zur Seite" – darum der Faktor 0.7
  const richtung = Math.atan2(Math.sin(k.winkel) * 0.7, Math.cos(k.winkel));
  const zurueck = k.rueckstoss > 0 ? -k.rueckstoss * 0.8 : 0;        // sie zuckt beim Schuss zurück
  const b = bild[A.bild];
  malen.save();
  malen.translate(p.x + Math.cos(richtung) * zurueck, p.y + Math.sin(richtung) * zurueck);
  malen.rotate(richtung - A.winkel0);
  malen.drawImage(b, -A.ankerX * s, -A.ankerY * s, b.width * s, b.height * s);
  malen.restore();
  // das Mündungsfeuer
  if (k.rueckstoss > 6) {
    const lang = A.muendung * s;
    malen.fillStyle = k.art === "netz" ? "rgba(244, 246, 255, 0.85)" : k.art === "tinte" ? "rgba(70, 90, 220, 0.85)" : "rgba(255, 190, 80, 0.85)";
    malen.beginPath(); malen.arc(p.x + Math.cos(richtung) * lang, p.y + Math.sin(richtung) * lang, 22, 0, 6.28); malen.fill();
  }
  // Solange sie schläft, schnarcht sie
  if (!k.wach) {
    malen.fillStyle = "#fff4fa";
    malen.font = "800 24px 'Baloo 2', sans-serif";
    malen.textAlign = links ? "left" : "right";
    malen.globalAlpha = 0.6 + 0.4 * Math.sin(zeit * 0.06);
    malen.fillText("Zzz", p.x + (links ? 20 : -20), p.y - 46 - Math.sin(zeit * 0.06) * 5);
    malen.globalAlpha = 1;
  }
}

// Ein fliegendes Netz: erst ein dünnes Knäuel, dann geht es auf
const KNAEUEL_WINKEL = 2.627;     // in diese Richtung zeigt die Spitze im Bild
function netzMalen(d) {
  const p = aufsBild(d.x, 60, d.z);
  const richtung = Math.atan2(d.dz * 0.7, d.dx);
  schattenMalen(d.x, d.z, d.alter < NETZ_AUF ? 20 : 40, 0.2);
  malen.save();
  malen.translate(p.x, p.y);
  if (d.alter < NETZ_AUF) {
    const b = bild.netzKnaeuel, breite = 80 * p.groesse, hoehe = breite * b.height / b.width;
    malen.rotate(richtung - KNAEUEL_WINKEL);
    malen.drawImage(b, -breite / 2, -hoehe / 2, breite, hoehe);
  } else {
    // Das Netz geht auf: Es wird schnell größer, die Öffnung zeigt nach vorne
    const auf = Math.min(1, (d.alter - NETZ_AUF) / 12);
    const b = bild.netzOffen, breite = (50 + 80 * auf) * p.groesse, hoehe = breite * b.height / b.width;
    malen.rotate(richtung + Math.PI / 2 + Math.sin(d.wackeln) * 0.08);
    malen.drawImage(b, -breite / 2, -hoehe * 0.55, breite, hoehe);
  }
  malen.restore();
}

// Ein fliegendes Dynamit-Bündel
function dynamitMalen(d) {
  schattenMalen(d.x, d.z, 22, 0.25);
  const p = aufsBild(d.x, 55, d.z);
  const s = p.groesse * DYNAMIT.massstab;
  const richtung = Math.atan2(d.dz * 0.7, d.dx);
  const b = bild.dynamit;
  malen.save();
  malen.translate(p.x, p.y);
  malen.rotate(richtung - DYNAMIT.winkel0 + Math.sin(d.wackeln) * 0.12);       // die Zündschnur zeigt nach vorne
  malen.drawImage(b, -DYNAMIT.ankerX * s, -DYNAMIT.ankerY * s, b.width * s, b.height * s);
  malen.restore();
}

// Malt eine Münze oder einen Schein. (x, y) ist die Mitte.
function geldStueckMalen(x, y, wert, groesse) {
  malen.save();
  malen.translate(x, y);
  malen.scale(groesse, groesse);
  malen.lineWidth = 3; malen.strokeStyle = "#111014";
  if (wert >= 5) {
    // Ein Geldschein: 5 € ist grün, 10 € ist rot
    malen.fillStyle = wert === 5 ? "#8fd6a8" : "#ff8a65";
    malen.beginPath(); malen.roundRect(-38, -22, 76, 44, 7); malen.fill(); malen.stroke();
    malen.fillStyle = "#fff4fa";
    malen.beginPath(); malen.roundRect(-28, -14, 56, 28, 5); malen.fill();
  } else {
    // Eine Münze: 1 € hat einen goldenen Rand, 2 € einen silbernen
    malen.fillStyle = wert === 1 ? "#f2c94c" : "#d7dbe0";
    malen.beginPath(); malen.arc(0, 0, 25, 0, 6.28); malen.fill(); malen.stroke();
    malen.fillStyle = wert === 1 ? "#e8ebef" : "#f2c94c";
    malen.beginPath(); malen.arc(0, 0, 18, 0, 6.28); malen.fill();
  }
  malen.fillStyle = "#111014";
  malen.font = "800 " + (wert >= 5 ? 20 : 17) + "px 'Baloo 2', sans-serif";
  malen.textAlign = "center"; malen.textBaseline = "middle";
  malen.fillText(wert + " €", 0, 1);
  malen.restore();
}

function geldImZimmerMalen(g) {
  const boden = aufsBild(g.x, 0, g.z);
  if (g.flug >= 1) {      // ein goldener Fleck am Boden, damit man es gut sieht
    malen.fillStyle = "rgba(255, 211, 77, 0.5)";
    malen.beginPath(); malen.ellipse(boden.x, boden.y, 46 * boden.groesse, 14 * boden.groesse, 0, 0, 6.28); malen.fill();
  }
  const p = aufsBild(g.x, g.y, g.z);
  geldStueckMalen(p.x, p.y, g.wert, p.groesse * 1.2);
}

// ---- 18. Anzeigen malen: Balken, Herzen, Rechnung -------------------
// Der große Kraft-Balken oben im Bild (für den König und den Riesengeist)
function kraftBalkenObenMalen(k) {
  const x = 300, y = 26, breite = 360, hoehe = 22;
  malen.fillStyle = "#111014";
  malen.beginPath(); malen.roundRect(x - 6, y - 6, breite + 12, hoehe + 12, 12); malen.fill();
  malen.fillStyle = "#3a2a3a";
  malen.beginPath(); malen.roundRect(x, y, breite, hoehe, 8); malen.fill();
  const voll = breite * k.kraft / k.kraftMax;
  if (voll > 0) {
    const farbe = malen.createLinearGradient(x, 0, x + breite, 0);
    farbe.addColorStop(0, "#6fd3ff"); farbe.addColorStop(1, "#2d7bff");
    malen.fillStyle = farbe;
    malen.beginPath(); malen.roundRect(x, y, Math.max(voll, 8), hoehe, 8); malen.fill();
  }
  malen.fillStyle = "#ffd34d";
  malen.font = "800 22px 'Baloo 2', sans-serif";
  malen.textAlign = "right";
  malen.fillText(k.name, x - 16, y + 18);
  // Hat er danach noch einen Balken? Dann hängt der schon darunter bereit.
  for (let i = 0; i < k.leben - 1; i++) {
    const yy = y + hoehe + 8 + i * 20;
    malen.fillStyle = "#111014";
    malen.beginPath(); malen.roundRect(x - 6, yy, breite + 12, 18, 9); malen.fill();
    malen.fillStyle = "#2d7bff";
    malen.beginPath(); malen.roundRect(x, yy + 4, breite, 10, 5); malen.fill();
  }
}

// Die Aufgabe vom Kistenteufel: eine große Sprechblase rechts oben
function teufelFrageMalen() {
  if (!rechnung || rechnung.art !== "teufel") return;
  const text = rechnung.zahlen.join(" + ") + " = ?";
  malen.font = "800 44px 'Baloo 2', sans-serif";
  const breite = malen.measureText(text).width + 44;
  // Die Blase steht neben dem Teufel – auf der Seite, wo mehr Platz ist
  const teufelX = aufsBild(kiste.x, 0, kiste.z).x;
  const links = teufelX > 480;
  const x = links ? Math.max(14, teufelX - 125 - breite) : Math.min(960 - breite - 14, teufelX + 125);
  const y = 74;
  malen.fillStyle = "#fff4fa"; malen.strokeStyle = "#111014"; malen.lineWidth = 5; malen.lineJoin = "round";
  malen.beginPath(); malen.roundRect(x, y, breite, 78, 26); malen.fill(); malen.stroke();
  // der Zipfel der Sprechblase zeigt zum Teufel
  const kante = links ? x + breite - 4 : x + 4, spitze = links ? x + breite + 30 : x - 30;
  malen.beginPath(); malen.moveTo(kante, y + 30); malen.lineTo(spitze, y + 46); malen.lineTo(kante, y + 56); malen.closePath();
  malen.fill(); malen.stroke();
  malen.fillRect(links ? kante - 6 : kante - 2, y + 28, 8, 30);
  malen.fillStyle = "#111014";
  malen.textAlign = "left"; malen.textBaseline = "middle";
  malen.fillText(text, x + 22, y + 41);
  malen.textBaseline = "alphabetic";
}

// ---- Level 14: das Figuren-Rätsel vom Skelett -------------------------
// Drei Figuren in einer Reihe – keine darf doppelt sein. Eine ist falsch (rot durchgestrichen).
// Welche Figur gehört an ihren Platz? Dafür hat man 20 Sekunden.
const FIGUREN = ["■", "▲", "●"];
function raetselStellen() {
  if (!bosse.some((b) => b.skelett && b.zerfallen)) return;
  const reihe = mischen(FIGUREN.slice());
  const falsch = Math.floor(Math.random() * 3);
  const richtigeFigur = reihe[falsch];
  // An die falsche Stelle kommt eine Figur, die es in der Reihe schon gibt
  const andere = reihe.filter((f, i) => i !== falsch);
  reihe[falsch] = andere[Math.floor(Math.random() * 2)];
  rechnung = { art: "raetsel", reihe, falsch, summe: richtigeFigur, uhr: RAETSEL_ZEIT, phase: "fragen" };
  rechnung.antworten = mischen(FIGUREN.slice());
  antwortKnoepfe.forEach((knopf, i) => {
    const f = rechnung.antworten[i];
    knopf.innerHTML = '<span style="color:' + (f === "■" ? "#3a6edc" : f === "▲" ? "#e8343e" : "#2fa84f") + '">' + f + "</span>";
    knopf.disabled = false; knopf.classList.remove("falsch");
  });
  document.getElementById("antworten").hidden = false;
  warnTon();
  zaehlerZeigen("Rätsel!");
  tippZeigen("In einer Reihe darf <b>keine Figur doppelt</b> sein. Welche Figur gehört an die rote Stelle? Schnell – <b>20 Sekunden</b>!");
}
function raetselUhrBewegen() {
  if (!rechnung || rechnung.art !== "raetsel" || rechnung.phase !== "fragen" || levelWahlOffen) return;
  rechnung.uhr = rechnung.uhr - 1;
  if (rechnung.uhr % 60 === 0 && rechnung.uhr <= 300 && rechnung.uhr > 0) piep(880, 880, 0.06, "square", 0, 0.1);   // tick, tick …
  if (rechnung.uhr <= 0) raetselVerloren("Die Zeit ist um!");
}
function raetselGeloest() {
  rechnung.phase = "fertig";
  antwortKnoepfe.forEach((k) => { k.disabled = true; });
  const letztesZimmer = !ZIMMER[zimmer].tuerHinten;      // Level 15: Nach dem Rätsel ist das Level geschafft
  siegesMelodie();
  tippZeigen(letztesZimmer ? "Richtig! Das große Skelett ist <b>für immer</b> kaputt!"
                           : "Richtig! Das Skelett ist <b>für immer</b> kaputt. Die <b>Tür hinten</b> ist offen!");
  zaehlerZeigen("Rätsel gelöst!");
  setTimeout(() => {
    document.getElementById("antworten").hidden = true;
    rechnung = null;
    const k = bosse.find((b) => b.skelett);
    if (k) { for (let i = 0; i < 40; i++) sternchen(k.x + zufall(-60, 60), zufall(10, 120), k.z, i % 2 ? "#f5f2e6" : "#ffd34d"); k.weg = true; }
    bosse = bosse.filter((b) => !b.weg);
    if (letztesZimmer) levelGeschafft(); else tuerOffen = true;
  }, 900);
}
// Ein Level ohne Geld am Ende ist geschafft (Level 15): der Knopf zum nächsten Level erscheint
function levelGeschafft() {
  geschafft = true;
  const weiter = document.getElementById("nochmal");
  weiter.textContent = ZIMMER[zimmer + 1] ? "Weiter zu Level " + ZIMMER[zimmer + 1].level : "Nochmal spielen";
  weiter.hidden = false;
  koenigsMelodie();
  zaehlerZeigen("Geschafft!");
  tippZeigen("<b>Level " + ZIMMER[zimmer].level + " geschafft!</b>");
}
function raetselVerloren(grund) {
  rechnung.phase = "falsch";
  antwortKnoepfe.forEach((k) => { k.disabled = true; });
  falschTon();
  zaehlerZeigen(grund);
  tippZeigen(grund + " Richtig wäre <b>" + rechnung.summe + "</b> gewesen. Oh nein – das Skelett setzt sich wieder zusammen!");
  setTimeout(() => {
    document.getElementById("antworten").hidden = true;
    rechnung = null;
    const k = bosse.find((b) => b.skelett);
    if (k) {
      k.zerfallen = false; k.kraft = k.kraftMax; k.schubsPause = 90;
      lachTon();
      sprechblase("Hehehe! Ich bin wieder da!", k.x, 260, k.z);
      tippZeigen("Das <b>Skelett</b> ist wieder da – saug es nochmal weg!");
    }
  }, 1800);
}
// Zeichnet eine Rätsel-Figur: Quadrat, Dreieck oder Kreis
function figurMalen(figur, x, y, r) {
  malen.fillStyle = figur === "■" ? "#3a6edc" : figur === "▲" ? "#e8343e" : "#2fa84f";
  malen.strokeStyle = "#111014"; malen.lineWidth = 5; malen.lineJoin = "round";
  malen.beginPath();
  if (figur === "■") malen.rect(x - r, y - r, 2 * r, 2 * r);
  else if (figur === "▲") { malen.moveTo(x, y - r * 1.1); malen.lineTo(x + r * 1.1, y + r * 0.9); malen.lineTo(x - r * 1.1, y + r * 0.9); malen.closePath(); }
  else malen.arc(x, y, r, 0, 6.283);
  malen.fill(); malen.stroke();
}
function raetselMalen() {
  if (!rechnung || rechnung.art !== "raetsel") return;
  const x = 260, y = 90, b = 440, h = 200;
  malen.fillStyle = "#fff4fa"; malen.strokeStyle = "#111014"; malen.lineWidth = 5;
  malen.beginPath(); malen.roundRect(x, y, b, h, 26); malen.fill(); malen.stroke();
  malen.fillStyle = "#111014"; malen.font = "800 24px 'Baloo 2', sans-serif"; malen.textAlign = "center";
  malen.fillText("Welche Figur gehört an die rote Stelle?", x + b / 2, y + 38);
  for (let i = 0; i < 3; i++) {
    const fx = x + 110 + i * 110, fy = y + 112;
    malen.fillStyle = i === rechnung.falsch ? "#ffd6dc" : "#eef3ff";
    malen.beginPath(); malen.roundRect(fx - 44, fy - 44, 88, 88, 16); malen.fill();
    figurMalen(rechnung.reihe[i], fx, fy, 30);
    if (i === rechnung.falsch) {
      malen.strokeStyle = "#e8343e"; malen.lineWidth = 7;
      malen.beginPath(); malen.moveTo(fx - 36, fy - 36); malen.lineTo(fx + 36, fy + 36); malen.moveTo(fx + 36, fy - 36); malen.lineTo(fx - 36, fy + 36); malen.stroke();
    }
  }
  // Die Zeit läuft ab
  const rest = Math.max(0, rechnung.uhr) / RAETSEL_ZEIT;
  malen.fillStyle = "#3a2a3a"; malen.beginPath(); malen.roundRect(x + 30, y + h - 30, b - 60, 14, 7); malen.fill();
  malen.fillStyle = rest < 0.25 ? "#e8343e" : "#6fd3ff";
  malen.beginPath(); malen.roundRect(x + 30, y + h - 30, Math.max(8, (b - 60) * rest), 14, 7); malen.fill();
  malen.fillStyle = "#111014"; malen.font = "800 18px 'Baloo 2', sans-serif";
  malen.textAlign = "left";
  malen.fillText(Math.ceil(Math.max(0, rechnung.uhr) / 60) + " s", x + b - 26, y + h - 18);
  malen.textAlign = "center";
}

// ---- Level 14: Kabumm auf dem Laufband --------------------------------
function kabummBewegen(k) {
  if (k.getroffen > 0) k.getroffen = k.getroffen - 1;
  k.x = k.x + k.dx;
  if (k.x < 180 || k.x > 720) k.dx = -k.dx;
  // Er wirft Bomben aufs Laufband – die kann man dann aufsammeln
  k.bombenUhr = k.bombenUhr - 1;
  if (k.bombenUhr <= 0 && !wechselt && !geschafft) {
    k.bombenUhr = 170 + Math.floor(zufall(-30, 30));
    if (ballons.length + maennchen.tinte < 4) {
      ballons.push({ x: k.x, z: k.z, startX: k.x, startZ: k.z, zielX: zufall(150, 750), zielZ: zufall(220, 300),
                     flug: 0, hoehe: 120, vonKanone: true, liegt: false, wippen: 0, bombe: true });
      sprechblase("Hahaha!", k.x, 260, k.z);
    }
  }
}
function kabummGetroffen(k) {
  k.kraft = Math.max(0, k.kraft - BOMBE_SCHADEN);
  k.getroffen = 20;
  bummTon(); plumpsTon();
  for (let i = 0; i < 24; i++) sternchen(k.x + zufall(-60, 60), zufall(60, 220), k.z, i % 2 ? "#ffb347" : "#ff5a5a");
  if (k.kraft <= 0) {
    k.besiegt = true;
    riesenSchluerf();
    sprechblase("KA-BUMM! Neiiin!", k.x, 300, k.z);
  } else {
    sprechblase(["AUA!", "Hey!", "Das kitzelt!", "Grrr!"][Math.floor(Math.random() * 4)], k.x, 280, k.z);
    zaehlerZeigen("Kabumm: " + k.kraft + " von 100");
  }
}
function bombeMalen(b) {
  schattenMalen(b.x, b.z, 18, 0.25);
  const p = aufsBild(b.x, b.hoehe + 18 + (b.liegt ? Math.sin(b.wippen) * 3 : 0), b.z);
  const r = 17 * p.groesse;
  if (b.liegt) {
    malen.fillStyle = "rgba(255, 211, 77, " + (0.25 + 0.15 * Math.sin(zeit * 0.12)) + ")";
    malen.beginPath(); malen.arc(p.x, p.y, r * 2, 0, 6.28); malen.fill();
  }
  malen.fillStyle = "#111014"; malen.beginPath(); malen.arc(p.x, p.y, r + 3, 0, 6.28); malen.fill();
  malen.fillStyle = "#3d3a44"; malen.beginPath(); malen.arc(p.x, p.y, r, 0, 6.28); malen.fill();
  malen.fillStyle = "rgba(255,255,255,0.5)"; malen.beginPath(); malen.arc(p.x - r * 0.35, p.y - r * 0.35, r * 0.28, 0, 6.28); malen.fill();
  malen.strokeStyle = "#c8a46a"; malen.lineWidth = 3;
  malen.beginPath(); malen.moveTo(p.x + r * 0.4, p.y - r * 0.8); malen.lineTo(p.x + r * 0.8, p.y - r * 1.4); malen.stroke();
  malen.fillStyle = zeit % 6 < 3 ? "#ffd34d" : "#ff7a2a";
  malen.beginPath(); malen.arc(p.x + r * 0.85, p.y - r * 1.5, 4, 0, 6.28); malen.fill();
}

// Ein kleiner Kraft-Balken direkt über dem Kopf (für die drei Kronen-Geister).
// Wer mehr Kraft hat, hat auch einen längeren Balken.
function kraftBalkenUeberKopfMalen(k) {
  if (k.besiegt) return;
  const p = aufsBild(k.x, k.schwebt + Math.sin(k.wippen) * 12 + bossGroesse(k) + 26, k.z);
  const breite = k.kraftMax * 0.8 * p.groesse, hoehe = 11;
  const x = p.x - breite / 2, y = Math.max(8, p.y - hoehe);
  malen.fillStyle = "#111014";
  malen.beginPath(); malen.roundRect(x - 4, y - 4, breite + 8, hoehe + 8, 8); malen.fill();
  malen.fillStyle = "#3a2a3a";
  malen.beginPath(); malen.roundRect(x, y, breite, hoehe, 5); malen.fill();
  const voll = breite * k.kraft / k.kraftMax;
  if (voll > 0) {
    malen.fillStyle = "#6fd3ff";
    malen.beginPath(); malen.roundRect(x, y, Math.max(voll, 6), hoehe, 5); malen.fill();
  }
}

// Ein Herz. (x, y) ist die Mitte.
function herzMalen(x, y, groesse, voll) {
  malen.save();
  malen.translate(x, y);
  malen.scale(groesse, groesse);
  malen.beginPath();
  malen.moveTo(0, 12);
  malen.bezierCurveTo(-20, -2, -11, -17, 0, -6);
  malen.bezierCurveTo(11, -17, 20, -2, 0, 12);
  malen.closePath();
  malen.fillStyle = voll ? "#ff3b5c" : "rgba(255, 59, 92, 0.12)";
  malen.fill();
  malen.lineWidth = 2.5; malen.strokeStyle = voll ? "#fff4fa" : "#8a5566"; malen.lineJoin = "round";
  malen.stroke();
  malen.restore();
}

// Die Herz-Anzeige: unten links – genau da, wo Arthur sie hingemalt hat.
// (Am quer gehaltenen Handy liegt dort der Joystick, darum sind sie dann oben rechts.)
function herzenMalen() {
  if (!ZIMMER[zimmer].herzen || geschafft || (rechnung && rechnung.art === "geld")) return;
  const quer = querHandy.matches;
  const x0 = quer ? 800 : 14, y0 = quer ? 10 : 536;
  malen.fillStyle = "rgba(17, 16, 20, 0.8)";
  malen.beginPath(); malen.roundRect(x0, y0, 20 + herzenMax() * 42, 52, 26); malen.fill();
  if (herzen === 0) {     // kein Herz mehr: der Rand blinkt rot als Warnung
    malen.strokeStyle = "rgba(255, 59, 92, " + (0.5 + 0.5 * Math.sin(zeit * 0.25)) + ")";
    malen.lineWidth = 4; malen.stroke();
  }
  for (let i = 0; i < herzenMax(); i++) {
    const geradeWeg = i === herzen && herzHuepfer > 0;      // dieses Herz ist gerade verloren gegangen
    herzMalen(x0 + 31 + i * 42, y0 + 26, geradeWeg ? 1.25 + herzHuepfer / 24 * 0.6 : 1.25, i < herzen);
  }
}

// Die Rechnung oben im Bild: 10 € + 5 € + 1 € = ?
function rechnungMalen() {
  if (!rechnung || rechnung.art !== "geld" || geschafft) return;
  const n = rechnung.anzahl;
  const breite = n * 86 + (n - 1) * 30 + 96;
  let x = 480 - breite / 2;
  malen.fillStyle = "rgba(17, 16, 20, 0.88)";
  malen.beginPath(); malen.roundRect(x - 18, 58, breite + 36, 64, 24); malen.fill();
  malen.font = "800 34px 'Baloo 2', sans-serif";
  malen.textAlign = "center"; malen.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    if (i > 0) { malen.fillStyle = "#fff4fa"; malen.fillText("+", x + 15, 91); x = x + 30; }
    if (i < rechnung.teile.length) {
      geldStueckMalen(x + 43, 90, rechnung.teile[i], 0.95);
    } else {
      // Dieses Stück fehlt noch
      malen.strokeStyle = "rgba(255, 244, 250, 0.5)"; malen.lineWidth = 2; malen.setLineDash([6, 5]);
      malen.beginPath(); malen.roundRect(x + 9, 70, 68, 40, 8); malen.stroke();
      malen.setLineDash([]);
    }
    x = x + 86;
  }
  malen.fillStyle = "#ffd34d";
  malen.font = "800 34px 'Baloo 2', sans-serif";
  malen.textAlign = "center"; malen.textBaseline = "middle";
  malen.fillText("= ?", x + 48, 91);
  malen.textBaseline = "alphabetic";
}

function sprechblasenMalen() {
  malen.font = "800 26px 'Baloo 2', sans-serif";
  malen.textAlign = "center";
  for (const s of sprechblasen) {
    const p = aufsBild(s.x, s.y, s.z);
    p.y = Math.max(p.y, 112);                        // nicht über den Kraft-Balken malen
    p.x = Math.max(160, Math.min(800, p.x));          // und nicht aus dem Bild hinaus
    const breite = malen.measureText(s.text).width + 28;
    malen.globalAlpha = Math.min(1, s.leben / 20);
    malen.fillStyle = "#fff4fa";
    malen.strokeStyle = "#111014"; malen.lineWidth = 4;
    malen.beginPath(); malen.roundRect(p.x - breite / 2, p.y - 40, breite, 44, 18); malen.fill(); malen.stroke();
    malen.fillStyle = "#111014";
    malen.fillText(s.text, p.x, p.y - 9);
  }
  malen.globalAlpha = 1;
}

// Die große Schrift am Anfang von einem Zimmer: "Level 2"
function bannerMalen() {
  if (!banner) return;
  malen.globalAlpha = Math.max(0, Math.min(1, banner.leben / 25, (130 - banner.leben) / 10));
  // Es springt herein: erst zu groß, dann federt es zurück
  const t = Math.min(1, (130 - banner.leben) / 18);
  const gross = t < 1 ? 0.4 + 0.6 * (1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2)) : 1;
  malen.save();
  malen.translate(480, 285); malen.scale(gross, gross);
  malen.font = "800 78px 'Baloo 2', sans-serif";
  malen.textAlign = "center";
  malen.lineJoin = "round";
  malen.fillStyle = "rgba(17, 16, 20, 0.35)";
  malen.fillText(banner.text, 4, 21);
  malen.strokeStyle = "#111014"; malen.lineWidth = 14;
  malen.strokeText(banner.text, 0, 15);
  const gold = malen.createLinearGradient(0, -45, 0, 20);
  gold.addColorStop(0, "#fff0a8"); gold.addColorStop(1, "#ffc21a");
  malen.fillStyle = gold;
  malen.fillText(banner.text, 0, 15);
  malen.restore();
  malen.globalAlpha = 1;
}

// ---- 19. Alles zusammen malen --------------------------------------
function allesMalen() {
  malen.save();
  if (wackeln > 0.3) malen.translate(zufall(-wackeln, wackeln), zufall(-wackeln, wackeln) * 0.7);
  zimmerMalen();
  kuerbisWarnungMalen();
  // Der große Kraft-Balken hängt hinten an der Wand – die Krone vom Riesengeist ragt manchmal darüber
  for (const k of bosse) if (k.balkenOben) kraftBalkenObenMalen(k);

  // Der Staubsauger am Boden leuchtet, damit man ihn sieht
  if (!maennchen.hatSauger && !sauger.versteckt) {
    const puls = 1 + Math.sin(zeit * 0.1) * 0.12;
    const boden = aufsBild(sauger.x, 0, sauger.z);
    if (sauger.flug >= 1) {
      malen.fillStyle = "rgba(255, 211, 77, 0.45)";
      malen.beginPath(); malen.ellipse(boden.x, boden.y, 70 * puls * boden.groesse, 22 * puls * boden.groesse, 0, 0, 6.28); malen.fill();
    }
    // Springt er gerade aus der Truhe, fliegt er im hohen Bogen
    const p = aufsBild(sauger.x, Math.sin(sauger.flug * Math.PI) * 190, sauger.z);
    if (ZIMMER[zimmer].puempel) bildMalenAufFuessen(bild.puempel, p.x, p.y + 4, 120 * p.groesse, false);
    else bildMalenAufFuessen(bild.sauger, p.x, p.y + 4, sauger.groesse * p.groesse, false);
  }

  // Was weiter hinten ist, malen wir zuerst – was vorne ist, kommt obendrauf.
  const figuren = [];
  for (const g of geister) figuren.push({ z: g.z, malen: () => geistMalen(g) });
  for (const k of bosse) figuren.push({ z: k.z, malen: () => bossMalen(k) });
  for (const g of geld) figuren.push({ z: g.z, malen: () => geldImZimmerMalen(g) });
  if (kiste) figuren.push({ z: kiste.z, malen: kisteMalen });
  for (const k of kanonen) figuren.push({ z: k.z, malen: () => kanoneMalen(k) });
  if (truhe) figuren.push({ z: truhe.z, malen: truheMalen });
  if (krake) figuren.push({ z: becken[krake.becken].z, malen: krakeMalen });
  for (const k of bosse) if (k.kuerbis && k.angriff) figuren.push({ z: k.angriff.oz + 1, malen: () => kuerbisTentakelMalen(k) });
  for (const b of ballons) figuren.push({ z: b.z, malen: () => ballonMalen(b) });
  for (const d of dynamit) figuren.push({ z: d.z, malen: () => (d.art === "netz" ? netzMalen(d) : d.art === "feuer" ? feuerballMalen(d) : d.art === "kugel" ? kugelMalen(d) : dynamitMalen(d)) });
  figuren.push({
    z: maennchen.z,
    malen: () => {
      const saugerHinten = maennchen.hatSauger && maennchen.richtungZ < -0.5;
      schattenMalen(maennchen.x, maennchen.z, Math.max(10, 46 * (1 - maennchen.hoehe / 220)), 0.3);
      // Nach einem Treffer blinkt das Männchen
      if (unverwundbar > 0 && Math.floor(zeit / 5) % 2 === 0) malen.globalAlpha = 0.3;
      if (saugerHinten) saugerInDerHandMalen();
      maennchenMalen();
      if (maennchen.klebt > 0) netzUeberMaennchenMalen();
      if (maennchen.hatSauger && !saugerHinten) saugerInDerHandMalen();
      malen.globalAlpha = 1;
    },
  });
  figuren.sort((a, b) => a.z - b.z);
  woelkchenMalen();
  for (const f of figuren) f.malen();

  zielMalen();
  // Die Saug-Luft
  const duese = duesenPunkt();
  const d = aufsBild(duese.x, duese.y, duese.z);
  for (const s of saugStreifen) {
    const p = aufsBild(s.x, s.y, s.z);
    const richtung = Math.atan2(d.y - p.y, d.x - p.x);
    malen.strokeStyle = "rgba(255,255,255," + (s.leben * 0.7) + ")";
    malen.lineWidth = 3;
    malen.beginPath(); malen.moveTo(p.x, p.y);
    malen.lineTo(p.x + Math.cos(richtung) * 16, p.y + Math.sin(richtung) * 16); malen.stroke();
  }
  // Glitzer
  for (const s of glitzer) {
    const p = aufsBild(s.x, s.y, s.z);
    sternMalen(p.x, p.y, 5 * p.groesse, s.farbe, Math.max(0, Math.min(1, s.leben / 40)));
  }
  malen.globalAlpha = 1;
  staubMalen();

  lichtMalen();
  malen.restore();

  // Die Anzeigen kommen ganz obendrauf
  for (const k of bosse) if (!k.balkenOben) kraftBalkenUeberKopfMalen(k);
  sprechblasenMalen();
  rechnungMalen();
  teufelFrageMalen();
  raetselMalen();
  herzenMalen();
  zaehlerImBildMalen();
  bannerMalen();

  // Autsch! Kurz blitzt alles rot auf.
  if (treffBlitz > 0) {
    malen.fillStyle = "rgba(255, 30, 70, " + (treffBlitz / 14 * 0.3) + ")";
    malen.fillRect(0, 0, 960, 600);
  }

  // Geschafft! Ein großes Schild in der Mitte.
  if (geschafft && rechnung) {
    malen.fillStyle = "rgba(17, 16, 20, 0.8)";
    malen.fillRect(0, 0, 960, 600);
    malen.textAlign = "center";
    malen.fillStyle = "#ffd34d";
    malen.font = "800 64px 'Baloo 2', sans-serif";
    malen.fillText("Level " + ZIMMER[zimmer].level + " geschafft!", 480, 230);
    malen.fillStyle = "#6fd3ff";
    malen.font = "800 40px 'Baloo 2', sans-serif";
    malen.fillText(rechnung.teile.map((w) => w + " €").join(" + ") + " = " + rechnung.summe + " €", 480, 300);
    malen.fillStyle = "#fff4fa";
    malen.font = "600 30px 'Baloo 2', sans-serif";
    malen.fillText("Richtig gerechnet! Du bist der beste Geisterjäger!", 480, 355);
  }

  // Beim Zimmerwechsel wird alles dunkel
  if (blende > 0) {
    const m = aufsBild(maennchen.x, 80, maennchen.z);
    const r = (1 - Math.min(1, blende)) * 1150;
    malen.fillStyle = "#111014";
    malen.beginPath(); malen.rect(0, 0, 960, 600);
    if (r > 1) malen.arc(m.x, m.y, r, 0, 6.283, true);
    malen.fill("evenodd");
  }
}

// ---- 20. Die Texte neben dem Spielfeld ------------------------------
const istTouch = matchMedia("(pointer: coarse)").matches;
const querHandy = matchMedia("(pointer: coarse) and (orientation: landscape)");
let tippUhr = null;
function tippZeigen(text) {
  const tipp = document.getElementById("tipp");
  tipp.innerHTML = text;
  // Am quer gehaltenen Handy verschwindet der Hinweis nach ein paar Sekunden wieder
  tipp.classList.remove("leise");
  clearTimeout(tippUhr);
  tippUhr = setTimeout(() => tipp.classList.add("leise"), 5000);
}
function zaehlerZeigen(text) { document.getElementById("zaehler").textContent = text; }
// Am quer gehaltenen Handy ist oben kein Platz – dann malen wir den Zähler ins Bild
function zaehlerImBildMalen() {
  if (!querHandy.matches || geschafft) return;
  const text = document.getElementById("zaehler").textContent;
  const y = bosse.some((k) => k.balkenOben) ? 62 : 10;     // nicht über den großen Kraft-Balken
  malen.font = "800 26px 'Baloo 2', sans-serif";
  malen.textAlign = "left";
  const breite = malen.measureText(text).width;
  malen.fillStyle = "rgba(17, 16, 20, 0.8)";
  malen.beginPath(); malen.roundRect(10, y, breite + 28, 40, 20); malen.fill();
  malen.fillStyle = "#6fd3ff";
  malen.fillText(text, 24, y + 29);
}

// ---- 21. Neues Spiel ----------------------------------------------
function neuesSpiel(startZimmer) {
  geschafft = false;
  document.getElementById("nochmal").hidden = true;
  let nummer = 1;
  // Zum Ausprobieren: Hängt man #zimmer5 an den Link, startet man gleich in Zimmer 5 (Level 3).
  const wunsch = /^#zimmer(\d+)$/.exec(location.hash);
  if (wunsch && ZIMMER[Number(wunsch[1])]) nummer = Number(wunsch[1]);
  if (ZIMMER[startZimmer]) nummer = startZimmer;
  zimmerAufbauen(nummer);
}
// Der Knopf am Ende von einem Level: weiter ins nächste Level – oder ganz von vorne
document.getElementById("nochmal").addEventListener("click", () => {
  tonStarten();
  if (geschafft && ZIMMER[zimmer + 1]) {
    geschafft = false; rechnung = null;
    document.getElementById("nochmal").hidden = true;
    zimmerWechseln(zimmer + 1);
  } else {
    neuesSpiel(1);
  }
});

// ---- 21b. Level aussuchen ------------------------------------------
// Oben rechts im Zimmer ist ein Knopf: Damit kann Arthur direkt in jedes Level springen.
let levelWahlOffen = false;
const levelKnopf = document.getElementById("levelknopf");
const levelWahl = document.getElementById("levelwahl");
const levelReihe = document.getElementById("levelreihe");

// Das erste Zimmer von jedem Level
function ersteZimmer() {
  const erste = {};
  for (const nummer of Object.keys(ZIMMER).map(Number).sort((a, b) => a - b)) {
    if (!erste[ZIMMER[nummer].level]) erste[ZIMMER[nummer].level] = nummer;
  }
  return erste;
}

function levelWahlZeigen() {
  tonStarten();
  levelWahlOffen = true;
  levelReihe.innerHTML = "";
  const erste = ersteZimmer();
  for (const level of Object.keys(erste)) {
    const k = document.createElement("button");
    k.textContent = level;
    k.setAttribute("aria-label", "Level " + level);
    if (Number(level) === ZIMMER[zimmer].level) k.classList.add("jetzt");
    k.addEventListener("click", () => levelStarten(erste[level]));
    levelReihe.appendChild(k);
  }
  levelWahl.hidden = false;
  levelKnopf.hidden = true;
  levelReihe.querySelector(".jetzt")?.focus();
}

function levelWahlSchliessen() {
  levelWahlOffen = false;
  levelWahl.hidden = true;
  levelKnopf.hidden = false;
}

function levelStarten(nummer) {
  levelWahlSchliessen();
  geschafft = false; rechnung = null;
  document.getElementById("nochmal").hidden = true;
  document.getElementById("antworten").hidden = true;
  // Die Nummer kommt auch in die Adresse – lädt man die Seite neu, bleibt man in diesem Level
  try { history.replaceState(null, "", "#zimmer" + nummer); } catch (e) { /* egal */ }
  // Läuft gerade noch ein Zimmerwechsel, warten wir kurz, bis er fertig ist
  const los = () => { if (wechselt) setTimeout(los, 200); else zimmerWechseln(nummer); };
  los();
}

levelKnopf.addEventListener("click", levelWahlZeigen);
document.getElementById("levelzu").addEventListener("click", levelWahlSchliessen);
addEventListener("keydown", (e) => { if (e.key === "Escape" && levelWahlOffen) levelWahlSchliessen(); });

// ---- 22. Die Spiel-Schleife --------------------------------------
// Diese Funktion läuft ungefähr 60-mal in der Sekunde:
// bewegen → malen → nochmal von vorne.
function spielSchleife() {
  zeit = zeit + 1;
  const pause = zeitSteht();        // der Kistenteufel fragt gerade – alles wartet
  if (!geschafft && !wechselt && !pause) maennchenBewegen();
  if (!pause) geisterBewegen(); else saugtGerade = false;
  if (!wechselt && !pause) bosseBewegen();
  kisteBewegen();
  if (!pause) { kanonenBewegen(); dynamitBewegen(); truheBewegen(); platteBewegen(); hauenBewegen(); knopfBewegen(); krakeBewegen(); ballonsBewegen(); wurfBewegen(); kuerbisBewegen(); }
  raetselUhrBewegen();
  geldBewegen();
  effekteBewegen();
  saugTonAnpassen();
  musikBewegen();
  allesMalen();
  requestAnimationFrame(spielSchleife);
}

// ---- Los geht's! -------------------------------------------------
let gestartet = false;
function losGehts(daten) {
  if (gestartet) return;
  gestartet = true;
  ladeBilder(() => {
    neuesSpiel(daten && daten.zimmer);
    spielSchleife();
  });
}
// Wenn das Spiel gerade läuft und eine neue Version kommt, merken wir uns das Zimmer.
try {
  const neuLaden = window.claude && window.claude.hot;
  if (neuLaden && neuLaden.snapshot) neuLaden.snapshot(() => ({ zimmer }));
  if (neuLaden && neuLaden.ready) neuLaden.ready((daten) => losGehts(daten || neuLaden.data || {}));
  else losGehts((neuLaden && neuLaden.data) || {});
} catch (e) {
  losGehts({});
}
setTimeout(() => losGehts({}), 1500);
