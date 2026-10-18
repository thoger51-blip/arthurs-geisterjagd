"""Zeichnet Arthurs Kraken als PNG: die kleine Piraten-Krake (Level 11) und die große Kapitäns-Krake (Level 12).
Aufruf (im Ordner "quelle"):  python3 krake_zeichnen.py bilder"""
from PIL import Image, ImageDraw
import math, sys
ziel = sys.argv[1]
K = 4
SCHWARZ = (17, 16, 20, 255)
LILA = (156, 64, 170, 255); LILA_HELL = (196, 112, 208, 255); LILA_DUNKEL = (110, 40, 124, 255)
WEISS = (255, 255, 255, 255); GOLD = (255, 211, 77, 255); ROSA = (255, 170, 200, 255)
R = 7 * K

def oval(d, box, farbe, rand=R):
    x1, y1, x2, y2 = [v * K for v in box]
    if rand: d.ellipse([x1 - rand, y1 - rand, x2 + rand, y2 + rand], fill=SCHWARZ)
    d.ellipse([x1, y1, x2, y2], fill=farbe)
def vieleck(d, punkte, farbe, rand=R):
    p = [(x * K, y * K) for x, y in punkte]
    d.polygon(p, fill=farbe)
    if rand: d.line(p + [p[0]], fill=SCHWARZ, width=rand, joint="curve")
def wurst(d, punkte, farbe, breite):
    p = [(x * K, y * K) for x, y in punkte]
    for b, f in [(breite + 12, SCHWARZ), (breite, farbe)]:
        d.line(p, fill=f, width=b * K, joint="curve")
        for x, y in p:
            r = b * K / 2; d.ellipse([x - r, y - r, x + r, y + r], fill=f)

def krake():
    W, H = 560, 620
    im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    # Tentakel, die sich aus dem Wasser ringeln
    for seite in (-1, 1):
        for i, (dx, hoch) in enumerate([(110, 470), (160, 410)]):
            pkt = []
            for t in range(0, 31):
                a = t / 30
                x = 280 + seite * (60 + a * dx) + seite * math.sin(a * 5 + i) * 18
                y = 600 - a * (600 - hoch) - math.sin(a * 3.1) * 40
                pkt.append((x, y))
            wurst(d, pkt, LILA, 40 - i * 6)
            for t in range(4, 30, 6):           # Saugnäpfe
                x, y = pkt[t]; oval(d, (x - 6, y + 4, x + 6, y + 14), ROSA, 0)
    # Kopf
    oval(d, (110, 150, 450, 560), LILA)
    oval(d, (160, 190, 290, 300), LILA_HELL, 0)
    # Augen: eins mit Augenklappe
    oval(d, (180, 330, 260, 420), WEISS, 5 * K)
    oval(d, (205, 352, 245, 400), SCHWARZ, 0)
    oval(d, (212, 358, 224, 372), WEISS, 0)
    oval(d, (300, 330, 380, 420), SCHWARZ, 5 * K)                       # Augenklappe
    d.line([(150 * K, 300 * K), (450 * K, 380 * K)], fill=SCHWARZ, width=9 * K)   # Band der Augenklappe
    d.line([(170 * K, 318 * K), (265 * K, 336 * K)], fill=SCHWARZ, width=10 * K)  # böse Augenbraue
    # fieser Mund
    d.arc([220 * K, 430 * K, 340 * K, 520 * K], 200, 340, fill=SCHWARZ, width=9 * K)
    # Piratenhut (Dreispitz)
    vieleck(d, [(60, 200), (130, 120), (280, 60), (430, 120), (500, 200), (280, 170)], SCHWARZ, 0)
    vieleck(d, [(75, 195), (140, 128), (280, 72), (420, 128), (485, 195), (280, 160)], (40, 36, 48, 255), 0)
    d.line([(75 * K, 195 * K), (280 * K, 160 * K), (485 * K, 195 * K)], fill=GOLD, width=8 * K, joint="curve")
    # Totenkopf auf dem Hut
    d.line([(245 * K, 90 * K), (315 * K, 150 * K)], fill=WEISS, width=9 * K)
    d.line([(315 * K, 90 * K), (245 * K, 150 * K)], fill=WEISS, width=9 * K)
    oval(d, (255, 82, 305, 128), WEISS, 0)
    oval(d, (266, 98, 278, 110), SCHWARZ, 0); oval(d, (283, 98, 295, 110), SCHWARZ, 0)
    return im.resize((W, H), Image.LANCZOS)

