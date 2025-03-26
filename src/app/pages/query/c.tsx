import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchComments } from './api'

export default function () {
    const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery({
        queryKey: ['users', 'infinite'],
        queryFn: ({ pageParam }) => fetchComments({ postId: pageParam }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.postId + 1,
        staleTime: 1000 * 60 * 3 // 5 分钟内不重新请求
    })
    console.log('data: ', data)

    console.log('render')

    if (isPending) return <div>加载中...</div>
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return (
        <div>
            <ul>
                {data.pages.map((page) => {
                    return page.data.map((item) => <li key={item.id}>{item.name}</li>)
                })}
            </ul>
            <span>{hasNextPage}</span>
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                {isFetchingNextPage ? '加载中...' : '加载更多'}
            </button>
        </div>
    )
}
