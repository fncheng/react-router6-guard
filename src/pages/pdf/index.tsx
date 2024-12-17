import PDFViewer from './PDFViewer'
import pdf from './example.pdf'

export default function () {
    const pdfUrl = pdf
    return (
        <div>
            <h3>PDF.js 示例</h3>
            <PDFViewer fileUrl={pdfUrl} />
        </div>
    )
}
