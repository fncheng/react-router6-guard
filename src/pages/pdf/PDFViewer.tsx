import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/web/pdf_viewer.css'
import { Button } from 'antd'
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker'

// pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new pdfWorker())
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.mjs'

interface PDFViewerProps {
    fileUrl: string // PDF 文件的 URL
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [pdfDocument, setPdfDocument] = useState<any>(null) // PDF 对象
    const [currentPage, setCurrentPage] = useState<number>(1) // 当前页
    const [numPages, setNumPages] = useState<number>(0) // 总页数

    useEffect(() => {
        const loadingTask = pdfjsLib.getDocument(fileUrl)
        loadingTask.promise
            .then((pdf: any) => {
                console.log('PDF 加载成功:', pdf)

                setPdfDocument(pdf)
                setNumPages(pdf.numPages)
                setCurrentPage(1)

                renderPage(pdf, currentPage)

                // 渲染第 1 页
                // pdf.getPage(1).then((page: any) => {
                //     const viewport = page.getViewport({ scale: 1.5 })
                //     const canvas = canvasRef.current

                //     if (canvas) {
                //         const context = canvas.getContext('2d')
                //         canvas.height = viewport.height
                //         canvas.width = viewport.width

                //         const renderContext = {
                //             canvasContext: context,
                //             viewport: viewport
                //         }

                //         page.render(renderContext)
                //     }
                // })
            })
            .catch((error: any) => {
                console.error('PDF 加载失败:', error)
            })
    }, [fileUrl])

    /**
     * 渲染 PDF 页面
     * @param pdf PDF 文档对象
     * @param pageNumber 页面号
     */
    const renderPage = (pdf: any, pageNumber: number) => {
        pdf.getPage(pageNumber).then((page: any) => {
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
    }
    /**
     * 上一页
     */
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1
            setCurrentPage(prevPage)
            renderPage(pdfDocument, prevPage)
        }
    }

    /**
     * 下一页
     */
    const handleNextPage = () => {
        if (currentPage < numPages) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            renderPage(pdfDocument, nextPage)
        }
    }

    return (
        <div>
            <h3>pdf预览</h3>
            <canvas ref={canvasRef} height={500}></canvas>
            {/* 分页控制 */}
            <div style={{ marginTop: '10px' }}>
                <Button onClick={handlePreviousPage} disabled={currentPage <= 1}>
                    上一页
                </Button>
                <span style={{ margin: '0 10px' }}>
                    第 {currentPage} 页 / 共 {numPages} 页
                </span>
                <Button onClick={handleNextPage} disabled={currentPage >= numPages}>
                    下一页
                </Button>
            </div>
        </div>
    )
}

export default PDFViewer
