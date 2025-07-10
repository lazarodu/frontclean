
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { PostForm } from "../../components/PostForm"
import type { PostProps } from "../../../shared/types/PostType"
import { usePost } from "../../hooks/usePost"
import { BackButton, Container, NotFound, NotFoundMessage, NotFoundTitle, Title } from "./styles"


export const AdminEditPostPage = () => {
  const { id } = useParams<{ id: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { getPost, updatePost } = usePost()

  const [post, setPost] = useState<PostProps | null>(null)

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true)
      if (id) {
        setPost(await getPost(id))
      }
      setIsLoading(false)
    }
    fetchPost()
  }, [id, getPost])

  const handleSubmit = async (postData: Omit<PostProps, "id" | "user_id" | "date">) => {
    if (!id) return
    try {
      setIsLoading(true)
      await updatePost(id, postData)
      navigate("/admin/posts")
    } catch (error) {
      console.error("Falha ao atualizar o post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <p>Carregando...</p>
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
