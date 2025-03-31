import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import MarkdownWithMath from '@/components/MarkdownWithMath'
import { defaultContent } from './defaultContent'

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

const isWs = true

export default function Ws() {
    const [content, setContent] = useState(() => (isWs ? '' : defaultContent))
    // const renderContent = useMemo(() => marked.parse(content) as string, [content])

    useEffect(() => {
        if (isWs) {
            const ws = new WebSocket('ws://localhost:8099/agent/skybox/api/v1/chat')
            ws.onopen = () => {
                console.log('start websocket')
                const param = {
                    header: { traceId: 'bd7c50ef-edd8-47ce-9aa7-2f05a1e862ad', mode: 0 },
                    payload: {
                        sessionId: '',
                        message: { text: [{ content_type: 'text', content: '欧拉公式的推导过程' }] }
                    },
                    parameter: { chat: { domain: 'turing-general3', temperature: 0.5, top_k: 1, contextEnabled: true } }
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
    }, [])

    return (
        <div>
            <MarkdownWithMath markdown={content}></MarkdownWithMath>
        </div>
    )
}
