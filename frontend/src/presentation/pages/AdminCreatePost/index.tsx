import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "../../contexts/AuthContext"
import type { PostProps } from "../../../shared/types/PostType"
import { Container, Title } from "./styles"
import { usePost } from "../../hooks/usePost"
import { PostForm } from "../../components/PostForm"

export const AdminCreatePostPage = () => {
  const { createPost } = usePost()
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!currentUser) {
    return <h1>Carregando...</h1>
  }
  const handleSubmit = async (postData: Omit<PostProps, "id" | "autor" | "data">) => {
    try {
      await createPost({
        ...postData,
        autor: currentUser?.name,
      })
      navigate("/admin/posts")
    } catch (error) {
      console.error("Falha ao criar o post:", error)
    }
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
