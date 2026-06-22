import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useComparacion() {
  const [selectedIds, setSelectedIds] = useState([])
  const [saved, setSaved] = useState([])

  useEffect(() => {
    supabase.schema('autos').from('comparaciones')
      .select('id, nombre, modelo_ids, pesos, parametros_tco')
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => setSaved(data ?? []))
  }, [])

  function toggle(id) {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id)
        : prev.length < 6 ? [...prev, id] : prev
    )
  }

  function clear() { setSelectedIds([]) }

  async function save(nombre, pesos, parametrosTco) {
    const { data } = await supabase.schema('autos').from('comparaciones')
      .insert({ nombre, modelo_ids: selectedIds, pesos, parametros_tco: parametrosTco })
      .select().single()
    if (data) setSaved(prev => [data, ...prev])
    return data
  }

  function load(comp) {
    setSelectedIds(comp.modelo_ids ?? [])
  }

  return { selectedIds, toggle, clear, save, load, saved }
}
