import { FooterNav, PageLayout } from 'apps/popup/components'
import React, { useCallback, useEffect, useState } from 'react'
import { listCategories, deleteCategory, addCategory } from 'services/categories'
import { Category, Settings } from 'types'
import { DEFAULT_SETTINGS, editSettings, getSettings } from 'services/settings'
import * as S from './BlockedSitesV0.styles'

function BlockedSitesV0() {
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  const [categoryColor, setCategoryColor] = useState('#000000')

  const fetchCategoryData = useCallback(async () => {
    const categories = await listCategories()
    setCategories(categories)
  }, [setCategories])

  const fetchSettings = useCallback(async () => {
    try {
      const settings = await getSettings()
      if (settings) setSettings(settings)
    } catch (error) {
      // TODO: Handle error
    }
  }, [setSettings])

  const handleAddCategoryClick = async () => {
    await addCategory({ name: categoryInputValue, color: categoryColor })
    setCategoryInputValue('')
    setTimeout(() => {
      fetchCategoryData()
    }, 100)
  }

  const handleDeleteCategoryClick = async (id: number) => {
    await deleteCategory(id)
    fetchCategoryData()
  }

  useEffect(() => {
    fetchCategoryData()
    fetchSettings()
  }, [fetchCategoryData, fetchSettings])

  const handleEditTargetDuration = (index: number, value: string) => {
    const minutes = value !== '' ? parseInt(value, 10) : 0
    const newTargetFocusDurationPerDay = { ...settings.targetFocusDurationPerDay, [index]: minutes }
    const newSettings = { ...settings, targetFocusDurationPerDay: newTargetFocusDurationPerDay }
    editSettings(newSettings)
    setSettings(newSettings)
  }

  return (
    <PageLayout footer={<FooterNav activeElement="asteroids" />} header={<></>}>
      <S.Wrapper>
        <span>Settings</span>
        <div style={{ display: 'flex', columnGap: '5px' }}>
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[0]}
            onChange={e => handleEditTargetDuration(0, e.target.value)}
          />
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[1]}
            onChange={e => handleEditTargetDuration(1, e.target.value)}
          />
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[2]}
            onChange={e => handleEditTargetDuration(2, e.target.value)}
          />
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[3]}
            onChange={e => handleEditTargetDuration(3, e.target.value)}
          />
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[4]}
            onChange={e => handleEditTargetDuration(4, e.target.value)}
          />
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[5]}
            onChange={e => handleEditTargetDuration(5, e.target.value)}
          />
          <input
            type="number"
            style={{ width: '40px' }}
            value={settings.targetFocusDurationPerDay[6]}
            onChange={e => handleEditTargetDuration(6, e.target.value)}
          />
        </div>
        <span>Categories!</span>
        <input type="color" value={categoryColor} onChange={e => setCategoryColor(e.target.value)} />
        <S.Input value={categoryInputValue} onChange={e => setCategoryInputValue(e.target.value)} />
        <S.Button type="button" onClick={handleAddCategoryClick}>
          Add category
        </S.Button>
        <S.EntryList>
          {categories.map(({ name, id, color }) => (
            <S.Entry
              style={{ backgroundColor: color }}
              type="button"
              onClick={() => handleDeleteCategoryClick(id)}
              key={id}>
              {name}
            </S.Entry>
          ))}
        </S.EntryList>
      </S.Wrapper>
    </PageLayout>
  )
}

export { BlockedSitesV0 }
