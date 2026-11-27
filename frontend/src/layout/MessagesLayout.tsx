import { useEffect, useState } from "react"
import { NavLink, Outlet } from "react-router"
import { getConversations } from "../services/conversations"
import { useAuth } from "../auth/useAuth"

type Participant = {
	id: string
	email: string
	username: string
	createdAt: string
	updatedAt: string
}

type Message = {
	id: string
	content: string
	createdAt: string
	updatedAt: string
	userId: string
	conversationId: string
}

type Conversation = {
	id: string
	name: string
	isGroup: boolean
	createdAt: string
	updatedAt: string
	participants: Participant[]
	messages: Message[]
}

export default function MessagesLayout() {

	const { user } = useAuth()
	const [conversations, setConversations] = useState<Conversation[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		let cancelled = false

		getConversations()
			.then((data) => {
				if(!cancelled) setConversations(data)

			})
			.catch((err: unknown) => {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : "Issue loading conversations")
				}
			})
			.finally(() => {
				if (!cancelled) {
					setLoading(false)
				}
			})
		return () => {
			cancelled = true
		}
	}, [])

	return (
		<div className="grid h-full min-h-0 grid-cols-[260px_1fr] bg-slate-900 text-slate-100">
			<aside className="overflow-y-auto border-r border-slate-700 p-4">
				<h1 className="mb-4 font-semibold">Conversations</h1>
				{loading && <p>Loading...</p>}
				{error && <p role="alert">error</p>}
				<nav className="space-y-1">
					{conversations.map((conversation) => {
						const otherParticipant = conversation.participants.find(
							(participant) => participant.id !== user?.id
						)

						const title = conversation.isGroup
							? conversation.name ?? "Unnamed group"
							: otherParticipant?.username ?? "Unknown user"

						return (
							<NavLink
								key={conversation.id}
								to={`/messages/${conversation.id}`}
								className="block rounded p-3 hover:bg-slate-600"
							>
								{title}
							</NavLink>
						)
					})}
				</nav> 
			</aside>

			<section className="min-h-0 min-w-0">
				<Outlet />
			</section>
		</div>
	)
}


