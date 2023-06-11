import React from 'react'
import { DateTime } from 'luxon'
import * as S from './MissionControlHeader.styles'

interface MissionControlHeaderProps {
  selectedDate: DateTime
  setSelectedDate: (date: DateTime) => void
}

function MissionControlHeader(props: MissionControlHeaderProps) {
  const { selectedDate, setSelectedDate } = props
  return (
    <S.Wrapper>
      <S.Button type="button" onClick={() => setSelectedDate(selectedDate.plus({ day: -1 }))}>
        Prev
      </S.Button>
      <S.DateDisplay>{selectedDate.toFormat('yyyy LLL dd')}</S.DateDisplay>
      <S.Button type="button" onClick={() => setSelectedDate(selectedDate.plus({ day: 1 }))}>
        Next
      </S.Button>
    </S.Wrapper>
  )
}

export { MissionControlHeader }
