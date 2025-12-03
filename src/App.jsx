import Navbar from './components/Navbar.jsx'
import Index from './pages/Index.jsx'
import MangaProvider from './MangaContext.jsx'
import AuthProvider from './AuthContext.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Explore from './pages/Explore.jsx'
import Profile from './pages/Profile.jsx'
import MangaPage from './pages/MangaPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import { Routes,Route } from 'react-router-dom'

export default function App(){
	return(
		<>
			<AuthProvider>
				<MangaProvider>
						<Navbar/>
						<Routes>
							<Route path="/" element={<Index/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="/register" element={<Register/>}/>
							<Route path="/explore/:offset/:title?" element={<Explore/>}/>
							<Route path="/profile/" element={<Profile/>}/>
							<Route path="/manga/:title" element={<MangaPage/>}/>
							<Route path="/calendar" element={<CalendarPage/>}/>
						</Routes>
				</MangaProvider>
			</AuthProvider>
		</>
	)
}
