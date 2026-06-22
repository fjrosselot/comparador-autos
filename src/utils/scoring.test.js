import { describe, it, expect } from 'vitest'
import { calcScores } from './scoring'
import { DEFAULT_WEIGHTS } from '../constants'

const modelos = [
  { id: 'a', combustible: 'HEV', precio_contado: 20_000_000 },
  { id: 'b', combustible: 'PHEV', precio_contado: 30_000_000 },
]
const specsMap = {
  a: { datos: { motor: { potenciaHP: 180 }, electrico: { autonomiaKm: 0 }, dimensiones: { maleteroL: 500 }, seguridad: { ncapEstrellas: 5, airbags: 6 }, reventa: { pct5yr: 0.62 }, garantia: { vehiculoAnios: 5 }, mantencion: { anualCLP: 300_000 } } },
  b: { datos: { motor: { potenciaHP: 300 }, electrico: { autonomiaKm: 100 }, dimensiones: { maleteroL: 450 }, seguridad: { ncapEstrellas: 4, airbags: 7 }, reventa: { pct5yr: 0.50 }, garantia: { vehiculoAnios: 6 }, mantencion: { anualCLP: 400_000 } } },
}

describe('calcScores', () => {
  it('returns one result per model', () => {
    const scores = calcScores(modelos, specsMap, DEFAULT_WEIGHTS)
    expect(scores).toHaveLength(2)
  })

  it('cheaper model scores higher on precio criterion', () => {
    const scores = calcScores(modelos, specsMap, DEFAULT_WEIGHTS)
    const a = scores.find(s => s.modelo.id === 'a')
    const b = scores.find(s => s.modelo.id === 'b')
    expect(a.criteriaScores.precio).toBeGreaterThan(b.criteriaScores.precio)
  })

  it('totalScore is between 0 and 100', () => {
    const scores = calcScores(modelos, specsMap, DEFAULT_WEIGHTS)
    scores.forEach(s => {
      expect(s.totalScore).toBeGreaterThanOrEqual(0)
      expect(s.totalScore).toBeLessThanOrEqual(100)
    })
  })
})
