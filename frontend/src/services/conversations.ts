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

import { apiConnect } from "../api/client"

export function getConversations(): Promise<Conversation[]> {
    return apiConnect("/api/conversations") as Promise<Conversation[]>
}

export function getConversation(conversationId: string): Promise<Conversation> {
	return apiConnect(`/api/conversations/${conversationId}`)
}

