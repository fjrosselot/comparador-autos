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
      let q = supabase.from('autos_modelos')
        .select('*')
        .eq('activo', true)
        .order('precio_contado', { ascending: true })

      if (filters.marca)       q = q.eq('marca_id', filters.marca)
      if (filters.tipo)        q = q.eq('tipo', filters.tipo)
      if (filters.combustible) q = q.eq('combustible', filters.combustible)
      if (filters.precioMax)   q = q.lte('precio_contado', filters.precioMax)

      const { data, error } = await q
      if (!cancelled) {
        if (error) {
          setError(error)
        } else {
          setModelos(data ?? [])
          setError(null)
        }
        setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [filters.marca, filters.tipo, filters.combustible, filters.precioMax])

  return { modelos, loading, error }
}
