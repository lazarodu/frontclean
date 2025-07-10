import { render, screen } from "@testing-library/react";
import { PostDetails } from "../../presentation/components/PostDetails";
describe("PostDetails", () => {
  it("deve exibir o título, a descrição, o conteúdo, o autor e a data do post", () => {
    render(
      <PostDetails
        title="Meu Post"
        description="Minha Descrição"
        content=""
        autor="Lázaro"
        data={new Intl.DateTimeFormat("pt-BR").format(new Date("2025-05-12"))}
      />
    );
    expect(screen.getByText("Meu Post")).toBeInTheDocument();
    expect(screen.getByText("Minha Descrição")).toBeInTheDocument();
    expect(screen.getByText("Lázaro")).toBeInTheDocument();
    expect(screen.getByText("12/05/2025")).toBeInTheDocument();
  });
});
