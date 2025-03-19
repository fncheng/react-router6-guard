import { MenuOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'

const Sidebar = () => {
    const [width, setWidth] = useState(200) // 初始宽度
    const [collapsed, setCollapsed] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const toggleSidebar = () => {
        setCollapsed(!collapsed)
        let targetWidth = collapsed ? 200 : 50 // 目标宽度
        let step = collapsed ? 10 : -10 // 每次变化的步长

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        intervalRef.current = setInterval(() => {
            setWidth((prev) => {
                let newWidth = prev + step
                // 展开还是收缩
                if ((step > 0 && newWidth >= targetWidth) || (step < 0 && newWidth <= targetWidth)) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current)
                        intervalRef.current = null
                    }
                    return targetWidth
                }
                return newWidth
            })
        }, 10)
    }

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return (
        <div
            style={{
                width,
                transition: 'width 0.1s linear', // 这里可以微调 transition 让变化更平滑
                backgroundColor: '#333',
                height: '100vh',
                color: '#fff',
                padding: '8px',
                overflow: 'hidden'
            }}
        >
            <MenuOutlined className='cursor-pointer' onClick={toggleSidebar} />
            <p style={{ display: width === 50 ? 'none' : 'block' }}>侧边栏内容1</p>
        </div>
    )
}

export default Sidebar
