import { FooterNav, PageLayout } from 'apps/popup/components'
import React, { useCallback, useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { listBlockedSites, deleteBlockedSite } from 'services/blockedSites'
import { listCategories, deleteCategory, addCategory } from 'services/categories'
import { Category } from 'types'
import * as S from './BlockedSites.styles'

function BlockedSites() {
  const [inputBlockedSiteValue, setBlockedSiteInputValue] = useState('')
  const [categoryInputValue, setCategoryInputValue] = useState('')
  const [blockedSites, setBlockedSites] = useState<{ url: string; id: number }[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [categoryColor, setCategoryColor] = useState('#000000')

  const fetchBlockedSiteData = useCallback(async () => {
    // TODO: Leave this to the BE?
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }, [setBlockedSites])

  const fetchCategoryData = useCallback(async () => {
    const categories = await listCategories()
    setCategories(categories)
  }, [setCategories])

  const handleAddClick = () => {
    // TODO: Make send message return a promise
    sendMessage('addBlockedSite', { urlFilter: inputBlockedSiteValue })
    setBlockedSiteInputValue('')
    setTimeout(() => {
      fetchBlockedSiteData()
    }, 100)
  }

  const handleAddCategoryClick = async () => {
    await addCategory({ name: categoryInputValue, color: categoryColor })
    setCategoryInputValue('')
    setTimeout(() => {
      fetchCategoryData()
    }, 100)
  }

  const handleDeleteBlockedSiteClick = async (id: number) => {
    await deleteBlockedSite(id)
    fetchBlockedSiteData()
  }

  const handleDeleteCategoryClick = async (id: number) => {
    await deleteCategory(id)
    fetchCategoryData()
  }

  useEffect(() => {
    fetchBlockedSiteData()
    fetchCategoryData()
  }, [fetchBlockedSiteData, fetchCategoryData])

  return (
    <PageLayout footer={<FooterNav activeElement="asteroids" />} header={<></>}>
      <S.Wrapper>
        <span>Asteroids!</span>
        <S.Input value={inputBlockedSiteValue} onChange={e => setBlockedSiteInputValue(e.target.value)} />
        <S.Button type="button" onClick={handleAddClick}>
          Add asteroid
        </S.Button>
        <S.EntryList>
          {blockedSites.map(({ url, id }) => (
            <S.Entry type="button" onClick={() => handleDeleteBlockedSiteClick(id)} key={id}>
              {url}
            </S.Entry>
          ))}
        </S.EntryList>
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

export { BlockedSites }
