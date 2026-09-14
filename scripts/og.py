"""Generate the 1200x630 Open Graph share image and a 180x180 apple-touch-icon."""
import io
import os
import re
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_OG = os.path.join(ROOT, "public", "og.png")
OUT_ICON = os.path.join(ROOT, "public", "apple-touch-icon.png")
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".fonts")
os.makedirs(CACHE, exist_ok=True)

PAPER = (20, 20, 20)
SURFACE = (28, 28, 28)
INK = (236, 233, 226)
MUTED = (155, 150, 141)
LINE = (59, 59, 59)
ACCENT = (226, 88, 31)


def google_font(family, weight):
    """Fetch a TTF from Google Fonts (a non-browser UA returns TTF URLs)."""
    path = os.path.join(CACHE, f"{family.replace(' ', '')}-{weight}.ttf")
    if os.path.exists(path):
        return path
    css_url = f"https://fonts.googleapis.com/css2?family={family.replace(' ', '+')}:wght@{weight}"
    req = urllib.request.Request(css_url, headers={"User-Agent": "Python-urllib/3"})
    css = urllib.request.urlopen(req, timeout=20).read().decode()
    url = re.search(r"url\((https://[^)]+\.ttf)\)", css).group(1)
    data = urllib.request.urlopen(url, timeout=20).read()
    with open(path, "wb") as fh:
        fh.write(data)
    return path


def font(family, weight, size, fallback):
    try:
        return ImageFont.truetype(google_font(family, weight), size)
    except Exception as err:  # noqa: BLE001 - fall back to a system font
        print(f"[font] {family} {weight} unavailable ({err}); using {fallback}")
        return ImageFont.truetype(fallback, size)


WIN = r"C:\Windows\Fonts"
display = font("Inter Tight", 600, 92, os.path.join(WIN, "arialbd.ttf"))
display_sm = font("Inter Tight", 600, 40, os.path.join(WIN, "arialbd.ttf"))
sans = font("Inter", 400, 26, os.path.join(WIN, "arial.ttf"))
mono = font("JetBrains Mono", 500, 22, os.path.join(WIN, "consola.ttf"))
mono_sm = font("JetBrains Mono", 400, 20, os.path.join(WIN, "consola.ttf"))

W, H = 1200, 630
img = Image.new("RGB", (W, H), PAPER)

# Accent glow, top-left, blurred.
glow = Image.new("RGB", (W, H), PAPER)
g = ImageDraw.Draw(glow)
g.ellipse((-200, -260, 560, 300), fill=(70, 34, 20))
glow = glow.filter(ImageFilter.GaussianBlur(120))
img = Image.blend(img, glow, 0.9)

d = ImageDraw.Draw(img)

# Dot grid.
for y in range(24, H, 24):
    for x in range(24, W, 24):
        d.point((x, y), fill=(46, 46, 46))

# Frame line + accent bar.
d.rectangle((0, 0, W - 1, H - 1), outline=LINE)
d.rectangle((0, 0, 6, H), fill=ACCENT)

# Monogram tile.
d.rounded_rectangle((80, 76, 132, 128), radius=10, fill=INK)
d.text((106, 102), "EA", font=mono, fill=PAPER, anchor="mm")
d.text((150, 102), "Eniola Akingbade", font=display_sm, fill=INK, anchor="lm")
d.text((150 + display_sm.getlength("Eniola Akingbade") + 22, 104), "Full-Stack Developer", font=mono_sm, fill=MUTED, anchor="lm")

# Headline with accent last word.
line1, line2_a, line2_b = "I build AI products", "that ", "ship."
d.text((80, 250), line1, font=display, fill=INK, anchor="ls")
d.text((80, 352), line2_a, font=display, fill=INK, anchor="ls")
d.text((80 + display.getlength(line2_a), 352), line2_b, font=display, fill=ACCENT, anchor="ls")

# Subline.
d.text((80, 412), "Winner, 2026 Ontomorph AI Hackathon  ·  B.Sc. Computer Science, OAU", font=sans, fill=MUTED, anchor="ls")

# Footer row.
d.line((80, 520, W - 80, 520), fill=LINE)
d.ellipse((80, 556, 90, 566), fill=(95, 207, 128))
d.text((104, 561), "Open to internships & freelance · Lagos, Nigeria", font=mono_sm, fill=MUTED, anchor="lm")
d.text((W - 80, 561), "github.com/Bel-enie", font=mono_sm, fill=INK, anchor="rm")

img.save(OUT_OG, "PNG", optimize=True)
print("og.png", img.size, os.path.getsize(OUT_OG) // 1024, "KB")

# Apple touch icon: ink tile with accent "E".
icon = Image.new("RGB", (180, 180), PAPER)
di = ImageDraw.Draw(icon)
di.rounded_rectangle((0, 0, 179, 179), radius=36, fill=(25, 24, 19))
big = font("Inter Tight", 700, 110, os.path.join(WIN, "arialbd.ttf"))
di.text((90, 96), "E", font=big, fill=ACCENT, anchor="mm")
icon.save(OUT_ICON, "PNG", optimize=True)
print("apple-touch-icon.png", icon.size, os.path.getsize(OUT_ICON) // 1024, "KB")
