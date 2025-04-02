import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface MarkdownPropType {
    markdown: string
}

const preprocessMarkdown = (markdown: string) => {
    return markdown
    // .replace(/\\\((.+?)\\\)/g, '$$$1$$') // \(...\) -> $...$
    // .replace(/\\\[((.|\n)+?)\\\]/g, `\n$$$1$$\n`) // \[...\] -> $$...$$
}
// const preprocessMarkdown = (markdown: string) => {
//     return markdown
//         .replace(/\\\((.+?)\\\)/g, (_, p1) => {
//             return `$${p1}$`
//         })
//         .replace(/\\\[((.|\n)+?)\\\]/g, `\n$$$1$$\n`)
// }

const MarkdownWithMath: React.FC<MarkdownPropType> = ({ markdown }) => {
    return (
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {preprocessMarkdown(markdown)}
        </ReactMarkdown>
    )
}

export default MarkdownWithMath
