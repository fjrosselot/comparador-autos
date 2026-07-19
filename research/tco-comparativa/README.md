# TCO + confort — comparativa personal (fuera de la app)

Research puro, no integrado al catálogo Supabase del proyecto. Vive acá porque
el scratchpad de sesión (`/tmp/claude-1000/...`) se borra; esto no.

## Qué es esto
- `tco_v3.mjs` — calcula TCO perpetuo (5 años, trade-in = reventa del mismo
  modelo, wallbox $1,2M una vez para BEV/PHEV). `node tco_v3.mjs`.
- `score.py` — puntaje combinado 60% TCO / 40% confort, normalizado min-max
  entre los 9 candidatos de compra (excluye 5008'19, que es el auto actual,
  no candidato). `python3 score.py`.
- `audit.py` — desglose ítem por ítem por modelo (para auditar la matriz).
- `build_artifact.py` — genera `comparador-autos.html`, el artifact publicado.
  Fuentes propias en `fonts/*.b64` (Big Shoulders Display, IBM Plex Sans/Mono).
  `python3 build_artifact.py`.
- **Artifact publicado:** https://claude.ai/code/artifact/2f6a26db-653b-4e03-b7b5-ea2df702df35
  Para actualizar: regenerar `comparador-autos.html` y volver a publicar con
  el mismo `file_path` (mantiene la URL).

## Candidatos actuales (10, 9 comprables + 1 referencia)
Precio = precio contado usado en TCO. **Revalidados en vivo el 17-jul-2026**
contra el sitio oficial de cada marca (no agregadores) — ver hallazgos abajo.

| Modelo | Trim (comfort) | Precio contado | Notas |
|---|---|---|---|
| Skoda Elroq | 85 Design · Mes del Rock | $29.990.000 | Confirmado vigente — está en el CARROUSEL de la portada skoda.cl como imagen raster (no texto DOM), por eso 2 chequeos previos (WebFetch + agent-browser a /elroq/elroq) no lo vieron. Screenshot de evidencia en scratchpad de sesión (ya no persiste) |
| Chevrolet Captiva EV | 60kWh | $27.990.000 | bajó $1M vs. dato anterior ($28,99M) |
| Tesla Model Y | Premium LR RWD | $39.900.000 | Bono $7M confirmado real y vigente (letra chica scotiabankchile.cl nota 3: "responsabilidad exclusiva de Tesla", sin condición de banco — y Banco Santander promociona el mismo bono, prueba de que no es exclusivo de ningún banco), pero **ya viene incluido en el precio de lista mostrado** — no es un descuento aparte a aplicar. $43,9M (precio pre-bono, dic-2025) − $7M = $36,9M (RWD base hoy), mismo patrón en Long Range RWD |
| Mitsubishi Outlander PHEV | GLS Limited | $39.990.000 | La versión "GLS" (no Limited) ya no existe en el catálogo — solo queda GLS Limited. Subió $500k vs. dato anterior |
| Mitsubishi Outlander | GLS Limited 4x4 (bencina) | $38.990.000 | sin cambio |
| Peugeot 5008 | GT 2026 (MHEV) | $33.990.000 | sin cambio |
| Skoda Kodiaq | Selection MHEV | $34.690.000 (con bono, lista $37.190.000) | sin cambio |
| Kia EV5 | Wave 88.1kWh AWD | $41.990.000 | corregido 17-jul (antes $49,99M, mal) |
| Kia EV5 | Light 64.2kWh FWD | $31.990.000 | corregido 17-jul (antes $39,99M, mal) |
| Mitsubishi Destinator | GLS | $28.990.000 | sin cambio, promo vigente hasta 31-jul-2026 |
| *(referencia, no candidato)* Peugeot 5008 GT Line 2019 | tuyo | — | ficha de equipamiento, no de precio |

Todos los precios verificados en vivo (WebFetch y/o agent-browser) contra el
sitio oficial de cada marca el 17-jul-2026 — incluyendo las dos disputas
Elroq/Tesla, ambas resueltas a favor del usuario tras una segunda ronda de
verificación más específica (carrousel de portada / letra chica completa).
Lección: un "no encontrado" en un primer chequeo no es concluyente si la
promo está en un banner rotativo (imagen raster) o en un texto legal que
requiere clic aparte — vale la pena una segunda pasada dirigida antes de
descartar una promoción que el usuario reporta ver. Rutina cloud programada
para revalidación nocturna (`trig_01MBu9cxnhPfDdccsshHbGYj`) quedó
**desactivada** — se hizo en vivo en la misma sesión al reiniciarse la
ventana de 5h.

**Ranking final (60% TCO / 40% confort):** 1° Outlander PHEV GLS Limited
(62,2) · 2° Skoda Elroq (61,1) · 3° Captiva EV (60,0) · 4° 5008 GT 2026
(50,7) · 5° Tesla Model Y (44,5) · 6° Outlander bencina (33,8) · 7° Kia EV5
Wave (28,2) · 8° Destinator (24,6) · 9° Kodiaq (10,3). Top 3 muy peleado.

## Metodología del puntaje combinado (score.py)
- TCO score y Confort score se normalizan 0-100 (min-max) **dentro del grupo
  de 9 candidatos** — esto es sensible a outliers: si el precio de un modelo
  se corrige y deja de ser el más caro/barato, el rango se comprime y TODOS
  los demás scores se mueven aunque su precio no haya cambiado. Ya pasó una
  vez (corrección Kia EV5 movió el ranking completo). Tenerlo presente al
  reportar resultados — no es que el auto "empeoró", es el método.
- Confort: 18 ítems (se sacó "faros LED matrix/adaptivo" a pedido del
  usuario — el criterio real es luces altas+bajas automáticas, ya cubierto
  por otro ítem). Y=1pt, parcial=0,5pt, N=0pt.
- Peso acordado con el usuario: 60% TCO / 40% confort.
