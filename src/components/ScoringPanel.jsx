import { useState } from 'react'
import { SCORING_CRITERIA, DEFAULT_WEIGHTS } from '../constants'

const PRESETS = {
  'Balanceado':        DEFAULT_WEIGHTS,
  'Precio mínimo':     { precio: 40, tco5: 35, ev_range: 5, seguridad: 10, maletero: 2, reventa: 5, potencia: 2, garantia: 1 },
  'Máximo EV':         { precio: 10, tco5: 15, ev_range: 40, seguridad: 15, maletero: 5, reventa: 8, potencia: 5, garantia: 2 },
  'Reventa segura':    { precio: 15, tco5: 20, ev_range: 10, seguridad: 15, maletero: 5, reventa: 30, potencia: 3, garantia: 2 },
  'Familia+Seguridad': { precio: 15, tco5: 20, ev_range: 10, seguridad: 30, maletero: 15, reventa: 5, potencia: 3, garantia: 2 },
}

export default function ScoringPanel({ weights, onChange }) {
  const [customName, setCustomName] = useState('')
  const [saved, setSaved] = useState({})

  const allPresets = { ...PRESETS, ...saved }

  function applyPreset(name) {
    onChange(allPresets[name])
  }

  function saveCustom() {
    if (!customName.trim()) return
    setSaved(prev => ({ ...prev, [customName.trim()]: { ...weights } }))
    setCustomName('')
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
      <div>
        <p className="text-xs font-medium text-slate-500 mb-2">PRESETS</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(allPresets).map(name => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {SCORING_CRITERIA.map(({ id, label }) => (
          <div key={id} className="flex items-center gap-3">
            <span className="text-xs text-slate-600 w-28 shrink-0">{label}</span>
            <input
              type="range" min={0} max={50} value={weights[id] ?? 0}
              onChange={e => onChange({ ...weights, [id]: parseInt(e.target.value) })}
              className="flex-1 accent-blue-500"
            />
            <span className="text-xs font-mono text-slate-500 w-6 text-right">{weights[id] ?? 0}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={customName}
          onChange={e => setCustomName(e.target.value)}
          placeholder="Guardar como..."
          className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-1.5"
        />
        <button
          onClick={saveCustom}
          className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
        >
          Guardar
        </button>
      </div>
    </div>
  )
}
