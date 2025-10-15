import { createContext, useState } from "react";
import Register from './pages/Register' 


export const AuthContext = createContext()

export default function AuthProvider( { children }){
	const [logged, setLogged ] =useState(false)
	const [loading, setLoading] = useState(true)


}