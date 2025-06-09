import { createContext, useState, useEffect, type ReactNode } from "react"
import type { CommentProps } from "../../shared/types/CommentType"
import { makeAddCommentUseCase, makeDeleteCommentUseCase, makeGetCommentsByPostUseCase, makeGetCommentsByUserUseCase } from "../../factories/makeCommentUseCases"

interface CommentContextType {
  comments: CommentProps[]
  isLoading: boolean
  getCommentsByPost: (postId: string) => CommentProps[]
  getCommentsByUser: (userId: string) => CommentProps[]
  addComment: (comment: Omit<CommentProps, "id" | "data">) => Promise<CommentProps>
  deleteComment: (id: string) => Promise<void>
}

export const CommentContext = createContext<CommentContextType>({
  comments: [],
  isLoading: true,
  getCommentsByPost: () => [],
  getCommentsByUser: () => [],
  addComment: async () => ({ id: "", postId: "", userId: "", comment: "", data: `${new Date()}` }),
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

  const getCommentsByPost = (postId: string) => {
    // return comments.filter((comment) => comment.postId === postId).map((p) => ({
    //   ...p,
    //   autor: users.filter(u => u.id === p.userId)[0].name
    // }))
    const useCase = makeGetCommentsByPostUseCase()
    const result = useCase.execute(postId)
    return result
  }

  const getCommentsByUser = (userId: string) => {
    // return comments.filter((comment) => comment.userId === userId)
    const useCase = makeGetCommentsByUserUseCase()
    const result = useCase.execute(userId)
    return result
  }

  const addComment = async (commentData: Omit<CommentProps, "id" | "data">) => {
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
