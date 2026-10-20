"""Zeichnet Arthurs bösen Kürbis (Level 13) als PNG.
Aufruf (im Ordner "quelle"):  python3 kuerbis_zeichnen.py bilder"""
from PIL import Image, ImageDraw
import sys
ziel = sys.argv[1]
K = 4
SCHWARZ = (17, 16, 20, 255)
OR = (245, 140, 30, 255); OR_HELL = (255, 180, 70, 255); OR_DUNKEL = (205, 100, 20, 255)
GELB = (255, 230, 90, 255); GRUEN = (70, 150, 60, 255)
R = 7 * K
def oval(d, box, farbe, rand=R):
    x1, y1, x2, y2 = [v * K for v in box]
    if rand: d.ellipse([x1 - rand, y1 - rand, x2 + rand, y2 + rand], fill=SCHWARZ)
    d.ellipse([x1, y1, x2, y2], fill=farbe)
def vieleck(d, punkte, farbe, rand=R):
    p = [(x * K, y * K) for x, y in punkte]
    d.polygon(p, fill=farbe)
    if rand: d.line(p + [p[0]], fill=SCHWARZ, width=rand, joint="curve")

W, H = 520, 470
im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
# Stiel
vieleck(d, [(240, 90), (250, 20), (300, 5), (310, 30), (280, 40), (280, 95)], GRUEN)
# Körper aus mehreren Rippen
oval(d, (20, 90, 300, 460), OR_DUNKEL)
oval(d, (220, 90, 500, 460), OR_DUNKEL)
oval(d, (90, 80, 430, 465), OR)
oval(d, (150, 110, 230, 250), OR_HELL, 0)
for x in (150, 370):
    d.arc([x * K - 90 * K, 95 * K, x * K + 90 * K, 455 * K], 250, 290, fill=OR_DUNKEL, width=6 * K)
# böse leuchtende Augen
vieleck(d, [(140, 205), (240, 262), (165, 285)], GELB, 6 * K)
vieleck(d, [(380, 205), (280, 262), (355, 285)], GELB, 6 * K)
# Nase
vieleck(d, [(260, 280), (240, 315), (280, 315)], GELB, 5 * K)
# Zackenmaul
mund = [(120, 340)]
for i in range(9):
    x = 135 + i * 30
    mund += [(x, 335 if i % 2 else 370), ]
mund += [(400, 340), (370, 410), (260, 425), (150, 410)]
vieleck(d, mund, GELB, 6 * K)
im = im.resize((W, H), Image.LANCZOS)
im.quantize(colors=96, method=Image.FASTOCTREE, dither=Image.NONE).save(ziel + "/kuerbis.png", optimize=True)
print("ok")
