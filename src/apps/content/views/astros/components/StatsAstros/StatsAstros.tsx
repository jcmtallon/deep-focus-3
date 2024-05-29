import React, { useMemo } from 'react'
import { Astro, AstroName } from 'types'
import { Bubble } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { getAstroLabel } from 'utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

interface StatsAstrosProps {
  astros: Astro[]
}

// Simple hash function
function hashString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    // eslint-disable-next-line no-bitwise -- shrug
    hash = (hash << 5) - hash + char
    // eslint-disable-next-line no-bitwise -- shrug
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

// Function to get a consistent random-like number between 1 and 100
function getDeterminantNumber(id: number) {
  const hash = hashString(id.toString())
  const randomNumber = (((hash % 100) + 100) % 100) + 1 // Ensure it's between 1 and 100
  return randomNumber
}

function StatsAstros(props: StatsAstrosProps) {
  const { astros } = props

  const astroDataSets = useMemo(() => {
    const sizes: Record<AstroName, number> = {
      WHITE_DWARF: 1,
      RED_GIANT: 3,
      SUPER_NOVA: 4,
      NEUTRON_STAR: 10,
      BLACK_HOLE: 15,
    }

    const colors: Record<AstroName, string> = {
      WHITE_DWARF: 'rgb(251, 248, 225)',
      RED_GIANT: 'rgb(243, 163, 147)',
      SUPER_NOVA: 'rgb(255, 247, 204)',
      NEUTRON_STAR: 'rgb(189, 224, 254)',
      BLACK_HOLE: 'rgb(78, 85, 114, 0.8)',
    }

    return Object.keys(sizes).map(size => ({
      label: getAstroLabel(size as AstroName),
      backgroundColor: colors[size as AstroName],
      data: astros
        .filter(astro => astro.name === size)
        .map(astro => ({
          r: sizes[astro.name],
          x: getDeterminantNumber(astro.astroId),
          y: getDeterminantNumber(astro.date),
        })),
    }))
  }, [astros])

  return (
    <Bubble
      options={{
        responsive: true,
        plugins: {
          legend: { display: false, position: 'right' },
          title: { display: true, text: 'Focus universe' },
        },
      }}
      data={{
        datasets: astroDataSets,
      }}
    />
  )
}

export { StatsAstros }
