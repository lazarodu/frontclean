import { render, screen, act } from "@testing-library/react"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { useContext, useEffect, useState } from "react"
import { PostProvider, PostContext } from "../../presentation/contexts/PostContext"

export function TestComponent() {
  const { posts, isLoading, getPost, createPost, updatePost, deletePost } = useContext(PostContext);
  const [postTitle, setPostTitle] = useState<string | null>(null);

  useEffect(() => {
    getPost("post-1").then((post) => {
      setPostTitle(post?.title ?? "not found");
    });
  }, [posts]);

  const handleCreate = async () => {
    await createPost({ title: "New Post", description: "desc", content: "content" });
  };

  const handleUpdate = async () => {
    try {
      await updatePost("1", { title: "Updated Title" });
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost("1");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <div>Loading: {isLoading ? "true" : "false"}</div>
      <div>Posts count: {posts.length}</div>
      <div>Get post 1 title: {postTitle}</div>

      <button onClick={handleCreate} data-testid="create">Create Post</button>
      <button onClick={handleUpdate} data-testid="update">Update Post 1</button>
      <button onClick={handleDelete} data-testid="delete">Delete Post 1</button>
    </div>
  );
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
    screen.debug()
    screen.debug()
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

    expect(screen.getByText(/Get post 1 title:/)).toHaveTextContent("Post 1")
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

    expect(screen.getByText(/Get post 1 title:/)).toHaveTextContent("Post 1")
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

    expect(screen.getByText(/Posts count:/)).toHaveTextContent("3")
  })
})
