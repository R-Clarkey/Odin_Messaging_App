import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../auth/useAuth"

export default function Register() {
	const { register } = useAuth()
	const navigate = useNavigate()
	const [error, setError] = useState("")
	const [submitting, setSubmitting] = useState(false)

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError("")
		setSubmitting(true)

		const form = new FormData(e.currentTarget)
		const username = String(form.get("username"))
		const email = String(form.get("email"))
		const password = String(form.get("password"))
		const confirmPassword = String(form.get("confirmPassword"))

		try {
			await register(username, email, password, confirmPassword)
			navigate("/dashboard", { replace: true })
		} catch (err) {
			setError(err instanceof Error ? err.message : "Registration failed")
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<main className="grid min-h-dvh place-items-center bg-slate-950 p-4 text-slate-100">
			<section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
				<h1 className="text-2xl font-semibold">Create an account</h1>
				<p className="mt-2 text-sm text-slate-400">
					Register to get started.
				</p>

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<div>
						<label htmlFor="username" className="mb-1 block text-sm text-slate-300">
							Username
						</label>
						<input
							id="username"
							type="text"
							name="username"
							autoComplete="username"
							required
							className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
						/>
					</div>

					<div>
						<label htmlFor="email" className="mb-1 block text-sm text-slate-300">
							Email
						</label>
						<input
							id="email"
							type="email"
							name="email"
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
							id="password"
							type="password"
							name="password"
							autoComplete="new-password"
							required
							className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
						/>
					</div>

					<div>
						<label htmlFor="confirmPassword" className="mb-1 block text-sm text-slate-300">
							Confirm password
						</label>
						<input
							id="confirmPassword"
							type="password"
							name="confirmPassword"
							autoComplete="new-password"
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
						{submitting ? "Creating account…" : "Register"}
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-slate-400">
					Already a member?{" "}
					<Link to="/login" className="text-blue-400 hover:text-blue-300">
						Log in
					</Link>
				</p>
			</section>
		</main>
	)
}
