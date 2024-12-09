import { Suspense, useEffect } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { Loading } from '@/utils/Loading'
import PieChart from './Pie'
import GlobalLoading from '@/utils/GlobalLoading'

interface UserData {
    number: boolean
    name: string
    abortController: AbortController
    data: Array<any>
}

const About: React.FC = () => {
    const { number, name, abortController, data: pieData } = useLoaderData() as UserData

    useEffect(() => {
        return () => {
            abortController.abort()
        }
    }, [])

    console.log('render')

    return (
        <main className='flex flex-1 flex-col'>
            <h1>Let's loading some data</h1>
            <section className='flex flex-1'>
                <Suspense fallback={<Loading />}>
                    <Await resolve={number} errorElement={<GlobalLoading />}>
                        {(data) => {
                            console.log('render number')
                            return (
                                <div style={{ color: 'red' }}>
                                    <h3>Number: {data}</h3>
                                </div>
                            )
                        }}
                    </Await>
                </Suspense>
                <Suspense fallback={<Loading />}>
                    <Await resolve={name} errorElement={<GlobalLoading />}>
                        {(data) => {
                            console.log('render name')
                            return (
                                <div style={{ color: 'red' }}>
                                    <h3>Name: {data}</h3>
                                </div>
                            )
                        }}
                    </Await>
                </Suspense>

                <Suspense fallback={<Loading />}>
                    <Await resolve={pieData}>
                        {(data) => {
                            return <PieChart data={data} />
                        }}
                    </Await>
                </Suspense>
            </section>
        </main>
    )
}

export default About
