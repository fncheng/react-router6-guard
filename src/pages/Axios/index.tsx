import { abortRequest } from '@/api'
import { getNumber, getNumberAbort } from '@/api/api'
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
    return (
        <div>
            <Button onClick={handleStartRequest}>start</Button>
            <span>number: {number}</span>
            <Button onClick={handleCancel}>cancel</Button>
        </div>
    )
}

export default Axios
