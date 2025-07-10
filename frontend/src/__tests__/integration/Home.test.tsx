import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../../App";

describe("Rotas de integração", () => {
  it("deve exibir a lista de posts na rota /", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
    })
  });
});
