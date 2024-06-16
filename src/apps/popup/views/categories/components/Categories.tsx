import { PopupPageLayout, PopupPageBodyLayout } from 'apps/popup/components'
import { Button } from 'components'
import React from 'react'

function Categories() {
  return (
    <PopupPageLayout hideHeader>
      <PopupPageBodyLayout
        title="Clusters"
        subtitle="Group your sessions for better insights"
        primaryAction={<Button>Add cluster</Button>}>
        <>Training</>
        <>Reading</>
        <>Study</>
      </PopupPageBodyLayout>
    </PopupPageLayout>
  )
}

export { Categories }
