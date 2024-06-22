import { useEffect, useState } from 'react'

/**
 * Useful for delaying the unmount of a component until a certain time has passed,
 * for example, to allow an animation to play out before the component is removed from the DOM.
 */
function useDelayUnmount(isMounted: boolean, delayTime: number): boolean {
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

export { useDelayUnmount }
