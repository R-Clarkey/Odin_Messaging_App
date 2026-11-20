export default function Conversation() {

	return (
		<div className="flex h-full flex-col bg-slate-950 text-slate-100">
			<header className="border-b border-slate-800 bg-slate-900 px-4 py-3">
				<div className="font-medium">Group / User</div>
				{/* Pass group name / username above */}
			</header>

			<div className="flex-1 space-y-3 overflow-y-auto p-4">
				<div className="w-fit max-w-[80%] rounded-2xl bg-slate-800 px-4 py-2 text-slate-100">
					{/* Contacts messages will use this style, left */}
				</div>

				<div className="ml-auto w-fit max-w-[80%] rounded-2xl bg-teal-600 px-4 py-2 text-white">
					{/* Users messages will use this style, right */}
				</div>
			</div>

			<footer className="border-t border-slate-800 bg-slate-900 p-4">
				<div className="flex gap-2">
					<input
						className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-teal-500 focus:outline-none"
						placeholder="Message…"
					/>
					<button className="rounded-xl bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-500">
						Send
					</button>
				</div>
			</footer>
		</div>
	)
}
