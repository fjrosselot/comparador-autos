import { useState } from 'react'
import { useModelos } from '../hooks/useModelos'
import { useSpecs } from '../hooks/useSpecs'
import { calcScores } from '../utils/scoring'
import { calcTCO } from '../utils/tco'
import { fmtNum } from '../utils/fmt'
import { DEFAULT_WEIGHTS, SCORING_CRITERIA, TCO_DEFAULTS } from '../constants'
import ScoringPanel from './ScoringPanel'
import RadarChartComp from './RadarChartComp'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function ComparadorTab({ comparacion }) {
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS)
  const { modelos: allModelos } = useModelos({})
  const selectedModelos = allModelos.filter(m => comparacion.selectedIds.includes(m.id))
  const { specsMap } = useSpecs(comparacion.selectedIds)

  if (!selectedModelos.length) {
    return (
      <div className="text-center py-16 text-slate-400 text-sm">
        Selecciona modelos en el Catálogo para comparar
      </div>
    )
  }

  const modelosConTco = selectedModelos.map(m => ({
    ...m,
    _tco: calcTCO(m, specsMap[m.id], TCO_DEFAULTS).tco,
  }))

  const scores = calcScores(modelosConTco, specsMap, weights)
  const sorted = [...scores].sort((a, b) => b.totalScore - a.totalScore)
  const maxScore = sorted[0]?.totalScore ?? 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RadarChartComp scores={scores} />
        </div>
        <ScoringPanel weights={weights} onChange={setWeights} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-700">Ranking por score ponderado</p>
        </div>
        <div className="divide-y divide-slate-100">
          {sorted.map(({ modelo, totalScore }, rank) => (
            <div key={modelo.id} className="px-4 py-3 flex items-center gap-4">
              <span className="text-lg font-semibold text-slate-300 w-6">{rank + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">{modelo.nombre} {modelo.version}</p>
                <p className="text-xs text-slate-400">{modelo.marcas?.nombre} · {modelo.combustible}</p>
                <div className="mt-1.5 bg-slate-100 rounded-full h-2 w-full">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(totalScore / maxScore) * 100}%`,
                      backgroundColor: COLORS[scores.findIndex(s => s.modelo.id === modelo.id) % COLORS.length],
                    }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-slate-700 w-12 text-right">
                {fmtNum(totalScore, 1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500">Criterio</th>
              {selectedModelos.map((m, i) => (
                <th key={m.id} className="px-4 py-3 text-xs font-medium" style={{ color: COLORS[i % COLORS.length] }}>
                  {m.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {SCORING_CRITERIA.map(({ id, label }) => (
              <tr key={id} className="hover:bg-slate-50">
                <td className="px-4 py-2.5 text-slate-600 text-xs">{label}</td>
                {scores.map(({ modelo, criteriaScores }) => (
                  <td key={modelo.id} className="px-4 py-2.5 text-center">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      criteriaScores[id] >= 70 ? 'bg-green-50 text-green-700'
                      : criteriaScores[id] >= 40 ? 'bg-slate-50 text-slate-600'
                      : 'bg-red-50 text-red-600'
                    }`}>
                      {fmtNum(criteriaScores[id], 0)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
