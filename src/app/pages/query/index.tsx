import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { fetchPosts } from './api'

export default function PostList() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        // refetchInterval: 3000
        staleTime: 1000 * 60 * 5 // 5 分钟内不重新请求
    })

    // const [data, setData] = useState<PostItem[]>([])
    // const [isLoading, setLoading] = useState(false)
    // const [error, setError] = useState(false)

    // useEffect(() => {
    //     const init = async () => {
    //         setLoading(true)
    //         const res = await fetchPosts()
    //         if (res.length >= 0) {
    //             setData(res)
    //             setLoading(false)
    //         } else {
    //             setLoading(false)
    //             setError(true)
    //         }
    //     }
    //     init()
    // }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return <ul>{data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
}
