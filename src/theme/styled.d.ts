import 'styled-components'
import { Theme } from './theme'

declare module 'styled-components' {
  // empty brackets are necessary for 'extends' to work.
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
