import { useQuery } from '@tanstack/react-query'
import { fetchComments } from './api'
import { useState } from 'react'

export default function () {
    const [pageNum, setPageNum] = useState(1)
    const { data, error, isLoading } = useQuery({
        queryKey: ['users', pageNum],
        queryFn: () => fetchComments({ postId: pageNum }),
        staleTime: 1000 * 60 * 3 // 3 分钟内不重新请求
    })

    console.log('render')

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return (
        <div>
            <ul>{data?.data.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
            <button onClick={() => setPageNum(pageNum + 1)}>{pageNum}</button>
        </div>
    )
}
