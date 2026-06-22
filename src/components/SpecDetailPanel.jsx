import {
  ExternalLink, Gauge, Fuel, Ruler, Shield, Calendar,
  BatteryCharging, TrendingDown, Zap, X, Plus, Check,
} from 'lucide-react'
import { fmtCLP } from '../utils/fmt'

const COMB = {
  PHEV:     { bg: 'bg-green-100', fg: 'text-green-700', label: 'PHEV' },
  BEV:      { bg: 'bg-blue-100',  fg: 'text-blue-700',  label: 'BEV' },
  HEV:      { bg: 'bg-teal-100',  fg: 'text-teal-700',  label: 'HEV' },
  gasolina: { bg: 'bg-slate-100', fg: 'text-slate-600', label: 'Gasolina' },
}

function StatTile({ icon: Icon, label, value, accent }) {
  return (
    <div className={`rounded-xl px-3 py-2.5 border ${accent ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3 h-3 ${accent ? 'text-amber-600' : 'text-slate-400'}`} />
        <span className="text-[10px] uppercase tracking-wide text-slate-400">{label}</span>
      </div>
      <p className="text-[15px] font-bold leading-none text-slate-800">{value}</p>
    </div>
  )
}

function Row({ label, value }) {
  if (value == null || value === '') return null
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-xs font-semibold font-mono text-slate-700">{value}</span>
    </div>
  )
}

function Group({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50">
        <Icon className="w-3.5 h-3.5 text-slate-700" />
        <span className="text-xs font-bold text-slate-700">{title}</span>
      </div>
      <div className="px-3.5 py-1.5">{children}</div>
    </div>
  )
}

export default function SpecDetailPanel({ modelo, specs, inComparison, onToggleComparison, onClose }) {
  if (!modelo) {
    return (
      <div className="flex items-center justify-center h-full px-6 text-center">
        <p className="text-sm text-slate-400">Selecciona un modelo para ver su ficha técnica</p>
      </div>
    )
  }

  const c = COMB[modelo.combustible] ?? COMB.gasolina
  const d = specs?.datos
  const ev = ['BEV', 'PHEV', 'HEV'].includes(modelo.combustible)
  const stars = d?.seguridad?.ncapEstrellas

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate-400">{modelo.marcas?.nombre}</p>
            <h2 className="text-xl font-semibold leading-tight text-slate-800">{modelo.nombre}</h2>
            <p className="text-sm text-slate-500">{modelo.version} · {modelo.año}</p>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg bg-slate-100">
              <X className="w-4 h-4 text-slate-700" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${c.bg} ${c.fg}`}>{c.label}</span>
          <span className="text-xl font-bold ml-auto text-slate-800">{fmtCLP(modelo.precio_contado ?? modelo.precio_lista)}</span>
        </div>
        <button
          onClick={onToggleComparison}
          className={`flex items-center justify-center gap-2 w-full mt-3 py-2 rounded-xl text-[13px] font-semibold transition-colors ${
            inComparison
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {inComparison ? <><Check className="w-3.5 h-3.5" /> En comparación</> : <><Plus className="w-3.5 h-3.5" /> Agregar a comparación</>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {!d && <p className="text-sm text-slate-400">No hay specs cargados para este modelo.</p>}
        {d && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {d.motor?.potenciaHP != null && <StatTile icon={Gauge} label="Potencia" value={`${d.motor.potenciaHP} HP`} />}
              {d.motor?.torqueNm != null && <StatTile icon={Zap} label="Torque" value={`${d.motor.torqueNm} Nm`} />}
              {ev && d.electrico?.autonomiaKm
                ? <StatTile icon={BatteryCharging} label="Autonomía EV" value={`${d.electrico.autonomiaKm} km`} accent />
                : d.consumo?.mixtoL100 != null && <StatTile icon={Fuel} label="Consumo" value={`${d.consumo.mixtoL100} L`} />}
              {d.reventa?.pct5yr != null && <StatTile icon={TrendingDown} label="Reventa 5a" value={`${Math.round(d.reventa.pct5yr * 100)}%`} accent />}
            </div>

            {d.motor && (
              <Group icon={Gauge} title="Motor">
                <Row label="Tipo" value={d.motor.tipo} />
                <Row label="Potencia" value={d.motor.potenciaHP != null ? `${d.motor.potenciaHP} HP` : null} />
                <Row label="Torque" value={d.motor.torqueNm != null ? `${d.motor.torqueNm} Nm` : null} />
                <Row label="Cilindrada" value={d.motor.cilindradaCC != null ? `${d.motor.cilindradaCC} cc` : null} />
                <Row label="Tracción" value={d.motor.traccion} />
                <Row label="Transmisión" value={d.motor.transmision} />
              </Group>
            )}

            {ev && d.electrico && (
              <Group icon={BatteryCharging} title="Eléctrico">
                <Row label="Batería" value={d.electrico.bateriaKwh != null ? `${d.electrico.bateriaKwh} kWh` : null} />
                <Row label="Autonomía EV" value={d.electrico.autonomiaKm != null ? `${d.electrico.autonomiaKm} km` : null} />
                <Row label="Consumo eléctrico" value={d.consumo?.electricoKwh100 != null ? `${d.consumo.electricoKwh100} kWh/100km` : null} />
              </Group>
            )}

            {d.consumo && (
              <Group icon={Fuel} title="Consumo">
                <Row label="Mixto" value={d.consumo.mixtoL100 != null ? `${d.consumo.mixtoL100} L/100km` : null} />
                <Row label="Ciudad" value={d.consumo.ciudadL100 != null ? `${d.consumo.ciudadL100} L/100km` : null} />
                <Row label="Eléctrico" value={d.consumo.electricoKwh100 != null ? `${d.consumo.electricoKwh100} kWh/100km` : null} />
              </Group>
            )}

            {d.dimensiones && (
              <Group icon={Ruler} title="Dimensiones">
                <Row label="Largo" value={d.dimensiones.largoMm != null ? `${d.dimensiones.largoMm} mm` : null} />
                <Row label="Ancho" value={d.dimensiones.anchoMm != null ? `${d.dimensiones.anchoMm} mm` : null} />
                <Row label="Alto" value={d.dimensiones.altoMm != null ? `${d.dimensiones.altoMm} mm` : null} />
                <Row label="Maletero" value={d.dimensiones.maleteroL != null ? `${d.dimensiones.maleteroL} L` : null} />
              </Group>
            )}

            {d.seguridad && (
              <Group icon={Shield} title="Seguridad">
                <Row label="NCAP" value={stars != null ? `${'★'.repeat(stars)}${d.seguridad.ncapBody ? ` (${d.seguridad.ncapBody})` : ''}` : null} />
                <Row label="Airbags" value={d.seguridad.airbags != null ? `${d.seguridad.airbags}` : null} />
              </Group>
            )}

            {(d.garantia || d.reventa) && (
              <Group icon={Calendar} title="Garantía & Reventa">
                <Row label="Garantía" value={d.garantia?.vehiculoAnios != null ? `${d.garantia.vehiculoAnios} años` : null} />
                <Row label="Valor reventa 5 años" value={d.reventa?.pct5yr != null ? `${Math.round(d.reventa.pct5yr * 100)}%` : null} />
              </Group>
            )}
          </>
        )}

        {modelo.url_fuente && (
          <a href={modelo.url_fuente} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[13px] font-semibold bg-slate-700 text-white hover:bg-slate-800 transition-colors no-underline">
            Ver en sitio oficial <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  )
}
