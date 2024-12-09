import { routes } from '@/router'
import { generateMenus, Some } from '@/router/utils'
import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { Link, NavLink, Outlet, RouteObject, useNavigate } from 'react-router-dom'

const items: ItemType<MenuItemType>[] = [
    {
        key: 'login',
        label: 'login'
    },
    {
        key: 'about',
        label: 'about'
    },
    {
        key: 'layout',
        label: 'layout',
        children: [
            {
                key: 'layout-1',
                label: 'layout-1'
            },
            {
                key: 'layout-2',
                label: 'layout-2'
            },
            {
                key: 'layout-3',
                label: 'layout-3',
                children: [
                    {
                        key: 'layout-3-1',
                        label: 'layout-3-1'
                    },
                    {
                        key: 'layout-3-2',
                        label: 'layout-3-2'
                    }
                ]
            }
        ]
    },
    {
        key: 'mobx',
        label: 'mobx'
    },
    {
        key: 'axios',
        label: 'axios'
    },
    {
        key: 'radix',
        label: 'radix'
    }
]

const AppLayout = () => {
    const navigate = useNavigate()
    const handleOnSelect = ({ item, key }: any) => {
        console.log(item, key)
    }
    const menus = generateMenus(routes)
    console.log('menus: ', menus);

    const handleMenuClick = ({ key }: any) => {
        console.log('key: ', key);
        navigate(key)
    }
    return (
        <div className='app_layout'>
            <div className='nav'>
                {/* <Menu items={menus} onClick={handleMenuClick} style={{ width: 256 }} mode='inline' activeKey='login' onSelect={handleOnSelect} /> */}
                <Link to='/'>/</Link>
                <Link to='login'>login</Link>
                <Link to='/about'>about</Link>
                <Link to='/about1'>about1</Link>
                <Link to='/test'>test</Link>
                <Link to='/layout'>layout</Link>
                <Link to='/layout/1'>layout-1</Link>
                <Link to='/layout/2'>layout-2</Link>
                <Link to='/layout/3/1'>layout-3-1</Link>
                <Link to='/layout/3/2'>layout-3-2</Link>
                <NavLink to='/mobx'>mobx</NavLink>
                <NavLink to='/axios'>axios</NavLink>
                <NavLink to='/radix'>radix</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default AppLayout
