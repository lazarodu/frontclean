import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { useComment } from "../../hooks/useComment"
import { usePost } from "../../hooks/usePost"
import { CommentContent, CommentDate, CommentHeader, CommentItem, Container, DeleteButton, LoadingMessage, NoComments, PostTitle, Title } from "./styles"
import type { CommentProps } from "../../../shared/types/CommentType"

interface CommentWithPost extends CommentProps {
  postTitle: string
}

export const UserCommentsPage = () => {
  const { currentUser } = useAuth()
  const { getCommentsByUser, deleteComment } = useComment()
  const { posts } = usePost()

  const [userComments, setUserComments] = useState<CommentWithPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchComments() {
      if (currentUser) {
        const comments = await getCommentsByUser(currentUser.id)

        // Adiciona postTitle para cada comment
        const commentsWithPost = comments.map((comment) => {
          const post = posts.find((a) => a.id === comment.post_id)
          return {
            ...comment,
            postTitle: post ? post.title : "Post não encontrado",
          }
        })

        setUserComments(commentsWithPost)
        setIsLoading(false)
      }
    }
    fetchComments()
  }, [currentUser, getCommentsByUser, posts])

  const handleDeleteComment = async (commentId: string) => {
    if (window.confirm("Você tem certeza que deseja apagar esse comentário?")) {
      try {
        await deleteComment(commentId)
        setUserComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))
      } catch (error) {
        console.error("Falha em apagar o comentário:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <>
        <Container>
          <Title>Meus Comentários</Title>
          <LoadingMessage>Carregando comentários...</LoadingMessage>
        </Container>
      </>
    )
  }

  return (
    <>
      <Container>
        <Title>Meus comentários</Title>

        {userComments.length === 0 ? (
          <NoComments>Você não fez comentários ainda.</NoComments>
        ) : (
          userComments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentHeader>
                <PostTitle>{comment.postTitle}</PostTitle>
                <CommentDate>{new Intl.DateTimeFormat("pt-BR").format(comment.date)}</CommentDate>
              </CommentHeader>
              <CommentContent>{comment.comment}</CommentContent>
              <DeleteButton onClick={() => handleDeleteComment(comment.id)}>Apagar</DeleteButton>
            </CommentItem>
          ))
        )}
      </Container>
    </>
  )
}
