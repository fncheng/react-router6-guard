import { MenuOutlined } from '@ant-design/icons'
import { useState } from 'react'

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div
            style={{
                position: 'relative',
                width: 0 // 添加相对定位作为图标容器的参考
            }}
        >
            <div
                style={{
                    width: '200px',
                    transform: `scaleX(${collapsed ? 0.25 : 1})`,
                    transformOrigin: 'left',
                    transition: 'transform 0.3s ease-in-out',
                    backgroundColor: '#333',
                    height: '100vh',
                    color: '#fff',
                    padding: '10px',
                    overflow: 'hidden'
                }}
            >
                <p
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 0,
                        width: '200px',
                        opacity: collapsed ? 0 : 1,
                        transition: 'opacity 0.1s ease-in-out 0.2s'
                    }}
                >
                    侧边栏内容
                </p>
            </div>
            {/* 将图标放在外层容器中 */}
            <div
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    color: '#fff'
                }}
            >
                <MenuOutlined className='cursor-pointer' onClick={() => setCollapsed(!collapsed)} />
            </div>
        </div>
    )
}

export default Sidebar
