# DevLog — Comparador de Autos Chile

## [2026-07-19] — Cierre: sync gap resuelto, comparativa TCO+confort cerrada

**Resumen:** Retomé sesión larga de comparativa TCO+confort de 10 SUVs (fuera de la app, `research/tco-comparativa/`). El repo tenía un gap de sync sin cerrar desde el 17-jul: `score.py`/`tco_v3.mjs`/`build_artifact.py` en `main` todavía tenían el valor de Elroq pre-corrección ($26,71M) mientras el artifact publicado y el scratchpad de sesión (efímero) ya tenían el valor correcto ($20,71M, oferta "Mes del Rock" confirmada). Sincronizado, verificado que corre desde el repo con paths portables, y commiteado.

**Archivos:** `research/tco-comparativa/{score.py,tco_v3.mjs,build_artifact.py,comparador-autos.html,README.md}`

**Decisiones:** Las dos disputas de precio (Elroq "Mes del Rock", Tesla bono Scotiabank $7M) las ganó el usuario en ambos casos — mis primeros chequeos fallaron porque la promo Elroq vive en una imagen raster del carrousel de portada (no texto DOM, invisible a fetch/lectura de HTML) y el bono Tesla, aunque real, ya viene incluido en el precio de lista mostrado (no es un cupón aparte). Lección para research de precios: un "no encontrado" en un primer chequeo no es concluyente si la promo es una imagen o requiere leer letra chica completa — vale una segunda pasada dirigida antes de descartar lo que el usuario reporta ver.

**Pendientes:**
- [ ] Ninguno abierto en `research/tco-comparativa/` — ranking final: 1° Outlander PHEV GLS Limited (62,2) · 2° Elroq (61,1) · 3° Captiva EV (60,0), top 3 muy peleado
- [ ] Catálogo Supabase del proyecto (`autos_modelos`) sigue sin BYD/Ford/Honda/Nissan/Toyota/Lynk&Co — pendiente arrastrado, no tocado esta sesión

---

## [2026-07-18, tarde #7] — Sesión no-op, dupe #14+ (mismo transcript, sin turnos nuevos)

