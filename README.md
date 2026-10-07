# Arthurs Geisterjagd

Ein kleines Geisterjagd-Spiel für den Browser – ausgedacht und gezeichnet von Arthur,
gebaut zusammen mit seinem Papa und Claude.

Spielen: https://arthisspiel.de

## Steuerung

- **Computer:** Pfeiltasten (oder WASD) zum Laufen, Leertaste zum Saugen, Tasten 1–3 für die Rechen-Antworten
- **Tablet und Handy:** links der Joystick, rechts der Knopf „SAUGEN“

## Aufbau

| Datei | Wozu |
|---|---|
| `index.html` | das fertige Spiel (wird automatisch gebaut – nicht von Hand ändern) |
| `quelle/spiel.js` | der Spiel-Code mit deutschen Kommentaren |
| `quelle/kopf.html` | Aussehen und Aufbau der Seite |
| `quelle/bilder/` | die Bilder der Figuren |
| `quelle/bauen.py` | baut aus den Quellen die `index.html` |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | damit das Spiel wie eine App vom Home-Bildschirm startet, auch ohne Internet |

Neu bauen: `cd quelle && python3 bauen.py`

Die Schrift „Baloo 2“ steht unter der SIL Open Font License 1.1.
