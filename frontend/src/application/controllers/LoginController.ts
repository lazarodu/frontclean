import { AuthenticateUserUseCase } from "../usecases/AuthenticateUserUseCase";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";
import type { User } from "../../domain/entities/User";

export class LoginController {
  private usecase: AuthenticateUserUseCase;

  constructor(usecase: AuthenticateUserUseCase) {
    this.usecase = usecase;
  }

  async login(email: string, password: string): Promise<User | string> {
    try {
      const emailVO = new Email(email);
      const passwordVO = new Password(password);
      const result = await this.usecase.execute(emailVO, passwordVO);
      return result ? result : "Falha";
    } catch (e) {
      return "Erro: " + (e as Error).message;
    }
  }
}
