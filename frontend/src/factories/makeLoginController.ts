import { AuthServiceInMemory } from "../infrastructure/services/AuthServiceInMemory"; // ou AuthServiceHttp
import { AuthenticateUserUseCase } from "../application/usecases/AuthenticateUserUseCase";
import { LoginController } from "../application/controllers/LoginController";

export const makeLoginController = () => {
  const authService = new AuthServiceInMemory(); // implementação concreta
  const usecase = new AuthenticateUserUseCase(authService);
  const controller = new LoginController(usecase);
  return controller;
};
