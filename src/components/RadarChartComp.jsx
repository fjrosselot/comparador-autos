import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend } from 'recharts'
import { SCORING_CRITERIA } from '../constants'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export default function RadarChartComp({ scores }) {
  const data = SCORING_CRITERIA.map(({ id, label }) => {
    const point = { subject: label }
    scores.forEach(({ modelo }, i) => {
      point[modelo.id] = scores[i].criteriaScores[id] ?? 0
    })
    return point
  })

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
        {scores.map(({ modelo }, i) => (
          <Radar
            key={modelo.id}
            name={`${modelo.nombre} ${modelo.version ?? ''}`}
            dataKey={modelo.id}
            stroke={COLORS[i % COLORS.length]}
            fill={COLORS[i % COLORS.length]}
            fillOpacity={0.1}
          />
        ))}
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
