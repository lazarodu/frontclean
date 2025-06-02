import { render, screen, act } from "@testing-library/react"
import { CommentProvider, CommentContext } from "../../presentation/contexts/CommentContext"
import { vi } from "vitest"
import { useContext } from "react"

vi.useFakeTimers()

const TestComponent = () => {
  const {
    comments,
    isLoading,
    getCommentsByPost,
    getCommentsByUser,
    addComment,
    deleteComment,
  } = useContext(CommentContext)

  const handleAdd = async () => {
    await addComment({
      postId: "1",
      userId: "1",
      comment: "Novo comentário",
    })
  }

  const handleDelete = async () => {
    const idToDelete = comments[0]?.id
    if (idToDelete) {
      await deleteComment(idToDelete)
    }
  }

  const postComments = getCommentsByPost("post-1")
  const userComments = getCommentsByUser("user-1")

  return (
    <div>
      <p>isLoading: {isLoading.toString()}</p>
      <p>Comments count: {comments.length}</p>
      <p>Post 1 comments count: {postComments.length}</p>
      <p>User 1 comments count: {userComments.length}</p>
      {postComments.map((c) => (
        <p key={c.id}>Autor: {c.autor}</p>
      ))}
      <button onClick={handleAdd} data-testid="add">Add Comment</button>
      <button onClick={handleDelete} data-testid="delete">Delete Comment</button>
    </div>
  )
}

describe("CommentContext / CommentProvider", () => {
  it("carrega e atualiza estado corretamente", async () => {
    render(
      <CommentProvider>
        <TestComponent />
      </CommentProvider>
    )

    // Inicialmente isLoading true
    expect(screen.getByText("isLoading: true")).toBeInTheDocument()

    // Avança 500ms para simular carregamento
    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText("isLoading: false")).toBeInTheDocument()
    expect(screen.getByText(/Comments count:/)).not.toHaveTextContent("0")
  })

  it("getCommentsByPost retorna autor correto", async () => {
    render(
      <CommentProvider>
        <TestComponent />
      </CommentProvider>
    )

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    // Checa se pelo menos um autor é renderizado
    expect(screen.getAllByText(/Autor:/)[0]).toBeInTheDocument()
  })

  it("addComment adiciona um novo comentário", async () => {
    render(
      <CommentProvider>
        <TestComponent />
      </CommentProvider>
    )

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    const initialCount = screen.getByText(/Comments count:/).textContent

    const addBtn = screen.getByTestId("add")
    await act(async () => {
      addBtn.click()
      vi.advanceTimersByTime(500)
    })

    const newCount = screen.getByText(/Comments count:/).textContent

    expect(newCount).not.toEqual(initialCount)
  })

  it("deleteComment remove comentário", async () => {
    render(
      <CommentProvider>
        <TestComponent />
      </CommentProvider>
    )

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    const deleteBtn = screen.getByTestId("delete")
    await act(async () => {
      deleteBtn.click()
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText(/Comments count:/)).toHaveTextContent("2")
  })
})
