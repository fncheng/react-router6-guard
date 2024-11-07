import { observer } from 'mobx-react'
import counterStore, { counterStore1 } from './store'
import { useState } from 'react'

const Mobx = observer(() => {
    const { count, increment } = counterStore()
    const [state] = useState(counterStore1())
    const { count: count1, increment: increment1 } = state
    return (
        <div>
            <div>
                <h5>counterStore</h5>
                <button onClick={increment}>set count</button>
                <span>{count}</span>
            </div>
            <div>
                <h5>counterStore1</h5>
                <button onClick={increment1}>set count</button>
                <span>{count1}</span>
            </div>
        </div>
    )
})

export default Mobx
