import base64, html

FONT_DIR = __import__("os").path.join(__import__("os").path.dirname(__import__("os").path.abspath(__file__)), "fonts")
def b64(name):
    return open(f"{FONT_DIR}/{name}").read()

BSD = b64("bsd.b64")       # Big Shoulders Display 700 (variable, covers 700-900)
PM4 = b64("pm4.b64")       # IBM Plex Mono 400
PM5 = b64("pm5.b64")       # IBM Plex Mono 500
PS  = b64("ps.b64")        # IBM Plex Sans variable (400-600)

# ---------------------------------------------------------------- TCO data
tco_rows = [
    ("Chevrolet Captiva PHEV", "Premier", "PHEV", 26_990_000, 18_240_389, 3_408_078, "phev"),
    ("Chevrolet Captiva EV", "60kWh", "BEV", 27_990_000, 19_671_825, 3_694_365, "bev"),
    ("Skoda Elroq", "85 Design · bono directo", "BEV", 39_990_000, 26_712_138, 5_102_428, "bev"),
    ("Mitsubishi Outlander PHEV", "GLS Limited", "PHEV", 39_990_000, 22_588_649, 4_277_730, "phev"),
    ("Mitsubishi Destinator", "GL", "Gasolina", 20_490_000, 22_677_180, 4_535_436, "ice"),
    ("Mitsubishi Outlander", "GL 4x2", "Gasolina", 25_990_000, 23_366_304, 4_673_261, "ice"),
    ("Peugeot 5008", "Allure MHEV", "Gasolina", 28_990_000, 25_589_262, 5_117_852, "ice"),
    ("Mitsubishi Destinator", "GLS", "Gasolina", 28_990_000, 27_139_680, 5_427_936, "ice"),
    ("Kia EV5", "Light 64.2kWh", "BEV", 31_990_000, 23_573_475, 4_474_695, "bev"),
    ("Peugeot 5008", "GT MHEV", "Gasolina", 33_990_000, 28_339_262, 5_667_852, "ice"),
    ("Mitsubishi Outlander", "GLS Limited 4x4", "Gasolina", 38_990_000, 28_826_304, 5_765_261, "ice"),
    ("Skoda Kodiaq", "Selection MHEV", "Gasolina", 34_690_000, 30_072_334, 6_014_467, "ice"),
    ("Kia EV5", "Wave 88.1kWh AWD", "BEV", 41_990_000, 30_223_200, 5_804_640, "bev"),
    ("Tesla Model Y", "Premium Long Range RWD", "BEV", 39_900_000, 25_713_475, 4_902_695, "bev"),
]
tco_rows.sort(key=lambda r: r[5])
max_anual = max(r[5] for r in tco_rows)

# ---------------------------------------------------------------- Comfort matrix
MODELS = [
    ("elroq", "Skoda Elroq", "85 Design", "bev"),
    ("cev", "Chevrolet Captiva EV", "60kWh", "bev"),
    ("tsy", "Tesla Model Y", "Premium LR RWD", "bev"),
    ("p19", "Peugeot 5008", "GT Line 2019 · tuyo", "ref"),
    ("p26", "Peugeot 5008", "GT 2026", "ice"),
    ("kod", "Skoda Kodiaq", "Selection MHEV", "ice"),
    ("ev5", "Kia EV5", "Wave", "bev"),
    ("outl", "Mitsubishi Outlander", "GLS Limited", "ice"),
    ("outp", "Mitsubishi Outlander", "PHEV GLS Limited", "phev"),
    ("dest", "Mitsubishi Destinator", "GLS", "ice"),
]

Y, N, W = "y", "n", "w"

