export default function Register(){

	return(
		<main className="register-background">
			<div className="container mt-5 register-form">
				<h1 className="register-title ">Sign Up</h1>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="input-name"
						placeholder="Password"
					/>
					<label htmlFor="Name">User Name</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="input-email"
						placeholder="name@example.com"
					/>
					<label htmlFor="floatingInput">Email Address</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="input-email-confirm"
						placeholder="name@example.com"
					/>
					<label htmlFor="floatingInput">Email Address Confirm</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						minLength={8}
						className="form-control"
						id="input-password"
						placeholder="Password"
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="password"
						className="form-control"
						id="input-password-confirm"
						placeholder="Password"
					/>
					<label htmlFor="floatingPassword">Confirm password</label>
				</div>
				<div className="btn-register">
					<button
						id="register-btn"
						type="submit"
						className="btn btn-primary register-btn"
					>
						{" "}
						SignUp
					</button>
				</div>
				<div className="mx-5">
					<a href="login.html">Do you already have an account?</a>
				</div>
			</div>
		</main>
	)
}
