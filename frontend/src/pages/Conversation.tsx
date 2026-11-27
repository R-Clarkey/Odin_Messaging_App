/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "../auth/useAuth"
import { getConversation } from "../services/conversations"
import { apiConnect } from "../api/client"


type Participant = {
	id: string
	username: string
}

type Message = {
	id: string
	content: string
	userId: string
	conversationId: string
	createdAt: string
	updatedAt: string
}

type ConversationData = {
	id: string
	name: string
	isGroup: boolean
	createdAt: string
	updatedAt: string
	participants: Participant[]
	messages: Message[]
}

export default function Conversation() {

	const { user } = useAuth()
	const { conversationId } = useParams()
	const [conversation, setConversation] = useState<ConversationData | null>()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")

	useEffect(() => {
		if (!conversationId) return
		let cancelled = false
		console.log(user)
		console.log("Convo opened: ", conversationId)
		getConversation(conversationId)
			.then((data) => {
				if (!cancelled) setConversation(data)
				console.log(conversation)
			})
			.catch((err: unknown) => {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : "Issue loading conversation")
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
	}, [conversationId])

	async function handleSubmit(event: React.SubmitEvent) {
		event.preventDefault()
		const trimmedMessage: string = message.trim()
		if (!trimmedMessage) return
		console.log("Message: ", trimmedMessage)
		try {
			const createdMessage = await apiConnect(`/api/conversations/${conversationId}/messages`,{
				method: "POST",
				body: JSON.stringify({ data: trimmedMessage})
			})
			console.log(createdMessage)
			setConversation((current) => {
				if (!current) return current
				return {
					...current,
					messages: [...current.messages, createdMessage]
				}
			})
			setMessage("")
		} catch (error) {
			setError(error instanceof Error ? error.message : "Could not send message")
		}
	}


	const otherParticipant = conversation?.participants.find(
		(participant) => participant.id !== user?.id
	)

	const title = conversation
		? conversation.isGroup
			? conversation.name
			: otherParticipant?.username ?? "Conversation"
		: "Conversation"

	return (
		<div className="flex h-full flex-col bg-slate-950 text-slate-100">
			<header className="border-b border-slate-800 bg-slate-900 px-4 py-3">
				<div className="font-medium">{title}</div>
			</header>

			<div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
				{loading && <p>Loading…</p>}
				{error && <p role="alert">{error}</p>}

				{!loading &&
					!error &&
					conversation?.messages.map((message) => {
						const isMine = message.userId === user?.id
						const sender = conversation.participants.find(
							(participant) => participant.id === message.userId
						)

						return (
							<div
								key={message.id}
								className={`flex flex-col gap-1 ${
									isMine ? "items-end" : "items-start"
								}`}
							>
								{conversation.isGroup && !isMine && (
									<span className="px-2 text-xs text-slate-400">
										{sender?.username ?? "Unknown"}
									</span>
								)}

								<div
									className={`w-fit max-w-[80%] rounded-2xl px-4 py-2 ${
										isMine
											? "bg-teal-600 text-white"
											: "bg-slate-800 text-slate-100"
									}`}
								>
									{message.content}
								</div>
							</div>
						)
					})}
			</div>

			<footer className="border-t border-slate-800 bg-slate-900 p-4">
				<form onSubmit={handleSubmit} className="flex gap-2">
					<input
						className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
						placeholder="Message…"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
					/>
					<button type="submit" className="rounded-xl bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-500">
						Send
					</button>
				</form>
			</footer>
		</div>
	)
}
