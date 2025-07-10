import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, type Mock } from "vitest"
import { AdminEditPostPage } from "../../presentation/pages/AdminEditPost"
import { usePost } from "../../presentation/hooks/usePost"
import { useParams, useNavigate } from "react-router-dom"
import type { PostFormProps } from "../../presentation/components/PostForm"

// Mock do usePost
vi.mock("../../presentation/hooks/usePost")

// Mock do react-router-dom useParams e useNavigate
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}))

// Mock do PostForm para facilitar o teste (dispara onSubmit direto)
vi.mock("../../presentation/components/PostForm", () => ({

  PostForm: ({ initialData, onSubmit }: PostFormProps) => {
    return (
      <>
        <div>Form mock - title: {initialData?.title}</div>
        <button onClick={() => onSubmit({ title: "Updated Title", description: "Updated Description", content: "Updated content" })}>Submit</button>
      </>
    )
  },
}))

describe("AdminEditPostPage", () => {
  const updatePostMock = vi.fn()
  const navigateMock = vi.fn()
  const getPostMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

      ; (usePost as Mock).mockReturnValue({
        getPost: getPostMock,
        updatePost: updatePostMock,
      })

      ; (useNavigate as Mock).mockReturnValue(navigateMock)
  })

  it("exibe o formulário com dados iniciais e atualiza post", async () => {
    const user = userEvent.setup()
      ; (useParams as Mock).mockReturnValue({ id: "1" })

    getPostMock.mockReturnValue({
      id: "1",
      title: "My Post",
      content: "Post content",
      autor: "Admin",
      data: "2023-01-01",
    })

    updatePostMock.mockResolvedValue(undefined)

    render(<AdminEditPostPage />)
    await waitFor(() => {
      expect(screen.getByText("Form mock - title: My Post")).toBeInTheDocument()
    })
    await user.click(screen.getByText("Submit"))

    expect(updatePostMock).toHaveBeenCalledWith("1", { title: "Updated Title", description: "Updated Description", content: "Updated content" })
    expect(navigateMock).toHaveBeenCalledWith("/admin/posts")
  })

  it("exibe mensagem de post não encontrado e navega ao clicar em Back", async () => {
    const user = userEvent.setup()
      ; (useParams as Mock).mockReturnValue({ id: "2" })

    getPostMock.mockReturnValue(undefined) // Post não encontrado

    render(<AdminEditPostPage />)
    await waitFor(() => {
      expect(screen.getByText("Post não encontrado")).toBeInTheDocument()
      expect(screen.getByText("A postagem que você está tentando editar não existe ou foi removido.")).toBeInTheDocument()
    })
    await user.click(screen.getByText("Voltar aos Posts"))

    expect(navigateMock).toHaveBeenCalledWith("/admin/posts")
  })
})
