# DevLog — Comparador de Autos Chile

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
