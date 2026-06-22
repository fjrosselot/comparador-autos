import { fmtCLP } from '../utils/fmt'
import PreciosBadge from './PreciosBadge'

const COMBUSTIBLE_COLORS = {
  PHEV: 'bg-green-100 text-green-700',
  BEV:  'bg-blue-100 text-blue-700',
  HEV:  'bg-teal-100 text-teal-700',
  gasolina: 'bg-slate-100 text-slate-600',
}

const RECENT_DAYS = 7

function isRecent(scrapeado_at) {
  if (!scrapeado_at) return false
  const diffMs = Date.now() - new Date(scrapeado_at).getTime()
  return diffMs < RECENT_DAYS * 24 * 60 * 60 * 1000
}

export default function ModelCard({ modelo, selected, onToggle }) {
  const marca = modelo.marcas?.nombre ?? ''

  return (
    <div
      onClick={onToggle}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
        selected
          ? 'border-blue-400 bg-blue-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide">{marca}</p>
          <p className="font-semibold text-slate-800">{modelo.nombre}</p>
          <p className="text-xs text-slate-500">{modelo.version} · {modelo.año}</p>
        </div>
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          onClick={e => e.stopPropagation()}
          className="w-4 h-4 accent-blue-500"
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${COMBUSTIBLE_COLORS[modelo.combustible] ?? 'bg-slate-100 text-slate-600'}`}>
          {modelo.combustible}
        </span>
        <span className="text-xs text-slate-400">{modelo.tipo}</span>
        {isRecent(modelo.scrapeado_at) && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">nuevo</span>
        )}
      </div>

      <PreciosBadge modelo={modelo} />
    </div>
  )
}
