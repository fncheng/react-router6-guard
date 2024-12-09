import { abortRequest } from '@/api'
import { getId, getNumber, getNumberAbort } from '@/api/api'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MyCom1 from './Component'

const Axios: React.FC = () => {
    const [number, setNumber] = useState(0)
    const [count, setCount] = useState(0)

    const { t, i18n } = useTranslation()

    const handleStartRequest = async () => {
        const res = await getNumber()
        if (res?.number) {
            setNumber(res.number)
            setCount(res.number)
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
            <Button onClick={handleStartRequest}>{t('start')}</Button>
            <span>number: {number}</span>
            <div>{ count}</div>
            <MyCom1 count={count} />
            <Button onClick={handleCancel}>{t('cancel')}</Button>
            <div>
                <Button type='primary' onClick={() => i18n.changeLanguage('zh-CN')}>中文</Button>
                <Button onClick={() => i18n.changeLanguage('en-US')}>English</Button>
            </div>
        </div>
    )
}

export default Axios
