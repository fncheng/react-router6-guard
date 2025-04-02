import { useQueryClient } from '@tanstack/react-query'
import { Tabs, type TabsProps } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { fetchUsers } from './query/api'

const MotionDemo = () => {
    const queryClient = useQueryClient()
    const location = useLocation()
    const currentPath = location.pathname.split('/').pop() || ''

    const prefetchUser = () => {
        queryClient.prefetchQuery({
            queryKey: ['users'],
            queryFn: fetchUsers
        })
    }

    const navigate = useNavigate()
    const items: TabsProps['items'] = [
        {
            key: '',
            label: 'query'
        },
        {
            key: 'b',
            label: 'position left'
        },
        {
            key: 'c',
            label: 'transform translateX'
        }
    ]
    const handleTabClick = (key: string) => {
        // if (key === 'b') {
        //     prefetchUser()
        // }
        navigate(`/query/${key}`)
    }

    console.log('query render')
    return (
        <>
            <Tabs activeKey={currentPath} className='float-right' items={items} onTabClick={handleTabClick} />
            <Outlet />
        </>
    )
}

export default MotionDemo
