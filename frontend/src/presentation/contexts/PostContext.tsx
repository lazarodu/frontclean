import { createContext, useState, useEffect, type ReactNode } from "react"
import type { PostProps } from "../../shared/types/PostType"
import { mockPosts } from "../../infrastructure/mocks/PostMock"

interface PostContextType {
  posts: PostProps[]
  isLoading: boolean
  getPost: (id: string) => PostProps | undefined
  createPost: (post: Omit<PostProps, "id" | "data">) => Promise<PostProps>
  updatePost: (id: string, post: Partial<PostProps>) => Promise<PostProps>
  deletePost: (id: string) => Promise<void>
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  isLoading: true,
  getPost: () => undefined,
  createPost: async () => ({ id: "", title: "", description: "", content: "", autor: "", data: "" }),
  updatePost: async () => ({ id: "", title: "", description: "", content: "", autor: "", data: "" }),
  deletePost: async () => { },
})

interface PostProviderProps {
  children: ReactNode
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula chamada de API
    setTimeout(() => {
      setPosts(mockPosts)
      setIsLoading(false)
    }, 500)
  }, [])

  const getPost = (id: string) => {
    return posts.find((post) => post.id === id)
  }

  const createPost = async (postData: Omit<PostProps, "id" | "data">) => {
    // Simula chamada de API
    return new Promise<PostProps>((resolve) => {
      setTimeout(() => {
        const newPost: PostProps = {
          id: `post-${Date.now()}`,
          ...postData,
          data: `${new Date().toLocaleDateString()}`,
        }

        setPosts((prevPosts) => [...prevPosts, newPost])
        resolve(newPost)
      }, 500)
    })
  }

  const updatePost = async (id: string, postData: Partial<PostProps>) => {
    // Simula chamada de API
    return new Promise<PostProps>((resolve, reject) => {
      setTimeout(() => {
        const postIndex = posts.findIndex((post) => post.id === id)

        if (postIndex === -1) {
          reject(new Error("Post not found"))
          return
        }

        const updatedPost = {
          ...posts[postIndex],
          ...postData,
        }

        const updatedPosts = [...posts]
        updatedPosts[postIndex] = updatedPost

        setPosts(updatedPosts)
        resolve(updatedPost)
      }, 500)
    })
  }

  const deletePost = async (id: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const postIndex = posts.findIndex((post) => post.id === id)

        if (postIndex === -1) {
          reject(new Error("Post not found"))
          return
        }

        const updatedPosts = posts.filter((post) => post.id !== id)
        setPosts(updatedPosts)
        resolve()
      }, 500)
    })
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        isLoading,
        getPost,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}
