import Navbar from './components/Navbar.jsx'
import Index from './pages/Index.jsx'
import MangaProvider, { MangaContext } from './MangaContext.jsx'
import AuthProvider from './AuthContext.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Explore from './pages/Explore.jsx'
import Profile from './pages/Profile.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

export default function App(){
	return(
		<>
			<AuthProvider>

				<MangaProvider>
					<BrowserRouter>
						<Navbar/>
						<Routes>
							<Route path="/" element={<Index/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="/register" element={<Register/>}/>
							<Route path="/explore" element={<Explore/>}/>
							<Route path="/profile" element={<Profile/>}/>
						</Routes>
					</BrowserRouter>
				</MangaProvider>

			</AuthProvider>
		</>
	)
}
