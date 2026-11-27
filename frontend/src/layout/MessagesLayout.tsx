import { useEffect, useMemo, useState } from "react"
import { NavLink, Outlet, useSearchParams } from "react-router"
import { ArrowLeft, Plus, Search, Users, X } from "lucide-react"
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
	name: string | null
	isGroup: boolean
	createdAt: string
	updatedAt: string
	participants: Participant[]
	messages: Message[]
}

type NewConversationMode = "list" | "choose" | "direct" | "group"

const availableUsers: Participant[] = [
	{
		id: "sample-1",
		username: "maya",
		email: "maya@example.com",
		createdAt: "",
		updatedAt: ""
	},
	{
		id: "sample-2",
		username: "leo",
		email: "leo@example.com",
		createdAt: "",
		updatedAt: ""
	},
	{
		id: "sample-3",
		username: "sam",
		email: "sam@example.com",
		createdAt: "",
		updatedAt: ""
	}
]

// Search works, remove after prisma lookup

export default function MessagesLayout() {
	const { user } = useAuth()
	const [conversations, setConversations] = useState<Conversation[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const [mode, setMode] = useState<NewConversationMode>("list")
	const [search, setSearch] = useState("")
	const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		if (searchParams.get("new") === "1") {
		setMode("choose")
	}}, [searchParams])

	useEffect(() => {
		let cancelled = false

		getConversations()
			.then((data) => {
				if (!cancelled) {
					setConversations(data)
				}
			})
			.catch((err: unknown) => {
				if (!cancelled) {
					setError(
						err instanceof Error
							? err.message
							: "Issue loading conversations"
					)
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

	const filteredUsers = useMemo(() => {
		const query = search.trim().toLowerCase()

		return availableUsers.filter((person) => {
			if (person.id === user?.id) {
				return false
			}

			return (
				!query ||
				person.username.toLowerCase().includes(query) ||
				person.email.toLowerCase().includes(query)
			)
		})
	}, [search, user?.id])

	function openNewConversation() {
		setSearch("")
		setSelectedUserIds([])
		setMode("choose")
	}

	function returnToConversationList() {
		setSearch("")
		setSelectedUserIds([])
		setMode("list")
		setSearchParams({})
	}

	function toggleUser(userId: string) {
		setSelectedUserIds((current) => {
			if (mode === "direct") {
				return current.includes(userId) ? [] : [userId]
			}

			return current.includes(userId)
				? current.filter((id) => id !== userId)
				: [...current, userId]
		})
	}

	const selectedUsers = availableUsers.filter((person) =>
		selectedUserIds.includes(person.id)
	)

	return (
		<div className="grid h-full min-h-0 grid-cols-[280px_1fr] bg-slate-900 text-slate-100">
			<aside className="flex min-h-0 flex-col border-r border-slate-700">
				{mode === "list" ? (
					<>
						<header className="flex items-center justify-between p-4">
							<h1 className="font-semibold">Conversations</h1>

							<button
								type="button"
								onClick={openNewConversation}
								aria-label="Start a new conversation"
								className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
							>
								<Plus size={20} aria-hidden="true" />
							</button>
						</header>

						{loading && (
							<p className="px-4 text-sm text-slate-400">Loading...</p>
						)}

						{error && (
							<p role="alert" className="px-4 text-sm text-red-400">
								{error}
							</p>
						)}

						<nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-3">
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
										className="block rounded-lg p-3 hover:bg-slate-700"
									>
										{title}
									</NavLink>
								)
							})}
						</nav>
					</>
				) : (
					<>
						<header className="flex items-center gap-3 border-b border-slate-700 p-4">
							<button
								type="button"
								onClick={returnToConversationList}
								aria-label="Back to conversations"
								className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
							>
								<ArrowLeft size={20} aria-hidden="true" />
							</button>

							<div>
								<h1 className="font-semibold">New conversation</h1>
								<p className="text-sm text-slate-400">
									Choose who to message
								</p>
							</div>
						</header>

						{mode === "choose" ? (
							<div className="space-y-2 p-3">
								<button
									type="button"
									onClick={() => setMode("direct")}
									className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-slate-800"
								>
									<Search size={20} aria-hidden="true" />

									<span>
										<span className="block font-medium">
											Direct message
										</span>
										<span className="text-sm text-slate-400">
											Find one person to message
										</span>
									</span>
								</button>

								<button
									type="button"
									onClick={() => setMode("group")}
									className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-slate-800"
								>
									<Users size={20} aria-hidden="true" />

									<span>
										<span className="block font-medium">New group</span>
										<span className="text-sm text-slate-400">
											Choose multiple people
										</span>
									</span>
								</button>
							</div>
						) : (
							<>
								<div className="space-y-3 p-3">
									<div className="relative">
										<Search
											size={18}
											aria-hidden="true"
											className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
										/>

										<input
											type="search"
											value={search}
											onChange={(event) => setSearch(event.target.value)}
											placeholder="Search by username or email"
											aria-label="Search users"
											className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
										/>
									</div>

									{mode === "group" && selectedUsers.length > 0 && (
										<div className="flex flex-wrap gap-2">
											{selectedUsers.map((person) => (
												<button
													key={person.id}
													type="button"
													onClick={() => toggleUser(person.id)}
													className="flex items-center gap-1 rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-200"
												>
													{person.username}
													<X size={14} aria-hidden="true" />
												</button>
											))}
										</div>
									)}
								</div>

								<div className="min-h-0 flex-1 overflow-y-auto px-2">
									{filteredUsers.length === 0 ? (
										<p className="px-3 py-6 text-center text-sm text-slate-400">
											No users found.
										</p>
									) : (
										filteredUsers.map((person) => {
											const selected = selectedUserIds.includes(person.id)

											return (
												<button
													key={person.id}
													type="button"
													onClick={() => toggleUser(person.id)}
													aria-pressed={selected}
													className={`mb-1 flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-slate-800 ${
														selected
															? "bg-slate-800 ring-1 ring-blue-500"
															: ""
													}`}
												>
													<span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 font-medium">
														{person.username.charAt(0).toUpperCase()}
													</span>

													<span className="min-w-0 flex-1">
														<span className="block truncate font-medium">
															{person.username}
														</span>
													</span>

													{selected && (
														<span className="text-sm text-blue-300">
															Selected
														</span>
													)}
												</button>
											)
										})
									)}
								</div>

								<footer className="border-t border-slate-700 p-3">
									<button
										type="button"
										disabled={selectedUserIds.length === 0}
										onClick={() => {

											// service functionn
											
											console.log({
												mode,
												userIds: selectedUserIds
											})
										}}
										className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
									>
										{mode === "direct"
											? "Start direct message"
											: `Create group (${selectedUserIds.length})`}
									</button>
								</footer>
							</>
						)}
					</>
				)}
			</aside>

			<section className="min-h-0 min-w-0">
				<Outlet />
			</section>
		</div>
	)
}
