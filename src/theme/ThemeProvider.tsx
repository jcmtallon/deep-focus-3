import React, { ReactNode } from 'react'
import {
  ThemedStyledFunction,
  ThemeProvider as StyledComponentsThemeProvider,
  useTheme,
} from 'styled-components'
import { getTheme } from './theme'

interface ThemeProviderProps {
  children?: ReactNode
}

function ThemeProvider(props: ThemeProviderProps) {
  return <StyledComponentsThemeProvider theme={getTheme()}>{props.children}</StyledComponentsThemeProvider>
}

export { ThemeProvider, useTheme }
export type { ThemedStyledFunction }
