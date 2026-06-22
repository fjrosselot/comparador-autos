import { describe, it, expect } from 'vitest'
import { fmtCLP, fmtKm, fmtPct, fmtNum } from './fmt'

describe('fmtCLP', () => {
  it('formats millions', () => {
    expect(fmtCLP(26_990_000)).toContain('26')
    expect(fmtCLP(26_990_000)).toContain('990')
  })
})

describe('fmtPct', () => {
  it('converts decimal to percent string', () => {
    expect(fmtPct(0.55)).toBe('55.0%')
    expect(fmtPct(0.1234)).toBe('12.3%')
  })
})

describe('fmtNum', () => {
  it('formats with decimals', () => {
    expect(fmtNum(15000)).toBe('15.000')
    expect(fmtNum(3.14159, 2)).toBe('3,14')
  })
})
