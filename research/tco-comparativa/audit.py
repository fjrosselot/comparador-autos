MODELS = [
    ("elroq", "Skoda Elroq 85 Design"),
    ("cev", "Chevrolet Captiva EV Premier"),
    ("tsy", "Tesla Model Y Premium LR RWD"),
    ("p19", "Peugeot 5008 GT Line 2019 (tuyo)"),
    ("p26", "Peugeot 5008 GT 2026"),
    ("kod", "Skoda Kodiaq Selection MHEV"),
    ("ev5", "Kia EV5 Wave"),
    ("outl", "Mitsubishi Outlander GLS Limited"),
    ("outp", "Mitsubishi Outlander PHEV GLS"),
    ("dest", "Mitsubishi Destinator GLS"),
]

items = [
    "Asientos calefaccionados del.",
    "Asientos calefaccionados tras.",
    "Asientos ventilados",
    "Asientos con masaje",
    "Memoria posición conductor",
    "Volante calefaccionado",
    "Sunroof / techo panorámico",
    "Luces altas automáticas",
    "Faros LED matrix / adaptivo",
    "Crucero adaptativo real (ACC)",
    "Mantención de carril activa",
    "Detector de punto ciego",
    "Cámara 360°",
    "Estacionamiento automático",
    "Frenado autónomo de emergencia",
    "Head-up display real",
    "Carga inalámbrica de celular",
    "CarPlay / Android Auto inalámbrico",
    "Portón eléctrico manos libres",
]

Y, N, W = "Y", "N", "W"
matrix = [
    [Y,N,Y,Y,Y,Y,Y,Y,Y,N],
    [N,N,W,N,W,N,N,Y,N,N],
    [N,N,Y,N,Y,N,Y,N,N,N],
    [N,N,N,N,Y,N,N,Y,N,N],
    [N,N,W,N,W,Y,Y,Y,Y,N],
    [Y,N,W,N,Y,N,Y,N,N,N],
    [N,Y,W,Y,Y,Y,Y,Y,Y,Y],
    [Y,Y,Y,Y,Y,W,Y,Y,Y,Y],
    [N,W,N,W,Y,Y,N,Y,W,N],
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

val = {"Y":1.0,"N":0.0,"W":0.5}

for i, (key, label) in enumerate(MODELS):
    print(f"\n=== {label} ===")
    y=n=w=0
    for row_idx, item in enumerate(items):
        status = matrix[row_idx][i]
        if status=="Y": y+=1
        elif status=="N": n+=1
        else: w+=1
        print(f"  {status}  {item}")
    raw = y*1 + w*0.5 + n*0
    pct = raw/len(items)*100
    print(f"  -> Y={y} W={w} N={n} | puntos={raw:.1f}/19 | {pct:.1f}%")
