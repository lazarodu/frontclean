import { CommentServiceInMemory } from "../infrastructure/services/CommentServiceInMemory";
import { AddCommentUseCase } from "../application/usecases/AddCommentUseCase";
import { GetCommentsByPostUseCase } from "../application/usecases/GetCommentsByPostUseCase";

const repo = new CommentServiceInMemory();

export const makeAddCommentUseCase = () => new AddCommentUseCase(repo);
export const makeGetCommentsByPostUseCase = () => new GetCommentsByPostUseCase(repo);
