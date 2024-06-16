import { ReactNode, createContext, useContext } from 'react'

interface PopupPageLayoutProps {
  header?: ReactNode
  footer?: ReactNode
}

const popupPageLayoutContext = createContext<PopupPageLayoutProps>({
  header: undefined,
  footer: undefined,
})

function usePopupPageLayoutProps() {
  return useContext(popupPageLayoutContext)
}

const PopupPageLayoutPropsProvider = popupPageLayoutContext.Provider
const PopupPageLayoutPropsConsumer = popupPageLayoutContext.Consumer

export { PopupPageLayoutPropsProvider, usePopupPageLayoutProps, PopupPageLayoutPropsConsumer }
export type { PopupPageLayoutProps }
