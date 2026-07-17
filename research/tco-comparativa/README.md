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
| Skoda Elroq | 85 Design | $39.990.000 (bono directo) | La oferta "Mes del Rock" ($29,99M) NO se encontró vigente en 2 verificaciones independientes (WebFetch + agent-browser) contra skoda.cl. Usuario insiste en que sigue existiendo — pendiente que confirme fuente/screenshot |
| Chevrolet Captiva EV | 60kWh | $27.990.000 | bajó $1M vs. dato anterior ($28,99M) |
| Tesla Model Y | Premium LR RWD | $39.900.000 | El "bono Scotiabank $7M" no existe — era campaña Banco Santander, vencida 31-may-2026. Scotiabank solo da tasa preferencial (0,99%), no bono en efectivo. Precio confirmado en vivo en el configurador tesla.com/es_cl, sin descuento visible |
| Mitsubishi Outlander PHEV | GLS Limited | $39.990.000 | La versión "GLS" (no Limited) ya no existe en el catálogo — solo queda GLS Limited. Subió $500k vs. dato anterior |
| Mitsubishi Outlander | GLS Limited 4x4 (bencina) | $38.990.000 | sin cambio |
| Peugeot 5008 | GT 2026 (MHEV) | $33.990.000 | sin cambio |
| Skoda Kodiaq | Selection MHEV | $34.690.000 (con bono, lista $37.190.000) | sin cambio |
| Kia EV5 | Wave 88.1kWh AWD | $41.990.000 | corregido 17-jul (antes $49,99M, mal) |
| Kia EV5 | Light 64.2kWh FWD | $31.990.000 | corregido 17-jul (antes $39,99M, mal) |
| Mitsubishi Destinator | GLS | $28.990.000 | sin cambio, promo vigente hasta 31-jul-2026 |
| *(referencia, no candidato)* Peugeot 5008 GT Line 2019 | tuyo | — | ficha de equipamiento, no de precio |

Todos los precios de la tabla verificados con fetch directo y/o agent-browser
contra el sitio oficial de la marca el 17-jul-2026, salvo Elroq (disputado)
y Peugeot/Destinator (verificados contra dealer oficial, marca no publica
precio directo). Rutina cloud programada para revalidación nocturna
(`trig_01MBu9cxnhPfDdccsshHbGYj`) quedó **desactivada** — se hizo en vivo
en la misma sesión al reiniciarse la ventana de 5h.

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
