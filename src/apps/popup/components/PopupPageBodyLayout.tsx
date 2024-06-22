import React, { ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: hidden;
  padding: 40px 16px 16px;
`

const Title = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`

const Subtitle = styled.div`
  display: flex;
  color: #9596b6;
  justify-content: center;
  font-size: 14px;
`

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow-y: auto;
  padding: 20px 0px 0px;
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding-top: 16px;
`

interface PopupPageBodyLayoutProps {
  /**
   * Title at the the top of the body section.
   */
  title?: ReactNode
  /**
   * For displaying a subtitle under the title.
   */
  subtitle?: ReactNode
  /**
   * For displaying the primary action at the bottom of the body section.
   * Generally used for the main Add entity button of the page.
   */
  primaryAction?: ReactNode
  /**
   * For displaying the secondary action at the bottom of the body section.
   */
  secondaryAction?: ReactNode
  /**
   * Main content of the page.
   */
  children: ReactNode
}

function PopupPageBodyLayout(props: PopupPageBodyLayoutProps) {
  const { children, title, subtitle, primaryAction, secondaryAction } = props

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Body>{children}</Body>
      <Footer>
        {secondaryAction && <>{secondaryAction}</>}
        {primaryAction && <>{primaryAction}</>}
      </Footer>
    </Wrapper>
  )
}

export { PopupPageBodyLayout }
export type { PopupPageBodyLayoutProps }
