import { createContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider( { children }){
	const [user, setUser] = useState(null)
	const [login, setLogin] = useState(() => {
		return JSON.parse(localStorage.getItem(("login"))) || false;
	})
	
	const register = ({ username, email, password }) => {
		const newUser = {
			name: username,
			mail: email,
			passwd: password
		}

		setUser(newUser)
		const users = JSON.parse(localStorage.getItem("users")) || [];
		users.push(newUser)
		localStorage.setItem("users", JSON.stringify(users))
		localStorage.setItem("login",JSON.stringify(true))
		setLogin(JSON.parse(localStorage.getItem("login")) || false)
	}

	const logout = () => {
		localStorage.setItem("login", JSON.stringify(false))
		setLogin(JSON.parse(localStorage.getItem("login")) || false)
	}

	return(
		<AuthContext.Provider value={{ user, register, login,setLogin, logout}}>
			{ children }
		</AuthContext.Provider>
	)
}
