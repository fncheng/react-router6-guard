import ReactDOM from 'react-dom/client'
import { GlobalProvider } from './utils/GlobalContext'
import { Suspense } from 'react'
import { Loading } from './utils/Loading'
import Router from './router'
import '@/locale/index'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(
    <GlobalProvider>
        <Suspense fallback={<Loading />}>
            <Router />
        </Suspense>
    </GlobalProvider>
)
