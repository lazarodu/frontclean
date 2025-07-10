import { format, parseISO } from "date-fns";
import type { CommentListProps } from "../../../shared/types/CommentType";
import { SSection } from "./styles";

export function CommentList({ comments }: CommentListProps) {
  return (
    <SSection>
      {comments.map((comment) => (
        <aside key={comment.id}>
          <h5>{comment.comment}</h5>
          <div>
            <h6>{comment.user?.name}</h6>, <h6>{comment.date ? format(parseISO(comment.date), "dd/MM/yyyy") : ""}</h6>
          </div>
        </aside>
      ))}
    </SSection>
  );
}
