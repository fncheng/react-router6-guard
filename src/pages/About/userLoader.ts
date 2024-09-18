import { defer } from 'react-router-dom'
import { useNumber } from './useNumber'
import { useName } from './useName'

export const userLoader = async () => {
  const number = useNumber()
  const name = useName()
  return defer({ number, name })
}
