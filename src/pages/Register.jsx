import { useState } from "react";

export default function Register(){
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) =>{
		e.preventDefault();
		
		if(!userName || !email){
			setError("Este usuario no existe");
			return;
		}
		if(!password){
			setError("Ingresa una contraseña")
		}

		if(password.length < 8){
			setError("La contraseña tiene que tener mas de 8 caracteres")
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
            id="input-name"
            placeholder="UserName"
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
