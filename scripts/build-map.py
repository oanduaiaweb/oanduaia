#!/usr/bin/env python3
"""
Build the static location map from Maa- ja Ruumiamet tiles.

Why static rather than a Leaflet map: the map's job here is to answer "where is this",
once. A tile client costs ~46KB of JavaScript, a third-party request on every page view
and a layout shift, to add panning nobody asked for. One PNG costs one request, and the
Google Maps link beside it is there for anyone who wants to actually navigate.

It also keeps us well inside Maa-amet's terms, which ask that heavy tile traffic go
through TMS/WMTS and discourage mass downloading: this fetches twenty tiles, once, when
someone runs this script.

    python3 scripts/build-map.py

Terms: https://geoportaal.maaamet.ee/est/Teenused/WMS-teenused/WMS-i-kasutamise-tingimused-p24.html
Free for any lawful purpose including commercial, no registration, attribution required.
"""
import io, math, urllib.request
from PIL import Image, ImageDraw

LAT, LON = 59.5601919, 26.1067858
ZOOM = 16
COLS, ROWS = 5, 4
OUT = 'public/images/map-oandu.png'
CROP_H = 700
UA = 'Mozilla/5.0 (compatible; oanduaia.ee static map builder)'

# Maa-amet serves Mercator under the @GMC layers, addressed as TMS — the Y axis counts
# from the bottom. Plain XYZ coordinates 404 here; that is the whole trick.
TILE = 'https://tiles.maaamet.ee/tm/tms/1.0.0/kaart@GMC/{z}/{x}/{y}.png'


def deg2px(lat, lon, z):
    n = 2 ** z * 256
    x = (lon + 180.0) / 360.0 * n
    y = (1.0 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2.0 * n
    return x, y


def fetch(z, x, y):
    n = 2 ** z
    url = TILE.format(z=z, x=x, y=n - 1 - y)          # TMS flip
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return Image.open(io.BytesIO(r.read())).convert('RGB')


def main():
    px, py = deg2px(LAT, LON, ZOOM)
    ctx, cty = int(px // 256), int(py // 256)
    x0, y0 = ctx - COLS // 2, cty - ROWS // 2

    canvas = Image.new('RGB', (COLS * 256, ROWS * 256), (233, 236, 222))
    for dx in range(COLS):
        for dy in range(ROWS):
            try:
                canvas.paste(fetch(ZOOM, x0 + dx, y0 + dy), (dx * 256, dy * 256))
            except Exception as e:
                print(f'  tile {x0+dx},{y0+dy} failed: {e}')

    # Where Oanduaia falls on the assembled canvas.
    mx = px - x0 * 256
    my = py - y0 * 256

    d = ImageDraw.Draw(canvas, 'RGBA')
    # An open ring, not a filled pin. At this zoom Maa-amet already prints "Oanduaia" on
    # the map beside its own buildings — a solid marker would sit on top of the one thing
    # the map is here to show. This circles it instead.
    r = 30
    d.ellipse((mx - r, my - r, mx + r, my + r), outline=(58, 74, 53, 255), width=3)
    d.ellipse((mx - r - 3, my - r - 3, mx + r + 3, my + r + 3), outline=(255, 255, 255, 150), width=2)

    # Crop to a band centred on the marker.
    top = max(0, min(canvas.height - CROP_H, int(my - CROP_H / 2)))
    canvas = canvas.crop((0, top, canvas.width, top + CROP_H))

    canvas.save(OUT, optimize=True)
    print(f'{OUT}  {canvas.size[0]}x{canvas.size[1]}')


if __name__ == '__main__':
    main()
