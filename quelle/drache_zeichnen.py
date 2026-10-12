# Zeichnet Arthurs Drachen (2 Bilder: Maul zu / Maul auf) und den Pümpel als PNG
from PIL import Image, ImageDraw
import math, sys
ziel = sys.argv[1]
K = 4                      # in 4-facher Größe malen, dann verkleinern (weiche Kanten)
SCHWARZ = (17, 16, 20, 255)
ROT = (214, 52, 64, 255); ROT_HELL = (240, 96, 100, 255); ROT_DUNKEL = (160, 30, 46, 255)
BLAU = (64, 120, 230, 255); BLAU_HELL = (120, 170, 255, 255); BLAU_DUNKEL = (36, 76, 170, 255)
GELB = (255, 211, 77, 255); WEISS = (255, 255, 255, 255); LILA = (140, 70, 170, 255)
R = 7 * K                  # Randstärke

def oval(d, box, farbe, rand=R):
    x1, y1, x2, y2 = [v * K for v in box]
    d.ellipse([x1 - rand, y1 - rand, x2 + rand, y2 + rand], fill=SCHWARZ)
    d.ellipse([x1, y1, x2, y2], fill=farbe)
def vieleck(d, punkte, farbe, rand=R):
    p = [(x * K, y * K) for x, y in punkte]
    d.polygon(p, fill=farbe)
    d.line(p + [p[0]], fill=SCHWARZ, width=rand, joint="curve")
def dicke_linie(d, punkte, farbe, breite):
    p = [(x * K, y * K) for x, y in punkte]
    d.line(p, fill=SCHWARZ, width=(breite + 12) * K // 1, joint="curve")
    d.line(p, fill=farbe, width=breite * K, joint="curve")
    for x, y in [p[0], p[-1]]:
        r = (breite + 12) * K / 2; d.ellipse([x - r, y - r, x + r, y + r], fill=SCHWARZ)
        r = breite * K / 2; d.ellipse([x - r, y - r, x + r, y + r], fill=farbe)

def kralle(d, x, y, richtung):
    # Arthurs Zacken-Hände: vier spitze Zacken
    pkt = []
    for i in range(4):
        pkt += [(x + richtung * (i * 16), y), (x + richtung * (i * 16 + 8), y - 26)]
    pkt += [(x + richtung * 64, y), (x + richtung * 64, y + 16), (x, y + 16)]
    vieleck(d, pkt, GELB, 5 * K)

def drache(maul_auf):
    W, H = 650, 720
    im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    # Schwanz
    dicke_linie(d, [(420, 600), (520, 620), (580, 560), (600, 500)], ROT_DUNKEL, 46)
    vieleck(d, [(578, 505), (600, 440), (625, 510)], GELB, 5 * K)
    # Flügel
    vieleck(d, [(190, 300), (40, 200), (70, 270), (20, 300), (80, 340), (60, 400), (200, 380)], LILA)
    vieleck(d, [(430, 300), (580, 200), (550, 270), (600, 300), (540, 340), (560, 400), (420, 380)], LILA)
    # Beine
    oval(d, (190, 560, 290, 690), ROT_DUNKEL); oval(d, (330, 560, 430, 690), ROT_DUNKEL)
    oval(d, (165, 650, 300, 705), ROT); oval(d, (320, 650, 455, 705), ROT)
    # Bauch
    oval(d, (150, 260, 470, 640), ROT)
    oval(d, (215, 340, 405, 600), ROT_HELL, 0)
    for y in (390, 440, 490, 540):          # Bauch-Streifen wie bei Arthur
        d.line([(250 * K, y * K), (370 * K, y * K)], fill=ROT_DUNKEL, width=6 * K)
    # Arme mit Zacken-Händen
    dicke_linie(d, [(175, 360), (90, 330), (40, 300)], ROT, 34)
    dicke_linie(d, [(445, 360), (530, 330), (580, 300)], ROT, 34)
    kralle(d, 10, 300, 1); kralle(d, 610, 300, -1)
    # Kopf (blau)
    oval(d, (175, 40, 445, 290), BLAU)
    oval(d, (210, 70, 330, 150), BLAU_HELL, 0)
    # Hörner
    vieleck(d, [(220, 75), (205, 0), (265, 55)], GELB, 5 * K)
    vieleck(d, [(400, 75), (415, 0), (355, 55)], GELB, 5 * K)
    # Augen
    for ax in (255, 365):
        oval(d, (ax - 32, 110, ax + 32, 180), WEISS, 5 * K)
        oval(d, (ax - 14, 128, ax + 14, 168), SCHWARZ, 0)
        oval(d, (ax - 8, 132, ax - 1, 141), WEISS, 0)
    # böse Augenbrauen
    d.line([(222 * K, 98 * K), (285 * K, 118 * K)], fill=SCHWARZ, width=9 * K)
    d.line([(398 * K, 98 * K), (335 * K, 118 * K)], fill=SCHWARZ, width=9 * K)
    # Nasenlöcher
    oval(d, (285, 190, 297, 202), SCHWARZ, 0); oval(d, (323, 190, 335, 202), SCHWARZ, 0)
    # Maul mit Zähnen
    if maul_auf:
        oval(d, (235, 205, 385, 285), (90, 10, 20, 255))
        oval(d, (275, 245, 345, 280), (230, 70, 90, 255), 0)
        for i in range(5):
            x = 250 + i * 25
            d.polygon([(x * K, 208 * K), ((x + 12) * K, 232 * K), ((x + 24) * K, 208 * K)], fill=WEISS)
    else:
        d.line([(235 * K, 225 * K), (385 * K, 225 * K)], fill=SCHWARZ, width=8 * K)
        for i in range(5):
            x = 250 + i * 25
            d.polygon([(x * K, 225 * K), ((x + 12) * K, 245 * K), ((x + 24) * K, 225 * K)], fill=WEISS, outline=SCHWARZ)
    im = im.resize((W, H), Image.LANCZOS)
    return im

def puempel():
    W, H = 150, 360
    im = Image.new("RGBA", (W * K, H * K), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    dicke_linie(d, [(75, 20), (75, 250)], (150, 105, 60, 255), 22)         # Holzstiel
    d.line([(70 * K, 30 * K), (70 * K, 240 * K)], fill=(190, 140, 90, 255), width=5 * K)
    # roter Gummi-Saugnapf
    vieleck(d, [(40, 245), (110, 245), (140, 330), (10, 330)], (210, 40, 50, 255))
    oval(d, (5, 312, 145, 350), (170, 25, 40, 255))
    im = im.resize((W, H), Image.LANCZOS)
    return im

drache(False).save(ziel + "/drache.png")
drache(True).save(ziel + "/drache_feuer.png")
puempel().save(ziel + "/puempel.png")
print("ok")
