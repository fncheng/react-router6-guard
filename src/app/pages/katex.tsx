import { Tabs, type TabsProps } from 'antd'
import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import katexStr from './katex/katexStr'

interface MessageParameter {
    chat: {
        domain: string
        contextEnabled: boolean
        temperature: number
        top_k: number
    }
}
interface SendMessagePayload {
    message: {
        text: { content_type: string; content: string }[]
    }
    sessionId: string
}

interface ReceiveMessagePayload {
    choices: {
        seq: number
        status: number
        text: {
            content: string
            content_meta: {}
            content_type: string
            reasoning_content: string
            role: 'assistant' | 'user'
        }[]
    }
    context: {
        code: number
        domain: string
        interrupt: boolean
    }
    messageId: string
    sessionId: string
}

interface MessageType {
    header: any
    parameter: MessageParameter
    payload: SendMessagePayload | ReceiveMessagePayload
}

export interface OutletContextType {
    content: string
}

const isWs = false

const WsLayout = () => {
    const [content, setContent] = useState(() => (isWs ? '' : katexStr))
    const location = useLocation()
    const currentPath = location.pathname.split('/').pop() || ''

    const navigate = useNavigate()
    const items: TabsProps['items'] = [
        {
            key: '',
            label: 'query'
        },
        {
            key: 'b',
            label: 'position left'
        },
        {
            key: 'c',
            label: 'transform translateX'
        }
    ]
    const handleTabClick = (key: string) => {
        navigate(`/katex/${key}`)
    }

    const startWs = () => {
        if (isWs) {
            const ws = new WebSocket('ws://localhost:8099/agent/skybox/api/v1/chat')
            ws.onopen = () => {
                console.log('start websocket')
                const param = {
                    header: { traceId: '6d503147-9872-4fed-943e-f75d7004f9f0', mode: 0 },
                    payload: {
                        sessionId: '',
                        message: { text: [{ content_type: 'text', content: '欧拉公式的推导过程' }] }
                    },
                    parameter: {
                        chat: { domain: 'generalv3.5', temperature: 0.5, top_k: 1, contextEnabled: true }
                    }
                }
                console.log('param: ', param)
                ws.send(JSON.stringify(param))
            }
            ws.onmessage = (ev: MessageEvent<string>) => {
                const jsonResponse: MessageType = JSON.parse(ev.data)
                if ('choices' in jsonResponse.payload) {
                    const textRes = jsonResponse.payload.choices.text[0]
                    if (textRes.role === 'assistant') {
                        setContent((prev) => (prev += textRes.content))
                    }
                }
            }
        }
    }
    return (
        <>
            <Tabs activeKey={currentPath} className='float-right' items={items} onTabClick={handleTabClick} />
            <button onClick={startWs}>start ws</button>
            <Outlet context={{ content }} />
        </>
    )
}

export default WsLayout
