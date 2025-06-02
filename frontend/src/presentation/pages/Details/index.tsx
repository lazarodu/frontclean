import { useNavigate, useParams } from "react-router-dom";
import { PostDetails } from "../../components/PostDetails";
import { useEffect, useState } from "react";
import { usePost } from "../../hooks/usePost";
import { useComment } from "../../hooks/useComment";
import { useAuth } from "../../hooks/useAuth";
import { CommentForm } from "../../components/CommentForm";
import { CommentList } from "../../components/CommentList";

export function Details() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { getPost } = usePost()
  const { comments, getCommentsByPost } = useComment()
  const { currentUser } = useAuth()

  const [post, setPost] = useState(id ? getPost(id) : undefined)
  const [postComments, setPostComments] = useState(id ? getCommentsByPost(id) : [])

  useEffect(() => {
    if (id) {
      setPost(getPost(id))
      setPostComments(getCommentsByPost(id))
    }
  }, [id, getPost, getCommentsByPost, comments])

  if (!post) {
    return (
      <>
        <h1>Post não encontrado</h1>
        <button onClick={() => navigate("/")}>Voltar para a Home</button>
      </>
    )
  }

  const handleCommentAdded = () => {
    if (id) {
      setPostComments(getCommentsByPost(id))
    }
  }

  return (
    <>
      <PostDetails
        title={post.title}
        description={post.description}
        content={post.content}
        autor={post.autor}
        data={post.data}
      />
      {currentUser && <CommentForm postId={post.id} onSubmit={handleCommentAdded} />}
      <CommentList comments={postComments} />
    </>
  );
}
