import { Link } from "react-router-dom";
import { useContext, useState } from "react"; 
import { AuthContext } from "../AuthContext";
import userPhoto from '../assets/user_photo.jpg'
import { useNavigate } from "react-router-dom";

export default function Navbar() {

	const {login, logout} = useContext(AuthContext)
	const [title, setTitle] = useState("")
	const navigate = useNavigate()
	console.log("el estado de login es: "+ login)
	console.log(title)

	return (
		<header>
			<nav
				className="navbar navbar-expand-lg bg-body-tertiary"
				data-bs-theme="dark"
			>
				<div className="container-fluid">
					{/* Titulo */}
					<Link className="navbar-brand MangaPing" to="/">
						MangaPing!
					</Link>
					{/* Boton desplegable*/}
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					{/* Navbar */}
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0 w-100 justify-content-end gap-2">
							{/* Buscador */}
							<li className="nav-item my-2 d-flex justify-content-end">
								<form className="d-flex" role="search">
									<input
										className="form-control me-2"
										type="search"
										placeholder="Search"
										onChange={(e) => setTitle(e.target.value)}
										aria-label="Search"
										style={{ maxWidth: 250 }}
									/>
									<Link className="btn btn-search" to={`/manga/${title}`} type="submit"> Search </Link>
								</form>
							</li>

							{login && 
								<>
									<div style={{alignContent:"center"}}>
										<Link id="btn-explore" to="/explore/0" className="btn-nav btn">
											Explore
										</Link>
										<Link id="btn-calendar" to="/" className="btn-nav btn">
											Calendar
										</Link>
									</div>
									<div className="dropdown">
										<button
											id="btn-profile"
											className="btn btn-profile dropdown-toggle"
											data-bs-toggle="dropdown"
											type="button"
										>
											<img
												className="user-photo object-sm-contain"
												src={userPhoto}
												alt="user-photo"
											/>
										</button>
										<ul className="dropdown-menu dropdown-menu-end profile-menu">
											<li>
												<Link className="dropdown-item" to="/profile">
													Profile
												</Link>
											</li>
											<li>
												<hr className="dropdown-divider" />
											</li>
											<li>
												<Link className="dropdown-item" to="#">
													Favorites
												</Link>
											</li>
											<li>
												<Link className="dropdown-item" to="#">
													My List
												</Link>
											</li>
											<li>
												<Link className="dropdown-item" to="#">
													Settings
												</Link>
											</li>
											<li>
												<Link className="dropdown-item" onClick={logout} to="/">
													Log out
												</Link>
											</li>

										</ul>
									</div>
								</>
							}

							{/* Botones Sign in / Sign up */}
							<li className="nav-item my-2 d-flex justify-content-end">
								{!login &&
									<div className="d-flex gap-2">
										<Link
											id="btn-signin"
											className="btn btn-login"
											type="button"
											to = "/login"
										>
											Sign in
										</Link>
										<Link
											id="btn-signup"
											className="btn btn-login"
											type="button"
											to = "/register"
										>
											Sign up
										</Link>
									</div>
								}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}
