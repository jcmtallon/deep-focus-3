import { FooterNav, PageLayout } from 'apps/popup/components'
import React, { useCallback, useEffect, useState } from 'react'
import { sendMessage } from 'services/actions'
import { listBlockedSites, deleteBlockedSite } from 'services/blockedSites'
import * as S from './BlockedSites.styles'

function BlockedSites() {
  const [inputValue, setInputValue] = useState('')
  const [blockedSites, setBlockedSites] = useState<{ url: string; id: number }[]>([])

  const fetchData = useCallback(async () => {
    // TODO: Leave this to the BE?
    const blockedSites = await listBlockedSites()
    setBlockedSites(blockedSites)
  }, [setBlockedSites])

  const handleAddClick = () => {
    // TODO: Make send message return a promise
    sendMessage('addBlockedSite', { urlFilter: inputValue })
    setInputValue('')
    setTimeout(() => {
      fetchData()
    }, 100)
  }

  const handleDeleteClick = async (id: number) => {
    await deleteBlockedSite(id)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <PageLayout footer={<FooterNav activeElement="asteroids" />} header={<></>}>
      <S.Wrapper>
        <span>Asteroids!</span>
        <S.Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <S.Button type="button" onClick={handleAddClick}>
          Add asteroid
        </S.Button>
        <S.EntryList>
          {blockedSites.map(({ url, id }) => (
            <S.Entry type="button" onClick={() => handleDeleteClick(id)} key={id}>
              {url}
            </S.Entry>
          ))}
        </S.EntryList>
      </S.Wrapper>
    </PageLayout>
  )
}

export { BlockedSites }
