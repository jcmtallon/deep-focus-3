import { PageLayout, SideNav, Card as BaseCard } from 'apps/content/components'
import { listBlockedSites, getFocusSessionsByDateRange, listObtainedAstros } from 'services/store'
import React, { useEffect, useMemo, useState } from 'react'
import { BlockedSite, FocusSession, Astro } from 'types'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
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
import { DateTime, Duration } from 'luxon'
import { forEach } from 'lodash'
import { countFocusSessionImpacts } from 'utils'
import { MissionControlBlockedSites } from './MissionControlBlockedSites/MissionControlBlockedSites'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

const Card = styled(BaseCard)`
  width: 100%;
`

const Body = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 32px;
  width: 100%;
  height: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  flex-grow: 1;
  max-width: 50%;
`

function Stats() {
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([])
  const [obtainedAstros, setObtainedAstros] = useState<Astro[]>([])
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([])
  const [criteria, setCriteria] = useState<'time' | 'sessions' | 'tasks' | 'impacts'>('time')

  const getBlockedSites = async () => {
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }

  const getFocusSessions = async () => {
    const focusSessions = await getFocusSessionsByDateRange(DateTime.now().plus({ day: -30 }), DateTime.now())
    setFocusSessions(focusSessions)
  }

  const getObtainedAstros = async () => {
    const obtainedAstros = await listObtainedAstros()
    setObtainedAstros(obtainedAstros)
  }

  useEffect(() => {
    getBlockedSites()
    getObtainedAstros()
  }, [])

  useEffect(() => {
    getFocusSessions()
  }, [])

  const dataSet = useMemo(() => {
    const dataObj: Record<string, { date: DateTime; focusSessions: FocusSession[] }> = {}
    const today = DateTime.now().endOf('day')

    for (let i = 0; i < 30; i++) {
      dataObj[i] = { date: today.plus({ day: -i }), focusSessions: [] }
    }

    forEach(focusSessions, focusSession => {
      const startDate = DateTime.fromMillis(focusSession.startDate)
      const index = Math.floor(today.diff(startDate, 'days').days).toString()
      if (index in dataObj) dataObj[index].focusSessions.push(focusSession)
    })

    return dataObj
  }, [focusSessions])

  const labels = useMemo(() => {
    return Object.keys(dataSet)
      .map(key => dataSet[key].date.toFormat('LLL dd'))
      .reverse()
  }, [dataSet])

  const data = useMemo(() => {
    if (criteria === 'sessions') {
      return Object.keys(dataSet)
        .map(key => dataSet[key].focusSessions.length)
        .reverse()
    }

    if (criteria === 'tasks') {
      return Object.keys(dataSet)
        .map(key => dataSet[key].focusSessions.reduce((acc, curr) => acc + curr.tasks.length, 0))
        .reverse()
    }

    if (criteria === 'impacts') {
      return Object.keys(dataSet)
        .map(key =>
          dataSet[key].focusSessions.reduce(
            (acc, session) => acc + countFocusSessionImpacts(session.impacts),
            0,
          ),
        )
        .reverse()
    }

    if (criteria === 'time') {
      return Object.keys(dataSet)
        .map(key => {
          const total = dataSet[key].focusSessions.reduce((acc: Duration, session: FocusSession) => {
            if (!session.endDate) return acc
            const start = DateTime.fromMillis(session.startDate)
            const end = DateTime.fromMillis(session.endDate!) // TODO: Dangerous
            const diff = end.diff(start)
            return diff.plus(acc)
          }, Duration.fromObject({ seconds: 0 }))

          return total.shiftTo('hours').hours
        })
        .reverse()
    }

    throw new Error('Invalid criteria')
  }, [dataSet, criteria])

  const backgroundColor = {
    sessions: '#E8BB3F',
    tasks: '#2DBE90',
    time: 'rgba(53, 162, 235, 0.5)',
    impacts: '#E05022',
  }

  const borderColor = {
    sessions: '#9B7E2F',
    tasks: '#0E845E',
    time: 'rgb(53, 162, 235)',
    impacts: '#852608',
  }

  return (
    <PageLayout sideNav={<SideNav activeElement="stats" />}>
      <Body>
        <Column>
          <Card title="Trends">
            <select
              value={criteria}
              onChange={e => setCriteria(e.target.value as 'time' | 'sessions' | 'tasks' | 'impacts')}>
              <option value="time">Time</option>
              <option value="sessions">Sessions</option>
              <option value="tasks">Tasks</option>
              <option value="impacts">Impacts</option>
            </select>
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Focus Trend',
                  },
                },
              }}
              data={{
                labels,
                datasets: [
                  {
                    fill: true,
                    label: 'Count',
                    data,
                    borderColor: borderColor[criteria],
                    backgroundColor: backgroundColor[criteria],
                  },
                ],
              }}
            />
          </Card>
        </Column>
        <Column>
          <Card title="Blocked Sites">
            <MissionControlBlockedSites blockedSites={blockedSites} />
          </Card>
          <Card title="Astros">
            {obtainedAstros.map(astro => (
              <div key={astro.id}>{astro.id}</div>
            ))}
          </Card>
        </Column>
      </Body>
    </PageLayout>
  )
}

export { Stats }
