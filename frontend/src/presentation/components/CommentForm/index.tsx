import { useState, type FormEvent } from "react";
import { SForm } from "./styles";
import { useComment } from "../../hooks/useComment";
import { format } from "date-fns";

interface CommentFormProps {
  post_id: string
  onSubmit: (post: { comment: string }) => void;
}

export function CommentForm({ post_id, onSubmit }: CommentFormProps) {
  const [comment, setComment] = useState("");
  const { addComment } = useComment()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true)
    try {
      await addComment({
        post_id,
        comment: comment.trim(),
        date: format(new Date(), 'yyyy-MM-dd')
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
