import styled from 'styled-components'
import { IconStar } from 'components'

const ProgressBar = styled.div`
  width: 100%;
  background-color: #180850;
  border-radius: 50px;
  margin-top: 10px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #fff9b0;
  border-radius: 50px;
  position: relative;
`

const Star = styled(IconStar)`
  fill: #2d1b6c;
  position: absolute;
`

const ImpactContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
`

const Impact = styled.div`
  background: #c92626;
  border-radius: 50%;
`

export { ProgressBar, ProgressBarFill, Star, ImpactContainer, Impact }
