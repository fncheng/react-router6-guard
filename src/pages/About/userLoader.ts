import { defer } from 'react-router-dom'
import { useNumber } from './useNumber'
import { useName } from './useName'
import { useFetchPieData } from './useFetchPieData'

export const userLoader = async () => {
    const abortController = new AbortController()
    const { signal } = abortController
    const number = useNumber(signal)
    const name = useName(signal)
    const data = useFetchPieData()
    return defer({ number, name, data, abortController })
}
