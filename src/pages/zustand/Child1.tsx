import { useZStore } from '@/store'
import { memo } from 'react'
import { useShallow } from 'zustand/shallow'

const ChildA: React.FC = () => {
    const { count, increment } = useZStore(
        useShallow((store) => ({
            count: store.count,
            increment: store.increment
        }))
    )
    console.log('child a render')
    return (
        <div>
            <h3>child a</h3>
            <button onClick={increment}>set count</button>
            <span>{count}</span>
        </div>
    )
}

export default memo(ChildA)
