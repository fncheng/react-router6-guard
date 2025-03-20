import ReactDOM from 'react-dom/client'
import { GlobalProvider } from './utils/GlobalContext'
import { Suspense } from 'react'
import { Loading } from './utils/Loading'
import Router from './router'
import '@/locale/index'
import 'antd/dist/reset.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
const qc = new QueryClient()

root.render(
    <QueryClientProvider client={qc}>
        <GlobalProvider>
            <Suspense fallback={<Loading />}>
                <Router />
            </Suspense>
        </GlobalProvider>
    </QueryClientProvider>
)
