import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;

  z-index: 100; // TODO: Think a proper z-index scale
  background-color: #15043B;

  transform: translateY(500px)
  opacity: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;
`

const Title = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #e8bb3f;
`

const Count = styled.div`
  margin-top: 50px;
  font-size: 3rem;
  font-weight: 700;
  color: #e05022;
`

function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (isMounted && !shouldRender) {
      setShouldRender(true)
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])

  return shouldRender
}

interface MissionControlBlockedSiteBackdropProps {
  open: boolean
  setIsOpen: (open: boolean) => void
}

function MissionControlBlockedSiteBackdrop(props: MissionControlBlockedSiteBackdropProps) {
  const { open, setIsOpen } = props
  const shouldRenderChild = useDelayUnmount(open, 200)
  const mountedStyle = { opacity: 1, transform: 'translateY(0px)', transition: 'opacity 1000ms ease-in' }
  const unmountedStyle = {
    opacity: 0,
    transform: 'translateY(-500px)',
    transition: 'opacity 200ms ease-in, transform 200ms ease-in',
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (open === true) timeoutId = setTimeout(() => setIsOpen(false), 1000)
    return () => clearTimeout(timeoutId)
  }, [open, setIsOpen])

  return (
    <>
      {shouldRenderChild && (
        <Backdrop style={open ? mountedStyle : unmountedStyle}>
          <Container>
            <Title>Blocked site!</Title>
            <Count>+1 Damage</Count>
          </Container>
        </Backdrop>
      )}
    </>
  )
}

export { MissionControlBlockedSiteBackdrop }