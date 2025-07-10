import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { UserCommentsPage } from "../../presentation/pages/UserComments"
import { useAuth } from "../../presentation/hooks/useAuth"
import { useComment } from "../../presentation/hooks/useComment"
import { usePost } from "../../presentation/hooks/usePost"
import type { Mock } from "vitest"

// Corrige mocks para serem vi.fn()
vi.mock("../../presentation/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}))
vi.mock("../../presentation/hooks/useComment", () => ({
  useComment: vi.fn(),
}))
vi.mock("../../presentation/hooks/usePost", () => ({
  usePost: vi.fn(),
}))

describe("UserCommentsPage", () => {
  const mockUser = { id: "1", role: "user" }
  const mockComments = [
    { id: "1", post_id: "101", user_id: "1", comment: "Comentário 1", data: "2024-05-01" },
    { id: "2", post_id: "102", user_id: "1", comment: "Comentário 2", data: "2024-05-02" },
  ]
  const mockPosts = [
    { id: "101", title: "Postagem 1" },
    { id: "102", title: "Postagem 2" },
  ]

  beforeEach(() => {
    // Limpa mocks para cada teste
    vi.clearAllMocks()

      // Configura valores padrão para hooks
      ; (useAuth as Mock).mockReturnValue({
        currentUser: mockUser,
      })
      ; (useComment as Mock).mockReturnValue({
        getCommentsByUser: () => mockComments,
        deleteComment: vi.fn(),
      })
      ; (usePost as Mock).mockReturnValue({
        posts: mockPosts,
      })
  })

  it("renderiza lista de comentários do usuário com título do post", async () => {
    render(
      <MemoryRouter>
        <UserCommentsPage />
      </MemoryRouter>
    )

    expect(await screen.findByText("Meus comentários")).toBeInTheDocument()
    expect(screen.getByText("Postagem 1")).toBeInTheDocument()
    expect(screen.getByText("Comentário 1")).toBeInTheDocument()
    expect(screen.getByText("Postagem 2")).toBeInTheDocument()
    expect(screen.getByText("Comentário 2")).toBeInTheDocument()
  })

  it("exibe mensagem quando não há comentários", async () => {
    ; (useComment as Mock).mockReturnValue({
      getCommentsByUser: () => [],
      deleteComment: vi.fn(),
    })

    render(
      <MemoryRouter>
        <UserCommentsPage />
      </MemoryRouter>
    )

    expect(await screen.findByText("Você não fez comentários ainda.")).toBeInTheDocument()
  })

  it("chama deleteComment e remove comentário ao clicar em Delete", async () => {
    const deleteCommentMock = vi.fn().mockResolvedValue(undefined)
      ; (useComment as Mock).mockReturnValue({
        getCommentsByUser: () => mockComments,
        deleteComment: deleteCommentMock,
      })

    // Simula window.confirm como true
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true)

    render(
      <MemoryRouter>
        <UserCommentsPage />
      </MemoryRouter>
    )

    const deleteButtons = await screen.findAllByText("Apagar")
    expect(deleteButtons).toHaveLength(2)

    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(deleteCommentMock).toHaveBeenCalledWith("1")
    })

    confirmSpy.mockRestore()
  })
})
