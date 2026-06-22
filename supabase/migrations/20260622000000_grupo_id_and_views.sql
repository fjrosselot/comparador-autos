-- Grupo de versiones: agrupa filas hermanas (mismo modelo, distintos trims/motorizaciones)
alter table autos.modelos add column if not exists grupo_id uuid;

-- Backfill: mismo grupo_id por (marca_id, nombre)
with grupos as (
  select marca_id, nombre, gen_random_uuid() as gid
  from autos.modelos
  group by marca_id, nombre
)
update autos.modelos m
set grupo_id = g.gid
from grupos g
where m.marca_id = g.marca_id and m.nombre = g.nombre
  and m.grupo_id is null;

-- Vistas públicas (PostgREST no expone el schema autos de forma confiable en Supabase
-- managed; las vistas en public evitan el problema). marcas embebido como JSONB para
-- que modelo.marcas?.nombre funcione sin joins a través de vistas.
drop view if exists public.autos_modelos;
create view public.autos_modelos as
select m.id, m.marca_id, m.grupo_id, m.nombre, m.version, m."año", m.tipo,
  m.combustible, m.precio_lista, m.precio_contado, m.descuento_contado_pct,
  m.precio_financiamiento, m.descuento_financiamiento_pct, m.tasa_credito_referencial,
  m.url_fuente, m.scrapeado_at, m.activo, m.created_at,
  jsonb_build_object('nombre', ma.nombre, 'logo_url', ma.logo_url) as marcas
from autos.modelos m
left join autos.marcas ma on ma.id = m.marca_id;

create or replace view public.autos_specs as
select s.id, s.modelo_id, s.datos, s.version_scrape, s.created_at
from autos.specs s;

create or replace view public.autos_comparaciones as
select c.id, c.nombre, c.modelo_ids, c.pesos, c.parametros_tco, c.created_at
from autos.comparaciones c;

grant select on public.autos_modelos to anon, authenticated;
grant select on public.autos_specs to anon, authenticated;
grant select, insert, update on public.autos_comparaciones to anon, authenticated;
