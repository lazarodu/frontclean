import type { UserRepository } from "../../../domain/repositories/UserRepository";

export class LogoutUserUseCase {
  private logoutService: UserRepository;

  constructor(logoutService: UserRepository) {
    this.logoutService = logoutService;
  }

  async execute() {
    return this.logoutService.logout();
  }
}
