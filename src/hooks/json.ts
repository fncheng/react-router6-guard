export function safeJSONParse<T>(json: any): T | null {
    if (json === null || json === undefined) {
        return null
    }
    try {
        const parsed = JSON.parse(json)
        return parsed as T
    } catch (e) {
        console.error('Invalid JSON string, returning default value:', e)
        return null
    }
}