ROT = (206, 52, 66, 255); ROT_HELL = (238, 104, 112, 255)

def grosse_krake():
    """Die erwachsene Krake (Level 12): rot, mit spitzen Zähnen und Kapitänshut mit Feder."""
    W, H = 600, 660
    im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    for seite in (-1, 1):
        for i, (dx, hoch) in enumerate([(120, 500), (175, 440)]):
            pkt = []
            for t in range(0, 31):
                a = t / 30
                x = 300 + seite * (70 + a * dx) + seite * math.sin(a * 5 + i) * 18
                y = 640 - a * (640 - hoch) - math.sin(a * 3.1) * 40
                pkt.append((x, y))
            wurst(d, pkt, ROT, 46 - i * 6)
            for t in range(4, 30, 6):
                x, y = pkt[t]; oval(d, (x - 7, y + 4, x + 7, y + 16), (255, 210, 190, 255), 0)
    oval(d, (110, 190, 490, 610), ROT)
    oval(d, (160, 230, 300, 340), ROT_HELL, 0)
    # zwei böse Augen
    for ax in (235, 365):
        oval(d, (ax - 42, 350, ax + 42, 440), WEISS, 5 * K)
        oval(d, (ax - 16, 378, ax + 18, 424), SCHWARZ, 0)
        oval(d, (ax - 9, 384, ax + 1, 396), WEISS, 0)
    d.line([(185 * K, 335 * K), (280 * K, 362 * K)], fill=SCHWARZ, width=11 * K)
    d.line([(415 * K, 335 * K), (320 * K, 362 * K)], fill=SCHWARZ, width=11 * K)
    # großes Maul mit spitzen Zähnen (wie Arthur es gemalt hat)
    oval(d, (200, 460, 400, 560), (90, 10, 20, 255))
    for i in range(6):
        x = 212 + i * 30
        d.polygon([(x * K, 468 * K), ((x + 15) * K, 506 * K), ((x + 30) * K, 468 * K)], fill=WEISS)
    for i in range(5):
        x = 228 + i * 30
        d.polygon([(x * K, 552 * K), ((x + 15) * K, 518 * K), ((x + 30) * K, 552 * K)], fill=WEISS)
    # großer Kapitänshut mit Feder
    vieleck(d, [(430, 128), (455, 50), (520, 5), (535, 40), (500, 100), (475, 140)], (230, 60, 80, 255), 5 * K)   # Feder
    vieleck(d, [(40, 240), (120, 120), (300, 50), (480, 120), (560, 240), (300, 200)], SCHWARZ, 0)
    vieleck(d, [(56, 234), (128, 130), (300, 64), (472, 130), (544, 234), (300, 190)], (40, 36, 48, 255), 0)
    d.line([(56 * K, 234 * K), (300 * K, 190 * K), (544 * K, 234 * K)], fill=GOLD, width=10 * K, joint="curve")
    d.line([(128 * K, 130 * K), (300 * K, 64 * K), (472 * K, 130 * K)], fill=GOLD, width=6 * K, joint="curve")
    d.line([(262 * K, 92 * K), (338 * K, 160 * K)], fill=WEISS, width=10 * K)
    d.line([(338 * K, 92 * K), (262 * K, 160 * K)], fill=WEISS, width=10 * K)
    oval(d, (272, 84, 328, 134), WEISS, 0)
    oval(d, (284, 101, 297, 114), SCHWARZ, 0); oval(d, (303, 101, 316, 114), SCHWARZ, 0)
    return im.resize((W, H), Image.LANCZOS)

for name, im in [("krake", krake()), ("krake_gross", grosse_krake())]:
    im.quantize(colors=96, method=Image.FASTOCTREE, dither=Image.NONE).save(ziel + "/" + name + ".png", optimize=True)
print("ok")
