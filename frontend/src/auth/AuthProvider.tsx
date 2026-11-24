import { useEffect, useState, type ReactNode } from "react"
import { AuthContext, type User } from "./AuthContext"
import { apiConnect } from "../api/client"

export function AuthProvider({ children }: { children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        apiConnect("/auth/me")
        .then(setUser)
        .catch(() => setUser(null))
        .finally(() => setLoading(false))
    }, [])

    async function login(email: string, password: string) {
        await apiConnect("/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password})
        })
        const loggedInUser = await apiConnect("/auth/me")
        setUser(loggedInUser)
    }

    async function register(username: string, email: string, password: string, confirmPassword: string) {
        const newUser = await apiConnect("/auth/register", {
            method: "POST",
            body: JSON.stringify({username, email, password, confirmPassword})
        })
        setUser(newUser)
    }

    async function logout() {
        await apiConnect("/auth/logout", {method: "POST"})
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}