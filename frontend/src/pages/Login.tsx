import { useState, type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useAuth } from "../auth/useAuth"

export default function Login() {
	const { login } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const [error, setError] = useState("")
	const [submitting, setSubmitting] = useState(false)

	const destination = location.state?.from?.pathname || "/dashboard"

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError("")
		setSubmitting(true)

		const form = new FormData(e.currentTarget)
		const email = String(form.get("email"))
		const password = String(form.get("password"))

		try {
			await login(email, password)
			navigate(destination, { replace: true })
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed")
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<main className="grid min-h-dvh place-items-center bg-slate-950 p-4 text-slate-100">
			<section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
				<h1 className="text-2xl font-semibold">Log in</h1>
				<p className="mt-2 text-sm text-slate-400">
					Welcome back. Enter your account details.
				</p>

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label htmlFor="email" className="mb-1 block text-sm text-slate-300">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							autoComplete="email"
							required
							className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-1 block text-sm text-slate-300">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							autoComplete="current-password"
							required
							className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
						/>
					</div>

					{error && (
						<p role="alert" className="rounded-lg bg-red-950 p-3 text-sm text-red-300">
							{error}
						</p>
					)}

					<button
						type="submit"
						disabled={submitting}
						className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? "Logging in…" : "Log in"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-slate-400">
					New member?{" "}
					<Link to="/register" className="text-blue-400 hover:text-blue-300">
						Register
					</Link>
				</p>
			</section>
		</main>
	)
}
