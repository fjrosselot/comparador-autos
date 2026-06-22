import { useState, useMemo } from 'react'
import {
  Search, ExternalLink, Check, Gauge, Fuel, Ruler, Shield, Calendar,
  BatteryCharging, TrendingDown, Zap, X, SlidersHorizontal,
} from 'lucide-react'

const N = '#162844'
const G = '#e8c547'
const S = '#94b0cc'

const COMB: Record<string, { bg: string; fg: string; label: string }> = {
  PHEV:     { bg: '#dcfce7', fg: '#15803d', label: 'PHEV' },
  BEV:      { bg: '#dbeafe', fg: '#1d4ed8', label: 'BEV' },
  HEV:      { bg: '#ccfbf1', fg: '#0f766e', label: 'HEV' },
  gasolina: { bg: '#f1f5f9', fg: '#475569', label: 'Gasolina' },
}

type Car = {
  id: string
  marca: string
  modelo: string
  version: string
  año: number
  comb: keyof typeof COMB
  precio: number
  url: string
  d: {
    motor: { tipo: string; potenciaHP: number; torqueNm: number; cilindradaCC?: number; traccion: string; transmision: string }
    electrico?: { bateriaKwh?: number; autonomiaKm?: number }
    consumo: { mixtoL100?: number; electricoKwh100?: number }
    dimensiones: { largoMm: number; anchoMm: number; altoMm: number }
    seguridad: { airbags: number; ncapEstrellas?: number; ncapBody?: string }
    garantia: { vehiculoAnios: number }
    reventa: { pct5yr: number }
  }
}

