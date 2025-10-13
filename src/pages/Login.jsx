
export default function Login(){

	return(
		<main className="register-background">
			<div className="container mt-5 register-form">
				<h1 className="register-title ">Sign in</h1>
				<div className="form-floating mb-3">
					<input
						id="login-user-name"
						type="text"
						className="form-control"
						placeholder="Password"
					/>
					<label htmlFor="Name">User Name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						id="login-user-passwd"
						type="password"
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
					>
						{" "}
						Sign In
					</button>
				</div>
				<div className="mx-5 forget-passwd">
					<a href="#">¿Did you forgot your password?</a>
				</div>
			</div>
		</main>


	)


}
