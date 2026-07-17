MODELS = [
    ("elroq", "Skoda Elroq 85 Design"),
    ("cev", "Chevrolet Captiva EV Premier"),
    ("tsy", "Tesla Model Y Premium LR RWD"),
    ("p19", "Peugeot 5008 GT Line 2019 (tuyo, referencia)"),
    ("p26", "Peugeot 5008 GT 2026"),
    ("kod", "Skoda Kodiaq Selection MHEV"),
    ("ev5", "Kia EV5 Wave"),
    ("outl", "Mitsubishi Outlander GLS Limited"),
    ("outp", "Mitsubishi Outlander PHEV GLS"),
    ("dest", "Mitsubishi Destinator GLS"),
]

Y, N, W = 1.0, 0.0, 0.5

matrix = [
    [Y,N,Y,Y,Y,Y,Y,Y,Y,N],
    [N,N,W,N,W,N,N,Y,N,N],
    [N,N,Y,N,Y,N,Y,N,N,N],
    [N,N,N,N,Y,N,N,Y,N,N],
    [N,N,W,N,W,Y,Y,Y,Y,N],
    [Y,N,W,N,Y,N,Y,N,N,N],
    [N,Y,W,Y,Y,Y,Y,Y,Y,Y],
    [Y,Y,Y,Y,Y,W,Y,Y,Y,Y],
    [Y,Y,Y,Y,Y,W,Y,W,W,Y],
    [Y,Y,W,Y,Y,W,Y,W,W,N],
    [Y,W,Y,Y,Y,Y,Y,Y,Y,Y],
    [N,Y,Y,Y,Y,N,Y,Y,Y,Y],
    [N,N,N,Y,W,N,N,N,N,N],
    [Y,Y,Y,Y,Y,Y,Y,Y,Y,Y],
    [N,N,N,W,W,N,N,N,Y,N],
    [Y,N,Y,W,Y,Y,Y,Y,Y,Y],
    [Y,W,N,W,Y,Y,Y,Y,W,Y],
    [N,W,Y,Y,Y,Y,W,Y,Y,Y],
]
n_items = len(matrix)  # 18 — se retiró "faros LED matrix/adaptivo" del análisis

# TCO total 5 años CON wallbox (mismo trim que la matriz de confort)
tco_total5 = {
    "elroq": 20_712_138,
    "cev":   20_271_825,
    "tsy":   21_653_475,
    "p19":   None,  # no es candidato de compra, es tu auto actual
    "p26":   28_339_262,
    "kod":   30_072_334,
    "ev5":   30_223_200,
    "outl":  28_826_304,
    "outp":  22_358_649,
    "dest":  27_139_680,
}

W_TCO, W_COMFORT = 0.60, 0.40

comfort_raw = {}
for i, (key, _) in enumerate(MODELS):
    comfort_raw[key] = sum(row[i] for row in matrix)

candidates = [k for k, _ in MODELS if tco_total5[k] is not None]
tco_vals = [tco_total5[k] for k in candidates]
tco_min, tco_max = min(tco_vals), max(tco_vals)
comfort_vals = [comfort_raw[k] for k in candidates]
comfort_min, comfort_max = min(comfort_vals), max(comfort_vals)

results = []
for key, label in MODELS:
    if tco_total5[key] is None:
        pct = comfort_raw[key] / n_items * 100
        results.append((label, None, None, pct, None))
        continue
    tco_score = (tco_max - tco_total5[key]) / (tco_max - tco_min) * 100
    comfort_pct = comfort_raw[key] / n_items * 100
    comfort_score = (comfort_raw[key] - comfort_min) / (comfort_max - comfort_min) * 100
    combined = W_TCO * tco_score + W_COMFORT * comfort_score
    results.append((label, tco_score, comfort_score, comfort_pct, combined))

results_ranked = sorted([r for r in results if r[4] is not None], key=lambda r: -r[4])

print(f"{'Modelo':<38} {'TCO score':>10} {'Confort score':>14} {'Confort %':>10} {'COMBINADO':>11}")
for label, tco_s, comf_s, comf_pct, combined in results_ranked:
    print(f"{label:<38} {tco_s:>9.1f}  {comf_s:>13.1f}  {comf_pct:>9.1f}% {combined:>10.1f}")

p19 = [r for r in results if r[1] is None][0]
print(f"\n(referencia) {p19[0]:<38} {'—':>10} {'—':>14} {p19[3]:>9.1f}% {'—':>11}")
