import { createContext, useState, useEffect, type ReactNode } from "react"
import type { CommentProps } from "../../shared/types/CommentType"
import { makeAddCommentUseCase, makeDeleteCommentUseCase, makeGetCommentsByPostUseCase, makeGetCommentsByUserUseCase } from "../../factories/makeCommentUseCases"

interface CommentContextType {
  comments: CommentProps[]
  isLoading: boolean
  getCommentsByPost: (post_id: string) => Promise<CommentProps[]>
  getCommentsByUser: (user_id: string) => Promise<CommentProps[]>
  addComment: (comment: Omit<CommentProps, "id" | "user_id">) => Promise<CommentProps>
  deleteComment: (id: string) => Promise<void>
}

export const CommentContext = createContext<CommentContextType>({
  comments: [],
  isLoading: true,
  getCommentsByPost: async () => [],
  getCommentsByUser: async () => [],
  addComment: async () => ({ id: "", post_id: "", comment: "", date: new Date() }),
  deleteComment: async () => { },
})

interface CommentProviderProps {
  children: ReactNode
}

export const CommentProvider = ({ children }: CommentProviderProps) => {
  const [comments, setComments] = useState<CommentProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula chamada de API
    setTimeout(() => {
      // setComments(mockComments)
      setIsLoading(false)
    }, 500)
  }, [])

  const getCommentsByPost = async (post_id: string) => {
    // return comments.filter((comment) => comment.post_id === post_id).map((p) => ({
    //   ...p,
    //   autor: users.filter(u => u.id === p.user_id)[0].name
    // }))
    const useCase = makeGetCommentsByPostUseCase()
    const result = await useCase.execute(post_id)
    return result
  }

  const getCommentsByUser = async () => {
    // return comments.filter((comment) => comment.user_id === user_id)
    const useCase = makeGetCommentsByUserUseCase()
    const result = await useCase.execute()
    return result
  }

  const addComment = async (commentData: Omit<CommentProps, "id" | "user_id" | "date">) => {
    // Simula chamada de API
    return new Promise<CommentProps>((resolve) => {
      setTimeout(async () => {
        // const newComment: CommentProps = {
        //   id: `comment-${Date.now()}`,
        //   ...commentData,
        //   data: `${new Date().toLocaleDateString()}`,
        // }

        const useCase = makeAddCommentUseCase()
        const newComment = await useCase.execute(commentData)
        setComments((prevComments) => [...prevComments, newComment])

        resolve(newComment)
      }, 500)
    })
  }

  const deleteComment = async (id: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // const commentIndex = comments.findIndex((comment) => comment.id === id)

        // if (commentIndex === -1) {
        //   reject(new Error("Comment not found"))
        //   return
        // }

        // const updatedComments = comments.filter((comment) => comment.id !== id)
        // setComments(updatedComments)
        const useCase = makeDeleteCommentUseCase()
        useCase.execute(id)
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id))
        resolve()
      }, 500)
    })

  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        isLoading,
        getCommentsByPost,
        getCommentsByUser,
        addComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
