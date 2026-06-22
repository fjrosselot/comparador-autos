export const TCO_DEFAULTS = {
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

export const SCORING_CRITERIA = [
  { id: 'precio',    label: 'Precio neto',    lowerBetter: true  },
  { id: 'tco5',     label: 'TCO 5 años',     lowerBetter: true  },
  { id: 'ev_range', label: 'Autonomía EV',   lowerBetter: false },
  { id: 'seguridad',label: 'Seguridad',      lowerBetter: false },
  { id: 'maletero', label: 'Maletero',       lowerBetter: false },
  { id: 'reventa',  label: 'Reventa 5 años', lowerBetter: false },
  { id: 'potencia', label: 'Potencia',       lowerBetter: false },
  { id: 'garantia', label: 'Garantía',       lowerBetter: false },
]

export const DEFAULT_WEIGHTS = {
  precio:    20,
  tco5:      25,
  ev_range:  15,
  seguridad: 15,
  maletero:   5,
  reventa:   10,
  potencia:   5,
  garantia:   5,
}