matrix = [
    ("Asientos calefaccionados del.", [Y,N,Y,Y,Y,Y,Y,Y,Y,N], ""),
    ("Asientos calefaccionados tras.", [N,N,W,N,W,N,N,Y,N,N], "5008'26/Tesla: dato dudoso, una sola fuente"),
    ("Asientos ventilados", [N,N,Y,N,Y,N,Y,N,N,N], ""),
    ("Asientos con masaje", [N,N,N,N,Y,N,N,Y,N,N], ""),
    ("Memoria posición conductor", [N,N,W,N,W,Y,Y,Y,Y,N], "Kodiaq: solo conductor · 5008'26/Tesla: indicio de ausencia, no confirmado"),
    ("Volante calefaccionado", [Y,N,W,N,Y,N,Y,N,N,N], "Tesla: “si equipado”, varía por config/región"),
    ("Sunroof / techo panorámico", [N,Y,W,Y,Y,Y,Y,Y,Y,Y], "Elroq: no existe ni como opcional · Tesla: fijo, el vidrio no se abre"),
    ("Luces altas y bajas automáticas", [Y,Y,Y,Y,Y,W,Y,Y,Y,Y], "Kodiaq: ausente por omisión en ficha oficial"),
    ("Crucero adaptativo real (ACC)", [Y,Y,Y,Y,Y,W,Y,W,W,Y], "Kodiaq: ficha dice “electrónico”, no “adaptativo” · Outlander: no listado pese a prensa"),
    ("Mantención de carril activa", [Y,Y,W,Y,Y,W,Y,W,W,N], "Tesla: Autosteer salió del paquete estándar en ene-2026, ahora es pago · Kodiaq/Outlander: solo aviso de cambio de carril"),
    ("Detector de punto ciego", [Y,W,Y,Y,Y,Y,Y,Y,Y,Y], "Captiva EV: no confirmado en ficha exhaustiva"),
    ("Cámara 360°", [N,Y,Y,Y,Y,N,Y,Y,Y,Y], "Elroq: ausencia señalada como defecto en review chilena · Tesla: equivalente vía Tesla Vision"),
    ("Estacionamiento automático", [N,N,N,Y,W,N,N,N,N,N], "Único con auto-park real: tu 5008 2019 · Tesla: sin sensores físicos, solo cámaras, autopark depende de versión software"),
    ("Frenado autónomo de emergencia", [Y,Y,Y,Y,Y,Y,Y,Y,Y,Y], ""),
    ("Head-up display real", [N,N,N,W,W,N,N,N,Y,N], "Outlander PHEV: único con proyección real · resto: cluster tipo tablet o ausente"),
    ("Carga inalámbrica de celular", [Y,N,Y,W,Y,Y,Y,Y,Y,Y], ""),
    ("CarPlay / Android Auto inalámbrico", [Y,W,N,W,Y,Y,Y,W,Y,Y], "Tesla: no soporta CarPlay/Android Auto, ecosistema propio"),
    ("Portón eléctrico manos libres", [N,W,Y,Y,Y,W,Y,Y,Y,Y], "Elroq: portón 100% manual · Kodiaq: manos libres exclusivo del trim Design"),
]

text_rows = [
    ("Sonido premium", ["8 parlantes gen.","6 parl. (4+2 tw.)","15 parl. Tesla","6 parlantes gen.","8 parlantes gen.","8 parlantes gen.","Tweeters gen.","BOSE · 10 parl.","6 parlantes gen.","Yamaha · 8 parl."], [0,0,0,0,0,0,0,1,0,1]),
    ("Iluminación ambiental", ["10 colores¹","No disponible","RGB perimetral²","2 ambientes","Presente²","Presente²","Mood lamps","No disponible","Presente²","64 colores³"], [0,0,0,0,0,0,0,0,0,1]),
    ("Pantalla infotainment / cluster", ["13\" / 5\"","15,6\" / 8,8\"","15,4\" · sin cluster","8-10\" / 12,3\"","21\" combinada","13\" / 10\"","12,3\" / 12,3\"","9\" / 12,3\"","9\" / 12,3\"","12,3\" / 8\""], [0]*10),
]

def pill(status):
    label = {"y":"Sí","n":"No","w":"Parcial"}[status]
    return f'<span class="pill pill-{status}" title="{label}"><span class="pill-dot"></span>{label}</span>'

def matrix_rows_html():
    out = []
    for label, cells, note in matrix:
        cells_html = "".join(f'<td class="mcell">{pill(c)}</td>' for c in cells)
        note_html = f'<div class="rownote">{html.escape(note)}</div>' if note else ""
        out.append(f'<tr><th class="rowlabel">{html.escape(label)}{note_html}</th>{cells_html}</tr>')
    return "\n".join(out)

