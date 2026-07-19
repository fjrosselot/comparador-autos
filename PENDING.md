# Pendientes — Comparador de Autos Chile

Tracker cross-sesión. Actualizado en cada `/cierre`.

## Producto (código)

_ninguno pendiente_

## Research personal (compra SUV, no código)

Todo el research vive ahora en `research/tco-comparativa/` (scripts + README con contexto completo, ya commiteado). Artifact visual publicado: **https://claude.ai/code/artifact/2f6a26db-653b-4e03-b7b5-ea2df702df35** (tabla TCO + matriz confort). Para regenerar: `python3 research/tco-comparativa/build_artifact.py` y republicar con el mismo `file_path` (mantiene la URL).

**Revalidación en vivo (17-jul, 7 agentes contra sitio oficial de cada marca) + 2 disputas del usuario, ambas confirmadas a su favor.** Ranking combinado final (60% TCO / 40% confort):

| # | Modelo | Combinado |
|---|---|---|
| 1 | **Outlander PHEV GLS Limited** | 62,2 |
| 2 | Skoda Elroq 85 Design | 61,1 |
| 3 | Captiva EV | 60,0 |
| 4 | Peugeot 5008 GT 2026 | 50,7 |
| 5 | Tesla Model Y | 44,5 (descartado del podio — TCO 42,7 / confort 47,1) |
| 6 | Outlander bencina | 33,8 |
| 7 | Kia EV5 Wave | 28,2 |
| 8 | Destinator | 24,6 |
| 9 | Kodiaq | 10,3 |

Decidido: viajes largos (4-5x/año) van con el Song Pro (PHEV actual) + caja de techo — autonomía real de Elroq/Captiva EV ya NO es filtro eliminatorio. Rutina cloud nocturna de revalidación desactivada (ya no hace falta, se hizo en vivo). Top 3 confirmado: Outlander PHEV / Elroq / Captiva EV. Tesla descartado del podio (confirmado por el usuario) — score no captura otras razones (marca, red Supercharger) si esas pesaran fuera del TCO+confort puro.

- [x] Skoda Elroq "Mes del Rock" $29,99M — confirmado vigente. Estaba en el banner imagen (raster) del carrousel de portada de skoda.cl, no en la subpágina del modelo (por eso 2 verificaciones no la vieron).
- [x] Tesla bono $7M — confirmado real, pero no exclusivo Scotiabank (promo de aniversario de Tesla, letra chica Scotiabank nota 3; Santander también la ofrece). Ya incluido en el precio $39,9M mostrado, no se resta aparte.
- [x] Sincronizar `research/tco-comparativa/` con el estado final — resuelto 2026-07-19. Copiados los 3 scripts desde el scratchpad de sesión (que seguía vivo en disco), re-verificado que corren desde el repo con paths portables, `README.md` actualizado con precios finales y ranking, commit + push.
- [ ] Cotizar instalación real de wallbox (hoy estimado $1,2M CLP genérico, no cotización formal) — relevante si se decide por cualquier BEV/PHEV nuevo, dado que el usuario ya tiene un PHEV (Song Pro) cargando en el mismo punto y necesitaría resolver carga de 2 autos.
- [ ] Sin rating Latin NCAP para Captiva EV — verificar si sale publicado antes de decidir.
- [ ] Mantención y reventa a 5a de Captiva EV son estimaciones de baja confianza (modelo lanzado hace ~6 meses en Chile, sin historial) — revisar si aparecen cifras oficiales/reales más adelante.
- [ ] Autonomía real de Captiva EV sin ningún test publicado (CL/BR/CO) — estimación física ~200-230km es confianza baja, no confirmada.
- [ ] Verificar si crucero adaptativo del Kodiaq es ACC real o solo "electrónico" (ficha oficial dice "electrónico", prensa lo trata como ACC — contradicción sin resolver).
