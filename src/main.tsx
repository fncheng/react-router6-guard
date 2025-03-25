import ReactDOM from 'react-dom/client'
import { GlobalProvider } from './utils/GlobalContext'
import { Suspense } from 'react'
import { Loading } from './utils/Loading'
import Router from './router'
import '@/locale/index'
import 'antd/dist/reset.css'
import './styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)
const qc = new QueryClient()

root.render(
    <QueryClientProvider client={qc}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <GlobalProvider>
            <Suspense fallback={<Loading />}>
                <Router />
            </Suspense>
        </GlobalProvider>
    </QueryClientProvider>
)
