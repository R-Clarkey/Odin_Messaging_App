import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../auth/useAuth"

export default function Navbar() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()
	const [loggingOut, setLoggingOut] = useState(false)
	const [error, setError] = useState("")

	async function handleLogout() {
		setError("")
		setLoggingOut(true)

		try {
			await logout()
			navigate("/login", { replace: true })
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not log out")
		} finally {
			setLoggingOut(false)
		}
	}

	return (
		<>
			<nav className="border-b border-slate-800 bg-slate-950">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
					<Link
						to="/dashboard"
						className="text-lg font-semibold text-white"
					>
						CommonRoom
					</Link>

					<div className="ml-auto flex items-center gap-4">
						<button
							type="button"
							onClick={handleLogout}
							disabled={loggingOut}
							className="rounded-md bg-slate-700 px-3 py-2 text-sm font-medium text-white hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{loggingOut ? "Logging out…" : "Log out"}
						</button>
					</div>
				</div>
			</nav>

			{error && (
				<p
					role="alert"
					className="bg-red-950 px-4 py-2 text-center text-sm text-red-200"
				>
					{error}
				</p>
			)}
		</>
	)
}
