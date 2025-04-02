import { useMemo } from 'react'
import { marked } from 'marked'
import { useOutletContext } from 'react-router-dom'
import { OutletContextType } from '../katex'

export default function () {
    const { content } = useOutletContext<OutletContextType>()
    const renderContent = useMemo(() => {
        let processed = marked(content)
        return processed as string
    }, [])
    return <div dangerouslySetInnerHTML={{ __html: renderContent }}></div>
}
