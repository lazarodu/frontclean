
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { PostForm } from "../../components/PostForm"
import type { PostProps } from "../../../shared/types/PostType"
import { usePost } from "../../hooks/usePost"
import { BackButton, Container, NotFound, NotFoundMessage, NotFoundTitle, Title } from "./styles"


export const AdminEditPostPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { getPost, updatePost } = usePost()

  const [post, setPost] = useState(id ? getPost(id) : undefined)

  useEffect(() => {
    if (id) {
      setPost(getPost(id))
    }
  }, [id, getPost])

  const handleSubmit = async (postData: Omit<PostProps, "id" | "data" | "autor">) => {
    if (!id) return


    try {
      await updatePost(id, postData)
      navigate("/admin/posts")
    } catch (error) {
      console.error("Falha ao atualizar o post:", error)
    }
  }

  if (!post) {
    return (
      <>
        <NotFound>
          <NotFoundTitle>Post não encontrado</NotFoundTitle>
          <NotFoundMessage>A postagem que você está tentando editar não existe ou foi removido.</NotFoundMessage>
          <BackButton onClick={() => navigate("/admin/posts")}>Voltar aos Posts</BackButton>
        </NotFound>
      </>
    )
  }

  return (
    <>
      <Container>
        <Title>Editar Post</Title>
        <PostForm initialData={post} onSubmit={handleSubmit} />
      </Container>
    </>
  )
}
