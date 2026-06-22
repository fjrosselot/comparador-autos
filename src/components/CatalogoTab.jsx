import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, ExternalLink, ChevronDown, ChevronRight, Layers } from 'lucide-react'
import { useModelos } from '../hooks/useModelos'
import { useSpecs } from '../hooks/useSpecs'
import { fmtCLP } from '../utils/fmt'
import SpecDetailPanel from './SpecDetailPanel'

const COMB = {
  PHEV:     { bg: 'bg-green-100', fg: 'text-green-700', label: 'PHEV' },
  BEV:      { bg: 'bg-blue-100',  fg: 'text-blue-700',  label: 'BEV' },
  HEV:      { bg: 'bg-teal-100',  fg: 'text-teal-700',  label: 'HEV' },
  gasolina: { bg: 'bg-slate-100', fg: 'text-slate-600', label: 'Gasolina' },
}
const COMB_FILTERS = ['Todos', 'gasolina', 'HEV', 'PHEV', 'BEV']

const TIPOS = ['SUV', 'sedan', 'hatchback', 'pickup', 'van']
const PRECIO_OPTS = [
  { label: 'Precio: Todos', value: null },
  { label: 'Hasta $20M', value: 20_000_000 },
  { label: 'Hasta $25M', value: 25_000_000 },
  { label: 'Hasta $30M', value: 30_000_000 },
  { label: 'Hasta $35M', value: 35_000_000 },
]
const SORTS = [
  { id: 'precio-asc',  label: 'Precio ↑' },
  { id: 'precio-desc', label: 'Precio ↓' },
  { id: 'nombre',      label: 'Marca A-Z' },
]

function precioOf(m) { return m.precio_contado ?? m.precio_lista ?? 0 }

function CombChip({ comb }) {
  const c = COMB[comb] ?? COMB.gasolina
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.bg} ${c.fg}`}>{c.label}</span>
}

function TrimRow({ modelo, isDetail, inComparison, onSelect, onToggleComparison }) {
  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        isDetail ? 'bg-blue-50' : 'hover:bg-slate-50'
      }`}
    >
      <input
        type="checkbox"
        checked={inComparison}
        onChange={onToggleComparison}
        onClick={e => e.stopPropagation()}
        className="w-4 h-4 accent-blue-500 shrink-0"
        title="Agregar a comparación"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-slate-700 leading-tight">{modelo.version}</p>
        <p className="text-[10px] text-slate-400">{modelo.año}</p>
      </div>
      <CombChip comb={modelo.combustible} />
      <span className="text-[13px] font-bold text-slate-800 shrink-0 w-24 text-right">{fmtCLP(precioOf(modelo))}</span>
    </div>
  )
}

