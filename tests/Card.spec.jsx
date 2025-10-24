import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Card from "../src/components/Card";
import { MangaContext } from "../src/MangaContext";

const fakeManga = [
  {
    title: "One Piece",
    description: "Monkey D. Luffy sets out to become the Pirate King.",
    banner: "https://example.com/onepiece.jpg",
  }
];

describe("Card component", () => {
  it("renders manga cards correctly", () => {
    render(
      <MemoryRouter>
        <MangaContext.Provider value={{ manga: fakeManga, loading: false }}>
          <Card />
        </MangaContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/one piece/i)).toBeInTheDocument();
	expect(screen.getByText(/Monkey D. Luffy sets out to become the Pirate King./i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /see more about this manga/i })).toBeInTheDocument();
  });
});


