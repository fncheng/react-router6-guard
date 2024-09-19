import { defer } from 'react-router-dom'
import { useNumber } from './useNumber'
import { useName } from './useName'

export const userLoader = async () => {
  const abortController = new AbortController()
  const { signal } = abortController
  const number = useNumber(signal)
  const name = useName(signal)
  return defer({ number, name, abortController });
}
