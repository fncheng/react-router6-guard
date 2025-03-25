import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface UserItem {
    id: number
    name: string
}

export const fetchUsers = async () => {
    const { data }: { data: UserItem[] } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data
}

export default function () {
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 * 5 // 5 分钟内不重新请求
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading posts</p>

    return <ul>{data?.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
}
