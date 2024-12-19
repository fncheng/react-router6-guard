import { Button } from 'antd'
import pdf from './example.pdf'
import { lazy, Suspense } from 'react'
import { loadWithDelay } from '@/router'

const PDFViewer = lazy(() => loadWithDelay(import('./PDFViewer'), 2000))

export default function () {
    const pdfUrl = pdf
    console.log('pdf render')
    return (
        <div>
            <h3>PDF.js 示例</h3>
            <Button onClick={() => window.open(pdfUrl)}>打开 PDF</Button>
            <Suspense fallback={<div>pdf加载中...</div>}>
                <PDFViewer fileUrl={pdf} />
            </Suspense>
        </div>
    )
}
