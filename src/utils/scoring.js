import { SCORING_CRITERIA } from '../constants'

function extractValue(modelo, specs) {
  const s = specs?.datos
  return {
    precio:    modelo.precio_contado ?? modelo.precio_lista ?? 0,
    tco5:      modelo._tco ?? 0,
    ev_range:  s?.electrico?.autonomiaKm ?? 0,
    seguridad: (s?.seguridad?.ncapEstrellas ?? 0) * 10 + (s?.seguridad?.airbags ?? 0),
    maletero:  s?.dimensiones?.maleteroL ?? 0,
    reventa:   s?.reventa?.pct5yr ?? 0,
    potencia:  s?.motor?.potenciaHP ?? 0,
    garantia:  s?.garantia?.vehiculoAnios ?? 0,
  }
}

export function calcScores(modelos, specsMap, weights) {
  const rawValues = modelos.map(m => extractValue(m, specsMap[m.id]))

  return modelos.map((modelo, i) => {
    let totalScore = 0
    let totalWeight = 0
    const criteriaScores = {}

    SCORING_CRITERIA.forEach(({ id, lowerBetter }) => {
      const vals = rawValues.map(v => v[id])
      const min = Math.min(...vals)
      const max = Math.max(...vals)
      const range = max - min
      const raw = vals[i]
      const normalized = range === 0 ? 100
        : lowerBetter ? (1 - (raw - min) / range) * 100
        : ((raw - min) / range) * 100

      criteriaScores[id] = normalized
      const w = weights[id] ?? 0
      totalScore += normalized * w
      totalWeight += w
    })

    return { modelo, criteriaScores, totalScore: totalWeight > 0 ? totalScore / totalWeight : 0 }
  })
}
