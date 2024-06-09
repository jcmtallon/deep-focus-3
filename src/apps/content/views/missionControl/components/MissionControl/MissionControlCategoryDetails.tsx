import React, { useMemo } from 'react'
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
  ArcElement,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { forEach } from 'lodash'
import { Category, FocusSession } from 'types'
import { DateTime, Duration, DurationLike } from 'luxon'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
)

interface MissionControlCategoryDetailsProps {
  categories: Category[]
  focusSessions: FocusSession[]
}

function MissionControlCategoryDetails(props: MissionControlCategoryDetailsProps) {
  const { categories, focusSessions } = props

  // TODO: Add time without a category

  const labels = useMemo(() => categories.map(category => category.name), [categories])

  const data = useMemo(() => {
    const values: number[] = []

    forEach(categories, category => {
      const categoryFocusSessions = focusSessions.filter(session => session.categoryId === category.id)
      const totalDuration = categoryFocusSessions.reduce((acc: DurationLike, session: FocusSession) => {
        const start = DateTime.fromMillis(session.startDate)
        const end = DateTime.fromMillis(session.endDate!) // TODO: Dangerous
        const diff = end.diff(start)
        return diff.plus(acc)
      }, Duration.fromObject({ seconds: 0 }))
      values.push(totalDuration.milliseconds)
    })

    return values
  }, [focusSessions, categories])

  const backgroundColors = useMemo(() => {
    return categories.map(category => category.color)
  }, [categories])

  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              label: 'Time per category',
              backgroundColor: backgroundColors,
              data,
            },
          ],
        }}
        options={{
          borderColor: '150B33',
          plugins: {
            legend: { position: 'right' },
          },
        }}
      />
    </div>
  )
}

export { MissionControlCategoryDetails }
