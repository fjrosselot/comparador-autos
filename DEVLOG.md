# DevLog — Comparador de Autos Chile

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
