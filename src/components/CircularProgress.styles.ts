import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`

const Svg = styled.svg`
  animation: progress-animation 1s linear 0s 1 forwards;
`

const CircleBackground = styled.circle<{ size: number; strokeWidth: number }>`
  cx: ${props => props.size / 2};
  cy: ${props => props.size / 2};
  r: ${props => (props.size - props.strokeWidth) / 2};
  stroke-width: ${props => props.strokeWidth};
  fill: none;
  stroke-linecap: round;
  stroke: #2668a950;
`

const CircleForeground = styled.circle<{
  size: number
  strokeWidth: number
  dash: number
  circumference: number
}>`
  cx: ${props => props.size / 2};
  cy: ${props => props.size / 2};
  r: ${props => (props.size - props.strokeWidth) / 2};
  stroke-width: ${props => props.strokeWidth};
  fill: none;
  stroke-linecap: butt;
  transform: rotate(-90deg);
  transform-origin: center;
  stroke-dasharray: ${props => props.dash} ${props => props.circumference - props.dash};
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #fdc828;
`

/** A copy of the CircleForeground, but with a different color. */
const DangerForeground = styled.circle<{
  size: number
  strokeWidth: number
  dash: number
  circumference: number
}>`
  cx: ${props => props.size / 2};
  cy: ${props => props.size / 2};
  r: ${props => (props.size - props.strokeWidth) / 2};
  stroke-width: ${props => props.strokeWidth};
  fill: none;
  stroke-linecap: butt;
  transform: rotate(-90deg);
  transform-origin: center;
  stroke-dasharray: ${props => props.dash} ${props => props.circumference - props.dash};
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: #f5576e;
`

const ChildrenWrapper = styled.div<{ size: number }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export { Svg, Wrapper, CircleForeground, CircleBackground, DangerForeground, ChildrenWrapper }
