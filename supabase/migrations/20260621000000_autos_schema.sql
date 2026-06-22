create schema if not exists autos;

create table autos.marcas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  pais_origen text,
  logo_url text,
  sitio_oficial_cl text,
  created_at timestamptz default now()
);

create table autos.modelos (
  id uuid primary key default gen_random_uuid(),
  marca_id uuid references autos.marcas(id),
  nombre text not null,
  version text,
  año int,
  tipo text,
  combustible text,
  precio_lista bigint,
  precio_contado bigint,
  descuento_contado_pct numeric,
  precio_financiamiento bigint,
  descuento_financiamiento_pct numeric,
  tasa_credito_referencial numeric,
  url_fuente text,
  scrapeado_at timestamptz,
  activo bool default true,
  created_at timestamptz default now()
);

create table autos.specs (
  id uuid primary key default gen_random_uuid(),
  modelo_id uuid references autos.modelos(id) on delete cascade,
  datos jsonb,
  version_scrape int default 1,
  created_at timestamptz default now()
);

create table autos.comparaciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  modelo_ids uuid[],
  pesos jsonb,
  parametros_tco jsonb,
  created_at timestamptz default now()
);

alter table autos.marcas enable row level security;
alter table autos.modelos enable row level security;
alter table autos.specs enable row level security;
alter table autos.comparaciones enable row level security;

create policy "public read marcas"      on autos.marcas      for select using (true);
create policy "public read modelos"     on autos.modelos     for select using (true);
create policy "public read specs"       on autos.specs       for select using (true);
create policy "public read comparaciones" on autos.comparaciones for select using (true);
create policy "public insert comparaciones" on autos.comparaciones for insert with check (true);
create policy "public update comparaciones" on autos.comparaciones for update using (true);

-- Grant schema access to anon/authenticated (required for non-public schemas)
grant usage on schema autos to anon, authenticated, service_role;
grant select on all tables in schema autos to anon, authenticated;
grant insert, update on autos.comparaciones to anon, authenticated;
alter default privileges in schema autos grant select on tables to anon, authenticated;

-- Expose schema via PostgREST (required for .schema('autos') in Supabase JS client)
alter role authenticator set pgrst.db_schemas to 'public, autos';
notify pgrst, 'reload config';
