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
Precio = precio contado usado en TCO, verificado la última vez el 17-jul-2026
salvo donde se indica.

| Modelo | Trim (comfort) | Precio contado | Última verificación |
|---|---|---|---|
| Skoda Elroq | 85 Design | $29.990.000 (oferta "Mes del Rock") | 16-jul — oferta sin confirmar vigencia/condiciones, "hasta agotar stock" |
| Chevrolet Captiva EV | Premier 60kWh | $28.990.000 | 15-jul |
| Tesla Model Y | Premium LR RWD | $32.900.000 (con bono Scotiabank $7M, vence 31-jul-2026) | 17-jul — precio base tomado de captura de pantalla del usuario, no de fetch directo (tesla.com bloquea scraping). No confirmado si el bono aplica al contado o solo financiado |
| Mitsubishi Outlander PHEV | GLS | $39.490.000 | 15-jul |
| Mitsubishi Outlander | GLS Limited 4x4 (bencina) | $38.990.000 | 15-jul |
| Peugeot 5008 | GT 2026 (MHEV) | $33.990.000 | 15-jul |
| Skoda Kodiaq | Selection MHEV | $34.690.000 (con bono, lista $37.190.000) | 15-jul |
| Kia EV5 | Wave 88.1kWh AWD | $41.990.000 | **17-jul, corregido** — precio anterior ($49,99M) estaba mal, verificado en vivo contra kia.cl/promociones con agent-browser |
| Kia EV5 | Light 64.2kWh FWD | $31.990.000 | **17-jul, corregido** — anterior $39,99M estaba mal |
| Mitsubishi Destinator | GLS | $28.990.000 | 15-jul |
| *(referencia, no candidato)* Peugeot 5008 GT Line 2019 | tuyo | — | ficha de equipamiento, no de precio |

## Pendiente para esta noche (revalidación completa)
El usuario pidió repasar TODOS los precios de nuevo (no solo Kia, que ya se
corrigió) porque encontramos que agregadores (chileautos.cl, autocosmos.cl)
pueden estar desactualizados vs. el sitio oficial de la marca. Se decidió
posponer para no gastar tokens de la ventana de 5h en curso.

Tarea para la sesión nocturna:
1. Para cada uno de los 10 modelos de la tabla arriba, verificar precio
   **vigente hoy** directo en el sitio oficial de la marca (usar agent-browser
   si WebFetch da 403/vacío — varios sitios bloquean scraping directo, ver
   notas de sesión: chevrolet.cl, tesla.com, mitsubishi-motors.cl).
2. Prestar atención especial a: condiciones de bonos (¿aplican al contado o
   solo financiado?, ¿con qué banco?, ¿vigencia real?), porque ya se encontró
   un caso (Kia) donde el precio "lista" cambió y otro (Tesla) donde no se
   pudo verificar en vivo.
3. Actualizar `tco_v3.mjs` (precio_contado/precio_lista) y `build_artifact.py`
   (tco_rows) con los valores corregidos.
4. Recalcular con `node tco_v3.mjs` y `python3 score.py`.
5. Regenerar el artifact (`python3 build_artifact.py`) y republicar con
   `Artifact({file_path: ".../comparador-autos.html", url: "<url de arriba>"})`
   pasando la URL existente para no perder el link.
6. Avisar al usuario con la tabla de precios que cambiaron (si alguno).

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
