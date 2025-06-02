"use client"

import { useContext } from "react"
import { CommentContext } from "../contexts/CommentContext"

export const useComment = () => {
  const context = useContext(CommentContext)

  if (!context) {
    throw new Error("useComments must be used within a CommentProvider")
  }

  return context
}