const CARS: Car[] = [
  {
    id: '1', marca: 'KIA', modelo: 'Sportage', version: 'HEV', año: 2025, comb: 'HEV',
    precio: 30990000, url: 'https://www.kia.com/cl/cars/all-vehicles.html',
    d: {
      motor: { tipo: '1.6L · 6DCT · AWD', potenciaHP: 230, torqueNm: 265, cilindradaCC: 1598, traccion: 'AWD', transmision: '6DCT' },
      electrico: { bateriaKwh: 1.5 },
      consumo: { mixtoL100: 5.5 },
      dimensiones: { largoMm: 4515, anchoMm: 1865, altoMm: 1665 },
      seguridad: { airbags: 6, ncapEstrellas: 5, ncapBody: 'Latin NCAP' },
      garantia: { vehiculoAnios: 5 }, reventa: { pct5yr: 0.65 },
    },
  },
  {
    id: '2', marca: 'Toyota', modelo: 'RAV4', version: 'Hybrid', año: 2025, comb: 'HEV',
    precio: 38990000, url: 'https://www.toyota.cl',
    d: {
      motor: { tipo: '2.5L Atkinson + e-Motor', potenciaHP: 222, torqueNm: 221, cilindradaCC: 2487, traccion: 'AWD', transmision: 'e-CVT' },
      electrico: { bateriaKwh: 1.6 },
      consumo: { mixtoL100: 5.0 },
      dimensiones: { largoMm: 4600, anchoMm: 1855, altoMm: 1685 },
      seguridad: { airbags: 7, ncapEstrellas: 5, ncapBody: 'Euro NCAP' },
      garantia: { vehiculoAnios: 3 }, reventa: { pct5yr: 0.68 },
    },
  },
  {
    id: '3', marca: 'BYD', modelo: 'Song Plus', version: 'DM-i GX', año: 2025, comb: 'PHEV',
    precio: 28990000, url: 'https://www.byd.com/cl',
    d: {
      motor: { tipo: '1.5L · CVT-e · FWD', potenciaHP: 204, torqueNm: 315, cilindradaCC: 1498, traccion: 'FWD', transmision: 'CVT-e' },
      electrico: { bateriaKwh: 15.5, autonomiaKm: 100 },
      consumo: { mixtoL100: 1.5 },
      dimensiones: { largoMm: 4705, anchoMm: 1890, altoMm: 1680 },
      seguridad: { airbags: 8, ncapEstrellas: 5, ncapBody: 'Latin NCAP' },
      garantia: { vehiculoAnios: 6 }, reventa: { pct5yr: 0.53 },
    },
  },
  {
    id: '4', marca: 'Haval', modelo: 'Jolion', version: 'Gasolina', año: 2025, comb: 'gasolina',
    precio: 12490000, url: 'https://www.gwm.cl/haval/',
    d: {
      motor: { tipo: '1.5L · 7DCT · FWD', potenciaHP: 147, torqueNm: 220, cilindradaCC: 1497, traccion: 'FWD', transmision: '7DCT' },
      consumo: { mixtoL100: 7.5 },
      dimensiones: { largoMm: 4472, anchoMm: 1842, altoMm: 1628 },
      seguridad: { airbags: 6, ncapEstrellas: 5, ncapBody: 'ANCAP' },
      garantia: { vehiculoAnios: 7 }, reventa: { pct5yr: 0.48 },
    },
  },
  {
    id: '5', marca: 'Mazda', modelo: 'CX-5', version: '2.0L', año: 2025, comb: 'gasolina',
    precio: 22690000, url: 'https://www.mazda.cl',
    d: {
      motor: { tipo: '2.0L · 6AT · FWD', potenciaHP: 165, torqueNm: 213, cilindradaCC: 1998, traccion: 'FWD', transmision: '6AT' },
      consumo: { mixtoL100: 7.5 },
      dimensiones: { largoMm: 4550, anchoMm: 1840, altoMm: 1680 },
      seguridad: { airbags: 7, ncapEstrellas: 5, ncapBody: 'Latin NCAP' },
      garantia: { vehiculoAnios: 3 }, reventa: { pct5yr: 0.68 },
    },
  },
  {
    id: '6', marca: 'Hyundai', modelo: 'Tucson', version: 'Premium Plus', año: 2025, comb: 'gasolina',
    precio: 21490000, url: 'https://www.hyundai.cl',
    d: {
      motor: { tipo: '2.0L · 6AT · FWD', potenciaHP: 155, torqueNm: 192, cilindradaCC: 1999, traccion: 'FWD', transmision: '6AT' },
      consumo: { mixtoL100: 8.2 },
      dimensiones: { largoMm: 4630, anchoMm: 1865, altoMm: 1665 },
      seguridad: { airbags: 6, ncapEstrellas: 5, ncapBody: 'Euro NCAP' },
      garantia: { vehiculoAnios: 5 }, reventa: { pct5yr: 0.58 },
    },
  },
  {
    id: '7', marca: 'BYD', modelo: 'YUAN PLUS', version: 'BEV', año: 2025, comb: 'BEV',
    precio: 29990000, url: 'https://www.byd.com/cl',
    d: {
      motor: { tipo: 'Eléctrico · 1AT · FWD', potenciaHP: 204, torqueNm: 310, traccion: 'FWD', transmision: '1AT' },
      electrico: { bateriaKwh: 60.5, autonomiaKm: 420 },
      consumo: { electricoKwh100: 15.1 },
      dimensiones: { largoMm: 4455, anchoMm: 1875, altoMm: 1615 },
      seguridad: { airbags: 6, ncapEstrellas: 5, ncapBody: 'Euro NCAP' },
      garantia: { vehiculoAnios: 6 }, reventa: { pct5yr: 0.50 },
    },
  },
  {
    id: '8', marca: 'Nissan', modelo: 'X-Trail', version: 'e-POWER', año: 2025, comb: 'HEV',
    precio: 29990000, url: 'https://www.nissan.cl',
    d: {
      motor: { tipo: '1.5L · e-CVT · e-4WD', potenciaHP: 213, torqueNm: 330, cilindradaCC: 1497, traccion: 'e-4WD', transmision: 'e-CVT' },
      consumo: { mixtoL100: 6.0 },
      dimensiones: { largoMm: 4660, anchoMm: 1840, altoMm: 1720 },
      seguridad: { airbags: 6, ncapEstrellas: 5, ncapBody: 'Global NCAP' },
      garantia: { vehiculoAnios: 3 }, reventa: { pct5yr: 0.63 },
    },
  },
  {
    id: '9', marca: 'Chevrolet', modelo: 'Tracker', version: 'LTZ', año: 2025, comb: 'gasolina',
    precio: 18490000, url: 'https://www.chevrolet.cl/suvs',
    d: {
      motor: { tipo: '1.2L Turbo · 9AT · AWD', potenciaHP: 153, torqueNm: 230, cilindradaCC: 1199, traccion: 'AWD', transmision: '9AT' },
      consumo: { mixtoL100: 7.5 },
      dimensiones: { largoMm: 4375, anchoMm: 1809, altoMm: 1634 },
      seguridad: { airbags: 6, ncapEstrellas: 4, ncapBody: 'Latin NCAP' },
      garantia: { vehiculoAnios: 3 }, reventa: { pct5yr: 0.52 },
    },
  },
  {
    id: '10', marca: 'Mitsubishi', modelo: 'Outlander', version: 'PHEV', año: 2025, comb: 'PHEV',
    precio: 39990000, url: 'https://www.mitsubishi-motors.cl',
    d: {
      motor: { tipo: '2.4L · CVT-e · AWD', potenciaHP: 302, torqueNm: 332, cilindradaCC: 2360, traccion: 'AWD', transmision: 'CVT-e' },
      electrico: { bateriaKwh: 20, autonomiaKm: 84 },
      consumo: { mixtoL100: 1.6 },
      dimensiones: { largoMm: 4710, anchoMm: 1860, altoMm: 1745 },
      seguridad: { airbags: 7, ncapEstrellas: 5, ncapBody: 'Global NCAP' },
      garantia: { vehiculoAnios: 3 }, reventa: { pct5yr: 0.57 },
    },
  },
  {
    id: '11', marca: 'Deepal', modelo: 'S07', version: 'REEV', año: 2025, comb: 'PHEV',
    precio: 34990000, url: 'https://www.deepalautos.cl',
    d: {
      motor: { tipo: '1.5L · CVT-e · FWD', potenciaHP: 231, torqueNm: 350, cilindradaCC: 1497, traccion: 'FWD', transmision: 'CVT-e' },
      electrico: { bateriaKwh: 40, autonomiaKm: 200 },
      consumo: { mixtoL100: 0.9 },
      dimensiones: { largoMm: 4775, anchoMm: 1930, altoMm: 1625 },
      seguridad: { airbags: 8 },
      garantia: { vehiculoAnios: 6 }, reventa: { pct5yr: 0.50 },
    },
  },
  {
    id: '12', marca: 'Haval', modelo: 'Tank 300', version: '4WD', año: 2025, comb: 'gasolina',
    precio: 29990000, url: 'https://www.gwm.cl/haval/',
    d: {
      motor: { tipo: '2.0L Turbo · 8AT · 4WD', potenciaHP: 221, torqueNm: 387, cilindradaCC: 1999, traccion: '4WD', transmision: '8AT' },
      consumo: { mixtoL100: 10.5 },
      dimensiones: { largoMm: 4760, anchoMm: 1930, altoMm: 1890 },
      seguridad: { airbags: 6, ncapEstrellas: 5, ncapBody: 'ANCAP' },
      garantia: { vehiculoAnios: 7 }, reventa: { pct5yr: 0.47 },
    },
  },
]