def text_rows_html():
    out = []
    for label, cells, standout in text_rows:
        cells_html = ""
        for c, s in zip(cells, standout):
            cls = "mcell mcell-text standout" if s else "mcell mcell-text"
            cells_html += f'<td class="{cls}">{html.escape(c)}</td>'
        out.append(f'<tr><th class="rowlabel">{html.escape(label)}</th>{cells_html}</tr>')
    return "\n".join(out)

def model_headers_html():
    out = []
    for key, brand, trim, energy in MODELS:
        out.append(f'''<th class="modelhead energy-{energy}">
          <span class="mh-brand">{html.escape(brand)}</span>
          <span class="mh-trim">{html.escape(trim)}</span>
        </th>''')
    return "\n".join(out)

def tco_rows_html():
    out = []
    for brand, trim, energy_label, precio, total5, anual, energy in tco_rows:
        pct = round(anual / max_anual * 100, 1)
        out.append(f'''<tr>
          <td class="tco-model">
            <span class="tco-tag tco-tag-{energy}">{energy_label}</span>
            <span class="tco-brand">{html.escape(brand)}</span>
            <span class="tco-trim">{html.escape(trim)}</span>
          </td>
          <td class="tco-num">${precio:,.0f}</td>
          <td class="tco-num">${total5:,.0f}</td>
          <td class="tco-anual">
            <div class="tco-bar-wrap">
              <div class="tco-bar" style="width:{pct}%"></div>
              <span class="tco-anual-num">${anual:,.0f}</span>
            </div>
          </td>
        </tr>'''.replace(",", "."))
    return "\n".join(out)

# ---------------------------------------------------------------- Combined score
W_TCO, W_COMFORT = 0.60, 0.40
tco_total5_by_key = {
    "elroq": 26_712_138, "cev": 19_671_825, "tsy": 25_713_475, "p19": None,
    "p26": 28_339_262, "kod": 30_072_334, "ev5": 30_223_200,
    "outl": 28_826_304, "outp": 22_588_649, "dest": 27_139_680,
}
val = {Y: 1.0, N: 0.0, W: 0.5}
comfort_raw_by_key = {key: sum(val[row[1][i]] for row in matrix) for i, (key, *_r) in enumerate(MODELS)}
n_items = len(matrix)

score_candidates = [k for k, *_ in MODELS if tco_total5_by_key[k] is not None]
_tco_vals = [tco_total5_by_key[k] for k in score_candidates]
_tco_min, _tco_max = min(_tco_vals), max(_tco_vals)
_comf_vals = [comfort_raw_by_key[k] for k in score_candidates]
_comf_min, _comf_max = min(_comf_vals), max(_comf_vals)

score_rows = []
for key, brand, trim, energy in MODELS:
    if tco_total5_by_key[key] is None:
        continue
    tco_s = (_tco_max - tco_total5_by_key[key]) / (_tco_max - _tco_min) * 100
    comf_s = (comfort_raw_by_key[key] - _comf_min) / (_comf_max - _comf_min) * 100
    combined = W_TCO * tco_s + W_COMFORT * comf_s
    score_rows.append((brand, trim, energy, tco_s, comf_s, combined))
score_rows.sort(key=lambda r: -r[5])

def score_rows_html():
    out = []
    for brand, trim, energy, tco_s, comf_s, combined in score_rows:
        out.append(f'''<tr>
          <td class="tco-model">
            <span class="tco-tag tco-tag-{energy}">{energy.upper()}</span>
            <span class="tco-brand">{html.escape(brand)}</span>
            <span class="tco-trim">{html.escape(trim)}</span>
          </td>
          <td class="score-sub">{tco_s:.0f}</td>
          <td class="score-sub">{comf_s:.0f}</td>
          <td class="tco-anual">
            <div class="tco-bar-wrap">
              <div class="tco-bar score-bar" style="width:{combined:.1f}%"></div>
              <span class="tco-anual-num">{combined:.1f}</span>
            </div>
          </td>
        </tr>''')
    return "\n".join(out)

