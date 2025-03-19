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
            label: 'transform'
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
