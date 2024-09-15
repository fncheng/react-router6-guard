import { defer } from 'react-router-dom'
import { useNumber } from './useNumber'

export const userLoader = async () => {
  const number = useNumber()
  return defer({ number })
}
