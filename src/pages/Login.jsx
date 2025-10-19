import {  useState, useContext, useEffect} from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login(){
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const {setLogin}  = useContext(AuthContext)


	const handleSubmit = (e) =>{
		e.preventDefault()

		if(!username){
			setError("Enter a valid user name")
		}

		if(!password){
			setError("You have to enter a password to login")
		}

		const users = JSON.parse(localStorage.getItem("users"))||[];

		const exits = users.some(user => user.name === username && user.passwd === password)

		if(!exits){
			setError("No se ha encontrado este usuario")
			return
		}
		
		localStorage.setItem("login",JSON.stringify(true))
		setLogin(true)
		navigate("/explore")
	}

	return(
		<main className="register-background">
			<div className="container mt-5 register-form">
				<h1 className="register-title ">Sign in</h1>
				<div className="form-floating mb-3">
					<input
						id="login-user-name"
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						className="form-control"
						placeholder="Password"
					/>
					<label htmlFor="Name">User Name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						id="login-user-passwd"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
						placeholder="Password"
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="btn-register">
					<button
						id="btn-login"
						type="submit"
						className="btn btn-primary register-btn"
						onClick={handleSubmit}
					>
						{" "}
						Sign In
					</button>
				</div>
				{error && <p style={ {color:"red" }}>{error}</p>}
				<div className="mx-5 forget-passwd">
					<a href="#">¿Did you forgot your password?</a>
				</div>
			</div>
		</main>


	)


}
