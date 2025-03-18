import { useDefaultSpanConfig } from '@/hooks/layout'
import { useGlobalContext } from '@/utils/GlobalContext'
import { Col, Row } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

declare global {
    interface Performance {
        memory: {
            totalJSHeapSize: number
            usedJSHeapSize: number
            jsHeapSizeLimit: number
        }
    }
}

interface TestProps {
    count: number
    onAddCount: (val: number) => void
    render: (count: number) => JSX.Element
}

const TestComponent: React.FC<TestProps> = ({ count, onAddCount, render }) => {
    return (
        <div>
            <button onClick={() => onAddCount(3)}>onAddCount: {count}</button>
            {render(200)}
        </div>
    )
}

const Home = () => {
    const { setLogin } = useGlobalContext()
    const navigate = useNavigate()

    const spanConfig = useDefaultSpanConfig()

    const handleLogout = () => {
        navigate('/login')
        setLogin(false)
        localStorage.setItem('isLogin', JSON.stringify(false))
    }

    const [render, setRender] = useState<boolean>(false)
    const [count, setCount] = useState<number>(1000)
    const [totalJSHeapSize, setSize] = useState(() => performance.memory.totalJSHeapSize)

    const handleRender = () => setRender(true)
    const handleDestory = () => setRender(false)
    const increment = (val: number) => {
        setCount(count + val)
        setSize(performance.memory.totalJSHeapSize)
    }
    return (
        <div className='w-full'>
            <h3>Home</h3>
            <button onClick={handleLogout}>logout</button>
            <Row gutter={[16, 16]}>
                <Col span={spanConfig}>
                    <div className='bg-red-300'>1</div>
                </Col>
                <Col span={spanConfig}>
                    <div className='bg-red-300'>2</div>
                </Col>
                <Col span={spanConfig}>
                    <div className='bg-red-300'>3</div>
                </Col>
                <Col span={spanConfig}>
                    <div className='bg-red-300'>4</div>
                </Col>
            </Row>
            <div>
                <button onClick={handleRender}>render</button>
                <button onClick={handleDestory}>destory</button>
                <div>{totalJSHeapSize}</div>
                {render && (
                    <TestComponent
                        count={count}
                        onAddCount={increment}
                        render={(count: number) => <span>{count + 5}</span>}
                    />
                )}
            </div>
        </div>
    )
}

export default Home
