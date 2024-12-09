import './styles.css'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AppLayout from './pages/AppLayout'
import { GlobalContext } from './utils/GlobalContext'
import { ConfigProvider, theme, type ThemeConfig } from 'antd'

const customTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        colorPrimary: '#1DA57A'
    }
}

export default function App() {
    const { isLogin } = useContext(GlobalContext)

    const location = useLocation()
    const matches = useMatches()
    // to 即我们要跳转的页面路由元信息
    const to = matches.find((item) => item.pathname === location.pathname)
    console.log('to: ', to)
    const navigate = useNavigate()

    const handleRouteChange = () => {
        console.log('------全局路由守卫------')
        // 如果未登录，且去的页面不是登录页，则重定向到登录页
        if (!isLogin && location.pathname !== '/login') {
            navigate('/login')
        }
        // 如果已登录，不可直接去登录页，应通过logout退出登录来跳转登录页
        if (isLogin && location.pathname === '/login') {
            navigate('/')
        }
        // 需要鉴权的页面
        if (to?.handle?.meta?.requireAuth) {
            // 判断有没有这个页面的权限
            // ...
            // 没有则跳转至指定页
            navigate('/unpermission')
        }
    }

    useEffect(() => {
        handleRouteChange()
    }, [location])

    return (
        <ConfigProvider theme={customTheme}>
            <AppLayout />
        </ConfigProvider>
    )
}
