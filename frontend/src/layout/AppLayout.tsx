import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

export default function AppLayout() {
	return (
		<div className="flex h-dvh flex-col">
			<Navbar />

			<main className="min-h-0 flex-1">
				<Outlet />
			</main>
		</div>
	)
}
