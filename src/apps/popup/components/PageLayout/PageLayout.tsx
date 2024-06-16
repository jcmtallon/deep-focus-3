import React, { ReactNode } from 'react'
import * as S from './PageLayout.styles'
import { PageBackground } from './PageBackground'

interface PageLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

/**
 * TODO: Remove this component
 * @deprecated
 */
function PageLayout(props: PageLayoutProps) {
  const { children, footer, header } = props

  return (
    <PageBackground>
      <header>{header}</header>
      <S.Page>{children}</S.Page>
      <footer>{footer}</footer>
    </PageBackground>
  )
}

export { PageLayout }
