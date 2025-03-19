import { MenuOutlined } from '@ant-design/icons'
import { useState } from 'react'

/**
 * left方案
 * @returns
 */
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            {/* 侧边栏 */}
            <div
                style={{
                    position: 'absolute', // 固定在左侧
                    left: collapsed ? '-200px' : '0', // 收缩时隐藏
                    top: 0,
                    width: '200px',
                    height: '100vh',
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '10px',
                    transition: 'left 0.3s ease' // 平滑动画
                }}
            >
                <p style={{ marginTop: 26 }}>侧边栏内容</p>
            </div>

            {/* 切换按钮 */}
            <MenuOutlined
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    position: 'absolute',
                    left: collapsed ? '10px' : '174px', // 收缩时按钮移动到外面
                    top: '10px',
                    transition: 'left 0.3s ease',
                    cursor: 'pointer',
                    color: collapsed ? '' : '#fff'
                }}
            ></MenuOutlined>
        </div>
    )
}

export default Sidebar
