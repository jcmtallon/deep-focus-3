import { FooterNav, PageLayout } from 'apps/popup/components'
import React from 'react'

function FocusMode() {
  return (
    <PageLayout footer={<FooterNav activeElement="focusMode" />} header={<>Header</>}>
      <>
        <h1>Focus Mode!</h1>
        <>Some contents</>
      </>
    </PageLayout>
  )
}

export { FocusMode }
