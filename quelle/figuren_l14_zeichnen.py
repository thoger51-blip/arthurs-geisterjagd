"""Zeichnet die Figuren für Level 14 als PNG: das Skelett und den Bösewicht Kabumm.
Aufruf (im Ordner "quelle"):  python3 figuren_l14_zeichnen.py bilder"""
from PIL import Image, ImageDraw
import sys
ziel = sys.argv[1]
K = 4
SCHWARZ = (17, 16, 20, 255); WEISS = (245, 242, 230, 255); GRAU = (190, 186, 175, 255)
def oval(d, box, farbe, rand=7):
    x1, y1, x2, y2 = [v * K for v in box]
    if rand: d.ellipse([x1 - rand * K, y1 - rand * K, x2 + rand * K, y2 + rand * K], fill=SCHWARZ)
    d.ellipse([x1, y1, x2, y2], fill=farbe)
def knochen(d, punkte, breite):
    p = [(x * K, y * K) for x, y in punkte]
    for b, f in [(breite + 12, SCHWARZ), (breite, WEISS)]:
        d.line(p, fill=f, width=b * K, joint="curve")
        for x, y in (p[0], p[-1]):
            r = (b + 8) * K / 2; d.ellipse([x - r, y - r, x + r, y + r], fill=f)
def vieleck(d, punkte, farbe, rand=7):
    p = [(x * K, y * K) for x, y in punkte]
    d.polygon(p, fill=farbe)
    if rand: d.line(p + [p[0]], fill=SCHWARZ, width=rand * K, joint="curve")

def skelett():
    W, H = 440, 600
    im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    # Beine
    knochen(d, [(190, 380), (170, 480), (165, 570)], 16); knochen(d, [(250, 380), (270, 480), (275, 570)], 16)
    vieleck(d, [(130, 575), (185, 565), (190, 590), (125, 595)], WEISS); vieleck(d, [(255, 565), (310, 575), (315, 595), (250, 590)], WEISS)
    # Arme weit ausgestreckt (wie Arthur es gemalt hat)
    knochen(d, [(160, 200), (100, 230), (48, 200)], 14); knochen(d, [(280, 200), (340, 230), (392, 200)], 14)
    for x0, s in ((48, -1), (392, 1)):
        for i in range(4):
            knochen(d, [(x0, 200), (x0 + s * 22, 168 + i * 14)], 5)
    # Wirbelsäule, Rippen, Becken
    knochen(d, [(220, 170), (220, 370)], 14)
    for i, y in enumerate((200, 235, 270, 305)):
        w = 70 - i * 8
        knochen(d, [(220 - w, y + 8), (220, y), (220 + w, y + 8)], 9)
    vieleck(d, [(170, 360), (270, 360), (290, 400), (220, 420), (150, 400)], WEISS)
    # Totenkopf
    oval(d, (140, 10, 300, 165), WEISS)
    oval(d, (165, 60, 210, 110), SCHWARZ, 0); oval(d, (230, 60, 275, 110), SCHWARZ, 0)
    oval(d, (180, 75, 192, 87), (255, 80, 80, 255), 0); oval(d, (246, 75, 258, 87), (255, 80, 80, 255), 0)   # rote Augen
    vieleck(d, [(220, 115), (208, 135), (232, 135)], SCHWARZ, 0)
    d.rectangle([180 * K, 145 * K, 260 * K, 160 * K], fill=SCHWARZ)
    for i in range(5):
        d.rectangle([(184 + i * 15) * K, 146 * K, (194 + i * 15) * K, 159 * K], fill=WEISS)
    return im.resize((W, H), Image.LANCZOS)

def kabumm():
    """Kabumm: eine lebendige Riesenbombe mit Zündschnur, rot-blau gestreiftem Schal und Stiefeln."""
    W, H = 460, 560
    im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    ROT = (214, 52, 64, 255); BLAU = (58, 110, 220, 255)
    # Zündschnur mit Funken
    d.line([(230 * K, 120 * K), (250 * K, 70 * K), (285 * K, 45 * K)], fill=SCHWARZ, width=14 * K, joint="curve")
    d.line([(230 * K, 120 * K), (250 * K, 70 * K), (285 * K, 45 * K)], fill=(200, 160, 110, 255), width=7 * K, joint="curve")
    for i in range(8):
        import math
        w = i / 8 * 6.283
        d.line([(285 * K, 45 * K), ((285 + math.cos(w) * 34) * K, (45 + math.sin(w) * 34) * K)], fill=(255, 211, 77, 255), width=6 * K)
    oval(d, (272, 32, 298, 58), (255, 120, 40, 255), 0)
    # Kappe der Bombe
    vieleck(d, [(190, 150), (270, 150), (262, 112), (198, 112)], (70, 70, 80, 255))
    # Stiefel
    oval(d, (120, 480, 210, 545), (90, 50, 30, 255)); oval(d, (250, 480, 340, 545), (90, 50, 30, 255))
    # runder Bomben-Körper
    oval(d, (60, 140, 400, 490), (40, 40, 52, 255))
    oval(d, (110, 180, 200, 260), (110, 110, 130, 255), 0)
    # Arme mit Handschuhen
    for s in (-1, 1):
        x = 230 + s * 160
        d.line([(x * K, 320 * K), ((x + s * 28) * K, 270 * K)], fill=SCHWARZ, width=26 * K)
        d.line([(x * K, 320 * K), ((x + s * 28) * K, 270 * K)], fill=(40, 40, 52, 255), width=14 * K)
        oval(d, (x + s * 28 - 24, 238, x + s * 28 + 24, 286), WEISS)
    # böse Augen und Mund
    for ax in (180, 280):
        oval(d, (ax - 36, 250, ax + 36, 320), WEISS, 5)
        oval(d, (ax - 14, 272, ax + 14, 312), SCHWARZ, 0)
    d.line([(140 * K, 236 * K), (215 * K, 262 * K)], fill=SCHWARZ, width=12 * K)
    d.line([(320 * K, 236 * K), (245 * K, 262 * K)], fill=SCHWARZ, width=12 * K)
    d.arc([175 * K, 340 * K, 285 * K, 410 * K], 200, 340, fill=WEISS, width=10 * K)
    # rot-blau gestreifter Schal (Arthurs Farben)
    schal = [(95, 400), (365, 400), (350, 445), (110, 445)]
    vieleck(d, schal, ROT)
    for i in range(6):
        x = 120 + i * 42
        vieleck(d, [(x, 402), (x + 20, 402), (x + 14, 443), (x - 6, 443)], BLAU, 0)
    vieleck(d, [(300, 440), (345, 440), (360, 520), (320, 515)], ROT)
    vieleck(d, [(312, 465), (348, 465), (352, 485), (316, 485)], BLAU, 0)
    return im.resize((W, H), Image.LANCZOS)

for name, im in [("skelett", skelett()), ("kabumm", kabumm())]:
    im.quantize(colors=96, method=Image.FASTOCTREE, dither=Image.NONE).save(ziel + "/" + name + ".png", optimize=True)
print("ok")
