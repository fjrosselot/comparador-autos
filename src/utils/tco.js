import { TCO_DEFAULTS } from '../constants'

export function calcTCO(modelo, specs, params = TCO_DEFAULTS) {
  const { kmPerYear, years, gasPriceCLP, gasGrowthPct, elecPriceCLP, solarCoverPct, currentCarValueCLP, maintenanceAnnualCLP, resalePct5yr } = params
  const s = specs?.datos

  const basePrice = modelo.precio_contado ?? modelo.precio_lista
  const netPrice = basePrice - currentCarValueCLP

  let fuelCost = 0
  for (let y = 1; y <= years; y++) {
    const gasPrice = gasPriceCLP * Math.pow(1 + gasGrowthPct, y)
    if (modelo.combustible === 'PHEV') {
      const evKmPct = s?.electrico?.autonomiaKm
        ? Math.min(0.95, (s.electrico.autonomiaKm * 365) / kmPerYear)
        : 0.80
      const elecKm = kmPerYear * evKmPct
      const gasKm = kmPerYear - elecKm
      fuelCost += elecKm * (s?.consumo?.electricoKwh100 ?? 18) / 100 * elecPriceCLP * (1 - solarCoverPct)
      fuelCost += gasKm * (s?.consumo?.mixtoL100 ?? 5) / 100 * gasPrice
    } else if (modelo.combustible === 'BEV') {
      fuelCost += kmPerYear * (s?.consumo?.electricoKwh100 ?? 18) / 100 * elecPriceCLP * (1 - solarCoverPct)
    } else {
      fuelCost += kmPerYear * (s?.consumo?.mixtoL100 ?? (modelo.combustible === 'HEV' ? 6 : 9)) / 100 * gasPrice
    }
  }

  const maintCost = (s?.mantencion?.anualCLP ?? maintenanceAnnualCLP) * years
  const resaleValue = basePrice * (s?.reventa?.pct5yr ?? resalePct5yr)
  const tco = netPrice + fuelCost + maintCost - resaleValue

  return { netPrice, fuelCost, maintCost, resaleValue, tco, tcoPerKm: tco / (kmPerYear * years) }
}

export function calcPrepayAnalysis(modelo) {
  if (!modelo.precio_financiamiento || !modelo.precio_contado) return null
  if (modelo.precio_financiamiento >= modelo.precio_contado) return null

  const discount = modelo.precio_contado - modelo.precio_financiamiento
  const monthlyRate = (modelo.tasa_credito_referencial ?? 0.12) / 12
  const interest = modelo.precio_financiamiento * monthlyRate * 2
  const netBenefit = discount - interest

  return { discount, interest, netBenefit, worthIt: netBenefit > 0 }
}
