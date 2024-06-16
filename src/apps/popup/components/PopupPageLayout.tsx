import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { PopupPageBackground } from './PopupPageBackground'
import { usePopupPageLayoutProps } from './PopupPageLayoutProvider'

const Page = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  overflow: hidden;
`

const Header = styled.header<{ hide: boolean }>`
  display: flex;
  width: 100%;
  height: 25px;
  padding: 0 8px;
  background-color: #23599b25;
  position: absolute;
  top: 0;

  ${({ hide }) => hide && `transform: translateY(-25px);`}
`

const Footer = styled.footer`
  display: flex;
  height: 54px;
  padding: 0px 16px 4px;
`

interface PopupPageLayoutProps {
  /**
   * Dedicated for volume and other controls.
   */
  header?: ReactNode
  /**
   * Main content of the page.
   */
  children: ReactNode
  /**
   * Dedicated for cross-page navigation element.
   */
  footer?: ReactNode
  /**
   * Moves the header outside the page with an animation effect.
   * @default false
   */
  hideHeader?: boolean
  /**
   * Moves the footer outside the page with an animation effect.
   * @default false
   */
  hideFooter?: boolean
}

function PopupPageLayout(props: PopupPageLayoutProps) {
  const { children, footer: propsFooter, header: propsHeader, hideHeader = false, hideFooter = false } = props

  const providerProps = usePopupPageLayoutProps()

  const header = propsHeader ?? providerProps.header
  const footer = propsFooter ?? providerProps.footer

  return (
    <PopupPageBackground>
      <Header hide={hideHeader}>{header}</Header>
      <Page>{children}</Page>
      <Footer>{footer}</Footer>
    </PopupPageBackground>
  )
}

export { PopupPageLayout }
export type { PopupPageLayoutProps }
