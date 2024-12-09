import { memo } from 'react'

export default memo(function MyCom1(props: { count: number }) {
    let count = props.count || 99
    const handleCountIncrement = () => {
        console.log('you clicked')
        count = count + 1
    }

    console.log('child render')
    return <div onClick={handleCountIncrement}>{count}</div>
})
