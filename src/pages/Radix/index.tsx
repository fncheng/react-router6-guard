import { safeJSONParse } from '@/hooks/json'
import { Flex, Grid, Text } from '@radix-ui/themes'
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

    const json = JSON.stringify(obj)
    console.log('json: ', json)
    useEffect(() => {
        const a = safeJSONParse<typeof obj>(undefined)
        console.log('a', a?.name)
    }, [])

    return (
        <div>
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
        </div>
    )
}
