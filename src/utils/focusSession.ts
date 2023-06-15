import { FocusSession } from 'types'

function countFocusSessionImpacts(impacts: FocusSession['impacts']): number {
  if (!impacts) return 0

  return Object.keys(impacts)
    .map(k => (impacts ? impacts[k] : 0))
    .reduce((partialSum, a) => partialSum + a, 0)
}

export { countFocusSessionImpacts }
