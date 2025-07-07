import { config } from "../shared/config/env";

import { AddCommentUseCase } from "../application/usecases/comments/AddCommentUseCase";
import { GetCommentsByPostUseCase } from "../application/usecases/comments/GetCommentsByPostUseCase";
import { GetCommentsByUserUseCase } from "../application/usecases/comments/GetCommentsByUserUseCase";
import { DeleteCommentUseCase } from "../application/usecases/comments/DeleteCommentUseCase";
import { CommentServiceInMemory } from "../infrastructure/services/inMemory/CommentServiceInMemory";
import { CommentServiceHttp } from "../infrastructure/services/http/CommentServiceHttp";

const repo = config.useApi
  ? new CommentServiceHttp()
  : new CommentServiceInMemory();

export const makeAddCommentUseCase = () => new AddCommentUseCase(repo);
export const makeGetCommentsByPostUseCase = () => new GetCommentsByPostUseCase(repo);
export const makeGetCommentsByUserUseCase = () => new GetCommentsByUserUseCase(repo);
export const makeDeleteCommentUseCase = () => new DeleteCommentUseCase(repo);