import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from './api'

export default function PostList() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        // refetchInterval: 3000
        staleTime: 1000 * 60 * 5 // 5 分钟内不重新请求
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return <ul>{data?.map((post) => <li key={post.id}>{post.title}</li>)}</ul>
}
