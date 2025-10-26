import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Index from "../src/pages/Index";
import { describe, expect, it } from "vitest";
import MangaProvider from "../src/MangaContext";
import { MemoryRouter } from "react-router-dom";

describe("Pagina index", () => {
  it("Renderiza titulo correctamente", () => {
    render(
      <MemoryRouter>
        <MangaProvider>
          <Index />
        </MangaProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Trending")).toBeInTheDocument();
	expect(screen.getByText(/explore the catalog of upcoming manga releases and discover/i))
	.toBeInTheDocument();
  });
});

