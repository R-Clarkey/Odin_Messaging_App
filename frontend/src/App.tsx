import { BrowserRouter, Route, Routes } from "react-router"
import { AuthProvider } from "./auth/AuthProvider"
import RequireAuth from "./auth/RequireAuth"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AppLayout from "./layout/AppLayout"
import MessagesLayout from "./layout/MessagesLayout"
import Conversation from "./pages/Conversation"

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route element={<RequireAuth />}>
						<Route element={<AppLayout />}>
							<Route path="/dashboard" element={<Dashboard />} />

							<Route path="/messages" element={<MessagesLayout />}>
								<Route index element={<p>Select a conversation</p>} />
								<Route path=":conversationId" element={<Conversation />} />
							</Route>
						</Route>
					</Route>

					<Route path="*" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}
