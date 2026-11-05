"""Zeichnet Arthurs Vogelscheuche (Level 15) als PNG – nach seiner Zeichnung:
eckiger Sack-Kopf mit Augen, schwarzer Mantel, Stock-Arme mit Stroh-Händen, ein Holzpfahl als Bein.
Aufruf (im Ordner "quelle"):  python3 vogelscheuche_zeichnen.py bilder"""
from PIL import Image, ImageDraw
import sys, random
ziel = sys.argv[1]
K = 4
SCHWARZ = (17, 16, 20, 255)
SACK = (214, 180, 120, 255); SACK_DUNKEL = (180, 140, 85, 255); SACK_HELL = (236, 210, 160, 255)
MANTEL = (40, 36, 52, 255); MANTEL_HELL = (66, 60, 84, 255)
HOLZ = (138, 90, 43, 255); HOLZ_DUNKEL = (102, 64, 30, 255)
STROH = (240, 200, 70, 255); STROH_DUNKEL = (205, 160, 40, 255)
ROT = (210, 50, 45, 255); GELB = (255, 225, 90, 255)
R = 7 * K
def vieleck(d, punkte, farbe, rand=R):
    p = [(x * K, y * K) for x, y in punkte]
    d.polygon(p, fill=farbe)
    if rand: d.line(p + [p[0]], fill=SCHWARZ, width=rand, joint="curve")
def oval(d, box, farbe, rand=R):
    x1, y1, x2, y2 = [v * K for v in box]
    if rand: d.ellipse([x1 - rand / 2, y1 - rand / 2, x2 + rand / 2, y2 + rand / 2], fill=SCHWARZ)
    d.ellipse([x1 + rand / 2, y1 + rand / 2, x2 - rand / 2, y2 - rand / 2], fill=farbe)
def linie(d, punkte, farbe, breite):
    d.line([(x * K, y * K) for x, y in punkte], fill=farbe, width=breite * K, joint="curve")

W, H = 600, 780
im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
random.seed(3)
# Der Holzklotz unten und der Pfahl
vieleck(d, [(215, 690), (385, 690), (385, 770), (215, 770)], HOLZ)
linie(d, [(225, 715), (375, 715)], HOLZ_DUNKEL, 4); linie(d, [(225, 742), (375, 742)], HOLZ_DUNKEL, 4)
vieleck(d, [(282, 430), (318, 430), (318, 694), (282, 694)], HOLZ)
# Der Stock für die Arme (quer)
vieleck(d, [(75, 318), (525, 318), (525, 344), (75, 344)], HOLZ)
# Stroh-Hände (Büschel wie bei Arthur: viele Striche)
for seite in (-1, 1):
    x0 = 300 + seite * 222
    for i in range(11):
        w = -0.9 + i * 0.18
        lx = x0 + seite * (40 + random.uniform(0, 25))
        ly = 331 + w * 55
        linie(d, [(x0, 331), (lx, ly)], SCHWARZ, 9)
    for i in range(11):
        w = -0.9 + i * 0.18
        lx = x0 + seite * (38 + random.uniform(0, 22))
        ly = 331 + w * 52
        linie(d, [(x0, 331), (lx, ly)], STROH if i % 2 else STROH_DUNKEL, 5)
# Der schwarze Mantel (Arthurs dunkler Körper)
vieleck(d, [(200, 300), (400, 300), (430, 330), (400, 360), (390, 470), (410, 520), (190, 520), (210, 470), (200, 360), (170, 330)], MANTEL)
vieleck(d, [(300, 305), (330, 300), (345, 470), (300, 515), (255, 470), (270, 300)], MANTEL_HELL, 4 * K)
for y in (360, 410, 460):
    oval(d, (290, y - 9, 310, y + 9), GELB, 4 * K)
# Flicken auf dem Mantel
vieleck(d, [(215, 400), (250, 395), (255, 430), (220, 435)], ROT, 4 * K)
linie(d, [(222, 405), (247, 428)], SCHWARZ, 2); linie(d, [(247, 402), (224, 430)], SCHWARZ, 2)
# Stroh schaut unten aus dem Mantel
for i in range(9):
    x = 200 + i * 25
    linie(d, [(x, 516), (x + random.uniform(-8, 8), 548 + random.uniform(-6, 8))], SCHWARZ, 8)
    linie(d, [(x, 516), (x + random.uniform(-6, 6), 544 + random.uniform(-4, 6))], STROH, 4)
# Hals: Strick
vieleck(d, [(265, 280), (335, 280), (335, 306), (265, 306)], SACK_DUNKEL, 5 * K)
linie(d, [(268, 293), (332, 293)], (150, 100, 50, 255), 4)
# Der eckige Sack-Kopf (wie eine Fahne – so hat Arthur ihn gemalt)
vieleck(d, [(165, 70), (430, 55), (445, 285), (180, 292)], SACK)
vieleck(d, [(190, 85), (260, 82), (255, 140), (195, 145)], SACK_HELL, 0)
# Naht oben und Zipfel
for x in range(185, 430, 22):
    linie(d, [(x, 66 + (x - 165) * -0.057 - 6), (x + 8, 66 + (x - 165) * -0.057 + 8)], SCHWARZ, 3)
vieleck(d, [(165, 70), (130, 40), (190, 60)], SACK_DUNKEL, 5 * K)
vieleck(d, [(430, 55), (470, 25), (420, 45)], SACK_DUNKEL, 5 * K)
# Augen: große runde Knopfaugen (Arthurs "o")
oval(d, (215, 120, 295, 200), (250, 250, 245, 255), 6 * K)
oval(d, (330, 115, 410, 195), (250, 250, 245, 255), 6 * K)
oval(d, (240, 140, 280, 180), SCHWARZ, 0)
oval(d, (355, 135, 395, 175), SCHWARZ, 0)
oval(d, (248, 146, 262, 160), (255, 255, 255, 255), 0)
oval(d, (363, 141, 377, 155), (255, 255, 255, 255), 0)
# böse Augenbrauen
linie(d, [(210, 108), (295, 128)], SCHWARZ, 10); linie(d, [(415, 102), (330, 122)], SCHWARZ, 10)
# Genähter Zickzack-Mund
mund = [(225, 235), (255, 222), (285, 240), (315, 222), (345, 238), (375, 220), (400, 232)]
linie(d, mund, SCHWARZ, 9)
for x, y in mund[1:-1]:
    linie(d, [(x, y - 14), (x, y + 14)], SCHWARZ, 4)
im = im.resize((W, H), Image.LANCZOS)
im = im.quantize(colors=96, method=Image.FASTOCTREE).convert("RGBA")
im.save(f"{ziel}/vogelscheuche.png", optimize=True)
print("fertig", im.size)
