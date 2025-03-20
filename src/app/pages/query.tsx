import { Tabs, type TabsProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const MotionDemo = () => {
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
        navigate(`/query/${key}`)
    }
    return (
        <>
            <Tabs defaultActiveKey='' className='float-right' items={items} onTabClick={handleTabClick} />
            <Outlet />
        </>
    )
}

export default MotionDemo
