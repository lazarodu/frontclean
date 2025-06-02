import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from "../../presentation/components/PostForm";

describe("PostForm", () => {
  it("deve exibir os campos de título, a descrição e o conteúdo do post", async () => {
    const onSubmitMock = vi.fn();
    const user = userEvent.setup();
    render(<PostForm onSubmit={onSubmitMock} />);
    const titleInput = screen.getByLabelText("Título");
    const descriptionInput = screen.getByLabelText("Descrição");
    const contentInput = screen.getByLabelText("Conteúdo");
    const submit = screen.getByRole("button", { name: "Publicar" });
    await user.type(titleInput, "Título teste");
    await user.type(descriptionInput, "Descrição teste");
    await user.type(contentInput, "Conteúdo teste");
    await user.click(submit);
    expect(onSubmitMock).toHaveBeenCalledWith({
      title: "Título teste",
      description: "Descrição teste",
      content: "Conteúdo teste",
    });
  });
});
