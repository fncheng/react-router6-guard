import { safeJSONParse } from '@/hooks/json'
import { formatDuration, getFriendlyDuration } from '@/hooks/time'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { intersection, intersectionWith, isEqual } from 'lodash-es'
import { useEffect } from 'react'

export default function Radix() {
    const obj1 = null
    const obj2 = undefined
    const obj = {
        name: 'zs',
        nest: {
            age: 20
        }
    }

    const start = 1712250000000 // 示例起始时间戳
    const end = 1712336400000 // 示例结束时间戳

    const json = JSON.stringify(obj)
    console.log('json: ', json)

    const o1 = [{ name: 'zs' }, { name: 'ls' }]
    const o2 = [{ name: 'zs' }]

    console.group(intersectionWith(o1, o2, isEqual))
    console.group(isEqual({ name: 'zs' }, { name: 'zs' }))

    useEffect(() => {
        const a = safeJSONParse<typeof obj>(undefined)
        console.log('a', a?.name)
    }, [])

    return (
        <div>
            <h3>{formatDuration(start, end)}</h3>
            <h3>{formatDuration(1733393241192, 1733393851011)}</h3>
            <h3>{getFriendlyDuration(1733393241192, 1733393851011)}</h3>
            <h1 className='text-red-300'>Radix</h1>
            <div className='grid grid-cols-3 grid-rows-3'>
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <Grid rows={'3'} columns={'3'}>
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </Grid>
            <Flex className='shadow-sm'>
                <Text>01</Text>
                <Text>02</Text>
                <Text>03</Text>
                <div className='flex grid-cols-4 items-center'>
                    <div>01</div>
                    <div>02</div>
                    <div>03</div>
                </div>
            </Flex>
            <div></div>
        </div>
    )
}
