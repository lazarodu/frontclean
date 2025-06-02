import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ProtectedRoute } from "../../presentation/routes/ProtectedRoute"
import { useAuth } from "../../presentation/hooks/useAuth"
import type { Mock } from "vitest"

// Mock do hook
vi.mock("../../presentation/hooks/useAuth")

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("exibe Loading quando isLoading é true", () => {
    (useAuth as Mock).mockReturnValue({
      currentUser: null,
      isLoading: true
    })

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Conteúdo Protegido</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("redireciona para /login quando não está autenticado", () => {
    (useAuth as Mock).mockReturnValue({
      currentUser: null,
      isLoading: false
    })

    render(
      <MemoryRouter initialEntries={["/user/comments"]}>
        <ProtectedRoute>
          <div>Conteúdo Protegido</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.queryByText("Conteúdo Protegido")).not.toBeInTheDocument()
  })

  it("redireciona para / quando requireAdmin é true e não é admin", () => {
    (useAuth as Mock).mockReturnValue({
      currentUser: { id: "1", role: "user" },
      isLoading: false
    })

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <ProtectedRoute requireAdmin>
          <div>Conteúdo Admin</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.queryByText("Conteúdo Admin")).not.toBeInTheDocument()
  })

  it("renderiza children quando autenticado e sem requireAdmin", () => {
    (useAuth as Mock).mockReturnValue({
      currentUser: { id: "1", role: "user" },
      isLoading: false
    })

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Conteúdo Protegido</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByText("Conteúdo Protegido")).toBeInTheDocument()
  })

  it("renderiza children quando autenticado como admin e requireAdmin é true", () => {
    (useAuth as Mock).mockReturnValue({
      currentUser: { id: "1", role: "admin" },
      isLoading: false
    })

    render(
      <MemoryRouter>
        <ProtectedRoute requireAdmin>
          <div>Conteúdo Admin</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(screen.getByText("Conteúdo Admin")).toBeInTheDocument()
  })
})
