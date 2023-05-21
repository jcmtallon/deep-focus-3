import React, { useState } from 'react'
import styled from 'styled-components'
import { FocusSession } from 'types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  width: 260px;
`

const Button = styled.button`
  background-color: #27b2f7;
  font-size: 18px;
  font-weight: 700;
  color: white;
  border-radius: 6px;
  padding: 7px 28px;
  width: 100%;
`

const DangerButton = styled(Button)`
  background-color: #e5541e;
  color: #fffeb6;
`

const SuccessButton = styled(Button)`
  background-color: #2dbe90;
  color: white;
`

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border: 2px solid #9497d3;
  color: #9497d3;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 8px;

  :focus {
    outline: none;
    color: white;
    border: 2px solid white;
  }
`

interface FocusModeActionsProps {
  session?: FocusSession

  onStartSession?: (taskTitle: string) => void
  onExtendSession?: (taskTitle: string) => void
  onAbortSession?: () => void
  onFinishSession?: () => void
}

function FocusModeActions(props: FocusModeActionsProps) {
  const { session, onStartSession, onAbortSession, onFinishSession, onExtendSession } = props

  const [input, setInput] = useState<string>('')

  const allSessionTasksCompleted = session?.tasks.every(t => t.status === 'COMPLETED')

  const handleFocusModeStart = () => {
    onStartSession?.(input.trim())
    setInput('')
  }

  const handleFinishSession = () => {
    onFinishSession?.()
    setInput('')
  }

  const handleExtendSession = () => {
    onExtendSession?.(input.trim())
    setInput('')
  }

  if (!session) {
    return (
      <Wrapper>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus -- For now */}
        <Input
          placeholder="What’s your next quest"
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <Button disabled={input.length === 0} onClick={handleFocusModeStart}>
          Start Focus Session
        </Button>
      </Wrapper>
    )
  }

  if (allSessionTasksCompleted) {
    return (
      <Wrapper>
        <Input
          placeholder="Combo another quest"
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        {input !== '' ? (
          <Button onClick={handleExtendSession}>Continue the session</Button>
        ) : (
          <SuccessButton onClick={handleFinishSession}>Finish session</SuccessButton>
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <DangerButton onClick={onAbortSession}>Abort Session</DangerButton>
    </Wrapper>
  )
}

export { FocusModeActions }
export type { FocusModeActionsProps }
