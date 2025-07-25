import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import type { PostProps } from "../../../shared/types/PostType"
import { Container, Title } from "./styles"
import { usePost } from "../../hooks/usePost"
import { PostForm } from "../../components/PostForm"
import { toast } from "react-toastify"
import { format } from "date-fns"

export const AdminCreatePostPage = () => {
  const { createPost } = usePost()
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  if (!currentUser) {
    return <h1>Carregando...</h1>
  }
  const handleSubmit = async (postData: Omit<PostProps, "id" | "user_id" | "date">) => {
    try {
      setIsLoading(true)
      await createPost({
        ...postData, date: format(new Date(), 'yyyy-MM-dd')
      })
      navigate("/admin/posts")
    } catch (error) {
      toast.error(`${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <>
      <Container>
        <Title>Escrever um Post</Title>
        <PostForm onSubmit={handleSubmit} />
      </Container>
    </>
  )
}
