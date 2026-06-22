import { describe, it, expect } from 'vitest'
import { calcTCO, calcPrepayAnalysis } from './tco'
import { TCO_DEFAULTS } from '../constants'

const gasolineModelo = {
  id: '1',
  combustible: 'gasolina',
  precio_contado: 20_000_000,
  precio_lista: 22_000_000,
}
const gasolineSpecs = {
  datos: {
    consumo: { mixtoL100: 9 },
    mantencion: { anualCLP: 300_000 },
    reventa: { pct5yr: 0.55 },
  },
}

describe('calcTCO', () => {
  it('netPrice deducts current car value', () => {
    const result = calcTCO(gasolineModelo, gasolineSpecs, TCO_DEFAULTS)
    expect(result.netPrice).toBe(20_000_000 - TCO_DEFAULTS.currentCarValueCLP)
  })

  it('tco is sum of components', () => {
    const r = calcTCO(gasolineModelo, gasolineSpecs, TCO_DEFAULTS)
    expect(r.tco).toBeCloseTo(r.netPrice + r.fuelCost + r.maintCost - r.resaleValue, 0)
  })

  it('tcoPerKm = tco / total km', () => {
    const r = calcTCO(gasolineModelo, gasolineSpecs, TCO_DEFAULTS)
    expect(r.tcoPerKm).toBeCloseTo(r.tco / (TCO_DEFAULTS.kmPerYear * TCO_DEFAULTS.years), 2)
  })
})

describe('calcPrepayAnalysis', () => {
  it('returns null when no financing discount', () => {
    const m = { precio_contado: 20_000_000, precio_financiamiento: 20_000_000 }
    expect(calcPrepayAnalysis(m)).toBeNull()
  })

  it('calculates net benefit of taking credit to capture discount', () => {
    const m = {
      precio_contado: 20_000_000,
      precio_financiamiento: 18_000_000,
      tasa_credito_referencial: 0.12,
    }
    const r = calcPrepayAnalysis(m)
    expect(r.discount).toBe(2_000_000)
    expect(r.interest).toBeCloseTo(18_000_000 * (0.12 / 12) * 2, 0)
    expect(r.worthIt).toBe(true)
  })
})
