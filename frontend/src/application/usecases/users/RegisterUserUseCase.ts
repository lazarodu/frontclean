import type { UserRepository } from "../../../domain/repositories/UserRepository";
import type { Email } from "../../../domain/value-objects/Email";
import type { Password } from "../../../domain/value-objects/Password";

export class RegisterUserUseCase {
  private registerService: UserRepository;

  constructor(registerService: UserRepository) {
    this.registerService = registerService;
  }

  async execute(name: string, email: Email, password: Password) {
    return await this.registerService.register(name, email.getValue(), password.getValue());
  }
}
