import { fetchComments } from './api'
import { useEffect, useState } from 'react'

export default function () {
    const [pageNum, setPageNum] = useState(1)
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        try {
            let res = await fetchComments({ postId: pageNum })
            setData(res.data)
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getData()
    }, [pageNum])

    console.log('render')

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return (
        <div>
            <ul>{data?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
            <button onClick={() => setPageNum(pageNum + 1)}>{pageNum}</button>
        </div>
    )
}
