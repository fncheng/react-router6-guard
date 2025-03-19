import { MenuOutlined } from '@ant-design/icons'
import { useState } from 'react'

/**
 * translateX方案
 * @returns 
 */
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div style={{ position: 'relative', height: 0 }}>
            <div
                style={{
                    width: '200px',
                    transform: `translateX(${collapsed ? -200 : 0}px)`,
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease-in-out',
                    backgroundColor: '#333',
                    height: '100vh',
                    color: '#fff',
                    padding: '10px',
                    overflow: 'hidden'
                }}
            >
                <p style={{ marginTop: 26 }}>侧边栏内容</p>
            </div>
            {/* 将图标放在外层容器中 */}
            <MenuOutlined
                className='cursor-pointer'
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: collapsed ? '10px' : '174px',
                    color: collapsed ? '' : '#fff'
                }}
            />
        </div>
    )
}

export default Sidebar
