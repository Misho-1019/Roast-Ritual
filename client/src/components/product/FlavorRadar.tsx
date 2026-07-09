import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'

const defaultData = [
  { trait: 'Acidity', value: 3 },
  { trait: 'Body', value: 3 },
  { trait: 'Sweetness', value: 3 },
  { trait: 'Bitterness', value: 3 },
  { trait: 'Finish', value: 3 },
]

const flavorProfiles: Record<string, { trait: string; value: number }[]> = {
  'ethiopian-yirgacheffe': [
    { trait: 'Acidity', value: 5 },
    { trait: 'Body', value: 2 },
    { trait: 'Sweetness', value: 3 },
    { trait: 'Bitterness', value: 1 },
    { trait: 'Finish', value: 4 },
  ],
  'colombian-supremo': [
    { trait: 'Acidity', value: 3 },
    { trait: 'Body', value: 3 },
    { trait: 'Sweetness', value: 4 },
    { trait: 'Bitterness', value: 2 },
    { trait: 'Finish', value: 3 },
  ],
  'midnight-sumatra': [
    { trait: 'Acidity', value: 1 },
    { trait: 'Body', value: 5 },
    { trait: 'Sweetness', value: 2 },
    { trait: 'Bitterness', value: 4 },
    { trait: 'Finish', value: 5 },
  ],
  'anaerobic-gesha': [
    { trait: 'Acidity', value: 5 },
    { trait: 'Body', value: 3 },
    { trait: 'Sweetness', value: 4 },
    { trait: 'Bitterness', value: 1 },
    { trait: 'Finish', value: 5 },
  ],
  'costa-rican-tarrazu': [
    { trait: 'Acidity', value: 4 },
    { trait: 'Body', value: 3 },
    { trait: 'Sweetness', value: 5 },
    { trait: 'Bitterness', value: 2 },
    { trait: 'Finish', value: 3 },
  ],
  'kenyan-aa': [
    { trait: 'Acidity', value: 5 },
    { trait: 'Body', value: 2 },
    { trait: 'Sweetness', value: 3 },
    { trait: 'Bitterness', value: 2 },
    { trait: 'Finish', value: 4 },
  ],
}

interface FlavorRadarProps {
  slug?: string
}

export default function FlavorRadar({ slug }: FlavorRadarProps) {
  const data = slug && flavorProfiles[slug] ? flavorProfiles[slug] : defaultData

  return (
    <div className="w-full max-w-sm mx-auto">
      <h3 className="font-bold text-on-surface text-center mb-4">Flavor Profile</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#4f4537" />
          <PolarAngleAxis dataKey="trait" tick={{ fill: '#B8A89A', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
          <Radar
            name="Flavor"
            dataKey="value"
            stroke="#D4A04A"
            fill="#D4A04A"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
