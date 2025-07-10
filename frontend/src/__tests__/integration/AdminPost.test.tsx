import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AdminPostPage } from "../../presentation/pages/AdminPost"
import { usePost } from "../../presentation/hooks/usePost"
import type { Mock } from "vitest"

// Mock do hook usePost
vi.mock("../../presentation/hooks/usePost", () => ({
  usePost: vi.fn(),
}))

describe("AdminPostPage", () => {
  const mockPosts = [
    { id: "1", title: "Post 1", autor: "Autor 1", data: "2024-01-01" },
    { id: "2", title: "Post 2", autor: "Autor 2", data: "2024-01-02" },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("mostra mensagem de loading enquanto carrega", () => {
    (usePost as Mock).mockReturnValue({
      posts: [],
      isLoading: true,
      deletePost: vi.fn(),
    })

    render(
      <MemoryRouter initialEntries={["/admin/posts"]}>
        <AdminPostPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Carregando posts.../i)).toBeInTheDocument()
  })

  it("mostra mensagem quando não há posts", () => {
    (usePost as Mock).mockReturnValue({
      posts: [],
      isLoading: false,
      deletePost: vi.fn(),
    })

    render(
      <MemoryRouter>
        <AdminPostPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Nenhum post encontrado/i)).toBeInTheDocument()
  })

  it("renderiza a tabela com posts", () => {
    (usePost as Mock).mockReturnValue({
      posts: mockPosts,
      isLoading: false,
      deletePost: vi.fn(),
    })

    render(
      <MemoryRouter>
        <AdminPostPage />
      </MemoryRouter>
    )

    expect(screen.getByText("Gerenciar Posts")).toBeInTheDocument()
    expect(screen.getByText("Post 1")).toBeInTheDocument()

    expect(screen.getByText("Post 2")).toBeInTheDocument()
  })

  it("o botão de criar post tem o link correto", () => {
    (usePost as Mock).mockReturnValue({
      posts: [],
      isLoading: false,
      deletePost: vi.fn(),
    })

    render(
      <MemoryRouter>
        <AdminPostPage />
      </MemoryRouter>
    )

    const createButton = screen.getByRole("link", { name: /Criar um Post/i })
    expect(createButton).toHaveAttribute("href", "/admin/posts/create")
  })

  it("chama deletePost ao confirmar exclusão", () => {
    const mockDeletePost = vi.fn().mockResolvedValue(undefined)
      ; (usePost as Mock).mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        deletePost: mockDeletePost,
      })

    // Mock do window.confirm para sempre retornar true
    vi.spyOn(window, "confirm").mockReturnValue(true)

    render(
      <MemoryRouter>
        <AdminPostPage />
      </MemoryRouter>
    )

    const deleteButtons = screen.getAllByText(/Delete/i)
    expect(deleteButtons.length).toBeGreaterThan(0)

    fireEvent.click(deleteButtons[0])
    expect(mockDeletePost).toHaveBeenCalledWith("1")
  })

  it("não chama deletePost se confirmar for false", () => {
    const mockDeletePost = vi.fn()
      ; (usePost as Mock).mockReturnValue({
        posts: mockPosts,
        isLoading: false,
        deletePost: mockDeletePost,
      })

    vi.spyOn(window, "confirm").mockReturnValue(false)

    render(
      <MemoryRouter>
        <AdminPostPage />
      </MemoryRouter>
    )

    const deleteButtons = screen.getAllByText(/Delete/i)
    fireEvent.click(deleteButtons[0])
    expect(mockDeletePost).not.toHaveBeenCalled()
  })
})
