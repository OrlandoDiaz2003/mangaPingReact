import { useState, useContext} from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register(){

	const {register} = useContext(AuthContext)

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate()
	const handleSubmit = (e) =>{
		e.preventDefault();
		
		if(!userName || !email){
			setError("Complete los campos para poder registrarse");
			return;
		}
		if(email != confirmEmail){
			setError("Los correos no coinciden")
			return 
		}
		if(!password){
			setError("Ingresa una contraseña valida")
			return 
		}
		if(password != confirmPassword){
			setError("Las contraseñas no coinciden")
			return
		}

		if(password.length < 8){
			setError("La contraseña tiene que tener mas de 8 caracteres")
			return 
		}
		
		const users = JSON.parse(localStorage.getItem("users")) || [];
        const exits = users.some(users => users.mail === email || users.name === userName)
		if(exits){
			setError("Esta cuenta ya existe")
			return
		}
		register({ username: userName,email: email, password: password })
		console.log(userName)
		navigate("/explore")
		return
	}
	return (
    <main className="register-background">
      <div className="container mt-5 register-form">
        <h1 className="register-title ">Sign Up</h1>
        {/* User input */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUserName(e.target.value)}
            id="input-name"
            placeholder="UserName"
          />
          <label htmlFor="Name">User Name</label>
        </div>
        {/* Email input */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="input-email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        {/* Email confirm input */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="input-email-confirm"
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email Address Confirm</label>
        </div>
        {/* Password input */}
        <div className="form-floating mb-3">
          <input
            type="password"
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="input-password"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        {/* Confirm password input */}
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="input-password-confirm"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Confirm password</label>
        </div>
        <div className="btn-register">
          <button
            id="register-btn"
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary register-btn"
          >
            {" "}
            SignUp
          </button>
        </div>
		{error && <p style={ { color:"red" }}> {error}</p>}
        <div className="mx-5">
          <a href="login.html">Do you already have an account?</a>
        </div>
      </div>
    </main>
  );
}
