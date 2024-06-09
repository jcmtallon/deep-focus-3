import React, { useEffect, useState } from 'react'
import { listCategories } from 'services/categories'
import styled from 'styled-components'
import { Category, FocusSession } from 'types'

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

// const Input = styled.input`
//   width: 100%;
//   background-color: transparent;
//   border: 2px solid #9497d3;
//   color: #9497d3;
//   text-align: center;
//   font-size: 16px;
//   font-weight: 700;
//   padding: 8px;

//   :focus {
//     outline: none;
//     color: white;
//     border: 2px solid white;
//   }
// `

interface FocusModeActionsProps {
  session?: FocusSession

  onStartSession?: (category: Category | undefined) => void
  onExtendSession?: (taskTitle: string) => void
  onAbortSession?: () => void
  onFinishSession?: (session: FocusSession) => void
}

function FocusModeActions(props: FocusModeActionsProps) {
  const { session, onStartSession, onAbortSession, onFinishSession, onExtendSession } = props

  const [input] = useState<string>('')

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)

  const allSessionTasksCompleted = session?.tasks.every(t => t.status === 'COMPLETED')

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }
    fetchCategoryData()
  }, [])

  const handleFocusModeStart = () => {
    onStartSession?.(selectedCategory)
  }

  const handleFinishSession = (finishedSession: FocusSession) => {
    onFinishSession?.(finishedSession)
  }

  const handleExtendSession = () => {
    onExtendSession?.(input.trim()) // TODO: Deprecate extending session with a task.
  }

  // const handleSessionStartInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
  //   if (event.key === 'Enter') {
  //     handleFocusModeStart()
  //   }
  // }

  // const handleInSessionInputKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
  //   if (event.key === 'Enter') {
  //     if (input !== '') {
  //       handleExtendSession()
  //     } else {
  //       handleFinishSession(session!) // TODO: Dangerous
  //     }
  //   }
  // }

  if (!session) {
    return (
      <Wrapper>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus -- For now */}
        {/* <Input
          placeholder="What’s your next quest"
          autoFocus
          value={input}
          onKeyDown={handleSessionStartInputKeyDown}
          onChange={e => setInput(e.target.value)}
        /> */}
        <select
          placeholder="hey"
          // eslint-disable-next-line jsx-a11y/no-autofocus -- For now
          autoFocus
          value={selectedCategory?.id ?? 'default'}
          onChange={e => {
            const category = categories.find(c => c.id === Number(e.target.value))
            setSelectedCategory(category ?? undefined)
          }}>
          <option value="default" disabled>
            Select a category
          </option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Button onClick={handleFocusModeStart}>Start Focus Session</Button>
      </Wrapper>
    )
  }

  if (allSessionTasksCompleted) {
    return (
      <Wrapper>
        {/* <Input
          placeholder="Combo another quest"
          autoFocus
          value={input}
          onKeyDown={handleInSessionInputKeyDown}
          onChange={e => setInput(e.target.value)}
        /> */}
        {input !== '' ? (
          <Button onClick={handleExtendSession}>Continue the session</Button>
        ) : (
          <SuccessButton onClick={() => handleFinishSession(session)}>Finish session</SuccessButton>
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
