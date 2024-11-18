import { useSearchParams } from 'react-router-dom'
import styles from './index.module.css'
import { lazy, Suspense, useState } from 'react'
import { loadWithDelay } from '@/router'

const LazyComponent = lazy(() => loadWithDelay(import('./LazyComponent'), 2000))

const Test = () => {
    const [isShow, setIsShow] = useState(false)

    const [params] = useSearchParams()
    console.log('params: ', params)

    return (
        <>
            <div>
                <span style={{ width: 50 }} className={styles.ellipsis}>
                    abcdefghijklmnopqrstuvwxyz
                </span>
                <div style={{ width: 50 }} className={styles.ellipsis}>
                    abcdefghijklmnopqrstuvwxyz
                </div>
                <span>Test</span>
            </div>

            <div>
                <button onClick={() => setIsShow(!isShow)}>show lazy component</button>
                <Suspense fallback={<div>waiting...</div>}>{isShow && <LazyComponent />}</Suspense>
            </div>
        </>
    )
}

export default Test
