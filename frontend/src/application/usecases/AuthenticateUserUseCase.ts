import type { Email } from "../../domain/value-objects/Email";
import type { Password } from "../../domain/value-objects/Password";
import type { AuthService } from "../../shared/types/AuthService";

export class AuthenticateUserUseCase {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async execute(email: Email, password: Password) {
    return await this.authService.authenticate(email.getValue(), password.getValue());
  }
}
