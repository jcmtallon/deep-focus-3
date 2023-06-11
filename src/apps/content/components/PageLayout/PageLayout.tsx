import React, { ReactNode } from 'react'
import * as S from './PageLayout.styles'

interface PageLayoutProps {
  children: ReactNode
  sideNav?: ReactNode
}

function PageLayout(props: PageLayoutProps) {
  const { children, sideNav } = props

  return (
    <S.Background>
      <S.SideNav>{sideNav}</S.SideNav>
      <S.Page>{children}</S.Page>
    </S.Background>
  )
}

export { PageLayout }
