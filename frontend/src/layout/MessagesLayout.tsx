import { NavLink, Outlet } from "react-router"

const conversations = [
	{ id: "stanford-yeh", name: "Stanford Yeh" },
	{ id: "mom", name: "Mom" },
]

// Fetch conversations and replace above


export default function MessagesLayout() {
	return (
		<div className="grid h-full min-h-0 grid-cols-[260px_1fr] bg-slate-900 text-slate-100">
			<aside className="overflow-y-auto border-r p-4">
				<h1 className="mb-4 font-semibold">Messages</h1>

{/* Edit below to map conversations where the user is involved */}

				<nav className="space-y-1">
					{conversations.map(conversation => (
						<NavLink
							key={conversation.id}
							to={`/messages/${conversation.id}`}
							className="block rounded p-3 hover:bg-slate-600"
						>
							{conversation.name}
						</NavLink>
					))}
				</nav>
			</aside>

			<section className="min-h-0 min-w-0">
				<Outlet />
			</section>
		</div>
	)
}
