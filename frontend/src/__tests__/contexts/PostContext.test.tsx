import { render, screen, act } from "@testing-library/react"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { useContext } from "react"
import { PostProvider, PostContext } from "../../presentation/contexts/PostContext"

// Componente teste para consumir PostContext
function TestComponent() {
  const { posts, isLoading, getPost, createPost, updatePost, deletePost } = useContext(PostContext)

  return (
    <div>
      <div>Loading: {isLoading ? "true" : "false"}</div>
      <div>Posts count: {posts.length}</div>
      <div>Get post 1 title: {getPost("1")?.title || "not found"}</div>

      <button onClick={() => createPost({ title: "New Post", description: "desc", content: "content", autor: "Autor" })} data-testid="create">
        Create Post
      </button>

      <button onClick={() => updatePost("1", { title: "Updated Title" }).catch(() => { })} data-testid="update">
        Update Post 1
      </button>

      <button onClick={() => deletePost("1").catch(() => { })} data-testid="delete">
        Delete Post 1
      </button>
    </div>
  )
}

describe("PostContext / PostProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it("deve iniciar carregando e depois carregar posts", async () => {
    render(
      <PostProvider>
        <TestComponent />
      </PostProvider>
    )

    // isLoading inicialmente true
    expect(screen.getByText("Loading: true")).toBeInTheDocument()
    expect(screen.getByText("Posts count: 0")).toBeInTheDocument()

    // Avança timer 500ms para simular carregamento
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    // Agora carregou posts (mockPosts do seu contexto)
    expect(screen.getByText("Loading: false")).toBeInTheDocument()
    expect(screen.getByText(/Posts count:/)).not.toHaveTextContent("0")
  })

  it("getPost retorna post correto", async () => {
    render(
      <PostProvider>
        <TestComponent />
      </PostProvider>
    )

    // Avança timer para carregar posts
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/Get post 1 title:/)).toHaveTextContent("not found")
  })

  it("createPost adiciona post", async () => {
    render(
      <PostProvider>
        <TestComponent />
      </PostProvider>
    )

    // Avança timer para carregar posts
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    const createBtn = screen.getByTestId("create")

    await act(async () => {
      createBtn.click()
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/Posts count:/)).not.toHaveTextContent("0")
  })

  it("updatePost atualiza post", async () => {
    render(
      <PostProvider>
        <TestComponent />
      </PostProvider>
    )

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    const updateBtn = screen.getByTestId("update")

    await act(async () => {
      updateBtn.click()
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/Get post 1 title:/)).toHaveTextContent("not found")
  })

  it("deletePost remove post", async () => {
    render(
      <PostProvider>
        <TestComponent />
      </PostProvider>
    )

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    const deleteBtn = screen.getByTestId("delete")

    await act(async () => {
      deleteBtn.click()
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/Posts count:/)).toHaveTextContent("2")
  })
})
