import { config } from "../shared/config/env";

import { CreatePostUseCase } from "../application/usecases/posts/CreatePostUseCase";
import { GetAllPostsUseCase } from "../application/usecases/posts/GetAllPostsUseCase";
import { UpdatePostUseCase } from "../application/usecases/posts/UpdatePostUseCase";
import { DeletePostUseCase } from "../application/usecases/posts/DeletePostUseCase";
import { GetPostByIdUseCase } from "../application/usecases/posts/GetPostByIdUseCase";
import { PostServiceInMemory } from "../infrastructure/services/inMemory/PostServiceInMemory";
import { PostServiceHttp } from "../infrastructure/services/http/PostServiceHttp";

const repo = config.useApi
  ? new PostServiceHttp()
  : new PostServiceInMemory();

export const makeCreatePostUseCase = () => new CreatePostUseCase(repo);
export const makeGetAllPostsUseCase = () => new GetAllPostsUseCase(repo);
export const makeGetPostByIdUseCase = () => new GetPostByIdUseCase(repo);
export const makeUpdatePostUseCase = () => new UpdatePostUseCase(repo);
export const makeDeletePostUseCase = () => new DeletePostUseCase(repo);
