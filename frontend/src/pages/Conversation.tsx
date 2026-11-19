import { useParams } from "react-router"

export default function Conversation() {
	const { conversationId } = useParams()

	return (
		<div className="flex h-full flex-col">
			<header className="border-b p-4">{conversationId}</header>
			<div className="flex-1 p-4">
				{/* Messages go here */}
			</div>
			<footer className="border-t p-4">
				{/* Message input goes here */}
			</footer>
		</div>
	)
}
