import type { CommentListProps } from "../../../shared/types/CommentType";
import { SSection } from "./styles";

export function CommentList({ comments }: CommentListProps) {
  return (
    <SSection>
      {comments.map((comment) => (
        <aside key={comment.id}>
          <h5>{comment.comment}</h5>
          <div>
            <h6>{comment.autor}</h6>, <h6>{comment.data}</h6>
          </div>
        </aside>
      ))}
    </SSection>
  );
}
