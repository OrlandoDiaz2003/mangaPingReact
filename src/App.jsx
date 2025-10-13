import Navbar from './components/Navbar.jsx'
import Index from './pages/Index.jsx'
import MangaProvider, { MangaContext } from './MangaContext.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

export default function App(){
	return(
		<>
			<MangaProvider>
				<BrowserRouter>
					<Navbar/>
					<Routes>
						<Route path="/" element={<Index/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register" element={<Register/>}/>
					</Routes>
				</BrowserRouter>
			</MangaProvider>
		</>
	)
}