const fmtCLP = (n: number) => '$' + n.toLocaleString('es-CL')

const TIPOS = ['Todos', 'gasolina', 'HEV', 'PHEV', 'BEV'] as const
const SORTS = [
  { id: 'precio-asc', label: 'Precio ↑' },
  { id: 'precio-desc', label: 'Precio ↓' },
  { id: 'reventa', label: 'Reventa' },
  { id: 'potencia', label: 'Potencia' },
] as const

function StatTile({ icon: Icon, label, value, accent }: { icon: typeof Gauge; label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: accent ? 'rgba(232,197,71,0.12)' : '#F8FAFC', border: `1px solid ${accent ? 'rgba(232,197,71,0.4)' : '#E8EEF4'}` }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3" style={{ color: accent ? '#b8952a' : S }} />
        <span className="font-inter text-[10px] uppercase tracking-wide" style={{ color: S }}>{label}</span>
      </div>
      <p className="font-manrope text-[15px] font-bold leading-none" style={{ color: N }}>{value}</p>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#F0F4F8] last:border-0">
      <span className="font-inter text-[12px]" style={{ color: S }}>{label}</span>
      <span className="font-inter text-[12px] font-semibold font-mono" style={{ color: N }}>{value}</span>
    </div>
  )
}

function SpecGroup({ icon: Icon, title, children }: { icon: typeof Gauge; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white border border-[#E8EEF4] overflow-hidden">
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-[#F0F4F8]" style={{ background: '#FAFBFC' }}>
        <Icon className="h-3.5 w-3.5" style={{ color: N }} />
        <span className="font-manrope text-[12px] font-bold" style={{ color: N }}>{title}</span>
      </div>
      <div className="px-3.5 py-1.5">{children}</div>
    </div>
  )
}

function Detail({ car, onClose }: { car: Car; onClose: () => void }) {
  const c = COMB[car.comb]
  const ev = car.comb === 'BEV' || car.comb === 'PHEV' || car.comb === 'HEV'
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 pt-5 pb-4 border-b border-[#F0F4F8]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-inter text-[11px] uppercase tracking-widest" style={{ color: S }}>{car.marca}</p>
            <h2 className="font-manrope text-[22px] font-bold leading-tight" style={{ color: N }}>{car.modelo}</h2>
            <p className="font-inter text-[13px]" style={{ color: S }}>{car.version} · {car.año}</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg" style={{ background: '#F0F4F8' }}>
            <X className="h-4 w-4" style={{ color: N }} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="font-inter text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.fg }}>{c.label}</span>
          <span className="font-manrope text-[20px] font-bold ml-auto" style={{ color: N }}>{fmtCLP(car.precio)}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <StatTile icon={Gauge} label="Potencia" value={`${car.d.motor.potenciaHP} HP`} />
          <StatTile icon={Zap} label="Torque" value={`${car.d.motor.torqueNm} Nm`} />
          {ev && car.d.electrico?.autonomiaKm
            ? <StatTile icon={BatteryCharging} label="Autonomía EV" value={`${car.d.electrico.autonomiaKm} km`} accent />
            : <StatTile icon={Fuel} label="Consumo" value={`${car.d.consumo.mixtoL100} L`} />}
          <StatTile icon={TrendingDown} label="Reventa 5a" value={`${Math.round(car.d.reventa.pct5yr * 100)}%`} accent />
        </div>

        <SpecGroup icon={Gauge} title="Motor">
          <SpecRow label="Tipo" value={car.d.motor.tipo} />
          <SpecRow label="Potencia" value={`${car.d.motor.potenciaHP} HP`} />
          <SpecRow label="Torque" value={`${car.d.motor.torqueNm} Nm`} />
          {car.d.motor.cilindradaCC && <SpecRow label="Cilindrada" value={`${car.d.motor.cilindradaCC} cc`} />}
          <SpecRow label="Tracción" value={car.d.motor.traccion} />
          <SpecRow label="Transmisión" value={car.d.motor.transmision} />
        </SpecGroup>

        {ev && (
          <SpecGroup icon={BatteryCharging} title="Eléctrico">
            {car.d.electrico?.bateriaKwh != null && <SpecRow label="Batería" value={`${car.d.electrico.bateriaKwh} kWh`} />}
            {car.d.electrico?.autonomiaKm != null && <SpecRow label="Autonomía EV" value={`${car.d.electrico.autonomiaKm} km`} />}
            {car.d.consumo.electricoKwh100 != null && <SpecRow label="Consumo eléctrico" value={`${car.d.consumo.electricoKwh100} kWh/100km`} />}
          </SpecGroup>
        )}

        <SpecGroup icon={Fuel} title="Consumo">
          {car.d.consumo.mixtoL100 != null && <SpecRow label="Mixto" value={`${car.d.consumo.mixtoL100} L/100km`} />}
          {car.d.consumo.electricoKwh100 != null && <SpecRow label="Eléctrico" value={`${car.d.consumo.electricoKwh100} kWh/100km`} />}
        </SpecGroup>

        <SpecGroup icon={Ruler} title="Dimensiones">
          <SpecRow label="Largo" value={`${car.d.dimensiones.largoMm} mm`} />
          <SpecRow label="Ancho" value={`${car.d.dimensiones.anchoMm} mm`} />
          <SpecRow label="Alto" value={`${car.d.dimensiones.altoMm} mm`} />
        </SpecGroup>

        <SpecGroup icon={Shield} title="Seguridad">
          {car.d.seguridad.ncapEstrellas != null && <SpecRow label="NCAP" value={`${'★'.repeat(car.d.seguridad.ncapEstrellas)} (${car.d.seguridad.ncapBody})`} />}
          <SpecRow label="Airbags" value={`${car.d.seguridad.airbags}`} />
        </SpecGroup>

        <SpecGroup icon={Calendar} title="Garantía & Reventa">
          <SpecRow label="Garantía" value={`${car.d.garantia.vehiculoAnios} años`} />
          <SpecRow label="Valor reventa 5 años" value={`${Math.round(car.d.reventa.pct5yr * 100)}%`} />
        </SpecGroup>

        <a href={car.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-inter text-[13px] font-semibold"
          style={{ background: N, color: 'white', textDecoration: 'none' }}>
          Ver en sitio oficial <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}

export default function CatalogoDetalle() {
  const [query, setQuery] = useState('')
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Todos')
  const [sort, setSort] = useState<(typeof SORTS)[number]['id']>('precio-asc')
  const [selId, setSelId] = useState<string>('1')

  const list = useMemo(() => {
    let r = CARS.filter(c => {
      const q = query.toLowerCase()
      const matchQ = !q || `${c.marca} ${c.modelo} ${c.version}`.toLowerCase().includes(q)
      const matchT = tipo === 'Todos' || c.comb === tipo
      return matchQ && matchT
    })
    r = [...r].sort((a, b) => {
      if (sort === 'precio-asc') return a.precio - b.precio
      if (sort === 'precio-desc') return b.precio - a.precio
      if (sort === 'reventa') return b.d.reventa.pct5yr - a.d.reventa.pct5yr
      return b.d.motor.potenciaHP - a.d.motor.potenciaHP
    })
    return r
  }, [query, tipo, sort])

  const selected = CARS.find(c => c.id === selId) ?? null

  return (
    <div className="min-h-screen" style={{ background: '#F0F4F8' }}>
      {/* Header */}
      <div className="bg-white border-b border-[#E8EEF4] shadow-[0_2px_8px_rgba(13,27,42,0.05)] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-5 py-3.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-manrope text-[17px] font-bold whitespace-nowrap" style={{ color: N }}>
              Comparador de Autos <span className="font-inter text-[11px] font-normal" style={{ color: S }}>v0.2</span>
            </h1>
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: S }} />
              <input
                value={query} onChange={e => setQuery(e.target.value)}
                placeholder="Buscar marca o modelo…"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E0E8F0] bg-[#F8FAFC] font-inter text-[13px] outline-none focus:border-[#94b0cc]"
                style={{ color: N }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5" style={{ color: S }} />
              <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
                className="font-inter text-[12px] rounded-lg border border-[#E0E8F0] bg-white px-2 py-1.5 outline-none" style={{ color: N }}>
                {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
            {TIPOS.map(t => {
              const active = tipo === t
              const c = t !== 'Todos' ? COMB[t] : null
              return (
                <button key={t} onClick={() => setTipo(t)}
                  className="font-inter text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all"
                  style={{
                    background: active ? N : (c ? c.bg : '#F0F4F8'),
                    color: active ? 'white' : (c ? c.fg : S),
                    border: `1px solid ${active ? N : 'transparent'}`,
                  }}>
                  {t === 'Todos' ? 'Todos' : c!.label}
                </button>
              )
            })}
            <span className="font-inter text-[11px] ml-auto" style={{ color: S }}>{list.length} modelos</span>
          </div>
        </div>
      </div>

      {/* Master-detail */}
      <div className="max-w-6xl mx-auto px-5 py-5 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">
          {list.map(car => {
            const c = COMB[car.comb]
            const active = car.id === selId
            return (
              <button key={car.id} onClick={() => setSelId(car.id)}
                className="text-left rounded-2xl p-4 transition-all bg-white"
                style={{
                  border: `2px solid ${active ? G : '#E8EEF4'}`,
                  boxShadow: active ? '0 6px 20px rgba(232,197,71,0.18)' : '0 2px 8px rgba(13,27,42,0.05)',
                }}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-inter text-[10px] uppercase tracking-widest" style={{ color: S }}>{car.marca}</p>
                    <p className="font-manrope text-[15px] font-bold leading-tight" style={{ color: N }}>{car.modelo}</p>
                    <p className="font-inter text-[11px]" style={{ color: S }}>{car.version} · {car.año}</p>
                  </div>
                  {active && (
                    <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: G }}>
                      <Check className="h-3 w-3" style={{ color: N }} strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-2.5">
                  <span className="font-inter text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.fg }}>{c.label}</span>
                  <span className="flex items-center gap-1 font-inter text-[10px]" style={{ color: S }}>
                    <Gauge className="h-2.5 w-2.5" />{car.d.motor.potenciaHP} HP
                  </span>
                  <span className="flex items-center gap-1 font-inter text-[10px]" style={{ color: S }}>
                    <TrendingDown className="h-2.5 w-2.5" />{Math.round(car.d.reventa.pct5yr * 100)}%
                  </span>
                </div>
                <p className="font-manrope text-[16px] font-bold mt-2.5" style={{ color: N }}>{fmtCLP(car.precio)}</p>
              </button>
            )
          })}
          {list.length === 0 && (
            <p className="col-span-full text-center font-inter text-[13px] py-12" style={{ color: S }}>Sin resultados</p>
          )}
        </div>

        {/* Detail panel — sticky on desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-[112px] rounded-2xl bg-white shadow-[0_4px_20px_rgba(13,27,42,0.08)] overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
            {selected
              ? <Detail car={selected} onClose={() => setSelId('')} />
              : <div className="flex items-center justify-center h-full px-6 text-center">
                  <p className="font-inter text-[13px]" style={{ color: S }}>Selecciona un modelo para ver su ficha técnica</p>
                </div>}
          </div>
        </div>
      </div>

      {/* Mobile detail overlay */}
      {selected && (
        <div className="lg:hidden fixed inset-0 z-30 flex items-end" style={{ background: 'rgba(22,40,68,0.4)' }} onClick={() => setSelId('')}>
          <div className="w-full bg-white rounded-t-3xl overflow-hidden" style={{ maxHeight: '88vh' }} onClick={e => e.stopPropagation()}>
            <Detail car={selected} onClose={() => setSelId('')} />
          </div>
        </div>
      )}
    </div>
  )
}
