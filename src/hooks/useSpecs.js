import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useSpecs(modeloIds = []) {
  const [specsMap, setSpecsMap] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!modeloIds.length) { setSpecsMap({}); return }
    let cancelled = false
    setLoading(true)

    async function fetch() {
      const { data } = await supabase.schema('autos').from('specs')
        .select('modelo_id, datos')
        .in('modelo_id', modeloIds)
        .order('created_at', { ascending: false })

      if (!cancelled) {
        const map = {}
        data?.forEach(row => {
          if (!map[row.modelo_id]) map[row.modelo_id] = row
        })
        setSpecsMap(map)
        setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [modeloIds.join(',')])

  return { specsMap, loading }
}