**Resumen:** Hook inactividad disparó otra vez sobre mismo transcript 8c57a8db (1527 líneas, confirmado línea por línea — sin línea nueva desde tarde #6). Último turno real sigue siendo 12:06:47 (tabla ranking final). DEVLOG/PENDING/vault ya reflejaban estado correcto. Esta racha de dupes (14+ disparos consecutivos sobre sesión cerrada hace 14h+) es un problema real del hook de inactividad, no de la sesión — recomendado revisar su condición de disparo/intervalo la próxima vez que se trabaje en config de hooks. Sync gap `research/tco-comparativa/` sigue abierto sin tocar (fuera de alcance doc-only).

**Archivos:** ninguno

---

## [2026-07-18, tarde #6] — Sesión no-op, dupe adicional otra vez (mismo transcript, sin turnos nuevos)

**Resumen:** Hook inactividad disparó otra vez, mismo transcript 8c57a8db (1527 líneas, sin línea nueva desde tarde #5). Confirmado línea por línea que el último turno real sigue siendo 12:06:47 (tabla ranking final, ya documentada). DEVLOG/PENDING/vault ya reflejaban estado correcto. Sync gap `research/tco-comparativa/` sigue abierto sin tocar (fuera de alcance de tarea doc-only). Hook lleva 11+ disparos duplicados sobre esta sesión cerrada hace horas.

**Archivos:** ninguno

---

## [2026-07-18, tarde #5] — Sesión no-op, dupe adicional otra vez (mismo transcript, sin turnos nuevos)

**Resumen:** Hook inactividad disparó otra vez, mismo transcript 8c57a8db (1527 líneas, sin línea nueva desde tarde #4). DEVLOG/PENDING/vault ya reflejaban estado correcto. Sync gap `research/tco-comparativa/` sigue abierto sin tocar. Hook lleva 10+ disparos duplicados sobre esta sesión ya cerrada hace horas — revisar config de intervalo/condición, sigue reprocesando sin actividad nueva.

**Archivos:** ninguno

---

## [2026-07-18, tarde #4] — Sesión no-op, dupe adicional otra vez (mismo transcript, sin turnos nuevos)

**Resumen:** Hook inactividad disparó otra vez, mismo ciclo — sesión `e48629c0` reprocesó el mismo enqueue apuntando a transcript 8c57a8db (sin línea nueva desde tarde #3). DEVLOG/PENDING/vault ya reflejaban el estado correcto (la entrada tarde #3 ya se había escrito dentro de este mismo ciclo). Sync gap `research/tco-comparativa/` sigue abierto sin tocar.

**Archivos:** ninguno

---

## [2026-07-18, tarde #3] — Sesión no-op, dupe adicional otra vez (mismo transcript, sin turnos nuevos)

**Resumen:** Hook inactividad disparó otra vez sobre mismo transcript 8c57a8db (1527 líneas, sin línea nueva). Último turno real sigue siendo 12:06:47 (tabla ranking final). PENDING.md y vault note ya correctos. Sync gap `research/tco-comparativa/` sigue abierto sin tocar.

**Archivos:** ninguno

---

## [2026-07-18, tarde #2] — Sesión no-op, dupe adicional otra vez (mismo transcript, sin turnos nuevos)

**Resumen:** Hook inactividad disparó otra vez sobre mismo transcript 8c57a8db (1527 líneas, sin línea nueva desde chequeo anterior — último turno real sigue siendo 12:06:47, tabla de ranking final). Sin turnos nuevos, sin cambios de código. PENDING.md y vault note ya reflejaban este estado exacto (incluso la entrada anterior de DEVLOG describía esto mismo). Sync gap `research/tco-comparativa/` sigue abierto sin tocar.

**Archivos:** ninguno

---

## [2026-07-18, tarde] — Sesión no-op, dupe adicional (mismo transcript, sin turnos nuevos)

**Resumen:** Hook de inactividad disparó de nuevo sobre transcript 8c57a8db (1527 líneas, último turno real ya registrado: 12:06:47, respuesta con tabla de ranking final). Sin turnos nuevos de usuario desde entonces, sin cambios de código. PENDING.md ya refleja el estado correcto (gap de sync `research/tco-comparativa/` sigue abierto, scratchpad en `/tmp` aún no copiado). Vale revisar el intervalo/condición de disparo de este hook — sigue reprocesando sesiones sin actividad nueva.

**Archivos:** ninguno

---

## [2026-07-18, ~12:06] — Usuario repreguntó ranking final, respondido de memoria (sin cambios de código)

**Resumen:** Tras el cluster de dupes de hook (~00:xx #1-8, sin turnos nuevos), la sesión sí recibió un turno real: usuario preguntó "¿cual es el listado actualizado entonces?". Respondido con la tabla de ranking combinado final (misma que ya está en PENDING.md — Outlander PHEV 62,2 / Elroq 61,1 / Captiva EV 60,0 / 5008 GT 50,7 / Tesla 44,5 / ...). Ninguna herramienta de código usada, ningún archivo tocado. El gap de sync `research/tco-comparativa/` sigue abierto sin cambios: confirmado que `score.py` del repo aún tiene `"elroq": 26_712_138` (valor viejo, pre-corrección), mientras el artifact publicado y el scratchpad de sesión (si sigue vivo) tienen el valor correcto `20_712_138`.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #8] — Sesión no-op, dupe #36+ (mismo transcript)

**Resumen:** Hook de inactividad disparó otra vez sobre transcript ya cerrado (8c57a8db, 1515 líneas, Stop hook final 22:28:36) — sin turnos nuevos de usuario, sin cambios de código. Scratchpad reconfirmado vivo en `/tmp/claude-1000/.../8c57a8db.../scratchpad/` (`score.py`, `tco_v3.mjs`, `build_artifact.py` con datos finales correctos). Gap de sync `research/tco-comparativa/` sigue abierto (ver PENDING.md). Hook lleva 36+ disparos duplicados sobre sesión cerrada hace horas.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #7] — Sesión no-op, dupe #35+ (mismo transcript)

**Resumen:** Hook de inactividad disparó otra vez sobre transcript ya cerrado (8c57a8db, 1515 líneas, Stop hook final 22:28:36) — sin turnos nuevos de usuario, sin cambios de código. Gap de sync `research/tco-comparativa/` sigue abierto (ver PENDING.md). Hook lleva 35+ disparos duplicados sobre sesión cerrada hace horas.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #6] — Sesión no-op, dupe #34+ (mismo transcript)

**Resumen:** Hook de inactividad disparó otra vez sobre transcript ya cerrado (8c57a8db, 1515 líneas, Stop hook final 22:28:36) — sin turnos nuevos de usuario, sin cambios de código. Scratchpad sigue vivo en `/tmp/claude-1000/.../8c57a8db.../scratchpad/` (reconfirmado por Glob). Gap de sync `research/tco-comparativa/` sigue abierto (ver PENDING.md). Hook lleva 34+ disparos duplicados sobre sesión cerrada hace horas.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #5] — Sesión no-op, dupe #33+ (mismo transcript)

**Resumen:** Hook inactividad disparó otra vez, mismo transcript cerrado (8c57a8db, 1515 líneas, Stop hook final 22:28:36) — sin turnos nuevos de usuario, sin cambios de código. Scratchpad de sesión sigue vivo en `/tmp/claude-1000/.../8c57a8db.../scratchpad/` (confirmado por Glob, todos los archivos ahí incl. `score.py`/`tco_v3.mjs`/`build_artifact.py` con datos finales correctos). Gap de sync `research/tco-comparativa/` sigue abierto (ver PENDING.md). Hook lleva 33+ disparos duplicados sobre sesión ya cerrada hace horas — sigue sin revisarse su config de intervalo/condición.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #4] — Sesión no-op, dupe #32+ (mismo transcript)

**Resumen:** Otro disparo del hook de inactividad sobre transcript cerrado (8c57a8db, 1515 líneas, último timestamp 22:28:36, sin turnos nuevos). Estado idéntico a las 3 entradas anteriores. Gap de sync `research/tco-comparativa/` sigue abierto (ver PENDING.md). Hook lleva 32+ disparos duplicados — sigue sin revisarse su config.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #3] — Sesión no-op, dupe #31+ (mismo transcript)

**Resumen:** Otro disparo del hook de inactividad, mismo transcript cerrado (8c57a8db, 1515 líneas, Stop hook 22:28:36) — sin turnos nuevos, sin cambios. Estado idéntico a las 2 entradas anteriores. Gap de sync `research/tco-comparativa/` sigue abierto (ver PENDING.md). Hook lleva 31+ disparos duplicados sobre esta misma sesión ya cerrada — vale revisar su config (intervalo/condición de disparo), parece estar reprocesando la misma sesión sin motivo.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx #2] — Sesión no-op, dupe #30+ (mismo transcript)

**Resumen:** Otro disparo del hook de inactividad sobre transcript cerrado (8c57a8db, 1515 líneas, Stop hook 22:28:36) — sin turnos nuevos, sin cambios. Nada nuevo vs entrada anterior. Sync gap `research/tco-comparativa/` sigue abierto (ver PENDING.md), scratchpad con fix aún no copiado por quedar fuera de alcance doc-only.

**Archivos:** ninguno

---

## [2026-07-18, ~00:xx] — Sesión no-op, dupe #29+ (mismo transcript) — scratchpad confirmado vivo con datos finales correctos

**Resumen:** Otro disparo del hook de inactividad sobre el mismo transcript cerrado (8c57a8db, Stop hook 22:28:36, sin turnos nuevos). Novedad vs entradas anteriores: se verificó que el scratchpad de sesión SIGUE en disco (`/tmp/claude-1000/.../8c57a8db.../scratchpad/`) y `score.py` ahí tiene `tco_total5["elroq"] = 20_712_138` — el valor correcto post-fix, no el `26_712_138` viejo que sigue en el repo. Ya no aplica la duda "puede que ya no exista" de la entrada `~22:28`; el gap de sync sigue abierto pero con ruta de recuperación confirmada (copiar, no recrear a mano).

**Archivos:** ninguno (solo verificación, sin tocar repo — fuera de alcance de tarea doc-only)

---

## [2026-07-17, post-22:28] — Sesión no-op, cluster de 7 disparos duplicados (#22-28, mismo transcript)

**Resumen:** Hook de inactividad disparó 7 veces seguidas (22ª-28ª) sobre el mismo transcript ya cerrado (8c57a8db, 1515 líneas, Stop hook final 22:28:36, vault exportado). Las 7 verificaron hasta el final — sin turnos nuevos de usuario, sin cambios de código. Gap de sync `research/tco-comparativa/` (ver PENDING.md) sigue sin tocar — el scratchpad de sesión (`tco_v3.mjs` v8, `score.py` v6, `build_artifact.py` v7) sigue en disco en `/tmp/claude-1000/.../8c57a8db.../scratchpad/`, no aplicado por quedar fuera de alcance de esta tarea doc-only.

**Nota:** hook lleva 28 disparos duplicados seguidos sobre una sesión cerrada hace horas — vale la pena revisar su config, dispara repetido sin motivo aparente.

**Archivos:** ninguno

---

## [2026-07-17, ~22:28] — Ambas disputas resueltas (Elroq recupera promo, Tesla sin descuento extra) — pero repo quedó sin sincronizar con el estado final

**Resumen:** Cierre de la misma sesión 8c57a8db, continuación directa de la entrada anterior (~22:14). Los 2 agentes en background sí devolvieron resultado — no se perdieron, solo no estaban capturados cuando se escribió esa entrada:

- **Skoda Elroq:** el usuario tenía razón — "Mes del Rock" $29,99M seguía vigente. Estaba en el **banner imagen (raster) del carrousel de portada** de skoda.cl, no en texto DOM de la subpágina del modelo — por eso las 2 verificaciones anteriores (WebFetch + agent-browser) no la vieron. Precio revertido a $29,99M, TCO total5 $20,71M / anual $3,90M. Sube del puesto 7 al 2.
- **Tesla Model Y:** el bono $7M **sí existe y es real**, pero no es exclusivo Scotiabank — es promo de aniversario propia de Tesla (letra chica de Scotiabank, nota 3: "de exclusiva responsabilidad de la empresa que realiza la actividad (**Tesla**)"), que Banco Santander ofrece también. El precio $39,9M del configurador **ya incluye el bono** — no hay $7M adicionales que restar. Precio final: $39,9M contado, sin cambio respecto a lo ya cargado.

**Ranking combinado final (60% TCO / 40% confort):**
| # | Modelo | Combinado |
|---|---|---|
| 1 | Outlander PHEV GLS Limited | 62,2 |
| 2 | Skoda Elroq 85 Design | 61,1 |
| 3 | Captiva EV | 60,0 |
| 4 | Peugeot 5008 GT 2026 | 50,7 |
| 5 | Tesla Model Y | 44,5 (TCO 42,7 / confort 47,1 — empatado con Outlander PHEV en confort) |
| 6 | Outlander bencina | 33,8 |
| 7 | Kia EV5 Wave | 28,2 |
| 8 | Destinator | 24,6 |
| 9 | Kodiaq | 10,3 |

Usuario confirmó decisión final: Tesla queda descartado del podio (top 3 = Outlander PHEV / Elroq / Captiva EV, los tres sobre 60 puntos).

**⚠️ Gap — repo desincronizado del artifact publicado:** el artifact online (https://claude.ai/code/artifact/2f6a26db-653b-4e03-b7b5-ea2df702df35) SÍ quedó republicado con estos datos finales correctos (última publicación 22:20). Pero `research/tco-comparativa/` en el repo **no se volvió a sincronizar** después del fix de Elroq — el último commit (`ff7a19f`) tiene el estado intermedio equivocado (Elroq a $39,99M, sin la corrección; `score.py` en el repo hoy todavía muestra `tco_total5["elroq"] = 26_712_138`, el valor viejo). Los archivos finales corregidos (`tco_v3.mjs` v8, `score.py` v6, `build_artifact.py` v7) quedaron solo en el scratchpad de sesión `/tmp/claude-1000/-home-fjros-Documents-Proyectos-Claude-Code-comparador-autos/8c57a8db-ab2e-42ce-a444-0d771cc4cc04/scratchpad/` — efímero, puede que ya no exista. La sesión terminó ahí, sin más turnos tras la confirmación del usuario.

**Siguiente paso:** al retomar — revisar si ese scratchpad sigue en disco; si sí, copiar los 3 archivos + regenerar `README.md` a `research/tco-comparativa/` y commitear+pushear. Si no sigue en disco, recrear a mano: Elroq 85 Design = $29.990.000 (bono directo, "Mes del Rock"), Tesla Model Y Premium LR RWD = $39.900.000 contado (bono ya incluido, no restar aparte) — correr `tco_v3.mjs` → `score.py` → `build_artifact.py` con esos 2 valores y confirmar que da el ranking de arriba.

**Archivos:** `research/tco-comparativa/` (pendiente de sync, ver arriba). Artifact online ya actualizado.

---

## [2026-07-17, ~22:14] — Revalidación de precios en vivo (7 agentes) voltea el ranking; 2 verificaciones quedan async sin resolver

**Resumen:** Continuación de la sesión 8c57a8db. En vez de esperar la rutina cloud de las 02:00, el usuario pidió revalidar ya — se lanzaron 7 agentes en vivo (agent-browser contra sitio oficial de cada marca; Kia EV5 ya estaba validado). Resultado: **2 de los 3 "ganadores" del ranking anterior vivían de bonos que no existen**:

- **Skoda Elroq:** "Mes del Rock" $29,99M no existe más. Precio real hoy $39,99M (bono directo) o $36,99M (bono+financiamiento Smart Credit). Verificado 2 veces (WebFetch + agent-browser) sin encontrar la promo — el usuario después dijo que la vio en el **carrousel de la portada** de skoda.cl (no en la subpágina del modelo, que es lo que se revisó).
- **Tesla Model Y:** el bono $7M **era campaña Banco Santander** (venció 31-mayo-2026), no Scotiabank. Precio real hoy $39,9M sin descuento visible. El usuario después insistió en que sí hay promoción vía Scotiabank — contradice lo encontrado.
- **Captiva EV:** bajó $1M ($28,99M → $27,99M).
- **Outlander PHEV:** subió a $39,99M (ya no existe GLS separada, solo GLS Limited).
- **Outlander bencina, 5008 GT, Kodiaq:** sin cambio.
- Destinator GLS: cambio no capturado completo en el resumen final (cortado).

**Ranking combinado recalculado con precios reales:**
| # | Modelo | Combinado |
|---|---|---|
| 1 | Outlander PHEV GLS Limited | 62,2 |
| 2 | Captiva EV | 60,0 |
| 3 | 5008 GT 2026 | 50,7 |
| 4 | Tesla Model Y | 44,5 (bajó de 1° a 4°) |
| 5 | Outlander bencina | 33,8 |
| 6 | Kia EV5 Wave | 28,2 |
| 7 | Skoda Elroq | 27,0 (bajó de 3° a 7°) |
| 8 | Destinator | 24,6 |
| 9 | Kodiaq | 10,3 |

Artifact republicado (mismo URL): https://claude.ai/code/artifact/2f6a26db-653b-4e03-b7b5-ea2df702df35. `research/tco-comparativa/` actualizado y pusheado. Rutina cloud nocturna (`trig_01MBu9cxnhPfDdccsshHbGYj`) desactivada — ya no hace falta, la revalidación se hizo en vivo.

**Sin resolver al cortar la sesión:** el usuario disputó ambos hallazgos negativos (Tesla bono sí existiría vía Scotiabank; Skoda "Mes del Rock" estaría en el carrousel de home, no en la subpágina). Se lanzaron 2 agentes nuevos en background justo antes de que la sesión quedara inactiva — **sin resultado capturado en el transcript**:
1. Verificar carrousel de portada de skoda.cl (no la subpágina /elroq/elroq) buscando "Mes del Rock".
2. Resolver contradicción Tesla: releer letra chica de scotiabankchile.cl (¿descuento directo, cashback, o solo tasa preferencial?) y revisar si el configurador tesla.com necesita seleccionar algo (código promo, banco en financiamiento) para que el bono se refleje.

**Siguiente paso:** al retomar, revisar si esos 2 agentes dejaron output en algún lado (probablemente se perdieron al cortar la sesión — puede que haya que relanzarlos). Si el Elroq o el Tesla recuperan su bono, el ranking combinado vuelve a moverse y hay que regenerar+republicar el artifact.

**Archivos:** `research/tco-comparativa/` (actualizado, ya commiteado por la sesión misma).

---

## [2026-07-17, post-19:23] — Sesión no-op, cluster #20-21 (mismo transcript)

**Resumen:** 2 disparos duplicados seguidos sobre mismo transcript (8c57a8db) cerrado limpio — último turno real fue el usuario aclarando "Perdon, me equivoque de sesion" (otra sesión, sin relación). Verificado hasta el final (1123 líneas) ambas veces — sin turnos nuevos, sin cambios de código. Rutina cloud de revalidación (`trig_01MBu9cxnhPfDdccsshHbGYj`) aún no dispara — programada 2026-07-18 02:00 Santiago.

**Archivos:** ninguno

---

## [2026-07-17, ~18:38-19:23] — Artifact TCO publicado + Tesla Model Y + fix precios Kia EV5 + rutina cloud de revalidación (sin cambios al catálogo)

**Resumen:** Continuación de la misma sesión 8c57a8db tras el corte por rate limit de las 13:45 (ver entrada anterior). Al retomar, el rate limit ya había liberado — la sesión avanzó sola varias horas más, sin research/tco-comparativa/ ni catálogo tocados hasta este punto:

1. **Artifact visual publicado:** https://claude.ai/code/artifact/2f6a26db-653b-4e03-b7b5-ea2df702df35 — tabla TCO (13 candidatos, barra por costo anual) + matriz de confort (21 ítems × 9 modelos, 5008 GT Line 2019 del usuario como referencia) + notas de metodología. Fuentes propias embebidas en base64 (Big Shoulders Display, IBM Plex Sans/Mono) por el CSP de artifacts.
2. **Tesla Model Y agregado al shortlist:** Premium LR RWD, $32,9M con bono Scotiabank $7M (vence 31-jul-2026, sin confirmar si aplica al contado). Precio base tomado de captura de pantalla del usuario — tesla.com bloquea scraping directo.
3. **Fix de precios Kia EV5 (verificado en vivo con agent-browser contra kia.cl/promociones):** Light bajó de $39,99M a $31,99M, Wave de $49,99M a $41,99M; el bono de $2M es solo financiado (Forum), no aplica al contado. Esta corrección reordenó el ranking completo — efecto matemático de la normalización min-max (rango se comprime cuando cambia el extremo), no que los otros autos "empeoraron".
4. **Puntaje combinado 60% TCO / 40% confort (18 ítems, se sacó "faros LED matrix" a pedido del usuario) recalculado con precios corregidos:**
   | # | Modelo | Combinado |
   |---|---|---|
   | 1 | Tesla Model Y | 70,5 |
   | 2 | Outlander PHEV GLS | 66,2 |
   | 3 | Skoda Elroq 85 Design | 64,4 |
   | 4 | Captiva EV Premier | 60,0 |
   | 5 | Peugeot 5008 GT 2026 | 51,4 |
5. **Research movido del scratchpad (efímero) al repo:** `research/tco-comparativa/` — `tco_v3.mjs`, `score.py`, `audit.py`, `build_artifact.py`, `fonts/*.b64`, `README.md` con contexto completo. Commiteado y pusheado (`chore: add TCO+confort research scripts for cloud revalidation`).
6. **Rutina cloud agendada** para revalidar TODOS los precios (no solo Kia) directo en sitio oficial de cada marca — el usuario notó que agregadores (chileautos.cl, autocosmos.cl) pueden estar desactualizados. Corre **2026-07-18 02:00 Santiago** (`trig_01MBu9cxnhPfDdccsshHbGYj`, https://claude.ai/code/routines/trig_01MBu9cxnhPfDdccsshHbGYj), sobre el repo GitHub `fjrosselot/comparador-autos`. Al terminar deja `research/tco-comparativa/REVALIDATION-2026-07-18.md`, actualiza los scripts/HTML, comitea y pushea — pero NO puede republicar el artifact en claude.ai (eso queda para la próxima sesión).
7. Tras esto, dos mensajes sueltos quedaron en la cola de la sesión sin relación al proyecto ("Puedes no nombrar a Josefa..." y "Perdon, me equivoque de sesion") — el usuario confirmó que apuntaban a otra sesión por error. Sin efecto en este proyecto.

**Siguiente paso:** al retomar, leer `research/tco-comparativa/REVALIDATION-2026-07-18.md` (si ya corrió la rutina) y republicar el artifact si hubo cambios de precio.

**Archivos:** `research/tco-comparativa/` (nuevo, ya commiteado por la sesión misma — no vía este recap).

---

## [2026-07-17, post-13:45] — Sesión no-op, cluster #17-19 (mismo transcript, cortado por rate limit)

**Resumen:** 3 disparos duplicados seguidos sobre mismo transcript (8c57a8db), cortado por rate limit a las 13:45 ("You've hit your session limit · resets 11:50am"), no por Stop hook limpio. Sin turnos nuevos de usuario, sin cambios de código en ninguno. Estado idéntico a la ronda ~13:43 — artifact TCO/confort sin generar, ver PENDING.md.

**Archivos:** ninguno

---

## [2026-07-17, ~13:43] — Artifact visual de la comparación TCO, cortado por rate limit (sin cambios de código)

**Resumen:** Continuación de la misma sesión 8c57a8db (research SUV, sin tocar catálogo). Usuario pidió llevar la comparación TCO a un artifact visual ("Puedes llevar esa comparación a un artifact para verlo mejor?"). Se invocó skill `artifact-design` y se empezó a armar una tabla con tipografía custom (Big Shoulders Display 700/900, IBM Plex Mono 400/500, IBM Plex Sans variable) embebida como base64 en el artifact (CSP de artifacts bloquea CDN de fuentes). Se llegó a descargar los 4 archivos woff2 y confirmar tamaños en base64, pero **la sesión pegó en el límite de uso de Claude ("hit your session limit") antes de escribir el HTML del artifact** — no se generó ningún archivo, ni en el repo ni en el scratchpad temporal.

**Estado:** el artifact visual sigue sin existir. Próximo paso: repetir el pedido ("llevar la comparación TCO a un artifact") en sesión nueva — todo el research y ranking numérico ya está firme en PENDING.md, solo falta la presentación visual.

**Archivos:** ninguno (research, sin tocar catálogo; fuentes descargadas quedaron en /tmp, no persistidas)

---

## [2026-07-17, post-00:56 #14] — Sesión no-op (trigger duplicado #16, mismo transcript)

**Resumen:** Decimosexto disparo del hook de inactividad sobre mismo transcript cerrado (8c57a8db, Stop hook 18:38 del 07-16). Sin turnos nuevos, sin cambios de código. Estado sigue siendo el de la ronda ~12:30 (ranking TCO perpetuo, matriz de confort 8 modelos — ver PENDING.md).

**Archivos:** ninguno

---

## [2026-07-17, ~12:30] — Research SUV: TCO perpetuo + Captiva EV + matriz de confort 8 modelos (sin cambios de código)

**Resumen:** Continuación de la ronda 18:38 (07-16), misma sesión 8c57a8db. Todo research personal, sin tocar catálogo/código:

1. **TCO corregido a ciclo perpetuo real:** se sacó el supuesto de "vender el auto a los 5a y quedarse con la plata" — ahora la reventa a 5a se trata como pie del auto siguiente (repetición perpetua del ciclo de compra). El ranking no cambia de orden (la resta de $12M era pareja para todos), pero el número es más honesto y se agrega costo **anualizado** para comparar.
2. **Chevrolet Captiva EV (BEV) agregada al shortlist:** mismo lanzamiento que la Captiva PHEV (21-ene-2026), $28,99M, batería 60kWh LFP, autonomía 318-415km. Entra en **2° lugar** del ranking TCO perpetuo, detrás de Captiva PHEV y delante de Elroq.
3. **Ranking TCO perpetuo actualizado (con wallbox $1,2M donde aplica):**
   | # | Modelo | Precio | Total 5a | Anual |
   |---|---|---|---|---|
   | 1 | Chevrolet Captiva PHEV | $26,99M | $18,24M | $3,41M/año |
   | 2 | Chevrolet Captiva EV (BEV) | $28,99M | $20,27M | $3,81M/año |
   | 3 | Skoda Elroq (oferta $29,99M) | $29,99M | $20,71M | $3,90M/año |
   | 4 | Outlander PHEV GLS | $39,49M | $22,36M | $4,23M/año |
   | 5 | Destinator GL | $20,49M | $22,68M | $4,54M/año |
4. **Deep-dive Elroq vs Captiva EV (autonomía real, no ficha):** Elroq 85 con test real medido (~350km en ruta a 110-120km/h, km77.com, 21,5kWh/100km real; carga 10→80% en 34min medido, pico 154kW real). Captiva EV **sin ningún test real publicado** en CL/BR/CO — estimación física ~200-230km (confianza baja). Brecha real es peor que los "100km" de ficha WLTP.
5. **Decisión clave:** viajes largos (4-5 veces/año) van con el Song Pro (PHEV actual) + caja de techo — por lo tanto autonomía deja de ser filtro eliminatorio para Elroq/Captiva EV.
6. **Matriz de confort/equipamiento, 21 ítems, 8 modelos del shortlist + auto actual como referencia:** Elroq, Captiva EV, Peugeot 5008 GT Line 2019 (el actual — ojo: en Chile "GT" 2019 era diésel 2.0 BlueHDi, el motor real del usuario 1.6 THP gasolina corresponde a "GT Line", un escalón bajo GT), 5008 GT 2026, Kodiaq Selection, KIA EV5 Wave, Outlander GLS Limited (bencina), Outlander PHEV, Mitsubishi Destinator GLS.
   - Hallazgos destacados: Outlander GLS Limited bencina muy cargado (masaje, BOSE 10 parlantes, cámara 360°). Kodiaq: ficha oficial dice crucero "electrónico" no "adaptativo" — posible que NO sea ACC real, contradice prensa. EV5 Wave muy completo vs Light bastante pelado. Destinator GLS: fuerte en ADAS (ACC, FCM, BSW, 360°, sunroof, infotainment 12,3" inalámbrico, audio Yamaha) pero sin calefacción/ventilación/masaje/memoria/HUD.
7. Los 8 modelos quedaron con matriz completa (último agente relanzado — Destinator — confirmó mismos datos, sin cambios).

**Siguiente paso natural (no ejecutado):** cruzar la matriz de confort con el ranking TCO perpetuo para narrow-down la decisión final entre Captiva PHEV / Captiva EV / Elroq.

**Archivos:** ninguno (research, sin tocar catálogo)

---

## [2026-07-17, 11:51] — Sesión de solo recall (sin cambios de código)

**Resumen:** Sesión nueva (554e041e), tres turnos, todos preguntas de recall sobre el research de compra de SUV — sin tocar código ni catálogo:
1. 13:40 (07-16): "¿en que estabamos del tema wallbox?" → recuperó contexto de sesión 2026-07-15: Captiva PHEV gana el ranking TCO y no necesita wallbox; wallbox (~$600k-1,2M CLP, sin cotizar) solo se justifica si se elige Outlander PHEV. Pregunta abierta que quedó: ¿cotizar wallbox real o cerrar ranking así?
2. 14:51 (07-16): "qué precio tiene el auto híbrido, responde en una palabra" → "Tucson" (Hyundai Tucson 1.6T Híbrido, $31,89M).
3. 11:51 (07-17): "¿qué fue lo último que pediste?" → resumió el turno anterior (precio Tucson).

Sin cambios de producto. PENDING.md sigue vigente tal cual (wallbox sin cotizar sigue como pendiente abierto).

**Archivos:** ninguno

---

## [2026-07-17, 00:31–post-00:56] — Sesión no-op, cluster #3-15 (13 disparos duplicados, mismo transcript)

**Resumen:** 13 disparos duplicados seguidos del hook de inactividad sobre el mismo transcript ya cerrado (8c57a8db, Stop hook 18:38 del 07-16). Único evento posterior real en el transcript: un `/remote-control autos` vacío a las 00:31 del 07-17, sin turno de usuario. Ninguno de los 13 disparos encontró cambios — todo seguía reflejado desde la ronda de las 18:38 (ranking TCO con Captiva EV en 2°, ver PENDING.md).

**Archivos:** ninguno

---

## [2026-07-16 18:38] — Research personal: ranking TCO ampliado (7 modelos nuevos) + fix metodológico (ciclo perpetuo) + Captiva EV

**Resumen:** Sesión larga de research puro (compra personal SUV), sin código de producto — todo vive en scratchpad temporal (`/tmp/.../scratchpad/tco_v3.mjs`), no en el repo. Continuación directa de la sesión 17:13 (pregunta Elroq). Usuario pidió agregar 7 modelos al ranking: Skoda Kodiaq 1.5 TSI MHEV, Skoda Elroq (con oferta $29,99M ese mes, vs $44,99M lista), Kia EV5 (2 trims: Light 64.2kWh FWD y Wave 88.1kWh AWD), Captiva PHEV, Peugeot 5008 (2 trims: Allure y GT), Mitsubishi Outlander (bencina 2 trims + PHEV GLS), Mitsubishi Destinator (2 trims). Luego 2 correcciones importantes del usuario:
1. **Realidad de carga:** tiene wallbox lento (enchufe casa) para su PHEV actual (BYD Song Pro) pero no sabe cómo cargaría 2 autos a diario si suma un segundo PHEV/BEV — esto empujó a modelar costo de wallbox nuevo instalado (~$1,2M CLP, Enel X/Copec Voltex jul-2026, no cotizado formal) como costo único para cualquier candidato BEV/PHEV nuevo, y a pedir la tabla completa con esa columna.
2. **Fix metodológico clave:** el TCO original asumía que a los 5 años el usuario se desprende del auto y "cobra" el valor residual como ingreso puntual — usuario correctamente señaló que eso no es realista, ya que a los 5 años hay que *repetir la compra* (recomprar). Se cambió el cálculo a **"ciclo perpetuo"**: el valor de reventa a 5 años no se cobra aparte, se usa como pie del ciclo siguiente — el costo relevante por ciclo es `(precio - reventa) + combustible + mantención`, expresado también como costo anual (`perpetualAnual`). Esto es más representativo del costo real de tener "siempre un auto de este tipo" en el tiempo.

**Ranking final (costo anual perpetuo, incl. wallbox si aplica):**
1. Chevrolet Captiva PHEV — $26,99M — $3,41M/año
2. Chevrolet Captiva EV (BEV, nuevo, ver abajo) — $28,99M — $3,81M/año
3. Skoda Elroq (oferta BEV) — $29,99M — $3,90M/año
4. Mitsubishi Outlander PHEV GLS — $39,49M — $4,23M/año
5. Mitsubishi Destinator GL — $20,49M — $4,54M/año
... (Outlander bencina, Peugeot 5008 x2, Destinator GLS, Kodiaq, Kia EV5 x2 completan el ranking, todos por encima de $4,5M/año)

**Captiva EV agregado** (pregunta final del usuario, "¿ese no lo consideraste?"): investigado vía agente — SÍ está a la venta en Chile desde 21-ene-2026 (mismo lanzamiento que la PHEV), trim único "Premier" $28.990.000 CLP, 100% eléctrico, batería LFP 60kWh, autonomía 318-415km (WLTP/NEDC), 201hp/310Nm, carga AC 6,6kW (~9-10h), DC hasta 120kW, maletero 532L, garantía 3a/100.000km (8a/160.000km batería). Sin rating Latin NCAP publicado. Mantención (~$225k/año) y reventa a 5a (40%) son estimaciones de baja confianza (modelo sin historial de mercado). Entra en 2° lugar del ranking, justo detrás de la Captiva PHEV y adelante del Elroq — gana a Elroq por precio más bajo pese a batería más chica (60kWh vs 82kWh).

**Archivos:** ninguno en el repo — todo el cálculo vive en `/tmp/claude-1000/.../scratchpad/tco_v3.mjs` (script Node desechable, no versionado).

**Pendiente:** ninguno abierto — el usuario recibió respuesta completa a su última pregunta (Captiva EV) y la sesión terminó en un punto natural (sin pregunta sin responder). Quedan las 2 preguntas de research previas en `PENDING.md` (wallbox real vs estimado, horizonte 7-8 años) que nunca se retomaron explícitamente en esta sesión — probablemente superadas por el fix de ciclo perpetuo, que ya resuelve el espíritu de "extender el horizonte" sin necesidad de recalcular a 7-8 años.

---

## [2026-07-16 17:13] — Research personal: por qué Elroq (BEV) pierde en TCO

**Resumen:** Sesión de research puro (compra personal SUV), sin código. Único turno nuevo: usuario preguntó por qué Skoda Elroq (BEV) pierde contra Captiva PHEV/Destinator/Outlander bencina en el ranking TCO ya cerrado. Respuesta: precio de compra $10M más alto + reventa estimada más floja (40% vs 45-58% del resto) hunde a Elroq en depreciación ($22,19M vs $14,84M Captiva), y el ahorro en combustible (~$5M vs Captiva compartiendo enchufe) no alcanza a compensar esa brecha en 5 años/75.000km. Se ofreció recalcular TCO a 7-8 años para ver si el Elroq cruza — sin respuesta del usuario, sesión quedó inactiva 30+ min de nuevo.

**Archivos:** ninguno

**Pendiente:** sigue abierta la pregunta de 2026-07-15/16 sobre wallbox (ver PENDING.md) — no se retomó en este turno. Nueva pregunta abierta: ¿recalcular TCO a 7-8 años para ver si Elroq (BEV) cruza a Captiva PHEV en costo total?

---

## [2026-07-16 14:55] — Sesión no-op (trigger duplicado)

**Resumen:** Otro disparo del hook de inactividad, mismo transcript ya cerrado (9653941b, terminó 14:47 con Stop hook). Sin turnos nuevos del usuario, sin cambios de código. DEVLOG/PENDING/vault ya reflejaban el estado correcto (última entrada real: 14:51 probe de una palabra).

**Archivos:** ninguno

---

## [2026-07-16 14:51] — Sesión no-op (probe de una palabra)

**Resumen:** Turno aislado en la misma sesión de las 13:42 — pregunta "qué precio tiene el auto híbrido, responde en una sola palabra el nombre" (formato atípico, probable probe/test de Jarvis, no del usuario en escritorio). Respondida "Tucson" sin contexto adicional recuperado. Sin cambios de código ni pendientes.

**Archivos:** ninguno

---

## [2026-07-16 14:13] — Sesión no-op (recuperación duplicada)

**Resumen:** Hook de inactividad disparó 4 rondas de recuperación de contexto seguidas, todas apuntando al mismo transcript ya registrado (sesión 13:42, ranking TCO wallbox). Cada ronda confirmó que DEVLOG.md/PENDING.md/nota vault ya estaban al día — sin trabajo nuevo, sin cambios de código, sin pendientes nuevos.

**Archivos:** ninguno

---

## [2026-07-16 13:42] — Recuperación de contexto: ranking TCO SUV + pregunta wallbox pendiente

**Resumen:** Sesión de research puro (compra personal SUV), sin código. Usuario preguntó "¿en que estabamos del tema wallbox?" — se revisaron sesiones previas (09:34, 09:41 y finalmente la de 2026-07-15) para reconstruir contexto. Recap entregado: ranking TCO 5 años (escenario real, enchufe compartido) — 1° Captiva PHEV $9,21M, 2° Destinator GL $10,68M, 3° Outlander GL bencina $11,37M, 4° Skoda Elroq BEV $11,71M... 6° Outlander PHEV $14,45M (cae fuerte sin cargador nuevo). Conclusión: Captiva PHEV gana en todo escenario y no necesita wallbox; wallbox (~$600k-1,2M CLP, no cotizado real) solo se justificaría si se elige Outlander PHEV (ahorro ~$5,3M en 5 años). Sesión terminó con pregunta abierta al usuario ("¿cotizo instalación real de wallbox, o cerramos ranking así?") sin respuesta — quedó inactiva 30+ min.

**Archivos:** ninguno

**Pendiente:** decidir si cotizar instalación real de wallbox o cerrar ranking TCO tal como está (Captiva PHEV como ganador, sin necesidad de wallbox).

---

## [2026-07-16 13:35] — Sesión no-op (sanity check caveman mode)

**Resumen:** Sesión trivial de 2 turnos — usuario pidió "di solo OK" para probar caveman mode, luego confirmó que la respuesta fue recordada. Sin trabajo de proyecto, sin cambios de código, sin pendientes.

**Archivos:** ninguno

---

## [2026-07-16 13:33] — Sesión no-op (pregunta off-topic)

**Resumen:** Usuario preguntó por cotización de instalación de wallbox — no relacionado a este proyecto (comparador SUVs Chile). Se le indicó que no aplica y se ofreció buscar precios/proveedores vía web; usuario no siguió la conversación. Sin cambios de código ni pendientes nuevos.

**Archivos:** ninguno

---

## [2026-07-11 00:00] — Research personal: SUV ≤$32M + torque ≥230Nm (sin código)

**Resumen:** Sesión de research puro (compra personal de SUV), no tocó el código del proyecto. Continuación de sesión previa cortada — Enfoque 1 (SUV normal, sin filtro de maletero, presupuesto $32M, torque ≥230Nm, 2024+) cerrado marca por marca en 10 marcas (Toyota, Ford, Honda, Mazda, VW, Nissan, Subaru, Mitsubishi, Chevrolet, Kia/Hyundai) vía subagentes secuenciales para no saturar el buscador.

**Archivos:** ninguno (sin cambios de código)

**Decisiones:**
- Research uno-por-marca en serie (no paralelo) para no saturar el motor de búsqueda
- Corrección de datos previos: Kia Sorento 2.5 EX GSL es 232 Nm (no 421 Nm, que era el motor diésel); Montero Sport NO pasa presupuesto en 2024+ (el "$20,98M" de la sesión anterior era en realidad Outlander Sport, dato confundido); Chevrolet Equinox en Chile solo existe como EV ($56M) — el debate de litros LatAm/NA era irrelevante

**Resultado (mejor candidato por marca, ≤$32M / ≥230Nm / 2024+):**
- Ford: Territory Trend/Titanium — $22,5-29,2M, 248 Nm
- Nissan: X-Trail 1.5T (no e-Power) — $24-31,5M, 305 Nm
- Honda: CR-V usado 2024 — $31-31,5M, 240 Nm
- VW: Taos AT / Tiguan usado — $25,8-29,2M, 250 Nm
- Subaru: Forester 2.5i / Outback 2.5i — $22,9-27,5M, 239-245 Nm
- Mazda: CX-30 HIGH 2.5 AWD — $28,5-29M, 252 Nm
- Mitsubishi: Outlander 4x2 GL/GLX — $25,99-29,49M, 244 Nm
- Chevrolet: Captiva XL — $17,1-21,1M, hasta 244 Nm
- Kia: Sportage 1.6T AWD — ~$23-32M, 265 Nm
- Hyundai: Tucson 1.6T Híbrido — $31,89M, 350 Nm
- Toyota: **sin candidato** (única marca sin match)

**Pendientes:**
- [ ] Decidir si comparar shortlist final por costo/beneficio o TCO
- [ ] Retomar pendientes técnicos de precios per-versión (ver entrada anterior — sin cambios esta sesión)

---

## [2026-06-22 18:27] — Master-detail catalog, grupo_id, trims reales + precio oficial (interino)

**Resumen:** Rediseño del catálogo a master-detail (grid buscable/filtrable + panel ficha técnica integrado). Agrupación de versiones por `grupo_id`. Barrido de trims reales con ficha por versión desde autocosmos (53 grupos → 128 trims). Tras feedback, se corrigieron los precios a "desde" oficial por modelo (interino) — precio per-versión oficial queda pendiente de browser automation.

**Archivos:**
- `src/components/CatalogoTab.jsx` (reescrito master-detail + agrupación grupo_id + chips combustible/diesel)
- `src/components/SpecDetailPanel.jsx` (nuevo — panel ficha técnica + switcher de versiones)
- `src/App.jsx` (v0.2.0)
- `supabase/migrations/20260622000000_grupo_id_and_views.sql` (columna grupo_id + vistas públicas)
- Mockup: `backbone-mockups/src/projects/comparador/CatalogoDetalle.tsx`

**Decisiones:**
- Vistas públicas en `public` en vez de exponer schema `autos` (PostgREST no confiable en Supabase managed)
- `grupo_id` (híbrido) para agrupar trims sin sub-tabla — grid colapsa por grupo, expande a trims
- Specs migrados de plano snake_case a anidado camelCase (ficha/TCO/scoring esperaban anidado; `reventa.pct5yr` fracción no entero)
- Scraping de trims vía subagentes paralelos (aíslan volumen de páginas)
- **Precios: solo oficiales** (decisión del usuario). autocosmos = agregador → revertido. Oficial da "desde" por modelo/motorización estático; per-versión requiere cotizadores JS (browser)

**Estado precios:**
- ✅ Oficial "desde": KIA, Mazda, Chevrolet, Haval, Tank, Mitsubishi, Deepal, Hyundai (Creta Grand/Tucson)
- ⏳ Pendiente browser (aún autocosmos): BYD, Ford, Honda, Nissan, Toyota, Lynk&Co, Hyundai Kona/Santa Fe

**Pendientes:**
- [ ] Instalar Chrome (`sudo npx playwright install --with-deps chrome`) — requiere sudo del usuario
- [ ] Ruta Playwright→API: descubrir endpoint JSON de cotizadores oficiales → HTTP puro → precio oficial por versión
- [ ] Completar precios marcas JS (BYD, Ford, Honda, Nissan, Toyota, Lynk&Co)
- [ ] Corregir Hyundai Kona/Santa Fe con precio oficial real por versión
- [ ] Probar si Scrapling soporta acciones de página (scroll/click) — evitaría instalar Chrome

---
