import { createContext, useState, useEffect, type ReactNode } from "react"
import type { PostProps } from "../../shared/types/PostType"
import { makeCreatePostUseCase, makeDeletePostUseCase, makeGetAllPostsUseCase, makeGetPostByIdUseCase, makeUpdatePostUseCase } from "../../factories/makePostUseCases"

interface PostContextType {
  posts: PostProps[]
  isLoading: boolean
  getPost: (id: string) => Promise<PostProps | null>
  createPost: (post: Omit<PostProps, "id" | "user_id" | "date">) => Promise<PostProps>
  updatePost: (id: string, post: Partial<PostProps>) => Promise<PostProps>
  deletePost: (id: string) => Promise<void>
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  isLoading: true,
  getPost: async () => null,
  createPost: async () => ({ id: "", title: "", description: "", content: "", user_id: "", date: new Date() }),
  updatePost: async () => ({ id: "", title: "", description: "", content: "", user_id: "", date: new Date() }),
  deletePost: async () => { },
})

interface PostProviderProps {
  children: ReactNode
}

export const PostProvider = ({ children }: PostProviderProps) => {
  const [posts, setPosts] = useState<PostProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function fetchPosts() {
    const useCase = makeGetAllPostsUseCase()
    const result = await useCase.execute()
    setPosts(result)
  }

  useEffect(() => {
    // Simula chamada de API
    setTimeout(async () => {
      await fetchPosts()
      setIsLoading(false)
    }, 500)
  }, [])

  const getPost = async (id: string) => {
    const useCase = makeGetPostByIdUseCase()
    const result = await useCase.execute(id)
    return result
    // return posts.find((post) => post.id === id)
  }

  const createPost = async (postData: Omit<PostProps, "id" | "user_id" | "date" | "user">) => {
    // Simula chamada de API
    return new Promise<PostProps>((resolve, reject) => {
      setTimeout(async () => {
        // const newPost: PostProps = {
        //   id: `post-${Date.now()}`,
        //   ...postData,
        //   data: `${new Date().toLocaleDateString()}`,
        // }
        // setPosts((prevPosts) => [...prevPosts, newPost])
        try {
          const useCase = makeCreatePostUseCase()
          const newPost = await useCase.execute(postData)
          await fetchPosts() // Recarrega posts após o cadastro
          resolve(newPost)
        } catch (e) {
          reject(new Error(`Erro ao cadastrar o Post: ${e}`))
        }
      }, 500)
    })
  }

  const updatePost = async (id: string, postData: Partial<PostProps>) => {
    // Simula chamada de API
    return new Promise<PostProps>((resolve, reject) => {
      setTimeout(async () => {
        // const postIndex = posts.findIndex((post) => post.id === id)

        // if (postIndex === -1) {
        //   reject(new Error("Post not found"))
        //   return
        // }

        // const updatedPost = {
        //   ...posts[postIndex],
        //   ...postData,
        // }

        // const updatedPosts = [...posts]
        // updatedPosts[Number(id)] = updatedPost

        // setPosts(updatedPosts)
        try {
          const useCase = makeUpdatePostUseCase()
          const updatedPost = await useCase.execute(id, postData)
          await fetchPosts() // Recarrega posts após atualização
          resolve(updatedPost)
        } catch (e) {
          reject(new Error(`Post não encontrado: ${e}`))
        }

      }, 500)
    })
  }

  const deletePost = async (id: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        // const postIndex = posts.findIndex((post) => post.id === id)

        // if (postIndex === -1) {
        //   reject(new Error("Post not found"))
        //   return
        // }

        // const updatedPosts = posts.filter((post) => post.id !== id)
        // setPosts(updatedPosts)
        try {
          const useCase = makeDeletePostUseCase()
          await useCase.execute(id)
          await fetchPosts() // Recarrega posts após atualização
          resolve()
        } catch (e) {
          reject(new Error(`Post não encontrado: ${e}`))
        }
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
