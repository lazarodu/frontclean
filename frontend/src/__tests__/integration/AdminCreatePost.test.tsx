import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, type Mock } from "vitest"
import { AdminCreatePostPage } from "../../presentation/pages/AdminCreatePost"
import { usePost } from "../../presentation/hooks/usePost"
import { AuthContext } from "../../presentation/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

// Mock do hook usePost
vi.mock("../../presentation/hooks/usePost")

// Mock do react-router-dom useNavigate
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(),
}))

describe("AdminCreatePostPage", () => {
  const createPostMock = vi.fn()
  const navigateMock = vi.fn()

  beforeEach(() => {
    createPostMock.mockReset()
    navigateMock.mockReset()


      ; (usePost as Mock).mockReturnValue({
        createPost: createPostMock,
      })


      ; (useNavigate as Mock).mockReturnValue(navigateMock)
  })

  it("exibe mensagem de carregando quando não tem currentUser", () => {
    render(
      <AuthContext.Provider value={{ currentUser: null, isLoading: false, login: vi.fn(), register: vi.fn(), logout: vi.fn() }}>
        <AdminCreatePostPage />
      </AuthContext.Provider>
    )
    expect(screen.getByText("Carregando...")).toBeInTheDocument()
  })

  it("chama createPost e navega após envio do formulário", async () => {
    const user = userEvent.setup()

    render(
      <AuthContext.Provider value={{ currentUser: { id: "1", name: "Admin User", email: 'admin@example.com', role: 'admin' }, isLoading: false, login: vi.fn(), register: vi.fn(), logout: vi.fn() }}>
        <AdminCreatePostPage />
      </AuthContext.Provider>
    )
    const submitButton = screen.getByRole("button", { name: /Publicar/i })

    // Mock do createPost resolve
    createPostMock.mockResolvedValueOnce(undefined)

    await user.click(submitButton)

    // Verifique se createPost foi chamado (depende do PostForm se o onSubmit é chamado automaticamente)
    expect(createPostMock).toHaveBeenCalled()

    // Verifique se navegação ocorreu para /admin/posts
    expect(navigateMock).toHaveBeenCalledWith("/admin/posts")
  })
})
