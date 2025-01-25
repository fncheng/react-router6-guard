import { useZStore } from '@/store'
import { memo } from 'react'
import { useShallow } from 'zustand/shallow'

const ChildB: React.FC = () => {
    const { name, updateName } = useZStore(
        useShallow((store) => ({
            name: store.name,
            updateName: store.updateName
        }))
    )
    console.log('child b render')
    return (
        <div>
            <h3>child b</h3>
            <button onClick={updateName}>updateName</button>
            <span>{name}</span>
        </div>
    )
}

export default memo(ChildB)
