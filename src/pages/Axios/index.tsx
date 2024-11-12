import { abortRequest } from '@/api'
import { getId, getNumber, getNumberAbort } from '@/api/api'
import { Button } from 'antd'
import { useEffect, useState } from 'react'

const Axios: React.FC = () => {
    const [number, setNumber] = useState(0)

    const handleStartRequest = async () => {
        const res = await getNumber()
        if (res?.number) {
            setNumber(res.number)
        }
    }
    const handleCancel = () => {
        abortRequest('/test/getNumber')
    }

    const getUserId = async (id: number) => {
        let res = await getId(id)
        console.log('id', res)
    }

    console.log('render')

    useEffect(() => {
        const { request, controller } = getNumberAbort()
        const fetchData = async () => {
            const data = await request
            if (data?.number) {
                setNumber(data.number)
            }
        }
        fetchData()
        return () => {
            controller.abort()
        }
    }, [])

    useEffect(() => {
        getUserId(18)
        getUserId(20)
        return () => {
            abortRequest('/test/getNumber')
            abortRequest('/test/user?id=18')
            abortRequest('/test/user?id=20')
        }
    }, [])

    return (
        <div>
            <Button onClick={handleStartRequest}>start</Button>
            <span>number: {number}</span>
            <Button onClick={handleCancel}>cancel</Button>
        </div>
    )
}

export default Axios
