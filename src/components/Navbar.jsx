import { Link } from "react-router-dom";

export default function Navbar() {

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
                    aria-label="Search"
                    style={{ maxWidth: 250 }}
                  />
                  <button className="btn btn-search" type="submit">
                    Search
                  </button>
                </form>
              </li>
              {/* Botones Sign in / Sign up */}
              <li className="nav-item my-2 d-flex justify-content-end">
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
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
