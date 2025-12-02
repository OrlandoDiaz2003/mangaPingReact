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
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		
		if(!userName || !email){
			setError("Complete los campos para poder registrarse");
			setLoading(false)
			return;
		}
		if(email != confirmEmail){
			setError("Los correos no coinciden")
			setLoading(false)
			return 
		}
		if(!password){
			setError("Ingresa una contraseña valida")
			setLoading(false)
			return 
		}
		if(password != confirmPassword){
			setError("Las contraseñas no coinciden")
			setLoading(false)
			return
		}

		if(password.length < 8){
			setError("La contraseña tiene que tener mas de 8 caracteres")
			setLoading(false)
			return 
		}
		
		try{
			await register({ username: userName, email: email, password: password })
			
			console.log("conexion exitosa")
			navigate("/explore/0")
		}
		catch(error){
			setError(error.message || "Error al registrarse")
		}
		finally{
			setLoading(false)
		}
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
			disabled={loading}
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
			disabled={loading}
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
			disabled={loading}
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
			disabled={loading}
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
			disabled={loading}
          />
          <label htmlFor="floatingPassword">Confirm password</label>
        </div>
        <div className="btn-register">
          <button
            id="register-btn"
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary register-btn"
			disabled={loading}
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
