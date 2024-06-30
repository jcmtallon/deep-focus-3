import React from 'react'
import { PopupPageLayout } from 'apps/popup/components'

// So far, this component is displayed for a very brief moment of time,
// so it's not worth it adding it some loading animation.
function FocusControlsSkeleton() {
  return (
    <PopupPageLayout hideFooter hideHeader>
      <></>
    </PopupPageLayout>
  )
}

export { FocusControlsSkeleton }
