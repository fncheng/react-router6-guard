import { MenuFoldOutlined, MenuUnfoldOutlined, UpCircleTwoTone } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useState } from 'react'

const MotionDemo = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <div className='relative flex h-screen'>
            <motion.div
                animate={{ translateX: isCollapsed ? -140 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='absolute flex h-full w-[200px] flex-col bg-gray-900 p-3 text-white'
            >
                {/* 折叠按钮 */}
                <span
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='cursor-pointer self-end rounded-full bg-gray-700 p-2 transition hover:bg-gray-600'
                >
                    {isCollapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
                </span>

                {/* 侧边栏内容 */}
                <div className='mt-4 space-y-3'>
                    <SidebarItem icon={<UpCircleTwoTone size={20} />} text='对话记录' isCollapsed={isCollapsed} />
                    <SidebarItem icon={<UpCircleTwoTone size={20} />} text='新建对话' isCollapsed={isCollapsed} />
                </div>
            </motion.div>
        </div>
    )
}

function SidebarItem({ icon, text, isCollapsed }: { icon: JSX.Element; text: string; isCollapsed: boolean }) {
    return (
        <motion.div
            className='flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-700'
            initial={{ opacity: 1 }}
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
        >
            {icon}
            {!isCollapsed && <span className='ml-3'>{text}</span>}
        </motion.div>
    )
}

export default MotionDemo
