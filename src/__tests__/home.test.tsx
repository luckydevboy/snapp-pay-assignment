import { render, screen, waitFor } from "@testing-library/react";
import { vi, Mock, describe, beforeEach, afterEach, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { useGetPassengers } from "@/apis";
import { Home } from "@/components/pages";

vi.mock("@/apis", () => ({
  useGetPassengers: vi.fn(),
}));
vi.mock("@/components", () => ({
  ContactCard: ({ contact }: any) => <div>{contact.first_name}</div>,
  FrequentList: vi.fn(() => <div>FrequentList Mock</div>),
}));

describe("Home Component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "frequents",
      JSON.stringify([{ id: 1, first_name: "John", last_name: "Doe" }]),
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading state when fetching passengers", () => {
    (useGetPassengers as Mock).mockReturnValue({
      data: null,
      status: "pending",
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays an error message when fetching passengers fails", async () => {
    const error = new Error("Failed to fetch");
    (useGetPassengers as Mock).mockReturnValue({
      data: null,
      status: "error",
      error,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
    });
  });
});
