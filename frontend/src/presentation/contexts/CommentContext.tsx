"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { CommentProps } from "../../shared/types/CommentType"
import { mockComments } from "../../infrastructure/mocks/CommentMock"
import type { UserProps } from "../../shared/types/UserType"
import { mockUsers } from "../../infrastructure/mocks/UserMock"

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
  const [users, setUsers] = useState<UserProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula chamada de API
    setTimeout(() => {
      setComments(mockComments)
      setIsLoading(false)
      setUsers(mockUsers)
    }, 500)
  }, [])

  const getCommentsByPost = (postId: string) => {
    return comments.filter((comment) => comment.postId === postId).map((p) => ({
      ...p,
      autor: users.filter(u => u.id === p.userId)[0].name
    }))
  }

  const getCommentsByUser = (userId: string) => {
    return comments.filter((comment) => comment.userId === userId)
  }

  const addComment = async (commentData: Omit<CommentProps, "id" | "data">) => {
    // Simula chamada de API
    return new Promise<CommentProps>((resolve) => {
      setTimeout(() => {
        const newComment: CommentProps = {
          id: `comment-${Date.now()}`,
          ...commentData,
          data: `${new Date().toLocaleDateString()}`,
        }

        setComments((prevComments) => [...prevComments, newComment])
        resolve(newComment)
      }, 500)
    })
  }

  const deleteComment = async (id: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const commentIndex = comments.findIndex((comment) => comment.id === id)

        if (commentIndex === -1) {
          reject(new Error("Comment not found"))
          return
        }

        const updatedComments = comments.filter((comment) => comment.id !== id)
        setComments(updatedComments)
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
