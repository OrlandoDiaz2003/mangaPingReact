import { createContext, useState } from "react";

export const AuthContext = createContext()

export default function AuthProvider( { children }){
	const [user, setUser] = useState(null)
	
	const register = ({ username, email, password }) => {
		console.log(username)
		const newUser = {
			name: username,
			mail: email,
			passwd: password
		}

		setUser(newUser)
		const users = JSON.parse(localStorage.getItem("users")) || [];
		users.push(newUser)
		localStorage.setItem("users", JSON.stringify(users))
	}

	return(
		<AuthContext.Provider value={{ user, register }}>
			{ children }
		</AuthContext.Provider>

	)


}
