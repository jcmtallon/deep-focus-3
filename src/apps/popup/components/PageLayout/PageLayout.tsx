import React, { ReactNode } from 'react'
import * as S from './PageLayout.styles'

interface PageLayoutProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
}

function PageLayout(props: PageLayoutProps) {
  const { children, footer, header } = props

  return (
    <S.Wrapper>
      <header>{header}</header>
      <S.Page>{children}</S.Page>
      <footer>{footer}</footer>
    </S.Wrapper>
  )
}

export { PageLayout }
