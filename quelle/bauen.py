"""Baut aus den Quellen die fertige Spiel-Seite.

Aufruf (im Ordner "quelle"):  python3 bauen.py

  kopf.html  +  spiel.js  +  bilder/*.png   →   ../index.html   (die Webseite)
                                             →   artefakt.html  (dieselbe Seite für die Claude-Vorschau)
"""
import base64, pathlib

HIER = pathlib.Path(__file__).parent
BILDER = ["player_down", "player_up", "player_side", "ghost_blue", "vacuum", "ghost_boss",
          "kiste", "teufel", "kiste_rot", "kanone", "dynamit", "truhe_zu", "truhe_auf",
          "kanone_spinne", "netz_knaeuel", "netz_offen"]

kopf = (HIER / "kopf.html").read_text(encoding="utf-8")
spiel = (HIER / "spiel.js").read_text(encoding="utf-8")

# Die Bilder werden direkt in den Code eingebettet – so ist das Spiel eine einzige Datei.
for name in BILDER:
    daten = base64.b64encode((HIER / "bilder" / f"{name}.png").read_bytes()).decode()
    spiel = spiel.replace(f"__{name}__", "data:image/png;base64," + daten)
assert '"__' not in spiel, "Ein Bild fehlt!"

# 1) Die Vorschau-Fassung für Claude (lädt die Schrift von Google Fonts)
(HIER / "artefakt.html").write_text(kopf + "<script>\n" + spiel + "</script>\n", encoding="utf-8")

# 2) Die Webseite: eigene Schrift-Dateien statt Google Fonts, App-Symbol, keine Suchmaschinen
zeilen = [z for z in kopf.splitlines() if "fonts.googleapis.com" not in z]
kopf_seite = "\n".join(zeilen) + "\n"
ende_style = kopf_seite.index("</style>") + len("</style>")
im_kopf, im_koerper = kopf_seite[:ende_style], kopf_seite[ende_style:]

seite = f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#2b1030">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Geisterjagd">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>
  @font-face {{ font-family: "Baloo 2"; font-weight: 600; font-display: swap; src: url("fonts/baloo-2-latin-600-normal.woff2") format("woff2"); }}
  @font-face {{ font-family: "Baloo 2"; font-weight: 800; font-display: swap; src: url("fonts/baloo-2-latin-800-normal.woff2") format("woff2"); }}
  :root {{ padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }}
  body {{ margin: 0; }}
  img {{ max-width: 100%; }}
  [hidden] {{ display: none !important; }}
</style>
{im_kopf}
</head>
<body>
{im_koerper}<script>
{spiel}</script>
<script>
  // Damit das Spiel auch ohne Internet startet, wenn es einmal geladen wurde
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {{}});
</script>
</body>
</html>
"""
(HIER.parent / "index.html").write_text(seite, encoding="utf-8")
print("Fertig:", len(seite) // 1024, "KB → index.html")
