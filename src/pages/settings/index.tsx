import { Tabs, TabsProps } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()
    const items: TabsProps['items'] = [
        {
            key: 'a',
            label: 'width'
        },
        {
            key: 'b',
            label: 'requestAnimationFrame'
        },
        {
            key: 'c',
            label: 'transform scaleX'
        },
        {
            key: 'd',
            label: 'transform translateX'
        },
        {
            key: 'e',
            label: 'position left'
        }
    ]

    const handleTabClick = (key: string) => {
        navigate(`/settings/profile/${key}`)
    }
    return (
        <>
            <Tabs defaultActiveKey='a' className='float-right' items={items} onTabClick={handleTabClick} />
            <Outlet />
        </>
    )
}

export default Settings
