export const fmtCLP = (n) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(n)

export const fmtKm = (n) => `${n.toLocaleString('es-CL')} km`

export const fmtPct = (n) => `${(n * 100).toFixed(1)}%`

export const fmtNum = (n, decimals = 0) =>
  n.toLocaleString('es-CL', { maximumFractionDigits: decimals })
