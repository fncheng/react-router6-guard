import { debounce } from 'lodash-es'
import { useEffect, useState } from 'react'

/**
 * @key 列数
 * @value 对应ant-col-span的值
 */
const spanCol = {
    2: 12,
    3: 8,
    4: 6,
    6: 4
}

/**
 * 屏幕分辨变化时获取窗口宽度
 */
export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowWidth(window.innerWidth)
        }, 50)
        window.addEventListener('resize', handleResize)
        return () => {
            console.log('卸载事件函数')
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return windowWidth
}

export const useDefaultSpanConfig = () => {
    const windowWidth = useWindowWidth()

    if (windowWidth > 1920) {
        return spanCol[6]
    } else if (windowWidth > 1440) {
        return spanCol[4]
    } else if (windowWidth > 1024) {
        return spanCol[3]
    } else return spanCol[2]
}
