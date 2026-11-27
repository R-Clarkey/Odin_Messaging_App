import { Link } from "react-router"
import { useAuth } from "../auth/useAuth"

export default function Dashboard() {
	const { user } = useAuth()
	const username = user?.username

	return (
		<main className="min-h-full bg-slate-900 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-5xl">
				<section className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-xl">
					<div className="border-b border-slate-700 bg-gradient-to-br from-blue-600/20 via-slate-800 to-slate-800 px-6 py-10 sm:px-10 sm:py-14">
						<p className="text-sm font-medium text-blue-300">
							Welcome to the CommonRoom
						</p>
						<h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
							Welcome, {username}
						</h1>
						<Link
							to="/messages"
							className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
						>
							Open messages
							<span aria-hidden="true" className="ml-2">
								→
							</span>
						</Link>
					</div>

					<div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
						<article className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-xl text-blue-300">
								✉
							</div>

							<h2 className="mt-4 font-semibold">Your conversations</h2>
							<p className="mt-2 text-sm leading-6 text-slate-400">
								Check your recent conversations for new messages.
							</p>

							<Link
								to="/messages"
								className="mt-4 inline-flex text-sm font-medium text-blue-300 hover:text-blue-200"
							>
								View
								<span aria-hidden="true" className="ml-1">
									→
								</span>
							</Link>
						</article>

						<article className="rounded-xl border border-slate-700 bg-slate-900/60 p-5">
							<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-xl text-indigo-300">
								+
							</div>

							<h2 className="mt-4 font-semibold">Start a conversation</h2>
							<p className="mt-2 text-sm leading-6 text-slate-400">
								Find someone to message or create a group conversation.
							</p>

							<Link
								to="/messages?new=1"
								className="mt-4 inline-flex text-sm font-medium text-blue-300 hover:text-blue-200"
							>
								
								Create a conversation
								<span aria-hidden="true" className="ml-1">
									→
								</span>
							</Link>
						</article>
					</div>
				</section>

				<p className="mt-5 text-center text-sm text-slate-500">
					Signed in as @{username}
				</p>
			</div>
		</main>
	)
}
