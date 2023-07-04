import { useDelayUnmount } from 'hooks'
import React, { useEffect, useState } from 'react'
import { Astro } from 'types'
import styled from 'styled-components'
import { getAstroLabel } from 'utils'
import { IconStar } from 'components'

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
  background-color: #15043b;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AstroLabel = styled.div`
  font-size: 50px;
  font-weight: 700;
  color: white;
`

const Subtitle = styled.div`
  font-size: 35px;
  font-weight: 700;
  color: #2dbe90;
`

const Star = styled(IconStar)`
  width: 220px;
  height: 220px;
  fill: #fff9b0;
  padding-top: 20px;
`

interface FocusModeAstroAchievedBackdropProps {
  astro: Astro | null
  onClose: () => void
}

function FocusModeAstroAchievedBackdrop(props: FocusModeAstroAchievedBackdropProps) {
  const { astro, onClose } = props

  // Hack so that the astro label is not empty when the backdrop is unmounted
  const [astroLabel, setAstroLabel] = useState<string>('')

  const shouldRenderChild = useDelayUnmount(astro !== null, 300)
  const mountedStyle = { animation: 'slideInAnimation 500ms cubic-bezier(0.33, 1, 0.68, 1)' }
  const unmountedStyle = { animation: 'slideOutAnimation 520ms cubic-bezier(0.32, 0, 0.67, 0)' }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (astro !== null) timeoutId = setTimeout(() => onClose(), 4000)
    return () => clearTimeout(timeoutId)
  }, [astro, onClose])

  useEffect(() => {
    if (astro) setAstroLabel(getAstroLabel(astro))
  }, [astro])

  if (!shouldRenderChild || !astroLabel) return <></>

  return (
    <Backdrop style={astro !== null ? mountedStyle : unmountedStyle}>
      <Container>
        <AstroLabel>{astroLabel}</AstroLabel>
        <Subtitle>obtained!</Subtitle>
        <Star />
      </Container>
    </Backdrop>
  )
}

export { FocusModeAstroAchievedBackdrop }
export type { FocusModeAstroAchievedBackdropProps }
