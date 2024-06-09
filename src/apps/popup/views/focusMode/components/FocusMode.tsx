import { FooterNav, Header, PageLayout } from 'apps/popup/components'
import React, { useEffect, useMemo, useState } from 'react'
import { sendMessage } from 'services/actions'
import { AstroName, Category, FocusSession, Task } from 'types'
// Get focus session from store instead
import { getActiveFocusSession, getFocusSessionsByDay } from 'services/focusSessions'
import { DateTime } from 'luxon'
import { getFocusSessionPointsBreakdown } from 'utils'
import {
  pauseBackgroundAudio,
  playBackgroundAudio,
  changeBackgroundAudioVolume,
  getBackgroundAudioPlaying,
  getBackgroundAudioVolume,
  getBackgroundAudioTrack,
  AudioTrack,
} from 'services/audio'
import { listCategories } from 'services/categories'
import { FocusModeLayout } from './FocusModeLayout'
import { FocusModesStats } from './FocusModeStats/FocusModeStats'
import { FocusModeActions } from './FocusModeActions/FocusModeActions'
import { FocusModeTasks } from './FocusModeTasks/FocusModeTasks'
import { FocusModeFinishedSessionBackdrop } from './FocusModeFinishedSessionBackdrop'

// TODO: Try to use FocusSession instead of Session or FocusMode

function FocusMode() {
  const [activeFocusSession, setActiveFocusSession] = useState<FocusSession | null | undefined>(undefined)
  const [completedSessions, setCompletedSessions] = useState<FocusSession[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [lastFocusSession, setLastFocusSession] = useState<FocusSession | null>(null)
  const [openFocusSessionBackdrop, setOpenFocusSessionBackdrop] = useState(false)
  const [obtainedAstroName, setObtainedAstro] = useState<AstroName | null>(null)

  const [playing, setPlaying] = useState<undefined | boolean>(undefined)
  const [volume, setVolume] = useState<undefined | number>(undefined)
  const [track, setTrack] = useState<undefined | keyof typeof AudioTrack>(undefined)

  const isFocusSessionOn = Boolean(activeFocusSession)
  const isFirstLoadCompleted = activeFocusSession !== undefined

  useEffect(() => {
    const getFocusModeStatus = async () => {
      const activeFocusSession = await getActiveFocusSession()
      const completedSessions = await getFocusSessionsByDay(DateTime.now())
      setCompletedSessions(completedSessions)
      setActiveFocusSession(activeFocusSession ?? null)
    }
    getFocusModeStatus()
  }, [])

  useEffect(() => {
    const getBackgroundAudioSettings = async () => {
      const playing = await getBackgroundAudioPlaying()
      const volume = await getBackgroundAudioVolume()
      const track = await getBackgroundAudioTrack()
      setPlaying(playing)
      setVolume(volume)
      setTrack(track)
    }
    getBackgroundAudioSettings()
  }, [])

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }
    fetchCategoryData()
  }, [])

  const handlePauseBackgroundAudio = () => {
    pauseBackgroundAudio({
      responseCallback: () => {
        setPlaying(false)
      },
    })
  }

  const handlePlayBackgroundAudio = () => {
    playBackgroundAudio({
      track,
      volume,
      responseCallback: () => {
        setPlaying(true)
      },
    })
  }

  const activeSessionCategory = useMemo(() => {
    return categories.find(c => c.id === activeFocusSession?.categoryId)
  }, [categories, activeFocusSession])

  const handleStartSession = async (category: Category | undefined) => {
    const response = await sendMessage('startFocusMode', { category })
    if (!response) return // TODO: handle possible error
    handlePlayBackgroundAudio()
    setActiveFocusSession(response as FocusSession)
  }

  const handleAbortSession = async () => {
    sendMessage('stopFocusMode')
    handlePauseBackgroundAudio()
    setActiveFocusSession(null)
  }

  const handleExtendSession = async (taskTitle: string) => {
    const response = await sendMessage('extendFocusSession', { taskTitle })
    if (!response) return // TODO: handle possible error
    setActiveFocusSession(response as FocusSession)
  }

  const handleFinishSession = async (session: FocusSession) => {
    const finishedSession = { ...session, endDate: new Date().getTime() }
    const pointsBreakdown = getFocusSessionPointsBreakdown(finishedSession)
    const results = (await sendMessage('finishFocusSession', {
      session: { ...finishedSession, points: pointsBreakdown.total },
    })) as { astro: AstroName | null } // TODO: type sendMessage instead of casting.

    handlePauseBackgroundAudio()
    const completedSessions = await getFocusSessionsByDay(DateTime.now())
    if (results.astro) setObtainedAstro(results.astro)
    setLastFocusSession(finishedSession)
    setOpenFocusSessionBackdrop(true)

    // So we don't display the completed session info until the backdrop is
    // completely covering the screen.
    setTimeout(() => {
      setCompletedSessions(completedSessions)
      setActiveFocusSession(null)
    }, 400)
  }

  const handleTaskStatusChange = async (tasks: Task[]) => {
    const response = await sendMessage('updateTasks', { tasks })
    if (!response) return // TODO: handle possible error
    setActiveFocusSession(prev => (prev ? { ...prev, tasks } : prev))
  }

  const handleOnSessionFinishedBackdropClose = () => {
    setOpenFocusSessionBackdrop(false)
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value) / 100
    setVolume(volume)

    changeBackgroundAudioVolume({
      volume,
      responseCallback: changed => {
        if (changed) setVolume(volume)
      },
    })
  }

  const backgroundMusicButtonClick = () => {
    if (playing) {
      handlePauseBackgroundAudio()
    } else {
      handlePlayBackgroundAudio()
    }
  }

  return (
    <>
      <PageLayout
        header={<Header />}
        footer={
          <FooterNav
            activeElement="focusMode"
            asteroidButtonProps={{ disabled: isFocusSessionOn === true }}
          />
        }>
        {isFirstLoadCompleted && (
          <FocusModeLayout
            topSlot={
              <FocusModesStats
                activeFocusSession={activeFocusSession}
                completedSessions={completedSessions}
              />
            }
            centerSlot={
              <>
                <div style={{ display: 'flex' }}>
                  <button onClick={backgroundMusicButtonClick} type="button">
                    {playing ? 'Stop audio' : 'Play audio'}
                  </button>
                  <select
                    value={track}
                    onChange={event => setTrack(event.target.value as keyof typeof AudioTrack)}>
                    {Object.keys(AudioTrack).map(key => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={(volume || 1) * 100}
                  onChange={handleVolumeChange}
                />
                <br />
                <br />
                {activeSessionCategory && (
                  <div style={{ backgroundColor: activeSessionCategory.color }}>
                    {activeSessionCategory.name}
                  </div>
                )}
                <FocusModeTasks tasks={activeFocusSession?.tasks} onChange={handleTaskStatusChange} />
              </>
            }
            bottomSlot={
              <FocusModeActions
                session={activeFocusSession ?? undefined}
                onStartSession={handleStartSession}
                onAbortSession={handleAbortSession}
                onExtendSession={handleExtendSession}
                onFinishSession={handleFinishSession}
              />
            }
          />
        )}
      </PageLayout>
      <FocusModeFinishedSessionBackdrop
        focusSession={lastFocusSession}
        open={openFocusSessionBackdrop}
        astro={obtainedAstroName}
        onClose={handleOnSessionFinishedBackdropClose}
      />
    </>
  )
}

export { FocusMode }
