import request, { axiosRequestWithAbort } from './index'

export const getNumber = () =>
    request<any, { number: number }>({
        url: '/test/getNumber',
        method: 'get'
    })

export const getNumberAbort = () =>
    axiosRequestWithAbort<{ number: number }>({
        url: '/test/getNumber',
        method: 'get'
    })

export const getName = () =>
    request<any, string>({
        url: '/test/getName',
        method: 'get'
    })

export const getId = (id: number) =>
    request({
        url: `/test/user`,
        method: 'get',
        params: {
            id
        }
    })

export const getRequest = (controller: AbortController) =>
    request({
        url: 'http://127.0.0.1:3000/route',
        method: 'get',
        signal: controller.signal
    })

export const getEvents = () =>
    request({
        url: 'http://127.0.0.1:3000/events',
        method: 'get'
    })

export const uploadFile = (data: any) =>
    request({
        url: 'http://127.0.0.1:3000/file/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
