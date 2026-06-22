import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { useModelos } from '../hooks/useModelos'
import { useSpecs } from '../hooks/useSpecs'
import { fmtCLP } from '../utils/fmt'
import PreciosBadge from './PreciosBadge'

const SPEC_SECTIONS = [
  { key: 'motor',      label: '🔧 Motor',        fields: [['tipo','Tipo'],['cilindradaCC','Cilindrada (cc)'],['potenciaHP','Potencia (HP)'],['torqueNm','Torque (Nm)']] },
  { key: 'electrico',  label: '⚡ Eléctrico',     fields: [['autonomiaKm','Autonomía EV (km)'],['bateriaKwh','Batería (kWh)'],['cargaKw','Carga (kW)'],['tipoConector','Conector']] },
  { key: 'consumo',    label: '⛽ Consumo',       fields: [['ciudadL100','Ciudad (L/100km)'],['mixtoL100','Mixto (L/100km)'],['electricoKwh100','Eléctrico (kWh/100km)']] },
  { key: 'dimensiones',label: '📐 Dimensiones',   fields: [['largoMm','Largo (mm)'],['anchoMm','Ancho (mm)'],['altoMm','Alto (mm)'],['maleteroL','Maletero (L)']] },
  { key: 'seguridad',  label: '🛡️ Seguridad',    fields: [['ncapEstrellas','NCAP Estrellas'],['ncapBody','Organismo NCAP'],['airbags','Airbags']] },
  { key: 'confort',    label: '💺 Confort',       fields: [['climatizacion','Climatización'],['techo','Techo']] },
  { key: 'tech',       label: '📱 Tecnología',    fields: [['pantallaPulg','Pantalla (pulg)'],['androidAuto','Android Auto'],['carplay','CarPlay'],['sonido','Sistema de sonido']] },
  { key: 'garantia',   label: '📅 Garantía',      fields: [['vehiculoAnios','Vehículo (años)'],['motorAnios','Motor (años)'],['bateriaAnios','Batería (años)']] },
  { key: 'mantencion', label: '🔩 Mantención',    fields: [['anualCLP','Mantención anual ($)'],['intervaloKm','Intervalo (km)']] },
]

function Section({ section, datos }) {
  const [open, setOpen] = useState(false)
  const s = datos?.[section.key]
  if (!s) return null

  const adas = section.key === 'seguridad' && datos.seguridad?.adas

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <span>{section.label}</span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {open && (
        <div className="px-4 pb-3 space-y-2">
          {section.fields.map(([field, label]) => s[field] != null && (
            <div key={field} className="flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium text-slate-700 font-mono text-xs">
                {field === 'anualCLP' ? fmtCLP(s[field])
                  : typeof s[field] === 'boolean' ? (s[field] ? '✓' : '✗')
                  : s[field]}
              </span>
            </div>
          ))}
          {adas?.length > 0 && (
            <div>
              <p className="text-slate-500 text-xs mb-1">ADAS</p>
              <div className="flex flex-wrap gap-1">
                {adas.map(f => (
                  <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{f}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function FichaTecnicaTab() {
  const [modeloId, setModeloId] = useState('')
  const { modelos } = useModelos({})
  const { specsMap } = useSpecs(modeloId ? [modeloId] : [])

  const modelo = modelos.find(m => m.id === modeloId)
  const specs = specsMap[modeloId]

  return (
    <div className="max-w-2xl">
      <select
        value={modeloId}
        onChange={e => setModeloId(e.target.value)}
        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 mb-6"
      >
        <option value="">Seleccionar modelo...</option>
        {modelos.map(m => (
          <option key={m.id} value={m.id}>
            {m.marcas?.nombre} {m.nombre} {m.version} {m.año}
          </option>
        ))}
      </select>

      {modelo && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide">{modelo.marcas?.nombre}</p>
            <h2 className="text-xl font-semibold text-slate-800">{modelo.nombre} {modelo.version}</h2>
            <p className="text-slate-500 text-sm mb-3">{modelo.año} · {modelo.tipo} · {modelo.combustible}</p>
            <PreciosBadge modelo={modelo} />
            {modelo.url_fuente && (
              <a href={modelo.url_fuente} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-blue-500 hover:underline">
                Ver fuente <ExternalLink size={12} />
              </a>
            )}
          </div>

          {specs
            ? SPEC_SECTIONS.map(s => <Section key={s.key} section={s} datos={specs.datos} />)
            : <p className="text-slate-400 text-sm">No hay specs cargados para este modelo.</p>
          }
        </div>
      )}
    </div>
  )
}
