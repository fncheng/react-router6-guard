function getDuration(startTime: number, endTime: number) {
    const diff = endTime - startTime // 毫秒
    const seconds = Math.floor(diff / 1000) % 60
    const minutes = Math.floor(diff / (1000 * 60)) % 60
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    return { days, hours, minutes, seconds }
}

export function formatDuration(startTime: number, endTime: number) {
    const diff = endTime - startTime
    const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0')
    const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
    const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}

export function getFriendlyDuration(startTime: number, endTime: number) {
    const { days, hours, minutes, seconds } = getDuration(startTime, endTime)

    return [
        days > 0 ? `${days}天` : '',
        hours > 0 ? `${hours}小时` : '',
        minutes > 0 ? `${minutes}分钟` : '',
        seconds > 0 ? `${seconds}秒` : ''
    ]
        .filter(Boolean)
        .join(' ')
}

// 输出示例: { days: 1, hours: 0, minutes: 0, seconds: 0 }
