import { createContext} from "react";

export type User = {
    id: string,
    username: string,
    email: string
}

export type AuthContextValue = {
	user: User | null
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
	logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)



