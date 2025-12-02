import {  useState, useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login(){
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const { loginUser }  = useContext(AuthContext)


	const handleSubmit = async (e) =>{
		e.preventDefault()
		setLoading(true)

		if(!username){
			setError("Enter a valid user name")
			setLoading(false)
			return
		}

		if(!password){
			setError("You have to enter a password to login")
			setLoading(false)
			return
		}
		try{
			await loginUser(username, password)
			navigate("/explore/0")
		}catch(error){
			setError(error.message || "Credenciales incorrectas")
		}finally{
			setLoading(false)
		}

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
						disabled={loading}
						value={username}
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
						disabled={loading}
						value={password}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="btn-register">
					<button
						id="btn-login"
						type="submit"
						className="btn btn-primary register-btn"
						onClick={handleSubmit}
						disabled={loading}
					>
						{" "}
				{loading ? "Iniciando sesion": "Sign In" }
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
