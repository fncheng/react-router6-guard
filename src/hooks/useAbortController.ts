import { useCallback, useEffect, useState } from "react";

export const useAbortController = () => {
    const abortController = new AbortController();
    const { signal } = abortController;

    useEffect(() => () => abortController.abort(), []);
    return {
        signal,
    };
};

export const useAbortRequest = <T>(asyncFunction: (signal: AbortSignal) => Promise<T>) => {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    const run = useCallback(() => {
        const controller = new AbortController()
        const { signal } = controller

        setLoading(true)

        asyncFunction(signal).then((res) => {
            setData(res)
            setError(null)
        }).catch((err) => {
            if (err.name !== 'AbortError') {
                setError(err.message)
            }
        }).finally(() => {
            setLoading(false)
        })
        return () => controller.abort()  // 返回一个中止函数
    }, [asyncFunction])
    return { data, error, loading, run }
}