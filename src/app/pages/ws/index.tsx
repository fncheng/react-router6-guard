import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'

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

export default function Ws() {
    const [content, setContent] = useState('')
    const renderContent = useMemo(() => marked.parse(content) as string, [content])

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8099/agent/skybox/api/v1/chat')
        ws.onopen = () => {
            console.log('start websocket')
            const param = {
                header: {
                    traceId: '0de21777-3e4e-499c-aaf7-b34c0fb78eef',
                    mode: 0
                },
                parameter: {
                    chat: {
                        domain: '4.0Ultra',
                        temperature: 0.5,
                        top_k: 1,
                        contextEnabled: true
                    }
                },
                payload: {
                    sessionId: '',
                    message: {
                        text: [
                            {
                                content_type: 'text',
                                content: '1+1='
                            }
                        ]
                    }
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
    }, [])

    return <div dangerouslySetInnerHTML={{ __html: renderContent }}></div>
}
