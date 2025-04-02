import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useOutletContext } from 'react-router-dom'
import { OutletContextType } from '../katex'

export default function () {
    const { content } = useOutletContext<OutletContextType>()
    const renderContent = useMemo(() => {
        let processed = katex.renderToString(content, {
            throwOnError: false
        })
        return processed as string
    }, [])
    return <ReactMarkdown>{renderContent}</ReactMarkdown>
}
