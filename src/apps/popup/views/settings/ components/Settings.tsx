import { PopupPageBodyLayout, PopupPageLayout } from 'apps/popup/components'
import { Input as BaseInput } from 'components'
import { DEFAULT_SETTINGS, editSettings, getSettings } from 'services/settings'
import { Settings as SettingsType } from 'types'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 12px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.div`
  font-size: 14px;
  font-weight: bold;
`

const Input: typeof BaseInput = styled(BaseInput)`
  width: 80px;
  text-align: center;
`

function Settings() {
  const [settings, setSettings] = useState<SettingsType>(DEFAULT_SETTINGS)

  const fetchSettings = useCallback(async () => {
    try {
      const settings = await getSettings()
      if (settings) setSettings(settings)
    } catch (error) {
      // TODO: Handle error
    }
  }, [setSettings])

  const handleEditTargetDuration = async (index: number, value: string) => {
    if (value !== '' && Number.isNaN(parseInt(value, 10))) return
    const minutes = value !== '' ? parseInt(value, 10) : null
    const newTargetFocusDurationPerDay = { ...settings.targetFocusDurationPerDay, [index]: minutes }
    const newSettings = { ...settings, targetFocusDurationPerDay: newTargetFocusDurationPerDay }
    await editSettings(newSettings)
    setSettings(newSettings)
  }

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return (
    <PopupPageLayout hideHeader>
      <PopupPageBodyLayout title="Control Deck" subtitle="Set your goals">
        <Wrapper>
          <Row>
            <Label>Mondays</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[0] ?? ''}
              onChange={e => handleEditTargetDuration(0, e.target.value)}
            />
          </Row>
          <Row>
            <Label>Tuesday</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[1] ?? ''}
              onChange={e => handleEditTargetDuration(1, e.target.value)}
            />
          </Row>
          <Row>
            <Label>Wednesday</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[2] ?? ''}
              onChange={e => handleEditTargetDuration(2, e.target.value)}
            />
          </Row>
          <Row>
            <Label>Thursday</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[3] ?? ''}
              onChange={e => handleEditTargetDuration(3, e.target.value)}
            />
          </Row>
          <Row>
            <Label>Friday</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[4] ?? ''}
              onChange={e => handleEditTargetDuration(4, e.target.value)}
            />
          </Row>
          <Row>
            <Label>Saturday</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[5] ?? ''}
              onChange={e => handleEditTargetDuration(5, e.target.value)}
            />
          </Row>
          <Row>
            <Label>Sunday</Label>
            <Input
              placeholder="minutes"
              value={settings.targetFocusDurationPerDay[6] ?? ''}
              onChange={e => handleEditTargetDuration(6, e.target.value)}
            />
          </Row>
        </Wrapper>
      </PopupPageBodyLayout>
    </PopupPageLayout>
  )
}

export { Settings }
