import { config } from "../shared/config/env";

import { GetCurrentUserUseCase } from "../application/usecases/users/GetCurrentUserUseCase";
import { LoginUserUseCase } from "../application/usecases/users/LoginUserUseCase";
import { LogoutUserUseCase } from "../application/usecases/users/LogoutUserUseCase";
import { RegisterUserUseCase } from "../application/usecases/users/RegisterUserUseCase";
import { SetCurrentUserUseCase } from "../application/usecases/users/SetCurrentUserUseCase";
import { UserServiceInMemory } from "../infrastructure/services/inMemory/UserServiceInMemory";
import { UserServiceHttp } from "../infrastructure/services/http/UserServiceHttp"

const repo = config.useApi
  ? new UserServiceHttp()
  : new UserServiceInMemory();

export const makeLoginUserUseCase = () => new LoginUserUseCase(repo);
export const makeRegisterUserUseCase = () => new RegisterUserUseCase(repo);
export const makeLogoutUserUseCase = () => new LogoutUserUseCase(repo);
export const makeGetCurrentUserUseCase = () => new GetCurrentUserUseCase(repo);
export const makeSetCurrentUserUseCase = () => new SetCurrentUserUseCase(repo);