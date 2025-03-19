import { MenuOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { useEffect, useState, useRef } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const AppLayout = () => {
    /** 是否折叠状态 */
    const [isCollapsible, setIsCollapsible] = useState(false)
    const [sidebarWidth, setSidebarWidth] = useState(200)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleCollsapible = () => {
        setIsCollapsible(!isCollapsible)
        let targetWidth = isCollapsible ? 200 : 30
        let step = isCollapsible ? 10 : -10
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        intervalRef.current = setInterval(() => {
            setSidebarWidth((prev) => {
                let newWidth = prev + step
                // 判断是否到达目标宽度
                if ((step > 0 && newWidth >= targetWidth) || (step < 0 && newWidth <= targetWidth)) {
                    // 到达目标，清除定时器
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                        intervalRef.current = null
                    }
                    return targetWidth
                }
                // 未到达目标，继续调整宽度
                return newWidth
            })
        }, 10)
    }

    useEffect(() => {
        // 清理函数
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [])

    return (
        <div className='app_layout'>
            <div
                className='nav'
                style={{
                    width: sidebarWidth,
                    transition: 'width 0.01s linear',
                    overflow: 'hidden' // 添加transition使动画更平滑
                }}
            >
                <div className='flex cursor-pointer justify-end' onClick={handleCollsapible}>
                    <MenuOutlined />
                </div>
                <ul className={clsx('flex flex-col gap-y-2', sidebarWidth <= 30 ? 'hidden' : 'flex')}>
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
                    <NavLink to='/pdf'>pdf</NavLink>
                    <NavLink to='/zustand'>zustand</NavLink>
                </ul>
            </div>

            <Outlet />
        </div>
    )
}

export default AppLayout
