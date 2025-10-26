import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../src/components/Navbar.jsx";
import { AuthContext } from "../src/AuthContext.jsx"; // Asume que la ruta es correcta

const mockedUseNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockedUseNavigate,
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const MockAuthContextProvider = ({ children, loginState, logoutFn }) => (
  <AuthContext.Provider value={{ login: loginState, logout: logoutFn }}>
    {children}
  </AuthContext.Provider>
);

const mockLogout = vi.fn();

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Cuando el usuario NO está logueado", () => {
    const renderNotLoggedIn = () =>
      render(
        <MockAuthContextProvider loginState={false} logoutFn={mockLogout}>
          <Navbar />
        </MockAuthContextProvider>,
      );

    it("debe mostrar los botones Sign in y Sign up", () => {
      renderNotLoggedIn();

      expect(
        screen.getByRole("link", { name: /sign in/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /sign up/i }),
      ).toBeInTheDocument();
    });

    it("NO debe mostrar los botones Explore, Calendar ni el perfil", () => {
      renderNotLoggedIn();

      expect(screen.queryByText("Explore")).not.toBeInTheDocument();
      expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
      expect(screen.queryByAltText("user-photo")).not.toBeInTheDocument();
    });
  });

  describe("Cuando el usuario SÍ está logueado", () => {
    const renderLoggedIn = () =>
      render(
        <MockAuthContextProvider loginState={true} logoutFn={mockLogout}>
          <Navbar />
        </MockAuthContextProvider>,
      );

    it("debe mostrar los botones Explore, Calendar y la foto de perfil", () => {
      renderLoggedIn();

      expect(screen.getByRole("link", { name: "Explore" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Calendar" }),
      ).toBeInTheDocument();
      expect(screen.getByAltText("user-photo")).toBeInTheDocument();
    });

    it("NO debe mostrar los botones Sign in y Sign up", () => {
      renderLoggedIn();

      expect(screen.queryByText("Sign in")).not.toBeInTheDocument();
      expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
    });

    it('Cuando presione el boton de logout debe navegar index', () => {
      renderLoggedIn();

      const logoutLink = screen.getByRole("link", { name: /log out/i });
      fireEvent.click(logoutLink);

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe("Funcionalidad del Buscador", () => {
    const renderSearchBar = () =>
      render(
        <MockAuthContextProvider loginState={false} logoutFn={mockLogout}>
          <Navbar />
        </MockAuthContextProvider>,
      );

    it("debe navegar a /explore/0/search-term al buscar un término", () => {
      renderSearchBar();

      const searchInput = screen.getByPlaceholderText("Search");
      const searchButton = screen.getByRole("button", { name: /search/i });

      fireEvent.change(searchInput, { target: { value: "Berserk" } });

      fireEvent.submit(searchButton);

      expect(mockedUseNavigate).toHaveBeenCalledWith("/explore/0/Berserk");
    });

    it("debe navegar solo a /explore/0 si el input está vacío", () => {
      renderSearchBar();

      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.submit(searchButton);
      expect(mockedUseNavigate).toHaveBeenCalledWith("/explore/0");
    });
  });
});
