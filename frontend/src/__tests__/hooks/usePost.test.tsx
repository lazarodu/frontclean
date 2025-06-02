import type React from "react"
import { renderHook } from "@testing-library/react"
import { PostContext } from "../../presentation/contexts/PostContext"
import { usePost } from "../../presentation/hooks/usePost"

describe("usePosts Hook", () => {
  it("returns the post context value", () => {
    const contextValue = {
      posts: [],
      isLoading: false,
      getPost: () => undefined,
      createPost: async () => ({ id: "", title: "", description: "", content: "", autor: "", data: "" }),
      updatePost: async () => ({ id: "", title: "", description: "", content: "", autor: "", data: "" }),
      deletePost: async () => { },
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
    )

    const { result } = renderHook(() => usePost(), { wrapper })

    expect(result.current).toBe(contextValue)
  })

})
