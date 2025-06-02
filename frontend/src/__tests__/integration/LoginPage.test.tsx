import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../../App";

describe("Login Route ", () => {
  it("verifica o acesso a página de admin", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "Admin1234@" },
    });
    fireEvent.click(screen.getByText(/entrar/i));

    const postElements = await screen.findAllByText(/Post/i);
    expect(postElements[0]).toBeInTheDocument();
  });
  it("fazer logout do admin", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: "Admin1234@" },
    });
    fireEvent.click(screen.getByText(/entrar/i));

    const postElements = await screen.findAllByText(/sair/i);
    expect(postElements[0]).toBeInTheDocument();

    // screen.debug();
    fireEvent.click(await screen.findByText(/sair/i));

    const sairElements = await screen.findAllByText(/Post/i);
    expect(sairElements[0]).toBeInTheDocument();
  });
});