html_doc = f'''<style>
@font-face {{
  font-family: "Shoulders";
  src: url(data:font/woff2;base64,{BSD}) format("woff2");
  font-weight: 700 900;
  font-display: swap;
}}
@font-face {{
  font-family: "Plex Sans";
  src: url(data:font/woff2;base64,{PS}) format("woff2");
  font-weight: 400 600;
  font-display: swap;
}}
@font-face {{
  font-family: "Plex Mono";
  src: url(data:font/woff2;base64,{PM4}) format("woff2");
  font-weight: 400;
  font-display: swap;
}}
@font-face {{
  font-family: "Plex Mono";
  src: url(data:font/woff2;base64,{PM5}) format("woff2");
  font-weight: 500;
  font-display: swap;
}}

:root {{
  --paper: #f4f0e6;
  --paper-raise: #ffffff;
  --ink: #1c1f22;
  --ink-soft: #59564c;
  --line: #ddd5c2;
  --accent: #c2531e;
  --accent-soft: #f0d9c4;
  --steel: #3c5570;
  --steel-soft: #dfe7ee;
  --good: #3d7a54;
  --good-soft: #dcebe0;
  --bad: #ae4438;
  --bad-soft: #f4ddd8;
  --warn: #a5760f;
  --warn-soft: #f1e2c4;
  --radius: 3px;
}}
@media (prefers-color-scheme: dark) {{
  :root {{
    --paper: #15171b;
    --paper-raise: #1c1f24;
    --ink: #eeece4;
    --ink-soft: #a6a196;
    --line: #33353b;
    --accent: #e1854a;
    --accent-soft: #3a2a1c;
    --steel: #8caac9;
    --steel-soft: #223040;
    --good: #6bbf87;
    --good-soft: #1c332;
    --good-soft: #1e2e24;
    --bad: #e08277;
    --bad-soft: #3a2320;
    --warn: #d6ac5c;
    --warn-soft: #362c17;
  }}
}}
:root[data-theme="dark"] {{
  --paper: #15171b;
  --paper-raise: #1c1f24;
  --ink: #eeece4;
  --ink-soft: #a6a196;
  --line: #33353b;
  --accent: #e1854a;
  --accent-soft: #3a2a1c;
  --steel: #8caac9;
  --steel-soft: #223040;
  --good: #6bbf87;
  --good-soft: #1e2e24;
  --bad: #e08277;
  --bad-soft: #3a2320;
  --warn: #d6ac5c;
  --warn-soft: #362c17;
}}
:root[data-theme="light"] {{
  --paper: #f4f0e6;
  --paper-raise: #ffffff;
  --ink: #1c1f22;
  --ink-soft: #59564c;
  --line: #ddd5c2;
  --accent: #c2531e;
  --accent-soft: #f0d9c4;
  --steel: #3c5570;
  --steel-soft: #dfe7ee;
  --good: #3d7a54;
  --good-soft: #dcebe0;
  --bad: #ae4438;
  --bad-soft: #f4ddd8;
  --warn: #a5760f;
  --warn-soft: #f1e2c4;
}}

* {{ box-sizing: border-box; }}
html, body {{
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "Plex Sans", ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}}
::selection {{ background: var(--accent-soft); color: var(--ink); }}

.wrap {{
  max-width: 1180px;
  margin: 0 auto;
  padding: 2.75rem 1.5rem 5rem;
}}

.eyebrow {{
  font-family: "Plex Mono", ui-monospace, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
  margin: 0 0 0.6rem;
}}

h1 {{
  font-family: "Shoulders", ui-sans-serif, sans-serif;
  font-weight: 800;
  font-stretch: condensed;
  font-size: clamp(2.2rem, 5.5vw, 3.6rem);
  line-height: 0.98;
  letter-spacing: -0.01em;
  margin: 0 0 0.7rem;
  text-wrap: balance;
}}
h1 em {{
  font-style: normal;
  color: var(--accent);
}}

.dek {{
  max-width: 62ch;
  color: var(--ink-soft);
  font-size: 1.02rem;
  margin: 0 0 2rem;
}}

.stats {{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  margin-bottom: 3rem;
}}
.stat {{
  background: var(--paper-raise);
  padding: 1.1rem 1.2rem;
}}
.stat-label {{
  font-family: "Plex Mono", monospace;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  margin-bottom: 0.4rem;
}}
.stat-value {{
  font-family: "Shoulders", sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 1.05;
}}
.stat-sub {{
  font-size: 0.82rem;
  color: var(--ink-soft);
  margin-top: 0.25rem;
}}

section {{
  margin-bottom: 3.25rem;
}}
.section-head {{
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 2px solid var(--ink);
  padding-bottom: 0.55rem;
  margin-bottom: 1.1rem;
  flex-wrap: wrap;
}}
.section-title {{
  font-family: "Shoulders", sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  letter-spacing: -0.005em;
}}
.section-note {{
  font-size: 0.82rem;
  color: var(--ink-soft);
  font-family: "Plex Mono", monospace;
}}

/* ---------- TCO table ---------- */
.tco-table {{
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}}
.tco-table th {{
  text-align: left;
  font-family: "Plex Mono", monospace;
  font-size: 0.66rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-soft);
  padding: 0 0.7rem 0.5rem;
  font-weight: 500;
}}
.tco-table th.num {{ text-align: right; }}
.tco-table td {{
  border-top: 1px solid var(--line);
  padding: 0.65rem 0.7rem;
  vertical-align: middle;
}}
.tco-model {{ display: flex; flex-direction: column; gap: 0.15rem; min-width: 190px; }}
.tco-brand {{ font-weight: 600; }}
.tco-trim {{ font-size: 0.78rem; color: var(--ink-soft); }}
.tco-tag {{
  font-family: "Plex Mono", monospace;
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 2px;
  width: fit-content;
  margin-bottom: 0.1rem;
}}
.tco-tag-bev {{ background: var(--steel-soft); color: var(--steel); }}
.tco-tag-phev {{ background: var(--accent-soft); color: var(--accent); }}
.tco-tag-ice {{ background: var(--line); color: var(--ink-soft); }}
.tco-num {{
  font-family: "Plex Mono", monospace;
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--ink-soft);
  white-space: nowrap;
}}
.tco-anual {{ min-width: 220px; }}
.tco-bar-wrap {{
  position: relative;
  background: var(--line);
  border-radius: 2px;
  height: 1.6rem;
  overflow: hidden;
}}
.tco-bar {{
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--accent);
  opacity: 0.28;
}}
.score-bar {{ background: var(--steel); opacity: 0.32; }}
.score-sub {{
  font-family: "Plex Mono", monospace;
  font-variant-numeric: tabular-nums;
  text-align: right;
  color: var(--ink-soft);
  font-size: 0.8rem;
  width: 70px;
}}
.tco-anual-num {{
  position: relative;
  display: block;
  font-family: "Plex Mono", monospace;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  font-size: 0.86rem;
  padding: 0 0.55rem;
  line-height: 1.6rem;
  text-align: right;
}}
.tco-table tr:first-child td {{ border-top: none; }}
.tco-table tr:nth-child(1) .tco-anual-num,
.tco-table tr:nth-child(2) .tco-anual-num {{ color: var(--accent); font-weight: 600; }}

/* ---------- Comfort matrix ---------- */
.matrix-scroll {{
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--paper-raise);
}}
table.matrix {{
  border-collapse: collapse;
  width: 100%;
  min-width: 980px;
  font-size: 0.84rem;
}}
.matrix thead th {{
  position: sticky;
  top: 0;
  background: var(--paper-raise);
  z-index: 2;
  border-bottom: 1px solid var(--line);
}}
.modelhead {{
  padding: 0.7rem 0.6rem;
  min-width: 104px;
  text-align: left;
  vertical-align: bottom;
  border-left: 1px solid var(--line);
}}
.mh-brand {{ display: block; font-weight: 600; font-size: 0.78rem; line-height: 1.2; }}
.mh-trim {{ display: block; font-family: "Plex Mono", monospace; font-size: 0.66rem; color: var(--ink-soft); margin-top: 0.15rem; }}
.energy-bev .mh-brand {{ color: var(--steel); }}
.energy-phev .mh-brand {{ color: var(--accent); }}
.energy-ref .mh-brand {{ color: var(--good); }}

.rowlabel {{
  position: sticky;
  left: 0;
  background: var(--paper-raise);
  z-index: 1;
  text-align: left;
  font-weight: 500;
  padding: 0.55rem 0.9rem;
  border-top: 1px solid var(--line);
  border-right: 1px solid var(--line);
  min-width: 210px;
  max-width: 240px;
}}
.rownote {{
  font-weight: 400;
  font-size: 0.7rem;
  color: var(--ink-soft);
  margin-top: 0.2rem;
  line-height: 1.3;
}}
.mcell {{
  text-align: center;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  padding: 0.5rem 0.4rem;
}}
.mcell-text {{
  font-family: "Plex Mono", monospace;
  font-size: 0.72rem;
  text-align: left;
  padding-left: 0.6rem;
  color: var(--ink-soft);
}}
.mcell-text.standout {{ color: var(--accent); font-weight: 500; }}

.pill {{
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: "Plex Mono", monospace;
  font-size: 0.68rem;
  letter-spacing: 0.02em;
}}
.pill-dot {{
  width: 8px; height: 8px;
  border-radius: 50%;
  display: inline-block;
}}
.pill-y {{ color: var(--good); }}
.pill-y .pill-dot {{ background: var(--good); }}
.pill-n {{ color: var(--ink-soft); opacity: 0.55; }}
.pill-n .pill-dot {{ background: var(--ink-soft); opacity: 0.5; }}
.pill-w {{ color: var(--warn); }}
.pill-w .pill-dot {{ background: var(--warn); }}

.legend {{
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  margin-top: 0.9rem;
  font-size: 0.78rem;
  color: var(--ink-soft);
}}
.legend span {{ display: inline-flex; align-items: center; gap: 0.35rem; }}

.notes {{
  border-top: 1px solid var(--line);
  padding-top: 1.6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.6rem;
}}
.notes h3 {{
  font-family: "Plex Mono", monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--accent);
  margin: 0 0 0.5rem;
  font-weight: 500;
}}
.notes p {{
  margin: 0 0 0.6rem;
  font-size: 0.86rem;
  color: var(--ink-soft);
}}
.notes p:last-child {{ margin-bottom: 0; }}

.foot {{
  margin-top: 3rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
  font-family: "Plex Mono", monospace;
  font-size: 0.7rem;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
}}

@media (max-width: 640px) {{
  .wrap {{ padding: 2rem 1rem 4rem; }}
  .tco-model {{ min-width: 140px; }}
}}
</style>

<div class="wrap">

  <p class="eyebrow">Comparador de autos · Julio 2026 · Chile</p>
  <h1>Diez autos, veintiún ítems,<br><em>un solo TCO.</em></h1>
  <p class="dek">Costo total de propiedad a 5 años (ciclo perpetuo, wallbox incluido en BEV/PHEV) cruzado con equipamiento de confort real, ficha a ficha — incluyendo tu Peugeot 5008 GT Line 2019 como vara de referencia.</p>

  <div class="stats">
    <div class="stat">
      <div class="stat-label">TCO más bajo</div>
      <div class="stat-value">Captiva PHEV</div>
      <div class="stat-sub">$3,41M / año · con enchufe compartido</div>
    </div>
    <div class="stat">
      <div class="stat-label">Mejor equipado</div>
      <div class="stat-value">5008 GT 2026</div>
      <div class="stat-sub">masaje, ventilados, memoria, matrix LED</div>
    </div>
    <div class="stat">
      <div class="stat-label">Sorpresa confort</div>
      <div class="stat-value">Outlander GLS Ltd</div>
      <div class="stat-sub">BOSE 10 parlantes, masaje, 360°</div>
    </div>
    <div class="stat">
      <div class="stat-label">Tu auto hoy</div>
      <div class="stat-value">5008 2019</div>
      <div class="stat-sub">único con estac. automático real</div>
    </div>
  </div>

  <section>
    <div class="section-head">
      <h2 class="section-title">Costo total de propiedad</h2>
      <span class="section-note">5 años · 15.000 km/año · ciclo de recompra perpetuo</span>
    </div>
    <table class="tco-table">
      <thead>
        <tr>
          <th>Modelo</th>
          <th class="num">Precio</th>
          <th class="num">Total 5 años</th>
          <th class="num">Anualizado</th>
        </tr>
      </thead>
      <tbody>
        {tco_rows_html()}
      </tbody>
    </table>
  </section>

  <section>
    <div class="section-head">
      <h2 class="section-title">Puntaje combinado</h2>
      <span class="section-note">60% TCO · 40% confort · normalizado dentro de los 9 candidatos</span>
    </div>
    <table class="tco-table">
      <thead>
        <tr>
          <th>Modelo</th>
          <th class="num">TCO score</th>
          <th class="num">Confort score</th>
          <th class="num">Combinado</th>
        </tr>
      </thead>
      <tbody>
        {score_rows_html()}
      </tbody>
    </table>
    <div class="legend">
      <span>Normalización min-max: el más caro/pelado del grupo saca 0, el más barato/equipado saca 100 — sensible a outliers, ver nota abajo.</span>
    </div>
  </section>

  <section>
    <div class="section-head">
      <h2 class="section-title">Equipamiento de confort</h2>
      <span class="section-note">21 ítems · trims tope de cada modelo</span>
    </div>
    <div class="matrix-scroll">
      <table class="matrix">
        <thead>
          <tr>
            <th class="rowlabel" style="background:var(--paper-raise);">Ítem</th>
            {model_headers_html()}
          </tr>
        </thead>
        <tbody>
          {matrix_rows_html()}
          {text_rows_html()}
        </tbody>
      </table>
    </div>
    <div class="legend">
      <span><span class="pill pill-y"><span class="pill-dot"></span></span> presente, confirmado</span>
      <span><span class="pill pill-w"><span class="pill-dot"></span></span> parcial / dudoso / no confirmado</span>
      <span><span class="pill pill-n"><span class="pill-dot"></span></span> ausente</span>
      <span>¹ Elroq: contradicción entre ficha global y unidad chilena probada</span>
      <span>² presente, cantidad de colores no especificada</span>
      <span>³ Destinator: dato de una sola fuente de prensa</span>
    </div>
  </section>

  <div class="notes">
    <div>
      <h3>Sobre el TCO</h3>
      <p>El costo de reventa a 5 años se trata como pie del auto siguiente, no como plata que te embolsas — por eso "perpetuo". El wallbox ($1,2M CLP instalado) se suma una sola vez a BEV/PHEV.</p>
      <p>Captiva PHEV asume enchufe lento compartido con tu Song Pro actual (40% del kilometraje en modo eléctrico) — con cargador nuevo dedicado su TCO baja a $5,04M total, no $18,24M.</p>
    </div>
    <div>
      <h3>Trims: TCO ≠ confort</h3>
      <p>La tabla de TCO usa a veces el trim más barato (Destinator GL, Outlander GL) para minimizar precio; la matriz de confort usa el trim tope (GLS Limited, GLS) para ver el equipamiento máximo disponible. No son la misma versión — compara con eso en mente.</p>
    </div>
    <div>
      <h3>Confianza de los datos</h3>
      <p>Precio, potencia y ADAS de seguridad vienen casi siempre de ficha oficial (confianza alta). Mantención anual y reventa a 5 años son estimaciones — ningún modelo 2025-2026 tiene historial real en Chile todavía.</p>
    </div>
    <div>
      <h3>Precios revalidados 17-jul</h3>
      <p>El supuesto "bono Scotiabank $7M" del Model Y resultó ser una campaña de Banco Santander ya vencida (31-may-2026) — Scotiabank solo da tasa preferencial, no bono en efectivo. Precio real hoy: $39,9M, sin descuento. El Elroq también perdió su oferta "Mes del Rock" ($29,99M → $39,99M) — verificado dos veces en skoda.cl, sin encontrarla vigente (a la espera de que confirmes dónde la viste, por si el sitio la trae de vuelta).</p>
    </div>
  </div>

  <div class="foot">Comparador de autos · investigación vía subagentes, julio 2026 · precios y equipamiento sujetos a cambio por el fabricante</div>

</div>
'''

out_path = __import__("os").path.join(__import__("os").path.dirname(__import__("os").path.abspath(__file__)), "comparador-autos.html")
open(out_path, "w").write(html_doc)
print("written", len(html_doc), "chars ->", out_path)
