import MarkdownWithMath from '@/components/MarkdownWithMath'
import { useOutletContext } from 'react-router-dom'
import { OutletContextType } from '../katex'

export default function Ws() {
    const { content } = useOutletContext<OutletContextType>()
    return (
        <div>
            <MarkdownWithMath markdown={content}></MarkdownWithMath>
        </div>
    )
}
