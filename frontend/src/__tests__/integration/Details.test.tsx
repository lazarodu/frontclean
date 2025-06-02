import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "../../App";

describe("Details Route", () => {
  it("deve exibir detalhes do post e lista de comentários", async () => {
    // Renderiza o App começando em /details/1
    render(
      <MemoryRouter initialEntries={["/details/post-1"]}>
        <App />
      </MemoryRouter>
    );

    // Deve mostrar título do post
    expect(await screen.findByRole("heading", { name: /Descrição/i })).toBeInTheDocument();

    // Deve mostrar lista de comentários (caso existam no mock)
    expect(screen.getByText(/comentário 2/i)).toBeInTheDocument();

    // Se usuário autenticado, deve ter formulário de comentário
    if (screen.queryByPlaceholderText(/escreva um comentário/i)) {
      // Preenche e envia comentário
      fireEvent.change(screen.getByPlaceholderText(/escreva um comentário/i), {
        target: { value: "Comentário de teste!" },
      });
      fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

      // Comentário deve aparecer na lista (assumindo atualização instantânea)
      expect(await screen.findByText(/comentário de teste!/i)).toBeInTheDocument();
    }
  });

  it("deve exibir mensagem de post não encontrado e permitir voltar para Home", async () => {
    render(
      <MemoryRouter initialEntries={["/details/999"]}>
        <App />
      </MemoryRouter>
    );

    // Deve exibir "Post não encontrado"
    expect(await screen.findByRole("heading", { name: /post não encontrado/i })).toBeInTheDocument();

    // Deve ter botão para voltar
    const voltarBtn = screen.getByRole("button", { name: /voltar para a home/i });
    fireEvent.click(voltarBtn);

    // Deve redirecionar para a home (lista de posts)
    expect(await screen.findByRole("heading", { name: /Post 1/i })).toBeInTheDocument();
  });
});
