import { Link } from "react-router"
import { useAuth } from "../auth/useAuth"

export default function Dashboard() {
	const { user } = useAuth()

	return (
		<main className="grid h-full place-items-center p-6">
			<div className="w-full max-w-lg text-center">
				<h1 className="text-2xl font-semibold">
					Welcome, {user?.username}
				</h1>

				<p className="mt-2 text-gray-600">
					Keep up with your conversations.
				</p>

				<Link
					to="/messages"
					className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
				>
					Open messages
				</Link>
			</div>
		</main>
	)
}
