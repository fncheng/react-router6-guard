import { observable } from 'mobx'
import { useLocalObservable } from 'mobx-react'

type CounterStore = {
    count: number
    increment?: () => void
}

export const counterStore1 = () => {
    const store = observable<CounterStore>({
        count: 0
    })

    store.increment = () => (store.count += 1)

    return store
}

export const counterStore = () => {
    const store = useLocalObservable<CounterStore>(() => ({
        count: 0
    }))

    const increment = () => (store.count += 1)

    return { ...store, increment }
}

export default counterStore
