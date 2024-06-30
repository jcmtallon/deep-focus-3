import React, { HTMLAttributes, ReactNode, useMemo } from 'react'
import * as S from './CircularProgress.styles'

interface CircularProgressProps extends HTMLAttributes<SVGSVGElement> {
  /**
   * A number between 0 and 100.
   * Displayed with a primary color progress bar.
   */
  mainProgress?: number
  /**
   * A number between 0 and 100.
   * Displayed with a danger color progress bar.
   */
  dangerProgress?: number
  /**
   * Size in pixels of the circular progress bar.
   */
  size?: number
  /**
   * Stroke width in pixels of the circular progress bar.
   */
  strokeWidth?: number

  /**
   * Stroke width in pixels of the circular progress bar.
   */
  children?: ReactNode
}

function CircularProgress(props: CircularProgressProps) {
  const {
    size = 243,
    mainProgress = 0,
    dangerProgress = 0,
    strokeWidth = 25,
    children,
    ...otherProps
  } = props

  const mainProgressProps = useMemo(() => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const dash = (mainProgress * circumference) / 100
    return { dash, circumference, radius, size, strokeWidth }
  }, [size, strokeWidth, mainProgress])

  const dangerProgressProps = useMemo(() => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * Math.PI * 2
    const dash = (dangerProgress * circumference) / 100
    return { dash, circumference, radius, size, strokeWidth }
  }, [size, strokeWidth, dangerProgress])

  return (
    <S.Wrapper>
      <S.ChildrenWrapper size={size}>{children}</S.ChildrenWrapper>
      <S.Svg width={size} height={size} viewBox={`0 0 ${243} ${243}`} {...otherProps}>
        <S.CircleBackground size={size} strokeWidth={strokeWidth} />
        <S.DangerForeground {...dangerProgressProps} />
        <S.CircleForeground {...mainProgressProps} />
      </S.Svg>
    </S.Wrapper>
  )
}

export { CircularProgress }
export type { CircularProgressProps }