function GroupCard({ group, expanded, detailId, selectedIds, onToggleExpand, onSelectTrim, onToggleComparison }) {
  const { marca, nombre, tipo, versions } = group
  const combs = [...new Set(versions.map(v => v.combustible))]
  const minPrecio = Math.min(...versions.map(precioOf))
  const multi = versions.length > 1
  const single = versions[0]
  const groupHasDetail = versions.some(v => v.id === detailId)

  return (
    <div
      className={`rounded-2xl bg-white border-2 transition-all overflow-hidden ${
        groupHasDetail ? 'border-blue-400 shadow-lg shadow-blue-100' : 'border-slate-200 hover:border-slate-300 shadow-sm'
      }`}
    >
      <button
        onClick={() => multi ? onToggleExpand(group.grupo_id) : onSelectTrim(single.id)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-slate-400">{marca}</p>
            <p className="text-[15px] font-bold leading-tight text-slate-800">{nombre}</p>
            <p className="text-[11px] text-slate-500">{tipo}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {!multi && single.url_fuente && (
              <a href={single.url_fuente} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-slate-300 hover:text-blue-400 transition-colors" title="Ver en sitio oficial">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {multi
              ? (expanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />)
              : (
                <input
                  type="checkbox"
                  checked={selectedIds.includes(single.id)}
                  onChange={() => onToggleComparison(single.id)}
                  onClick={e => e.stopPropagation()}
                  className="w-4 h-4 accent-blue-500"
                  title="Agregar a comparación"
                />
              )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
          {combs.map(c => <CombChip key={c} comb={c} />)}
          {multi && (
            <span className="flex items-center gap-1 text-[10px] text-slate-400">
              <Layers className="w-2.5 h-2.5" />{versions.length} versiones
            </span>
          )}
        </div>
        <p className="text-[16px] font-bold mt-2.5 text-slate-800">
          {multi && <span className="text-[11px] font-normal text-slate-400">desde </span>}
          {fmtCLP(minPrecio)}
        </p>
      </button>

      {multi && expanded && (
        <div className="px-2 pb-2 pt-0 space-y-0.5 border-t border-slate-100">
          {versions.map(v => (
            <TrimRow
              key={v.id}
              modelo={v}
              isDetail={v.id === detailId}
              inComparison={selectedIds.includes(v.id)}
              onSelect={() => onSelectTrim(v.id)}
              onToggleComparison={() => onToggleComparison(v.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CatalogoTab({ comparacion, onGoCompare }) {
  const [query, setQuery] = useState('')
  const [comb, setComb] = useState('Todos')
  const [tipo, setTipo] = useState('')
  const [precioMax, setPrecioMax] = useState(null)
  const [sort, setSort] = useState('precio-asc')
  const [detailId, setDetailId] = useState(null)
  const [expanded, setExpanded] = useState([])

  const filters = useMemo(() => ({
    tipo: tipo || undefined,
    combustible: comb === 'Todos' ? undefined : comb,
    precioMax: precioMax || undefined,
  }), [tipo, comb, precioMax])

  const { modelos, loading, error } = useModelos(filters)

  // Filtrar por búsqueda, luego agrupar por grupo_id
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = modelos.filter(m =>
      !q || `${m.marcas?.nombre ?? ''} ${m.nombre} ${m.version}`.toLowerCase().includes(q)
    )
    const byGroup = new Map()
    for (const m of rows) {
      const key = m.grupo_id ?? m.id
      if (!byGroup.has(key)) {
        byGroup.set(key, {
          grupo_id: key, marca: m.marcas?.nombre ?? '', nombre: m.nombre,
          tipo: m.tipo, versions: [],
        })
      }
      byGroup.get(key).versions.push(m)
    }
    const arr = [...byGroup.values()]
    arr.forEach(g => g.versions.sort((a, b) => precioOf(a) - precioOf(b)))
    arr.sort((a, b) => {
      const pa = Math.min(...a.versions.map(precioOf))
      const pb = Math.min(...b.versions.map(precioOf))
      if (sort === 'precio-asc')  return pa - pb
      if (sort === 'precio-desc') return pb - pa
      return `${a.marca} ${a.nombre}`.localeCompare(`${b.marca} ${b.nombre}`)
    })
    return arr
  }, [modelos, query, sort])

  function toggleExpand(gid) {
    setExpanded(prev => prev.includes(gid) ? prev.filter(g => g !== gid) : [...prev, gid])
  }

  const detailModelo = modelos.find(m => m.id === detailId) ?? null
  const { specsMap } = useSpecs(detailId ? [detailId] : [])
  const detailSpecs = detailId ? specsMap[detailId] : null

  // Versiones hermanas del modelo en detalle (para el switcher)
  const siblings = detailModelo
    ? modelos.filter(m => (m.grupo_id ?? m.id) === (detailModelo.grupo_id ?? detailModelo.id))
        .sort((a, b) => precioOf(a) - precioOf(b))
    : []

  const totalModelos = groups.reduce((n, g) => n + g.versions.length, 0)

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Buscar marca o modelo…"
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-slate-400"
          />
        </div>
        <select value={tipo} onChange={e => setTipo(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700">
          <option value="">Tipo</option>
          {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={precioMax ?? ''} onChange={e => setPrecioMax(e.target.value ? parseInt(e.target.value) : null)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700">
          {PRECIO_OPTS.map(o => <option key={o.label} value={o.value ?? ''}>{o.label}</option>)}
        </select>
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="text-sm border border-slate-200 rounded-lg px-2 py-2 bg-white text-slate-700">
            {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        {comparacion.selectedIds.length > 0 && (
          <button onClick={onGoCompare}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium">
            Comparar {comparacion.selectedIds.length} →
          </button>
        )}
      </div>

      {/* Chips combustible */}
      <div className="flex items-center gap-1.5 mb-5 flex-wrap">
        {COMB_FILTERS.map(f => {
          const active = comb === f
          const c = f !== 'Todos' ? COMB[f] : null
          return (
            <button key={f} onClick={() => setComb(f)}
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all border ${
                active ? 'bg-slate-700 text-white border-slate-700'
                  : c ? `${c.bg} ${c.fg} border-transparent`
                  : 'bg-slate-100 text-slate-500 border-transparent'
              }`}>
              {f === 'Todos' ? 'Todos' : c.label}
            </button>
          )
        })}
        <span className="text-[11px] text-slate-400 ml-auto">
          {groups.length} modelos · {totalModelos} versiones
        </span>
      </div>

      {loading && <p className="text-slate-400 text-sm">Cargando...</p>}
      {error && <p className="text-red-500 text-sm">Error cargando modelos</p>}

      {/* Master-detail */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 content-start">
          {groups.map(g => (
            <GroupCard
              key={g.grupo_id}
              group={g}
              expanded={expanded.includes(g.grupo_id)}
              detailId={detailId}
              selectedIds={comparacion.selectedIds}
              onToggleExpand={toggleExpand}
              onSelectTrim={setDetailId}
              onToggleComparison={comparacion.toggle}
            />
          ))}
          {!loading && !groups.length && (
            <p className="col-span-full text-slate-400 text-sm text-center py-12">
              No hay modelos para estos filtros.
            </p>
          )}
        </div>

        {/* Panel detalle — sticky desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-5 rounded-2xl bg-white shadow-lg shadow-slate-200/60 border border-slate-200 overflow-hidden"
            style={{ height: 'calc(100vh - 180px)' }}>
            <SpecDetailPanel
              modelo={detailModelo}
              specs={detailSpecs}
              siblings={siblings}
              onSwitchVersion={setDetailId}
              inComparison={detailId ? comparacion.selectedIds.includes(detailId) : false}
              onToggleComparison={() => detailId && comparacion.toggle(detailId)}
            />
          </div>
        </div>
      </div>

      {/* Detalle móvil — overlay */}
      {detailModelo && (
        <div className="lg:hidden fixed inset-0 z-30 flex items-end bg-slate-900/40" onClick={() => setDetailId(null)}>
          <div className="w-full bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: '88vh' }} onClick={e => e.stopPropagation()}>
            <SpecDetailPanel
              modelo={detailModelo}
              specs={detailSpecs}
              siblings={siblings}
              onSwitchVersion={setDetailId}
              inComparison={comparacion.selectedIds.includes(detailModelo.id)}
              onToggleComparison={() => comparacion.toggle(detailModelo.id)}
              onClose={() => setDetailId(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
