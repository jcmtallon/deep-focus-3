import { useEffect, useState } from 'react'

/** Breakdowns time units */
const getReturnValues = (countUp: number) => {
  const days = Math.floor(countUp / (1000 * 60 * 60 * 24))
  const hours = Math.floor((countUp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((countUp % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((countUp % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

const getElapsedTime = (startDateTime: number) => {
  return new Date().getTime() - startDateTime
}

const useStopwatch = (startTimestamp: number) => {
  const startDateTime = new Date(startTimestamp).getTime()
  const [countUp, setCountUp] = useState(getElapsedTime(startDateTime))

  useEffect(() => {
    const interval = setInterval(() => {
      setCountUp(getElapsedTime(startDateTime))
    }, 100)

    return () => clearInterval(interval)
  }, [startDateTime])

  return getReturnValues(countUp)
}

export { useStopwatch }
