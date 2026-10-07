"""Build the deck into a mockup-serve v3 <out> (deck.html + deck.src.html) and register it.

    python3 -m venv .venv
    .venv/bin/python -m pip install 'fonttools[woff]==4.66.1'
    .venv/bin/python build2.py [--no-register]

Before building, notes saved from the presenter view (the server patches out/deck.html)
are pulled back into source/deck.src.html; a slide whose notes changed on both sides aborts.
"""
import base64, hashlib, html, json, os, pathlib, re, subprocess, sys

here = pathlib.Path(__file__).resolve().parent
OUT = here
BASELINE = here / 'built_notes.json'
SRC = here / 'source' / 'deck.src.html'

SEC_SRC_RE = re.compile(r'(<section class="slide[^"]*" id=")(s-[A-Za-z0-9-]+)("[^>]*>)(.*?)(</section>)', re.S)
NOTES_RE = re.compile(r'(<aside class="notes">)(.*?)(</aside>)', re.S)
SEC_OUT_RE = re.compile(r'<section[^>]*\bdata-key="([^"]+)"[^>]*>(.*?)</section>', re.S)


def notes_by_key(text, sec_re, key_group, body_group):
    found = {}
    for m in sec_re.finditer(text):
        n = NOTES_RE.search(m.group(body_group))
        found[m.group(key_group)] = html.unescape(n.group(2)).strip() if n else ''
    return found


def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def pull_presenter_edits(src):
    deck = OUT / 'deck.html'
    if not (deck.is_file() and BASELINE.is_file()):
        return src, []
    baseline = json.loads(BASELINE.read_text())
    served = notes_by_key(deck.read_text(), SEC_OUT_RE, 1, 2)
    current = notes_by_key(src, SEC_SRC_RE, 2, 4)
    pulled, conflicts = {}, []
    for key, text in served.items():
        if key not in baseline or text == baseline[key]:
            continue
        if current.get(key, baseline[key]) not in (baseline[key], text):
            conflicts.append(key)
        else:
            pulled[key] = text
    if conflicts:
        sys.exit('notes changed both in the presenter view and in the source: ' + ', '.join(conflicts))

    def patch(m):
        key = m.group(2)
        if key not in pulled:
            return m.group(0)
        body = NOTES_RE.sub(lambda n: n.group(1) + esc(pulled[key]) + n.group(3), m.group(4), count=1)
        return m.group(1) + key + m.group(3) + body + m.group(5)

    return SEC_SRC_RE.sub(patch, src), sorted(pulled)


src = SRC.read_text()
src, pulled = pull_presenter_edits(src)
if pulled:
    SRC.write_text(src)
    print('pulled presenter note edits into source:', ', '.join(pulled))
baseline = notes_by_key(src, SEC_SRC_RE, 2, 4)

# presenter layer
js = (here / 'presenter.js').read_text()
assert '</script' not in js
assert src.count('/*PRESENTER*/') == 1
src = src.replace('/*PRESENTER*/', js)

# slide ids: the server's feedback and save-notes routes take only s<N>; the name lives on in data-key
keys = []
def renumber(m):
    keys.append(m.group(2))
    return f'{m.group(1)}s{len(keys)}" data-key="{m.group(2)}{m.group(3)}{m.group(4)}{m.group(5)}'
src = SEC_SRC_RE.sub(renumber, src)
assert len(keys) == len(set(keys)) == 50, len(keys)
key_set = set(keys)
src = re.sub(r'#(s-[A-Za-z0-9-]+)(?![A-Za-z0-9-])', lambda m: f'[data-key="{m.group(1)}"]' if m.group(1) in key_set else m.group(0), src)

# fonts and images
chars = set(src) | set('0123456789,.%$ ·—–→←↳✓✅❌⚑●?⏸📨/()[]{}:;-_+=#@*&!\'"<>|~^`\\') | set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
(here / 'used.txt').write_text(''.join(sorted(c for c in chars if c.isprintable())))
faces = [('Plex KR', 'IBMPlexSansKR-Thin', 100), ('Plex KR', 'IBMPlexSansKR-Light', 300), ('Plex KR', 'IBMPlexSansKR-Regular', 400), ('Plex KR', 'IBMPlexSansKR-Medium', 500), ('Plex KR', 'IBMPlexSansKR-SemiBold', 600), ('Plex Mono', 'IBMPlexMono-Regular', 400), ('Plex Mono', 'IBMPlexMono-Medium', 500)]
css = []
os.makedirs(here / 'sub', exist_ok=True)
for fam, f, w in faces:
    out = here / 'sub' / f'{f}.woff2'
    subprocess.run([sys.executable, '-m', 'fontTools.subset', str(here / 'fonts' / f'{f}.ttf'), f'--text-file={here / "used.txt"}', '--flavor=woff2', '--layout-features=*', f'--output-file={out}'], check=True)
    b = base64.b64encode(out.read_bytes()).decode()
    css.append(f'@font-face{{font-family:"{fam}";font-weight:{w};font-style:normal;font-display:block;src:url(data:font/woff2;base64,{b}) format("woff2");}}')
src = src.replace('/*FONTS*/', '\n'.join(css))
for name in [p.stem for p in (here / 'img').glob('*.jpg')]:
    b = base64.b64encode((here / 'img' / f'{name}.jpg').read_bytes()).decode()
    src = src.replace('{{IMG:' + name + '}}', 'data:image/jpeg;base64,' + b)
assert '{{IMG' not in src

# build stamp in the first 8KB: the server compares it to tell open windows to reload
build = hashlib.sha256(src.encode()).hexdigest()[:12]
assert src.count('<html lang="en">') == 1
src = src.replace('<html lang="en">', f'<html lang="en" data-deck-build="{build}" data-deck-notes="on">', 1)
assert src.index('data-deck-build') < 8192

OUT.mkdir(parents=True, exist_ok=True)
for name in ('deck.html', 'deck.src.html'):
    tmp = OUT / (name + '.tmp')
    tmp.write_text(src)
    os.replace(tmp, OUT / name)
BASELINE.write_text(json.dumps(baseline, ensure_ascii=False, indent=0))
print(OUT / 'deck.html', round(len(src) / 1e6, 2), 'MB', 'build', build)

if '--no-register' not in sys.argv:
    lib = pathlib.Path.home().joinpath('.claude/skills/deck').resolve().parents[3]
    sys.path.insert(0, str(lib))
    from shell.lib.preview import registry
    registry.upsert(OUT.resolve(), kind='deck')
    url = registry.preview_url(OUT.resolve())
    print('url', url)
