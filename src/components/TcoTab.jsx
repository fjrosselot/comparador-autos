import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useModelos } from '../hooks/useModelos'
import { useSpecs } from '../hooks/useSpecs'
import { calcTCO, calcPrepayAnalysis } from '../utils/tco'
import { fmtCLP, fmtKm, fmtNum } from '../utils/fmt'
import { TCO_DEFAULTS } from '../constants'

const BAR_COLORS = {
  'Precio neto': '#3b82f6',
  'Combustible': '#f59e0b',
  'Mantención': '#94a3b8',
}

export default function TcoTab({ selectedIds }) {
  const [params, setParams] = useState(TCO_DEFAULTS)
  const { modelos: allModelos } = useModelos({})
  const selected = allModelos.filter(m => selectedIds.includes(m.id)).slice(0, 4)
  const { specsMap } = useSpecs(selectedIds)

  if (!selected.length) {
    return (
      <div className="text-center py-16 text-slate-400 text-sm">
        Selecciona modelos en el Catálogo para analizar TCO
      </div>
    )
  }

  const results = selected.map(m => {
    const tco = calcTCO(m, specsMap[m.id], params)
    const prepay = calcPrepayAnalysis(m)
    return { modelo: m, ...tco, prepay }
  })

  const chartData = results.map(r => ({
    name: `${r.modelo.nombre}\n${r.modelo.version ?? ''}`,
    'Precio neto':  r.netPrice / 1_000_000,
    'Combustible':  r.fuelCost / 1_000_000,
    'Mantención':   r.maintCost / 1_000_000,
    resale:        -r.resaleValue / 1_000_000,
  }))

  function setParam(key, value) {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm font-medium text-slate-700 mb-4">TCO {params.years} años (MM$)</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => `$${v}M`} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v) => [`$${fmtNum(v * 1_000_000 / 1_000, 0)}K`, '']} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {Object.entries(BAR_COLORS).map(([key, color]) => (
                <Bar key={key} dataKey={key} stackId="a" fill={color} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
          <p className="text-xs font-medium text-slate-500">PARÁMETROS</p>
          {[
            { key: 'kmPerYear',           label: 'Km/año',            min: 5000,   max: 40000, step: 1000,  fmt: v => fmtKm(v) },
            { key: 'years',               label: 'Años',              min: 1,      max: 10,   step: 1,      fmt: v => `${v} años` },
            { key: 'gasPriceCLP',         label: 'Bencina CLP/L',     min: 900,    max: 2500,  step: 50,    fmt: v => fmtCLP(v) },
            { key: 'gasGrowthPct',        label: 'Crecimiento gas/año',min: 0,     max: 0.10,  step: 0.005, fmt: v => `${(v*100).toFixed(1)}%` },
            { key: 'elecPriceCLP',        label: 'Electricidad/kWh',  min: 80,     max: 220,   step: 5,     fmt: v => fmtCLP(v) },
            { key: 'solarCoverPct',       label: 'Cobertura solar',   min: 0,      max: 1,     step: 0.05,  fmt: v => `${(v*100).toFixed(0)}%` },
            { key: 'currentCarValueCLP',  label: 'Valor auto actual', min: 0,      max: 20e6,  step: 500000,fmt: v => fmtCLP(v) },
          ].map(({ key, label, min, max, step, fmt }) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">{label}</span>
                <span className="font-mono text-slate-500">{fmt(params[key])}</span>
              </div>
              <input
                type="range" min={min} max={max} step={step} value={params[key]}
                onChange={e => setParam(key, parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-700">Resumen TCO</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs text-slate-500">
                <th className="text-left px-4 py-3">Modelo</th>
                <th className="text-right px-4 py-3">Precio neto</th>
                <th className="text-right px-4 py-3">Combustible</th>
                <th className="text-right px-4 py-3">Mantención</th>
                <th className="text-right px-4 py-3">−Residual</th>
                <th className="text-right px-4 py-3 font-semibold">TCO Total</th>
                <th className="text-right px-4 py-3">TCO/km</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {results.map(r => (
                <tr key={r.modelo.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-700">{r.modelo.nombre} {r.modelo.version}</p>
                    <p className="text-xs text-slate-400">{r.modelo.combustible}</p>
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600 font-mono text-xs">{fmtCLP(r.netPrice)}</td>
                  <td className="px-4 py-3 text-right text-slate-600 font-mono text-xs">{fmtCLP(r.fuelCost)}</td>
                  <td className="px-4 py-3 text-right text-slate-600 font-mono text-xs">{fmtCLP(r.maintCost)}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-mono text-xs">−{fmtCLP(r.resaleValue)}</td>
                  <td className="px-4 py-3 text-right font-semibold text-slate-800 font-mono text-xs">{fmtCLP(r.tco)}</td>
                  <td className="px-4 py-3 text-right text-slate-500 font-mono text-xs">{fmtCLP(Math.round(r.tcoPerKm))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {results.some(r => r.prepay) && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-medium text-slate-700">Análisis: Descuento financiamiento + prepago</p>
            <p className="text-xs text-slate-400 mt-0.5">¿Conviene tomar el crédito para capturar el descuento y prepagar?</p>
          </div>
          <div className="divide-y divide-slate-100">
            {results.filter(r => r.prepay).map(r => (
              <div key={r.modelo.id} className="px-4 py-3 flex items-center gap-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{r.modelo.nombre} {r.modelo.version}</p>
                </div>
                <div className="text-xs text-slate-500">
                  Dto: <span className="font-semibold text-green-600">+{fmtCLP(r.prepay.discount)}</span>
                </div>
                <div className="text-xs text-slate-500">
                  Interés ~2 cuotas: <span className="font-semibold text-red-500">−{fmtCLP(Math.round(r.prepay.interest))}</span>
                </div>
                <div className="text-sm font-semibold">
                  {r.prepay.worthIt
                    ? <span className="text-green-600">Conviene: ahorras {fmtCLP(Math.round(r.prepay.netBenefit))}</span>
                    : <span className="text-red-500">No conviene: pierdes {fmtCLP(Math.round(-r.prepay.netBenefit))}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
