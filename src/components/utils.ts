import { visit } from 'unist-util-visit'

export function remarkLatex() {
    return (tree: any) => {
        visit(tree, 'text', (node) => {
            if (typeof node.value === 'string') {
                console.log('node.value: ', node.value)
                // 替换 `\[...\]` 为 `$$...$$`
                node.value = node.value.replace(/\\\[((.|\n)+?)\\\]/g, `\n$$$1$$\n`)
                // 替换 `\(...\)` 为 `$...$`
                node.value = node.value.replace(/\\\((.+?)\\\)/g, '$$$1$$')
                console.log('node.value******: ', node.value)
            }
        })
    }
}
