import axios from 'axios'

interface UserItem {
    id: number
    name: string
}

interface PostItem {
    userId: number
    id: number
    title: string
    body: string
}

interface CommentItem {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export const fetchUsers = async () => {
    const { data }: { data: UserItem[] } = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data
}

export const fetchPosts = async ({ signal }: { signal: AbortSignal }) => {
    const { data }: { data: PostItem[] } = await axios.get('https://jsonplaceholder.typicode.com/posts', { signal })
    return data
}

export const fetchComments = async ({ postId = 1 }) => {
    const { data }: { data: CommentItem[] } = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    )
    return { data, postId }
}
