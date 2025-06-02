import { useState, type FormEvent } from "react";
import { SForm } from "./styles";
import { useComment } from "../../hooks/useComment";
import { useAuth } from "../../hooks/useAuth";

interface CommentFormProps {
  postId: string
  onSubmit: (post: { comment: string }) => void;
}

export function CommentForm({ postId, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const { addComment } = useComment()
  const { currentUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser || !comment.trim()) return

    setIsLoading(true)
    try {
      await addComment({
        postId,
        userId: currentUser!.id,
        autor: currentUser!.name,
        comment: comment.trim(),
      })

      setComment("")
      onSubmit({ comment });
    } catch (error) {
      console.error("Falha ao adicionar o comentário:", error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <SForm method="post" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Comentário</label>
        <input
          placeholder="Escreva um comentário..."
          type="text"
          name="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoading}>{isLoading ? "Enviando..." : "Enviar"}</button>
    </SForm>
  );
}
