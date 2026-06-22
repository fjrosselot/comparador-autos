import { useState } from 'react'
import { useComparacion } from './hooks/useComparacion'
import CatalogoTab from './components/CatalogoTab'
import ComparadorTab from './components/ComparadorTab'
import FichaTecnicaTab from './components/FichaTecnicaTab'
import TcoTab from './components/TcoTab'

const TABS = [
  { id: 'catalogo', label: '🔍 Catálogo' },
  { id: 'comparar', label: '⚖️ Comparador' },
  { id: 'ficha',    label: '📋 Ficha Técnica' },
  { id: 'tco',      label: '💰 TCO' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('catalogo')
  const comparacion = useComparacion()

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-700">Comparador de Autos Chile <span className="text-xs font-normal text-slate-400">v0.2.0</span></h1>
        {comparacion.selectedIds.length > 0 && (
          <span className="text-sm text-slate-500">
            {comparacion.selectedIds.length} seleccionado{comparacion.selectedIds.length > 1 ? 's' : ''}
          </span>
        )}
      </header>
      <nav className="bg-white border-b border-slate-200 px-6 flex gap-1">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === t.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="p-6 max-w-7xl mx-auto">
        {activeTab === 'catalogo' && (
          <CatalogoTab
            comparacion={comparacion}
            onGoCompare={() => setActiveTab('comparar')}
          />
        )}
        {activeTab === 'comparar' && <ComparadorTab comparacion={comparacion} />}
        {activeTab === 'ficha'    && <FichaTecnicaTab />}
        {activeTab === 'tco'      && <TcoTab selectedIds={comparacion.selectedIds} />}
      </main>
    </div>
  )
}
