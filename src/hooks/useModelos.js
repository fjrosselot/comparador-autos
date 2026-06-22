import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useModelos(filters = {}) {
  const [modelos, setModelos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    async function fetch() {
      let q = supabase.schema('autos').from('modelos')
        .select('*, marcas(nombre, logo_url)')
        .eq('activo', true)
        .order('precio_contado', { ascending: true })

      if (filters.marca)       q = q.eq('marca_id', filters.marca)
      if (filters.tipo)        q = q.eq('tipo', filters.tipo)
      if (filters.combustible) q = q.eq('combustible', filters.combustible)
      if (filters.precioMax)   q = q.lte('precio_contado', filters.precioMax)

      const { data, error } = await q
      if (!cancelled) {
        setModelos(data ?? [])
        setError(error)
        setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [filters.marca, filters.tipo, filters.combustible, filters.precioMax])

  return { modelos, loading, error }
}
