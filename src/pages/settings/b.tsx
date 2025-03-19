import { MenuOutlined } from '@ant-design/icons'
import { useState, useEffect, useRef } from 'react'

const Sidebar = () => {
    const [width, setWidth] = useState(200)
    const [collapsed, setCollapsed] = useState(false)
    const animationRef = useRef<number | null>(null)

    const animateWidth = (targetWidth: number) => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }

        const step = () => {
            setWidth((prev) => {
                const delta = (targetWidth - prev) * 0.3 // 让变化更加平滑
                const newWidth = prev + delta

                if (Math.abs(newWidth - targetWidth) < 1) {
                    return targetWidth
                }

                animationRef.current = requestAnimationFrame(step)
                return newWidth
            })
        }

        animationRef.current = requestAnimationFrame(step)
    }

    const toggleSidebar = () => {
        setCollapsed(!collapsed)
        animateWidth(collapsed ? 200 : 50)
    }

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    return (
        <div
            style={{
                width,
                backgroundColor: '#333',
                height: '100vh',
                color: '#fff',
                padding: '10px',
                transition: 'width 0.1s ease-out',
                overflow: 'hidden'
            }}
        >
            <MenuOutlined className='cursor-pointer' onClick={toggleSidebar} />
            <p style={{ display: width === 50 ? 'none' : 'block' }}>侧边栏内容2</p>
        </div>
    )
}

export default Sidebar
