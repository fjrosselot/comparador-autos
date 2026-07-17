// Copiado exacto de src/utils/tco.js (node ESM no resuelve el import '../constants' sin extensión)
function calcTCO(modelo, specs, params) {
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

const PARAMS = {
  kmPerYear: 15_000,
  years: 5,
  gasPriceCLP: 1_600,
  gasGrowthPct: 0.04,
  elecPriceCLP: 130,
  solarCoverPct: 0.70,
  currentCarValueCLP: 12_000_000,
  maintenanceAnnualCLP: 350_000,
  resalePct5yr: 0.55,
}

const WALLBOX_CLP = 1_200_000 // instalado, punto medio $900k-$1,5M (Enel X / Copec Voltex, jul-2026) — costo único, no verificado con cotización formal

const CANDIDATES = [
  {
    brand: 'Skoda Kodiaq', trim: 'Selection 1.5 TSI MHEV',
    combustible: 'gasolina', precio_lista: 37_190_000, precio_contado: 34_690_000,
    datos: { consumo: { mixtoL100: 7.75 }, mantencion: { anualCLP: 450_000 }, reventa: { pct5yr: 0.50 } },
  },
  {
    brand: 'Skoda Elroq', trim: '85 Design (BEV) — oferta $29,99M',
    combustible: 'BEV', precio_lista: 44_990_000, precio_contado: 29_990_000,
    datos: { consumo: { electricoKwh100: 15.15 }, mantencion: { anualCLP: 215_000 }, reventa: { pct5yr: 0.40 } },
  },
  {
    brand: 'Kia EV5', trim: 'Light 64.2kWh FWD (BEV)',
    combustible: 'BEV', precio_lista: 31_990_000, precio_contado: 31_990_000,
    datos: { consumo: { electricoKwh100: 14.7 }, mantencion: { anualCLP: 230_000 }, reventa: { pct5yr: 0.35 } },
  },
  {
    brand: 'Kia EV5', trim: 'Wave 88.1kWh AWD (BEV)',
    combustible: 'BEV', precio_lista: 41_990_000, precio_contado: 41_990_000,
    datos: { consumo: { electricoKwh100: 16.4 }, mantencion: { anualCLP: 250_000 }, reventa: { pct5yr: 0.35 } },
  },
  {
    brand: 'Chevrolet Captiva PHEV', trim: 'Premier',
    combustible: 'PHEV', precio_lista: 29_990_000, precio_contado: 26_990_000,
    datos: { electrico: { autonomiaKm: 90 }, consumo: { electricoKwh100: 22.8, mixtoL100: 6.1 }, mantencion: { anualCLP: 230_000 }, reventa: { pct5yr: 0.45 } },
  },
  {
    brand: 'Chevrolet Captiva EV', trim: 'Premier 60kWh (BEV)',
    combustible: 'BEV', precio_lista: 28_990_000, precio_contado: 28_990_000,
    datos: { consumo: { electricoKwh100: 18.9 }, mantencion: { anualCLP: 225_000 }, reventa: { pct5yr: 0.40 } },
  },
  {
    brand: 'Tesla Model Y', trim: 'Premium Long Range RWD — bono Scotiabank',
    combustible: 'BEV', precio_lista: 39_990_000, precio_contado: 32_900_000,
    datos: { consumo: { electricoKwh100: 12.7 }, mantencion: { anualCLP: 200_000 }, reventa: { pct5yr: 0.42 } },
  },
  {
    brand: 'Peugeot 5008', trim: 'Allure 1.2 MHEV',
    combustible: 'gasolina', precio_lista: 33_290_000, precio_contado: 28_990_000,
    datos: { consumo: { mixtoL100: 5.10 }, mantencion: { anualCLP: 550_000 }, reventa: { pct5yr: 0.45 } },
  },
  {
    brand: 'Peugeot 5008', trim: 'GT 1.2 MHEV',
    combustible: 'gasolina', precio_lista: 39_790_000, precio_contado: 33_990_000,
    datos: { consumo: { mixtoL100: 5.10 }, mantencion: { anualCLP: 550_000 }, reventa: { pct5yr: 0.45 } },
  },
  {
    brand: 'Mitsubishi Outlander', trim: 'GL 4x2 (bencina)',
    combustible: 'gasolina', precio_lista: 28_990_000, precio_contado: 25_990_000,
    datos: { consumo: { mixtoL100: 8.1 }, mantencion: { anualCLP: 300_000 }, reventa: { pct5yr: 0.58 } },
  },
  {
    brand: 'Mitsubishi Outlander', trim: 'GLS Limited 4x4 (bencina)',
    combustible: 'gasolina', precio_lista: 41_990_000, precio_contado: 38_990_000,
    datos: { consumo: { mixtoL100: 8.1 }, mantencion: { anualCLP: 300_000 }, reventa: { pct5yr: 0.58 } },
  },
  {
    brand: 'Mitsubishi Outlander PHEV', trim: 'GLS',
    combustible: 'PHEV', precio_lista: 43_990_000, precio_contado: 39_490_000,
    datos: { electrico: { autonomiaKm: 83 }, consumo: { electricoKwh100: 17.5, mixtoL100: 7.5 }, mantencion: { anualCLP: 400_000 }, reventa: { pct5yr: 0.54 } },
  },
  {
    brand: 'Mitsubishi Destinator', trim: 'GL 1.5T',
    combustible: 'gasolina', precio_lista: 23_990_000, precio_contado: 20_490_000,
    datos: { consumo: { mixtoL100: 7.8 }, mantencion: { anualCLP: 275_000 }, reventa: { pct5yr: 0.475 } },
  },
  {
    brand: 'Mitsubishi Destinator', trim: 'GLS 1.5T',
    combustible: 'gasolina', precio_lista: 31_490_000, precio_contado: 28_990_000,
    datos: { consumo: { mixtoL100: 7.8 }, mantencion: { anualCLP: 275_000 }, reventa: { pct5yr: 0.475 } },
  },
]

const rows = CANDIDATES.map(c => {
  const modelo = { combustible: c.combustible, precio_lista: c.precio_lista, precio_contado: c.precio_contado }
  const specs = { datos: c.datos }
  const r = calcTCO(modelo, specs, PARAMS)
  const needsWallbox = c.combustible === 'BEV' || c.combustible === 'PHEV'
  const wallbox = needsWallbox ? WALLBOX_CLP : 0
  const basePrice = c.precio_contado ?? c.precio_lista
  // Ciclo perpetuo: reventa a 5a se usa como pie del siguiente auto (no se "cobra" aparte).
  // Se retira el trade-in fijo de $12M (solo aplica al primer ciclo, no a los siguientes).
  const perpetualCycle = (basePrice - r.resaleValue) + r.fuelCost + r.maintCost
  const perpetualAnual = perpetualCycle / PARAMS.years
  return { brand: c.brand, trim: c.trim, precio_contado: c.precio_contado, ...r, wallbox, tcoConWallbox: r.tco + wallbox, perpetualCycle, perpetualConWallbox: perpetualCycle + wallbox, perpetualAnual }
})

rows.sort((a, b) => a.perpetualConWallbox - b.perpetualConWallbox)

const fmt = n => Math.round(n).toLocaleString('es-CL')
console.log(['brand', 'trim', 'precio', 'fuelCost', 'maintCost', 'resaleValue', 'perpetualCycle(5a)', 'wallbox', 'perpetualConWallbox', 'perpetualAnual'].join(' | '))
for (const r of rows) {
  console.log([r.brand, r.trim, fmt(r.precio_contado), fmt(r.fuelCost), fmt(r.maintCost), fmt(r.resaleValue), fmt(r.perpetualCycle), fmt(r.wallbox), fmt(r.perpetualConWallbox), fmt(r.perpetualAnual)].join(' | '))
}
