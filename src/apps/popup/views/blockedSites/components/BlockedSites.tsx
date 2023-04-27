import { FooterNav, PageLayout } from 'apps/popup/components'
import React from 'react'

function BlockedSites() {
  return (
    <PageLayout footer={<FooterNav activeElement="asteroids" />} header={<>Header</>}>
      <>
        <span>Asteroids!</span>
        Some form
      </>
    </PageLayout>
  )
}

export { BlockedSites }
