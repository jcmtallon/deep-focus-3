import React from 'react'
import styled from 'styled-components'
import { useDelayUnmount } from 'hooks'
import { IconX } from './icons'

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  overflow: hidden;

  // FIXME: Think a proper z-index scale.
  z-index: 100;

  background: rgb(26, 29, 97);
  background: linear-gradient(180deg, rgba(26, 29, 97, 1) 0%, rgba(38, 63, 129, 1) 100%);
  color: white;
`

const IconWrapper = styled.div`
  font-size: 10px;
  width: fit-content;
  height: fit-content;

  position: absolute;
  top: 10px;
  right: 10px;

  padding: 2px;
  font-size: 12px;
`

interface SlidePanelProps {
  /**
   * If `true` opens slide panel dialog with a slide in transition.
   * If `false` closes slide panel dialog with a slide out transition.
   */
  open: boolean

  /**
   * Callback function triggered when the slide panel close button is clicked.
   */
  onClose?: () => void

  /**
   * The duration of the slide in transition in milliseconds.
   * @default 520
   */
  startTransitionDuration?: number

  /**
   * The duration of the slide out transition in milliseconds.
   * @default 300
   */
  endTransitionDuration?: number

  /**
   * The content of the slide panel.
   */
  children: React.ReactNode

  /**
   * If `true`, displays close button on the top right corner of the drawer
   * Default: `true`
   */
  showCloseButton?: boolean
}

function SlidePanel(props: SlidePanelProps) {
  const {
    open,
    onClose,
    showCloseButton = true,
    startTransitionDuration = 520,
    endTransitionDuration = 300,
    children,
  } = props

  const shouldRenderChild = useDelayUnmount(open, endTransitionDuration)

  const mountedStyle = {
    animation: `slideLeftAnimation ${startTransitionDuration}ms cubic-bezier(0.33, 1, 0.68, 1)`,
  }

  // 20 is a safety buffer so the animation doesn't finish before the unmounting,
  // causing the component to flicker.
  const unmountedStyle = {
    animation: `slideRightAnimation ${endTransitionDuration + 10}ms cubic-bezier(0.32, 0, 0.67, 0)`,
  }

  if (!shouldRenderChild) return <></>

  return (
    <Backdrop style={open ? mountedStyle : unmountedStyle}>
      {children}
      {showCloseButton && (
        <IconWrapper tabIndex={0} role="button" onClick={() => onClose?.()}>
          <IconX />
        </IconWrapper>
      )}
    </Backdrop>
  )
}

export { SlidePanel }
export type { SlidePanelProps }
