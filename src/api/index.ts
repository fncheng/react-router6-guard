import { useUserStore } from '@/store'
import { message as Message } from 'antd'
import axios, { AxiosResponse, type AxiosRequestConfig } from 'axios'
import qs from 'qs'

const service = axios.create({
    baseURL: '/proxyApi',
    timeout: 20000
})

const controllers = new Map<string, AbortController>()

export const axiosRequestWithAbort = <T>(
    options: AxiosRequestConfig = {}
): { request: Promise<AxiosResponse<T, any>>; controller: AbortController } => {
    const controller = new AbortController()
    const signal = controller.signal

    const config: AxiosRequestConfig = { ...options, signal }
    const request = service(config)
    return { request, controller }
}

service.interceptors.request.use(
    (config) => {
        // 请求拦截器，添加 AbortController,
        // 保存当前请求的 controller，key 可以用请求 URL 等唯一标识
        const controller = new AbortController()
        config.signal = controller.signal
        let key = config.url
        if (config.params) {
            key = `${config.url}?${qs.stringify(config.params)}`
        }
        if (key && controllers.has(key)) {
            controllers.get(key)?.abort()
        }
        if (key) {
            controllers.set(key, controller)
        }

        const store = useUserStore.getState()
        console.log('store: ', store.username)

        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器，移除已完成请求的 AbortController
service.interceptors.response.use(
    (response) => {
        if (response.config.url) {
            controllers.delete(response.config.url)
        }
        if (response.status === 200) {
            return response.data
        }
    },
    (err) => {
        Promise.reject(err).catch((err) => {
            // 如果请求被取消了
            if (axios.isCancel(err)) {
                console.log('Request canceled', err.message)
                Message.warning({
                    content: '请求被取消了',
                    duration: 2
                })
            } else console.error('Request failed', err)
        })
    }
)

export function abortRequest(url: string) {
    const controller = controllers.get(url)
    if (controller) {
        controller.abort()
        controllers.delete(url)
    }
}

export default service
