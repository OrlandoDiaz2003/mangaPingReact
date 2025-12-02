import { createContext, useEffect, useState } from "react";
import { authAPI } from "./service/userServices";

export const AuthContext = createContext()

export default function AuthProvider( { children }){
	const [user, setUser] = useState(null)
	const [login, setLogin] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		checkAuth()
	}, []);

	const checkAuth = async () => {
		try {
			const userData = await authAPI.getCurrentUser(); 
			setUser(userData)
			setLogin(true)
			console.log("usuario auntenticado: " + userData)
		}
		catch (error){
			setUser(null)
			setLogin(false)
		}finally{
			setLoading(false)
		}
	}

	const loginUser = async (username, password) => {
		try{

			const userData = await authAPI.login(username, password)
			setUser(userData)
			setLogin(true)
			return userData

		}catch(error){
			throw new Error(error?.message || "error al logearse")
		}
	}

	const register = async ({ username, email, password }) => {
		try{
			const result = await authAPI.register({username,email,password});
			await loginUser(username, password)
			return result;
		}catch(error){
			throw new Error(error?.message || "Error al registrarse")
		}	
	}

	const logout = async () => {
		try{
			await authAPI.logout()
		}catch(error){
			console.error("error la cerrar la sesion ", error)
		}finally{
			setUser(null)
			setLogin(false)
		}
	}

	if(loading){
		return <div>Auntenticando...</div>
	}

	return(
		<AuthContext.Provider value={{ user, register, login,loginUser, logout}}>
			{ children }
		</AuthContext.Provider>
	)
}
