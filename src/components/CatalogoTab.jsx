import { useState } from 'react'
import { useModelos } from '../hooks/useModelos'
import ModelCard from './ModelCard'

const TIPOS = ['SUV', 'sedan', 'hatchback', 'pickup', 'van']
const COMBUSTIBLES = ['gasolina', 'HEV', 'PHEV', 'BEV']
const PRECIO_OPTS = [
  { label: 'Todos', value: null },
  { label: 'Hasta $20M', value: 20_000_000 },
  { label: 'Hasta $25M', value: 25_000_000 },
  { label: 'Hasta $30M', value: 30_000_000 },
  { label: 'Hasta $35M', value: 35_000_000 },
]

export default function CatalogoTab({ comparacion, onGoCompare }) {
  const [filters, setFilters] = useState({})
  const { modelos, loading, error } = useModelos(filters)

  function setFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value || undefined }))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          onChange={e => setFilter('tipo', e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
        >
          <option value="">Tipo</option>
          {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select
          onChange={e => setFilter('combustible', e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
        >
          <option value="">Combustible</option>
          {COMBUSTIBLES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          onChange={e => setFilter('precioMax', e.target.value ? parseInt(e.target.value) : null)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700"
        >
          {PRECIO_OPTS.map(o => <option key={o.label} value={o.value ?? ''}>{o.label}</option>)}
        </select>

        {comparacion.selectedIds.length > 0 && (
          <button
            onClick={onGoCompare}
            className="ml-auto bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-medium"
          >
            Comparar {comparacion.selectedIds.length} modelo{comparacion.selectedIds.length > 1 ? 's' : ''} →
          </button>
        )}
      </div>

      {loading && <p className="text-slate-400 text-sm">Cargando...</p>}
      {error && <p className="text-red-500 text-sm">Error cargando modelos</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {modelos.map(m => (
          <ModelCard
            key={m.id}
            modelo={m}
            selected={comparacion.selectedIds.includes(m.id)}
            onToggle={() => comparacion.toggle(m.id)}
          />
        ))}
      </div>

      {!loading && !modelos.length && (
        <p className="text-slate-400 text-sm text-center py-12">
          No hay modelos. Pide a Claude que scrapee algunos autos.
        </p>
      )}
    </div>
  )
}
