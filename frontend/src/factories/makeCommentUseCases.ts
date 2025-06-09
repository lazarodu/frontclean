import { CommentServiceInMemory } from "../infrastructure/services/CommentServiceInMemory";
import { AddCommentUseCase } from "../application/usecases/comments/AddCommentUseCase";
import { GetCommentsByPostUseCase } from "../application/usecases/comments/GetCommentsByPostUseCase";
import { GetCommentsByUserUseCase } from "../application/usecases/comments/GetCommentsByUserUseCase";
import { DeleteCommentUseCase } from "../application/usecases/comments/DeleteCommentUseCase";

const repo = new CommentServiceInMemory();

export const makeAddCommentUseCase = () => new AddCommentUseCase(repo);
export const makeGetCommentsByPostUseCase = () => new GetCommentsByPostUseCase(repo);
export const makeGetCommentsByUserUseCase = () => new GetCommentsByUserUseCase(repo);
export const makeDeleteCommentUseCase = () => new DeleteCommentUseCase(repo);