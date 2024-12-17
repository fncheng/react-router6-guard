import { useEffect, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'

// pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new pdfWorker())
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.mjs';

interface PDFViewerProps {
    fileUrl: string // PDF 文件的 URL
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(fileUrl)
        loadingTask.promise
            .then((pdf: any) => {
                console.log('PDF 加载成功:', pdf)

                // 渲染第 1 页
                pdf.getPage(1).then((page: any) => {
                    const viewport = page.getViewport({ scale: 1.5 })
                    const canvas = canvasRef.current

                    if (canvas) {
                        const context = canvas.getContext('2d')
                        canvas.height = viewport.height
                        canvas.width = viewport.width

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }

                        page.render(renderContext)
                    }
                })
            })
            .catch((error: any) => {
                console.error('PDF 加载失败:', error)
            })
    }, [fileUrl])
    return (
        <div>
            <h3>pdf预览</h3>
            <canvas ref={canvasRef} height={500}></canvas>
        </div>
    )
}

export default PDFViewer
