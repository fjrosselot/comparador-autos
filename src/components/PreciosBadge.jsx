import { fmtCLP, fmtPct } from '../utils/fmt'

export default function PreciosBadge({ modelo }) {
  return (
    <div className="space-y-1 text-xs">
      {modelo.precio_lista && (
        <div className="text-slate-400 line-through">{fmtCLP(modelo.precio_lista)}</div>
      )}
      {modelo.precio_contado && (
        <div className="font-semibold text-slate-700">
          {fmtCLP(modelo.precio_contado)}
          {modelo.descuento_contado_pct > 0 && (
            <span className="ml-1 text-green-600">−{fmtPct(modelo.descuento_contado_pct / 100)}</span>
          )}
        </div>
      )}
      {modelo.precio_financiamiento && modelo.precio_financiamiento < modelo.precio_contado && (
        <div className="text-amber-600 font-medium">
          {fmtCLP(modelo.precio_financiamiento)} con crédito
          {modelo.descuento_financiamiento_pct > 0 && (
            <span className="ml-1">({fmtPct(modelo.descuento_financiamiento_pct / 100)} dto)</span>
          )}
        </div>
      )}
    </div>
  )
}
