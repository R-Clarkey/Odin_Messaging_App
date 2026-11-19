import { NavLink, Outlet } from "react-router"

const conversations = [
	{ id: "stanford-yeh", name: "Stanford Yeh" },
	{ id: "mom", name: "Mom" },
]

export default function MessagesLayout() {
	return (
		<div className="grid h-full min-h-0 grid-cols-[260px_1fr]">
			<aside className="overflow-y-auto border-r p-4">
				<h1 className="mb-4 font-semibold">Messages</h1>

				<nav className="space-y-1">
					{conversations.map(conversation => (
						<NavLink
							key={conversation.id}
							to={`/messages/${conversation.id}`}
							className="block rounded p-3 hover:bg-gray-100"
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
