import type { UserRepository } from "../../../domain/repositories/UserRepository";
import type { Email } from "../../../domain/value-objects/Email";
import type { Password } from "../../../domain/value-objects/Password";

export class LoginUserUseCase {
  private loginService: UserRepository;

  constructor(loginService: UserRepository) {
    this.loginService = loginService;
  }

  async execute(email: Email, password: Password) {
    return await this.loginService.login(email.getValue(), password.getValue());
  }
}
