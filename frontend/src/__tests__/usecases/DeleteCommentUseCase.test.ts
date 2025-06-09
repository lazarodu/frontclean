import { describe, it, expect, vi } from "vitest";
import { DeleteCommentUseCase } from "../../application/usecases/comments/DeleteCommentUseCase";
import { type CommentRepository } from "../../domain/repositories/CommentRepository";

describe("DeleteCommentUseCase", () => {
  it("deve deletar um comentário com sucesso", () => {
    const mockRepo: CommentRepository = {
      getCommentsByPost: vi.fn(),
      getCommentsByUser: vi.fn(),
      addComment: vi.fn(),
      deleteComment: vi.fn().mockResolvedValueOnce(undefined),
    };

    const usecase = new DeleteCommentUseCase(mockRepo);
    expect(usecase.execute("comment-123"))
    expect(mockRepo.deleteComment).toHaveBeenCalledWith("comment-123");
  });
});
