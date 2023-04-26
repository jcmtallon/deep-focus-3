import React, { ReactNode, useCallback } from 'react'

interface ErrorDisplayProps {
  className?: string
  title?: ReactNode
  text?: ReactNode
  image?: ReactNode
  showAction?: boolean
  actionText?: ReactNode
  actionCallback?: () => void
}

function ErrorDisplay(props: ErrorDisplayProps) {
  // TODO: provide i18n

  // const history = useHistory()

  const refreshCallback = useCallback(() => {
    // TODO: Allow refresh like:
    // history.replace('/')
    // window.location.reload()
  }, [])

  return (
    <div className={props.className}>
      {props.image ?? <div>Some generic image</div>}
      {props.title ?? <div>Generic title</div>}
      <div>{props.text ?? 'generic description'}</div>
      {props.showAction && (
        <button type="button" onClick={props.actionCallback ?? refreshCallback}>
          {props.actionText ?? 'button text'}
        </button>
      )}
    </div>
  )
}

export default ErrorDisplay
export { ErrorDisplay }
export type { ErrorDisplayProps }
