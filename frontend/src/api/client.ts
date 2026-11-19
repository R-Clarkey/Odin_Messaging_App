const API_URL = import.meta.env.VITE_API_URL

export async function apiConnect(path: string, options: RequestInit = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    })

    if (!response.ok) {
        const body = await response.json().catch(() => ({}))
        throw new Error(body.error ||  `Request failed (${response.status})`)
    }

    if (response.status === 204) {
        return null
    }

    return response.json()
}